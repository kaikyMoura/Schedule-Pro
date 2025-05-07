'use client';

import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext/LoadingContext';
import { RouteTransitionProvider } from '@/contexts/RouteTransitionContext/RouteTransitionContext';
import { Tooltip } from 'react-tooltip';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LoadingProvider>
            <RouteTransitionProvider>
                {/* <ThemeProvider> */}
                <AuthProvider>
                    {children}
                    <Tooltip id="my-tooltip" className='z-120' place="right-start" />
                </AuthProvider>
                {/* </ThemeProvider> */}
            </RouteTransitionProvider>
        </LoadingProvider>
    );
}