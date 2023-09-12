"use client";

import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {ThemeProviderProps} from "next-themes/dist/types";
import {useSearchParams} from 'next/navigation'

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

export function Providers({children, themeProps}: ProvidersProps) {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    return (
        <NextUIProvider>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
    );
}
