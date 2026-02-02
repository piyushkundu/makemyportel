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
    Menu
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
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <Link href="/" className="navbar-logo">
                        MakeMy<span>Portal</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="navbar-nav desktop-nav">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="navbar-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="navbar-actions">
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <Link href="/" className="navbar-logo" onClick={closeMenu}>
                        MakeMy<span>Portal</span>
                    </Link>
                    <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <ul className="mobile-menu-nav">
                    {navLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                            <li key={link.href}>
                                <Link href={link.href} className="mobile-menu-link" onClick={closeMenu}>
                                    <IconComponent size={20} />
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
