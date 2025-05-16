import React from "react";

export type ThemeType = 'dark' | 'light' | 'system';

export interface ThemeContextType{
    theme: ThemeType,
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>,
    themes: Record<'DARK'| 'LIGHT' | 'SYSTEM', ThemeType>,
    isDark: boolean,
    isLight: boolean,
    isSystem: boolean,
}