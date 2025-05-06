'use client';

// import { AuthProvider } from '@/contexts/AuthContext/AuthContext';
// import { LoadingProvider } from '@/contexts/LoadingContext/LoadingContext';
// import { RouteTransitionProvider } from '@/contexts/RouteTransitionContext/RouteTransitionContext';
// import { ThemeProvider } from '@/contexts/ThemeContext/ThemeContext';
import { Tooltip } from 'react-tooltip';
import SideMenuImpl from './SideMenuImpl';
import Header from './ui/Header';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-x-hidden">
            <SideMenuImpl />

            <div className="flex flex-col flex-grow">
                <Header />
                <div className="flex-grow p-14 transition-all duration-500 ease-in-out md:ml-0 lg:ml(--sidebar-width)"
                >
                    {children}
                </div>
            </div>
            <Tooltip id="my-tooltip" className='z-100' place="right-start" />
            {/* </AuthProvider>
                </ThemeProvider>
                </RouteTransitionProvider>
                </LoadingProvider> */}
        </div >
    );
}