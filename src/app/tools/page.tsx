import Link from 'next/link';

export default function ToolsPage() {
    const tools = [
        {
            icon: '🤖',
            name: 'AI Chatbot',
            description: 'Intelligent AI-powered conversational bot for your website or app',
            price: '₹4,999 – ₹19,999',
            features: ['Natural Language Processing', 'Multi-language Support', 'Custom Training', '24/7 Availability'],
        },
        {
            icon: '💬',
            name: 'WhatsApp Bot',
            description: 'Automated WhatsApp messaging for customer support and engagement',
            price: '₹2,999 – ₹9,999',
            features: ['Auto Replies', 'Broadcast Messages', 'Order Tracking', 'FAQ Automation'],
        },
        {
            icon: '📱',
            name: 'Telegram Bot',
            description: 'Custom Telegram bot for your community or business',
            price: '₹1,999 – ₹6,999',
            features: ['Group Management', 'Content Delivery', 'User Analytics', 'Custom Commands'],
        },
        {
            icon: '⚙️',
            name: 'Automation Workflow',
            description: 'Custom automation workflows using API integrations and n8n',
            price: '₹3,999 – ₹14,999',
            features: ['API Integration', 'Workflow Automation', 'Data Sync', 'Custom Triggers'],
        },
        {
            icon: '📅',
            name: 'Appointment Booking',
            description: 'Online booking system for appointments and reservations',
            price: '₹2,999 – ₹7,999',
            features: ['Calendar Integration', 'Email Reminders', 'Multiple Services', 'Staff Management'],
        },
        {
            icon: '📝',
            name: 'Form Builder',
            description: 'Custom forms with backend data collection and processing',
            price: '₹1,999 – ₹5,999',
            features: ['Drag & Drop Builder', 'Data Validation', 'Email Notifications', 'Export to Excel'],
        },
    ];

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="hero" style={{ minHeight: '60vh' }}>
                <div className="hero-bg"></div>
                <div className="container hero-content text-center">
                    <h1>Tools & <span className="text-gradient">AI Solutions</span></h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: 'var(--space-lg) auto var(--space-2xl)' }}>
                        Automate your business with intelligent bots, custom tools, and AI-powered solutions.
                        Save time and increase efficiency.
                    </p>
                    <div className="flex gap-md justify-center">
                        <Link href="#tools" className="btn btn-primary btn-lg">
                            Explore Tools
                        </Link>
                        <Link href="/contact?type=automation" className="btn btn-outline btn-lg">
                            Custom Solution
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tools Grid */}
            <section id="tools" className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-xl)' }}>
                        {tools.map((tool, i) => (
                            <div key={i} className="glass-card">
                                <div className="flex items-start gap-lg">
                                    <div className="price-card-icon" style={{ flexShrink: 0 }}>
                                        {tool.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ marginBottom: 'var(--space-sm)' }}>{tool.name}</h3>
                                        <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-md)' }}>{tool.description}</p>
                                        <div style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            color: 'var(--primary)',
                                            marginBottom: 'var(--space-md)'
                                        }}>
                                            {tool.price}
                                        </div>
                                        <ul style={{ listStyle: 'none', marginBottom: 'var(--space-lg)' }}>
                                            {tool.features.map((f, j) => (
                                                <li key={j} style={{
                                                    padding: 'var(--space-xs) 0',
                                                    fontSize: '0.875rem',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                    ✓ {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href={`/contact?tool=${tool.name.toLowerCase().replace(/\s/g, '-')}`} className="btn btn-primary btn-sm">
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Partners */}
            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: 'var(--space-md)' }}>Integrations & <span className="text-gradient">Platforms</span></h2>
                    <p style={{ marginBottom: 'var(--space-2xl)', maxWidth: '500px', margin: '0 auto var(--space-2xl)' }}>
                        We work with leading platforms and APIs to build powerful integrations.
                    </p>

                    <div className="flex justify-center gap-xl" style={{ flexWrap: 'wrap' }}>
                        {['WhatsApp', 'Telegram', 'Firebase', 'n8n', 'Zapier', 'OpenAI', 'Razorpay', 'Google APIs'].map((platform, i) => (
                            <div key={i} className="glass-card" style={{ padding: 'var(--space-lg) var(--space-xl)' }}>
                                <span style={{ fontWeight: 600 }}>{platform}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
                        How It <span className="text-gradient">Works</span>
                    </h2>

                    <div className="grid grid-cols-4" style={{ gap: 'var(--space-lg)' }}>
                        {[
                            { step: '01', title: 'Discuss', desc: 'Share your requirements and goals with us' },
                            { step: '02', title: 'Plan', desc: 'We create a detailed plan and timeline' },
                            { step: '03', title: 'Build', desc: 'Our experts build your custom solution' },
                            { step: '04', title: 'Deploy', desc: 'We deploy, test, and hand over the solution' },
                        ].map((item, i) => (
                            <div key={i} className="glass-card text-center">
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: 800,
                                    color: 'var(--primary)',
                                    marginBottom: 'var(--space-md)'
                                }}>
                                    {item.step}
                                </div>
                                <h4 style={{ marginBottom: 'var(--space-sm)' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.875rem' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>Need a Custom Tool?</h2>
                    <p style={{ maxWidth: '500px', margin: '0 auto var(--space-xl)' }}>
                        Don&apos;t see what you&apos;re looking for? We build custom tools and solutions tailored to your specific needs.
                    </p>
                    <Link href="/contact?type=custom-tool" className="btn btn-primary btn-lg">
                        Request Custom Tool
                    </Link>
                </div>
            </section>
        </div>
    );
}
