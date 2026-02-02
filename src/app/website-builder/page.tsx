import Link from 'next/link';

export default function WebsiteBuilderPage() {
    const features = [
        { icon: '🎨', title: 'Drag & Drop Builder', desc: 'Easy-to-use visual editor for building pages' },
        { icon: '📱', title: 'Mobile Responsive', desc: 'Websites that look great on all devices' },
        { icon: '⚡', title: 'Fast Loading', desc: 'Optimized for speed and performance' },
        { icon: '🔒', title: 'Secure & Reliable', desc: 'SSL certificates and secure hosting' },
        { icon: '🎯', title: 'SEO Optimized', desc: 'Built-in SEO tools for better rankings' },
        { icon: '💼', title: 'Business Ready', desc: 'E-commerce, booking, and more integrations' },
    ];

    const templates = [
        { name: 'Business Pro', image: '🏢', category: 'Business' },
        { name: 'Creative Portfolio', image: '🎨', category: 'Portfolio' },
        { name: 'Online Store', image: '🛒', category: 'E-commerce' },
        { name: 'Education Hub', image: '📚', category: 'Education' },
        { name: 'Restaurant', image: '🍽️', category: 'Food & Drink' },
        { name: 'Agency', image: '🚀', category: 'Marketing' },
    ];

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="hero" style={{ minHeight: '70vh' }}>
                <div className="hero-bg"></div>
                <div className="container hero-content text-center">
                    <h1>Build Your Dream <span className="text-gradient">Website</span></h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: 'var(--space-lg) auto var(--space-2xl)' }}>
                        Create stunning websites without writing code. Our website builder makes it easy
                        to launch your online presence in minutes.
                    </p>
                    <div className="flex gap-md justify-center">
                        <Link href="/contact?service=website-builder-setup" className="btn btn-primary btn-lg">
                            Get Started - ₹4,999
                        </Link>
                        <Link href="/services#websites" className="btn btn-outline btn-lg">
                            View All Options
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                        Powerful <span className="text-gradient">Features</span>
                    </h2>

                    <div className="grid grid-cols-3" style={{ gap: 'var(--space-lg)' }}>
                        {features.map((feature, i) => (
                            <div key={i} className="glass-card text-center">
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{feature.icon}</div>
                                <h4 style={{ marginBottom: 'var(--space-sm)' }}>{feature.title}</h4>
                                <p style={{ fontSize: '0.875rem' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Templates */}
            <section className="section">
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-md)' }}>
                        Beautiful <span className="text-gradient">Templates</span>
                    </h2>
                    <p className="text-center" style={{ marginBottom: 'var(--space-3xl)', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Start with professionally designed templates and customize to match your brand.
                    </p>

                    <div className="grid grid-cols-3" style={{ gap: 'var(--space-lg)' }}>
                        {templates.map((template, i) => (
                            <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
                                <div style={{
                                    height: '150px',
                                    background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '4rem',
                                    marginBottom: 'var(--space-lg)'
                                }}>
                                    {template.image}
                                </div>
                                <span className="badge badge-primary" style={{ marginBottom: 'var(--space-sm)' }}>{template.category}</span>
                                <h4>{template.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                        Website Builder <span className="text-gradient">Packages</span>
                    </h2>

                    <div className="grid grid-cols-3" style={{ gap: 'var(--space-xl)', maxWidth: '1000px', margin: '0 auto' }}>
                        {[
                            { name: 'Starter', price: '4,999', features: ['Website Builder Setup', '5 Pages', 'Mobile Responsive', 'Basic SEO', 'Email Support'] },
                            { name: 'Professional', price: '9,999', featured: true, features: ['Everything in Starter', '15 Pages', 'Custom Domain', 'Advanced SEO', 'Priority Support', 'Analytics'] },
                            { name: 'Enterprise', price: '19,999', features: ['Everything in Professional', 'Unlimited Pages', 'E-commerce Ready', 'Custom Integrations', 'Dedicated Support', 'Training Session'] },
                        ].map((plan, i) => (
                            <div key={i} className={`price-card ${plan.featured ? 'featured' : ''}`}>
                                {plan.featured && <span className="price-card-badge">Best Value</span>}
                                <h3 style={{ marginBottom: 'var(--space-md)' }}>{plan.name}</h3>
                                <div className="price-card-price" style={{ marginBottom: 'var(--space-lg)' }}>
                                    <span className="price-card-currency">₹</span>
                                    <span className="price-card-amount">{plan.price}</span>
                                </div>
                                <ul style={{ listStyle: 'none', marginBottom: 'var(--space-xl)' }}>
                                    {plan.features.map((f, j) => (
                                        <li key={j} style={{ padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--bg-glass-border)' }}>
                                            ✓ {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={`/contact?service=website-builder&plan=${plan.name.toLowerCase()}`} className="btn btn-primary" style={{ width: '100%' }}>
                                    Get Started
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>Ready to Build Your Website?</h2>
                    <p style={{ maxWidth: '500px', margin: '0 auto var(--space-xl)' }}>
                        Let us help you create a stunning website that converts visitors into customers.
                    </p>
                    <Link href="/contact" className="btn btn-primary btn-lg">
                        Start Your Project
                    </Link>
                </div>
            </section>
        </div>
    );
}
