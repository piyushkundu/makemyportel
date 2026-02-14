'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import AdminEditBar from './AdminEditBar';
import { ThemeProvider } from './ThemeProvider';
import { EditModeProvider } from '@/context/EditModeContext';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');
    const isLoginRoute = pathname?.startsWith('/login');

    // For admin routes, just return children (admin has its own layout)
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For login route, render without navbar/footer for clean experience
    if (isLoginRoute) {
        return <>{children}</>;
    }

    // For other routes, use main website layout with navbar, footer, and edit mode support
    return (
        <ThemeProvider>
            <EditModeProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <AdminEditBar />
            </EditModeProvider>
        </ThemeProvider>
    );
}
