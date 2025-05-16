import {ThemeContextType} from "../types/theme";
import {useContext} from "react";
import {ThemeCtx} from "../store/ThemeProvider";

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeCtx);
    if (context === undefined) {
        throw new Error('useTheme deve essere usato all\'interno di un ThemeProvider');
    }
    return context;
}