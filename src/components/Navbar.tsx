'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    Sparkles
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

    const closeMenu = () => setIsMenuOpen(false);

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
                                        className="px-4 py-2 text-slate-600 font-medium rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/contact"
                                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Mail className="w-4 h-4" />
                                Get Quote
                            </Link>

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
                        <Link
                            href="/contact"
                            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30"
                            onClick={closeMenu}
                        >
                            <Mail className="w-4 h-4" />
                            Get Custom Quote
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
