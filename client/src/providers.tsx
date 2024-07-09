import React from 'react';
import { ThemeProvider } from "./components/theme-provider";

interface ProvidersProps {
    children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
        </ThemeProvider>
    );
}

export default Providers;
