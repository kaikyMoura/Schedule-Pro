'use client';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext/LoadingContext';
import { PopupProvider } from '@/contexts/PopupContext/PopupContext';
import { RouteTransitionProvider } from '@/contexts/RouteTransitionContext/RouteTransitionContext';
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from 'next-themes';
import { TooltipProvider } from "@/components/ui/tooltip"
import { NotificationSidebarProvider } from './features/NotificationSidebar/context';

const Providers = ({ children }: { children: React.ReactNode }) => {

    const themeProviderProps: ThemeProviderProps = {
        attribute: "class",
        defaultTheme: "system",
        enableSystem: true,
        disableTransitionOnChange: true,
    }

    return (
        <NextThemesProvider {...themeProviderProps}>
            <AuthProvider>
                <LoadingProvider>
                    <RouteTransitionProvider>
                        <PopupProvider>
                            <NotificationSidebarProvider>
                                <TooltipProvider delayDuration={0}>
                                    {children}
                                </TooltipProvider>
                            </NotificationSidebarProvider>
                        </PopupProvider>
                    </RouteTransitionProvider>
                </LoadingProvider>
            </AuthProvider>
        </NextThemesProvider >
    );
}

export default Providers;