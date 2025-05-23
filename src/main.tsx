import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./App";
import {ThemeProvider} from "./store/ThemeProvider";

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <ThemeProvider>
                <App/>
        </ThemeProvider>
    </React.StrictMode>,
)
