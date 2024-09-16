"use client"
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from './ConvexClientProvider'
import { cn } from '@/lib/utils'
// import { SidebarDemo } from '@/components/SidebarDemo'
import 'regenerator-runtime/runtime';
import { LoaderProvider } from './LoaderContext'

import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import JOS from 'jos-animation';
import 'swiper/css';
import 'swiper/css/navigation';
import './globals.css';
import '@/styles/vendors/menu.css';
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
 })
// const DMSans = localFont({
//     src: '../fonts/DMSans-Bold.woff2',
//     variable: '--font-DMSans',
// });

// const ClashDisplay = localFont({
//     src: '../fonts/ClashDisplay-Medium.woff2',
//     variable: '--font-clash-display',
// });

// const Raleway = localFont({
//     src: '../fonts/Raleway-Bold.woff2',
//     variable: '--font-raleway',
// });

// const SpaceGrotesk = localFont({
//     src: '../fonts/SpaceGrotesk-Bold.woff2',
//     variable: '--font-space-grotesk',
// });

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata = {
//     title: 'Axiom',
//     description: 'An example of using Convex with Clerk in a Next.js App Router application',
// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname();


    const jos_options = {
        passive: false,
        once: true,
        animation: 'fade-up',
        timingFunction: 'ease',
        threshold: 0,
        delay: 0.5,
        duration: 0.7,
        scrollDirection: 'down',
        rootMargin: '0% 0% 15% 0%',
    };

    useEffect(() => {
        JOS.init(jos_options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        JOS.refresh();
    }, [pathname]);

    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    // className={` min-h-screen bg-background font-sans antialiased`}
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable
                    )}
                >
                    <ConvexClientProvider>
                        <LoaderProvider>
                            {children}
                        </LoaderProvider>
                    </ConvexClientProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}