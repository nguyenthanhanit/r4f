import type {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next"
import type {NextAuthOptions as NextAuthConfig} from "next-auth"
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
        } & DefaultSession["user"]
    }
}

export const config = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        Strava({
            clientId: process.env.AUTH_STRAVA_ID,
            clientSecret: process.env.AUTH_STRAVA_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after sign in
            if (account) {
                token.accessToken = account.access_token;
            }

            return token;
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            if (typeof token.accessToken === 'string' && token.sub) {
                session.user.accessToken = token.accessToken;
                session.user.sub = token.sub;
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
        }
    }
}
