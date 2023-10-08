import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next"
import type {NextAuthOptions as NextAuthConfig, TokenSet} from "next-auth"
import {getServerSession, DefaultSession} from "next-auth"

import Strava from "next-auth/providers/strava"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            sub: string,
            accessToken: string,
            refreshToken: string,
            expiresAt: number,
        } & DefaultSession["user"]
    }

    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        accessToken: string,
        refreshToken: string,
        expiresAt: number,
    }
}

export const config = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        Strava({
            clientId: process.env.AUTH_STRAVA_ID,
            clientSecret: process.env.AUTH_STRAVA_SECRET,
            authorization: {
                params: {
                    scope: "activity:read,read"
                }
            }
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                // Save the access token and refresh token in the JWT on the initial login
                return {
                    ...token, // Keep the previous token properties
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    expiresAt: account.expires_at,
                };
            }

            // @ts-ignore
            if (Date.now() < token.expiresAt * 1000) {
                // If the access token has not expired yet, return it
                return token;
            }

            // If the access token has expired, try to refresh it
            try {
                const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    // @ts-ignore
                    body: new URLSearchParams({
                        client_id: process.env.AUTH_STRAVA_ID,
                        client_secret: process.env.AUTH_STRAVA_SECRET,
                        grant_type: 'refresh_token',
                        refresh_token: token.refreshToken,
                    }),
                })

                const tokens: TokenSet = await response.json()

                if (!response.ok) throw tokens

                return {
                    ...token, // Keep the previous token properties
                    accessToken: tokens.access_token,
                    expiresAt: tokens.expires_at,
                    // Fall back to old refresh token, but note that
                    // many providers may only allow using a refresh token once.
                    refreshToken: tokens.refresh_token ?? token.refreshToken,
                }
            } catch (error) {
                console.error('Error refreshing access token', error)

                // The error property will be used client-side to handle the refresh token error
                return {...token, error: 'RefreshAccessTokenError' as const}
            }
        },
        async session({session, token}) {
            // Send properties to the client, like an access_token from a provider.
            if (token.sub &&
                typeof token.accessToken === 'string' &&
                typeof token.refreshToken === 'string' &&
                typeof token.expiresAt === 'number'
            ) {
                session.user.sub = token.sub;
                session.user.accessToken = token.accessToken;
                session.user.refreshToken = token.refreshToken;
                session.user.expiresAt = token.expiresAt;
            }

            return session;
        }
    },
} satisfies NextAuthConfig

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}

// We recommend doing your own environment variable validation
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string

            AUTH_STRAVA_ID: string
            AUTH_STRAVA_SECRET: string
            MONGODB_URI: string
        }
    }
}
