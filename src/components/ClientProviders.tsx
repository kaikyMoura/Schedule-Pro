'use client';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext/LoadingContext';
import { PopupProvider } from '@/contexts/PopupContext/PopupContext';
import { RouteTransitionProvider } from '@/contexts/RouteTransitionContext/RouteTransitionContext';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext';
import { Tooltip } from 'react-tooltip';
import { NotificationSidebarProvider } from './features/NotificationSidebar/context';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <RouteTransitionProvider>
                <PopupProvider>
                    <NotificationSidebarProvider>
                        <ThemeProvider>
                            <AuthProvider>
                                {children}
                                <Tooltip id="my-tooltip" className='z-120 whitespace-pre-line bg-(--secondary-bg) text-(--primary-text-color)' place="right-start" />
                            </AuthProvider>
                        </ThemeProvider>
                    </NotificationSidebarProvider>
                </PopupProvider>
            </RouteTransitionProvider>
        </LoadingProvider>
    );
}