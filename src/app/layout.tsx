import Providers from "@/components/providers";
import type { Viewport } from 'next';
import { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  metadataBase: new URL('https://schedulepro.app'),
  title: 'SchedulePro | Organize Your Time Efficiently',
  description: 'Simplify your schedule with SchedulePro — a modern tool for appointments, clients, and team management.',
  keywords: ['schedule', 'appointments', 'calendar', 'management', 'SaaS'],
  authors: [{ name: 'Kaiky Tupinambá', url: 'https://github.com/kaikyMoura' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'SchedulePro - Smart Scheduling for Teams & Clients',
    description: 'All-in-one platform to manage appointments, clients, and your calendar with ease.',
    url: 'https://schedulepro.app',
    siteName: 'SchedulePro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#161616',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}