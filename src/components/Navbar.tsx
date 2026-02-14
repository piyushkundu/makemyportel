'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
    Home,
    Briefcase,
    DollarSign,
    Globe,
    Cpu,
    Info,
    Mail,
    X,
    Menu,
    Sparkles,
    LogIn,
    UserPlus,
    User,
    Package,
    Settings,
    LogOut,
    ChevronDown,
} from 'lucide-react';

const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/services', label: 'Services', icon: Briefcase },
    { href: '/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/website-builder', label: 'Website Builder', icon: Globe },
    { href: '/tools', label: 'Tools & AI', icon: Cpu },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, loading, logout } = useAuth();
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close profile dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = async () => {
        setIsProfileOpen(false);
        await logout();
    };

    const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
    const userAvatar = user?.photoURL;

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-purple-100/50'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-800">
                                MakeMy<span className="text-purple-600">Portal</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:text-white hover:bg-purple-600 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Area & Mobile Menu */}
                        <div className="flex items-center gap-3">
                            {/* Desktop Auth Controls */}
                            {!loading && (
                                <div className="hidden md:flex items-center gap-2">
                                    {user ? (
                                        /* Logged In — User Profile Dropdown */
                                        <div className="relative" ref={profileRef}>
                                            <button
                                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all duration-200"
                                            >
                                                {userAvatar ? (
                                                    <img
                                                        src={userAvatar}
                                                        alt={userName}
                                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                                        {userName.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                                <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                                                    {userName}
                                                </span>
                                                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Profile Dropdown */}
                                            {isProfileOpen && (
                                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-purple-500/10 border border-slate-100 overflow-hidden z-[60]"
                                                    style={{ animation: 'navDropdownIn 0.2s ease-out' }}
                                                >
                                                    {/* User Info Header */}
                                                    <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                                                        <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                                    </div>

                                                    {/* Menu Items */}
                                                    <div className="py-1.5">
                                                        <Link
                                                            href="/dashboard"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <User size={16} className="text-purple-500" />
                                                            My Profile
                                                        </Link>
                                                        <Link
                                                            href="/dashboard"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <Package size={16} className="text-purple-500" />
                                                            My Orders
                                                        </Link>
                                                        <Link
                                                            href="/dashboard"
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                            onClick={() => setIsProfileOpen(false)}
                                                        >
                                                            <Settings size={16} className="text-purple-500" />
                                                            Edit Profile
                                                        </Link>
                                                    </div>

                                                    {/* Logout */}
                                                    <div className="border-t border-slate-100 py-1.5">
                                                        <button
                                                            onClick={handleLogout}
                                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
                                                        >
                                                            <LogOut size={16} />
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        /* Not Logged In — Login / Sign Up */
                                        <>
                                            <Link
                                                href="/login"
                                                className="inline-flex items-center gap-2 px-4 py-2.5 text-slate-700 font-semibold rounded-xl hover:text-white hover:bg-purple-600 transition-all duration-200"
                                            >
                                                <LogIn className="w-4 h-4" />
                                                Login
                                            </Link>
                                            <Link
                                                href="/login"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
                                            >
                                                <UserPlus className="w-4 h-4" />
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}

                            <button
                                className="lg:hidden p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-800">
                            MakeMy<span className="text-purple-600">Portal</span>
                        </span>
                    </Link>
                    <button
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Mobile User Info (if logged in) */}
                {user && (
                    <div className="px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100/50">
                        <div className="flex items-center gap-3">
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                <nav className="p-4">
                    <ul className="space-y-1">
                        {navLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 px-4 py-3 text-slate-600 font-medium rounded-xl hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                                        onClick={closeMenu}
                                    >
                                        <IconComponent size={20} className="text-purple-500" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-6 pt-6 border-t border-slate-100">
                        {user ? (
                            /* Mobile — Logged In Options */
                            <div className="space-y-1">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-4 py-3 text-slate-600 font-medium rounded-xl hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                                    onClick={closeMenu}
                                >
                                    <User size={20} className="text-purple-500" />
                                    My Profile
                                </Link>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-3 px-4 py-3 text-slate-600 font-medium rounded-xl hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                                    onClick={closeMenu}
                                >
                                    <Package size={20} className="text-purple-500" />
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => { handleLogout(); closeMenu(); }}
                                    className="flex items-center gap-3 px-4 py-3 text-red-500 font-medium rounded-xl hover:bg-red-50 w-full transition-all duration-200"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            /* Mobile — Not Logged In */
                            <div className="space-y-2">
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center gap-2 w-full px-5 py-3 text-purple-600 font-semibold rounded-xl border-2 border-purple-200 hover:bg-purple-50 transition-all"
                                    onClick={closeMenu}
                                >
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30"
                                    onClick={closeMenu}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {/* Dropdown Animation */}
            <style jsx global>{`
                @keyframes navDropdownIn {
                    from {
                        opacity: 0;
                        transform: translateY(-8px) scale(0.96);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </>
    );
}
