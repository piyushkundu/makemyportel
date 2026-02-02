'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';
import {
    LayoutDashboard,
    Wrench,
    Package,
    Users,
    MessageSquare,
    Settings,
    Globe,
    LogOut,
    Search,
    Bell,
    ChevronDown,
    Menu,
    X,
    Rocket,
    User
} from 'lucide-react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/orders', label: 'Orders', icon: Package },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
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
                        <span className="admin-logo-icon">
                            <Rocket size={24} />
                        </span>
                        <div>
                            <div className="admin-logo-text">MakeMyPortal</div>
                            <div className="admin-logo-sub">Admin Panel</div>
                        </div>
                    </Link>
                    <button
                        className="admin-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Main Menu</div>
                        <ul className="admin-nav-list">
                            {sidebarLinks.slice(0, 4).map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`admin-nav-link ${pathname === link.href ? 'active' : ''}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="admin-nav-icon">
                                                <IconComponent size={20} />
                                            </span>
                                            <span className="admin-nav-text">{link.label}</span>
                                            {pathname === link.href && <span className="admin-nav-indicator" />}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Settings</div>
                        <ul className="admin-nav-list">
                            {sidebarLinks.slice(4).map((link) => {
                                const IconComponent = link.icon;
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`admin-nav-link ${pathname === link.href ? 'active' : ''}`}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="admin-nav-icon">
                                                <IconComponent size={20} />
                                            </span>
                                            <span className="admin-nav-text">{link.label}</span>
                                            {pathname === link.href && <span className="admin-nav-indicator" />}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <Link href="/" className="admin-nav-link">
                        <span className="admin-nav-icon"><Globe size={20} /></span>
                        <span className="admin-nav-text">View Website</span>
                    </Link>
                    <button className="admin-nav-link admin-logout">
                        <span className="admin-nav-icon"><LogOut size={20} /></span>
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
                            <Menu size={24} />
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
                            <span className="admin-search-icon"><Search size={18} /></span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="admin-search-input"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="admin-icon-btn admin-notification">
                            <Bell size={20} />
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
                                <span className="admin-user-arrow">
                                    <ChevronDown size={16} />
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="admin-dropdown">
                                    <Link href="/admin/settings" className="admin-dropdown-item">
                                        <Settings size={16} /> Settings
                                    </Link>
                                    <Link href="/admin/profile" className="admin-dropdown-item">
                                        <User size={16} /> Profile
                                    </Link>
                                    <hr className="admin-dropdown-divider" />
                                    <button className="admin-dropdown-item admin-dropdown-logout">
                                        <LogOut size={16} /> Logout
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
