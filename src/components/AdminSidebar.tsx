'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/clients', label: 'Clients', icon: '👥' },
    { href: '/admin/inquiries', label: 'Inquiries', icon: '💬' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminSidebar({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="navbar-logo" style={{ marginBottom: 'var(--space-xl)' }}>
                    MakeMy<span>Portal</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-lg)' }}>
                    ADMIN PANEL
                </div>
                <nav>
                    <ul className="sidebar-nav">
                        {sidebarLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div style={{ marginTop: 'auto', paddingTop: 'var(--space-xl)' }}>
                    <Link href="/" className="sidebar-link">
                        <span>🏠</span>
                        <span>Back to Website</span>
                    </Link>
                </div>
            </aside>
            <main className="dashboard-main">
                {children}
            </main>
        </div>
    );
}
