'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
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
    User as UserIcon,
    Lock,
    Loader2,
    Pencil
} from 'lucide-react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/orders', label: 'Orders', icon: Package },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

// Admin Login Component (inline — no signup, no forgot password)
function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Login failed';
            if (msg.includes('invalid-credential') || msg.includes('wrong-password') || msg.includes('user-not-found')) {
                setError('Invalid email or password');
            } else if (msg.includes('too-many-requests')) {
                setError('Too many attempts. Try again later.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <div className="admin-login-logo">
                        <Lock size={28} />
                    </div>
                    <h1 className="admin-login-title">Admin Panel</h1>
                    <p className="admin-login-subtitle">Sign in to access dashboard</p>
                </div>

                {error && (
                    <div className="admin-login-error" style={{ marginBottom: '1rem' }}>
                        {error}
                    </div>
                )}

                <form className="admin-login-form" onSubmit={handleLogin}>
                    <div className="admin-login-field">
                        <label className="admin-login-label">Email</label>
                        <input
                            type="email"
                            className="admin-login-input"
                            placeholder="admin@makemyportal.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="admin-login-field">
                        <label className="admin-login-label">Password</label>
                        <input
                            type="password"
                            className="admin-login-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Loading screen
function AdminLoading() {
    return (
        <div className="admin-login-page">
            <div style={{ textAlign: 'center' }}>
                <Loader2 size={40} style={{ animation: 'spin 1s linear infinite', color: '#673de6' }} />
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading...</p>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setDropdownOpen(false);
    };

    // Show loading while checking auth
    if (authLoading) {
        return <AdminLoading />;
    }

    // Show login if not authenticated
    if (!user) {
        return <AdminLogin />;
    }

    const displayName = user.displayName || user.email?.split('@')[0] || 'Admin';
    const initials = displayName.charAt(0).toUpperCase();

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
                    <Link href="/?editMode=true" target="_blank" className="admin-nav-link" style={{ color: '#ef4444' }}>
                        <span className="admin-nav-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', color: 'white' }}><Pencil size={20} /></span>
                        <span className="admin-nav-text" style={{ fontWeight: 700 }}>Live Edit</span>
                    </Link>
                    <Link href="/" className="admin-nav-link">
                        <span className="admin-nav-icon"><Globe size={20} /></span>
                        <span className="admin-nav-text">View Website</span>
                    </Link>
                    <button className="admin-nav-link admin-logout" onClick={handleLogout}>
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
                        </button>

                        {/* User Menu */}
                        <div className="admin-user-menu">
                            <button
                                className="admin-user-btn"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="admin-user-avatar">{initials}</div>
                                <div className="admin-user-info">
                                    <div className="admin-user-name">{displayName}</div>
                                    <div className="admin-user-role">Admin</div>
                                </div>
                                <span className="admin-user-arrow">
                                    <ChevronDown size={16} />
                                </span>
                            </button>

                            {dropdownOpen && (
                                <div className="admin-dropdown">
                                    <Link href="/admin/settings" className="admin-dropdown-item" onClick={() => setDropdownOpen(false)}>
                                        <Settings size={16} /> Settings
                                    </Link>
                                    <hr className="admin-dropdown-divider" />
                                    <button className="admin-dropdown-item admin-dropdown-logout" onClick={handleLogout}>
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
