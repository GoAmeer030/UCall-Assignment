import React from 'react';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster"

interface ProvidersProps {
    children: React.ReactNode;
}

function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Toaster />
            {children}
        </ThemeProvider>
    );
}

export default Providers;
