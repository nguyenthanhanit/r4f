"use client";

import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {SessionProvider} from "next-auth/react";
import type {Session} from "next-auth";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
    session: Session;
}

export function Providers({children, themeProps, session}: ProvidersProps) {
    return (
        <NextUIProvider>
            <SessionProvider session={session}>
                <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
            </SessionProvider>
        </NextUIProvider>
    );
}
