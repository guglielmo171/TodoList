import React from 'react';
import { SunIcon, MoonIcon, ComputerIcon } from 'lucide-react';
import {useTheme} from "../../hooks/useTheme";


const ThemeSwitch = () => {
    const { theme, setTheme,themes } = useTheme();
    return (
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
                onClick={() => setTheme(themes.LIGHT)}
                className={`p-2 rounded-md ${
                    theme === themes.LIGHT
                        ? 'bg-white text-black shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                aria-label="Attiva tema chiaro"
            >
                <SunIcon size={20} />
            </button>
            <button
                onClick={() => setTheme(themes.DARK)}
                className={`p-2 rounded-md ${
                    theme === themes.DARK
                        ? 'bg-gray-700 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                aria-label="Attiva tema scuro"
            >
                <MoonIcon size={20} />
            </button>
            <button
                onClick={() => setTheme(themes.SYSTEM)}
                className={`p-2 rounded-md ${
                    theme === themes.SYSTEM
                        ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white'
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
                aria-label="Usa tema di sistema"
            >
                <ComputerIcon size={20} />
            </button>
        </div>
    );
};

export default ThemeSwitch;