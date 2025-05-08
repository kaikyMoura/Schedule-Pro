'use client';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext/LoadingContext';
import { PopupProvider } from '@/contexts/PopupContext/PopupContext';
import { RouteTransitionProvider } from '@/contexts/RouteTransitionContext/RouteTransitionContext';
import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext';
import { Tooltip } from 'react-tooltip';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <RouteTransitionProvider>
                <PopupProvider>
                    <ThemeProvider>
                        <AuthProvider>
                            {children}
                            <Tooltip id="my-tooltip" className='z-120 whitespace-pre-line' place="right-start" />
                        </AuthProvider>
                    </ThemeProvider>
                </PopupProvider>
            </RouteTransitionProvider>
        </LoadingProvider>
    );
}