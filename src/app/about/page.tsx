import Link from 'next/link';

export default function AboutPage() {
    const team = [
        { name: 'Digital Experts', role: 'Website Development', icon: '💻' },
        { name: 'Creative Designers', role: 'Design & Branding', icon: '🎨' },
        { name: 'Automation Specialists', role: 'Bots & Tools', icon: '🤖' },
        { name: 'Video Creators', role: 'Video & Media', icon: '🎥' },
    ];

    const values = [
        { icon: '🎯', title: 'Quality First', desc: 'We never compromise on quality. Every project is delivered with excellence.' },
        { icon: '💡', title: 'Innovation', desc: 'We stay updated with the latest technologies to deliver modern solutions.' },
        { icon: '🤝', title: 'Transparency', desc: 'Clear communication and honest pricing. No hidden costs ever.' },
        { icon: '⚡', title: 'Speed', desc: 'Fast turnaround without compromising on quality or attention to detail.' },
    ];

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="hero" style={{ minHeight: '60vh' }}>
                <div className="hero-bg"></div>
                <div className="container hero-content text-center">
                    <h1>About <span className="text-gradient">MakeMyPortal</span></h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: 'var(--space-lg) auto 0' }}>
                        We are a team of passionate digital experts dedicated to helping businesses
                        and individuals establish their online presence. From websites to automation,
                        we bring your digital vision to life.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-3xl)', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ marginBottom: 'var(--space-lg)' }}>Our <span className="text-gradient">Mission</span></h2>
                            <p style={{ marginBottom: 'var(--space-md)', fontSize: '1.125rem' }}>
                                To democratize digital services by providing premium quality solutions
                                at transparent and affordable prices.
                            </p>
                            <p style={{ marginBottom: 'var(--space-lg)' }}>
                                We believe every business deserves a strong online presence. Whether you&apos;re
                                a startup, small business, or established enterprise, we have solutions
                                tailored to your needs and budget.
                            </p>
                            <div className="disclaimer">
                                🇮🇳 <strong>Made in India, for India</strong> — All our pricing is in Indian Rupees (₹ INR)
                                with no hidden costs.
                            </div>
                        </div>
                        <div className="glass-card text-center" style={{ padding: 'var(--space-3xl)' }}>
                            <div style={{ fontSize: '6rem', marginBottom: 'var(--space-lg)' }}>🚀</div>
                            <h3 style={{ marginBottom: 'var(--space-sm)' }}>500+</h3>
                            <p>Projects Delivered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                        Our <span className="text-gradient">Values</span>
                    </h2>

                    <div className="grid grid-cols-4" style={{ gap: 'var(--space-lg)' }}>
                        {values.map((value, i) => (
                            <div key={i} className="glass-card text-center">
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{value.icon}</div>
                                <h4 style={{ marginBottom: 'var(--space-sm)' }}>{value.title}</h4>
                                <p style={{ fontSize: '0.875rem' }}>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                        Our <span className="text-gradient">Expertise</span>
                    </h2>

                    <div className="grid grid-cols-4" style={{ gap: 'var(--space-lg)' }}>
                        {team.map((member, i) => (
                            <div key={i} className="glass-card text-center">
                                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>{member.icon}</div>
                                <h4 style={{ marginBottom: 'var(--space-xs)' }}>{member.name}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-4" style={{ gap: 'var(--space-lg)', textAlign: 'center' }}>
                        {[
                            { number: '500+', label: 'Happy Clients' },
                            { number: '1000+', label: 'Projects Completed' },
                            { number: '32+', label: 'Services Offered' },
                            { number: '24/7', label: 'Support Available' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)' }}>{stat.number}</div>
                                <p style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>
                <div className="container text-center">
                    <h2 style={{ color: 'white', marginBottom: 'var(--space-lg)' }}>Ready to Work With Us?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '500px', margin: '0 auto var(--space-xl)' }}>
                        Let&apos;s discuss your project and see how we can help you achieve your digital goals.
                    </p>
                    <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>
                        Get In Touch
                    </Link>
                </div>
            </section>
        </div>
    );
}
