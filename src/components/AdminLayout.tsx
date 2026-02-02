'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/clients', label: 'Clients', icon: '👥' },
    { href: '/admin/inquiries', label: 'Inquiries', icon: '💬' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="admin-layout">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`admin-sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <Link href="/admin" className="admin-logo">
                        <span className="admin-logo-icon">🚀</span>
                        <div>
                            <div className="admin-logo-text">MakeMyPortal</div>
                            <div className="admin-logo-sub">Admin Panel</div>
                        </div>
                    </Link>
                    <button
                        className="admin-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Main Menu</div>
                        <ul className="admin-nav-list">
                            {sidebarLinks.slice(0, 4).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`admin-nav-link ${pathname === link.href ? 'active' : ''}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="admin-nav-icon">{link.icon}</span>
                                        <span className="admin-nav-text">{link.label}</span>
                                        {pathname === link.href && <span className="admin-nav-indicator" />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Settings</div>
                        <ul className="admin-nav-list">
                            {sidebarLinks.slice(4).map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`admin-nav-link ${pathname === link.href ? 'active' : ''}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="admin-nav-icon">{link.icon}</span>
                                        <span className="admin-nav-text">{link.label}</span>
                                        {pathname === link.href && <span className="admin-nav-indicator" />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <Link href="/" className="admin-nav-link">
                        <span className="admin-nav-icon">🌐</span>
                        <span className="admin-nav-text">View Website</span>
                    </Link>
                    <button className="admin-nav-link admin-logout">
                        <span className="admin-nav-icon">🚪</span>
                        <span className="admin-nav-text">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                {/* Top Header */}
                <header className="admin-header">
                    <div className="admin-header-left">
                        <button
                            className="admin-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>
                        <div className="admin-breadcrumb">
                            <span>Admin</span>
                            <span className="admin-breadcrumb-sep">/</span>
                            <span className="admin-breadcrumb-current">
                                {sidebarLinks.find(l => l.href === pathname)?.label || 'Dashboard'}
                            </span>
                        </div>
                    </div>

                    <div className="admin-header-right">
                        {/* Search */}
                        <div className="admin-search">
                            <span className="admin-search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="admin-search-input"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="admin-icon-btn admin-notification">
                            🔔
                            <span className="admin-notification-badge">3</span>
                        </button>

                        {/* User Menu */}
                        <div className="admin-user-menu">
                            <button
                                className="admin-user-btn"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="admin-user-avatar">A</div>
                                <div className="admin-user-info">
                                    <div className="admin-user-name">Admin User</div>
                                    <div className="admin-user-role">Super Admin</div>
                                </div>
                                <span className="admin-user-arrow">▼</span>
                            </button>

                            {dropdownOpen && (
                                <div className="admin-dropdown">
                                    <Link href="/admin/settings" className="admin-dropdown-item">
                                        <span>⚙️</span> Settings
                                    </Link>
                                    <Link href="/admin/profile" className="admin-dropdown-item">
                                        <span>👤</span> Profile
                                    </Link>
                                    <hr className="admin-dropdown-divider" />
                                    <button className="admin-dropdown-item admin-dropdown-logout">
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
}
