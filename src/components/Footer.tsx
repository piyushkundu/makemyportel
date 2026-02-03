import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const footerLinks = {
    services: [
        { href: '/services#websites', label: 'Website Development' },
        { href: '/services#bots', label: 'Bots & Automation' },
        { href: '/services#design', label: 'Design & Branding' },
        { href: '/services#video', label: 'Video & Media' },
    ],
    company: [
        { href: '/about', label: 'About Us' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/contact', label: 'Contact' },
        { href: '/dashboard', label: 'Client Dashboard' },
    ],
    legal: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/refund', label: 'Refund Policy' },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">
                                MakeMy<span className="text-purple-400">Portal</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                            Your one-stop digital service portal for websites, bots, branding, videos, and more.
                            We turn your ideas into reality with premium quality.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <a href="mailto:hello@makemyportal.in" className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors">
                                <Mail className="w-5 h-5" />
                                hello@makemyportal.in
                            </a>
                            <a href="tel:+919876543210" className="flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors">
                                <Phone className="w-5 h-5" />
                                +91 98765 43210
                            </a>
                            <div className="flex items-center gap-3 text-slate-400">
                                <MapPin className="w-5 h-5" />
                                India
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-5">Services</h4>
                        <ul className="space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-5">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} MakeMyPortal. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                        Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
