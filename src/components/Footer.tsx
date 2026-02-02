import Link from 'next/link';

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
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <div className="footer-logo">
                            MakeMy<span>Portal</span>
                        </div>
                        <p className="footer-description">
                            Your one-stop digital service portal for websites, bots, branding, videos, and more.
                            We turn your ideas into reality.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-title">Services</h4>
                        <ul className="footer-links">
                            {footerLinks.services.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Company</h4>
                        <ul className="footer-links">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-title">Legal</h4>
                        <ul className="footer-links">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} MakeMyPortal. All rights reserved.
                    </p>
                    <p className="footer-copyright">
                        Made with ❤️ in India
                    </p>
                </div>
            </div>
        </footer>
    );
}
