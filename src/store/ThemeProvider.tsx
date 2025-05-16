import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {ThemeContextType, ThemeType} from "../types/theme";



export const ThemeCtx = createContext<ThemeContextType | undefined>(undefined);

const Theme: Record<'DARK' | 'LIGHT' | 'SYSTEM', ThemeType> = {
    DARK: 'dark',
    LIGHT: 'light',
    SYSTEM: 'system'
};

export const ThemeProvider: React.FC<PropsWithChildren> =({ children })=> {
    const [theme, setTheme] = useState<ThemeType>(()=>{
        if(typeof window !== 'undefined' && window.sessionStorage){
            const storedTheme = sessionStorage.getItem("theme") as ThemeType | null;
            if(storedTheme===Theme.DARK || storedTheme===Theme.LIGHT){
                return storedTheme;
            }
        }
        return Theme.SYSTEM;
    })

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(Theme.DARK, Theme.LIGHT);

        if(theme === Theme.SYSTEM){
            const sysTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? Theme.DARK
                : Theme.LIGHT;

            root.classList.add(sysTheme);
            sessionStorage.removeItem('theme');
        }else{
            root.classList.add(theme);
            sessionStorage.theme = theme;
        }
    }, [theme]);


    // Ascolta i cambiamenti della preferenza del sistema
    useEffect(() => {
        if(theme!==Theme.SYSTEM) return;

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            const root = window.document.documentElement;
            root.classList.remove(Theme.DARK, Theme.LIGHT);
            root.classList.add(e.matches ? Theme.DARK : Theme.LIGHT)
        };

        // Aggiungi il listener per i cambiamenti della preferenza del sistema
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);

        const initialTheme = () => {
            const root = window.document.documentElement;
            root.classList.remove(Theme.DARK, Theme.LIGHT);
            root.classList.add(mediaQuery.matches ? Theme.DARK : Theme.LIGHT);
        };

        initialTheme();

        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, [theme]);

    const ctxValue: ThemeContextType = {
        theme,
        setTheme,
        themes: Theme,
        isDark: theme === Theme.DARK ||
            (theme === Theme.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches),
        isLight: theme === Theme.LIGHT ||
            (theme === Theme.SYSTEM && !window.matchMedia('(prefers-color-scheme: dark)').matches),
        isSystem: theme === Theme.SYSTEM
    };

    return <ThemeCtx.Provider value={ctxValue}>{children}</ThemeCtx.Provider>;
}



