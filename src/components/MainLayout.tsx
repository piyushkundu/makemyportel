'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from './ThemeProvider';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    // For admin routes, just return children (admin has its own layout)
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For other routes, use main website layout with navbar and footer
    return (
        <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </ThemeProvider>
    );
}
