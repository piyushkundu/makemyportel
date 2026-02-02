import Link from 'next/link';
import servicesData from '@/data/services.json';

export default function PricingPage() {
    const { services, categories } = servicesData;
    const enabledServices = services.filter(s => s.enabled);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="section">
                <div className="container text-center">
                    <h1>Transparent <span className="text-gradient">Pricing</span></h1>
                    <p style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0', fontSize: '1.125rem' }}>
                        Clear, upfront pricing in Indian Rupees (₹ INR). No hidden costs, no surprises.
                    </p>
                </div>
            </section>

            {/* Pricing Tables by Category */}
            {categories.map(category => {
                const categoryServices = enabledServices.filter(s => s.category === category.id);
                if (categoryServices.length === 0) return null;

                return (
                    <section key={category.id} className="section" style={{ background: category.id === 'hosting' ? 'var(--bg-secondary)' : undefined }}>
                        <div className="container">
                            <h2 id={category.id} style={{ marginBottom: 'var(--space-lg)' }}>
                                {category.icon} {category.name}
                            </h2>
                            <p style={{ marginBottom: 'var(--space-xl)' }}>{category.description}</p>

                            <div className="table-container glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Description</th>
                                            <th>Starting Price</th>
                                            <th>Max Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryServices.map(service => (
                                            <tr key={service.id}>
                                                <td>
                                                    <strong>{service.name}</strong>
                                                    {service.featured && <span className="badge badge-primary" style={{ marginLeft: 'var(--space-sm)' }}>Popular</span>}
                                                </td>
                                                <td style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>{service.description}</td>
                                                <td>
                                                    {service.discountPrice ? (
                                                        <>
                                                            <span style={{ textDecoration: 'line-through', color: 'var(--text-tertiary)' }}>₹{formatPrice(service.priceMin)}</span>
                                                            <br />
                                                            <span style={{ color: 'var(--success)', fontWeight: 600 }}>₹{formatPrice(service.discountPrice)}</span>
                                                        </>
                                                    ) : (
                                                        <span style={{ fontWeight: 600 }}>₹{formatPrice(service.priceMin)}</span>
                                                    )}
                                                    {service.perPage && <span style={{ color: 'var(--text-tertiary)' }}> /page</span>}
                                                </td>
                                                <td>
                                                    <span style={{ fontWeight: 600 }}>₹{formatPrice(service.priceMax)}</span>
                                                    {service.perPage && <span style={{ color: 'var(--text-tertiary)' }}> /page</span>}
                                                </td>
                                                <td>
                                                    <Link href={`/contact?service=${service.id}`} className="btn btn-primary btn-sm">
                                                        Get Quote
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {category.id === 'hosting' && (
                                <div className="disclaimer warning" style={{ marginTop: 'var(--space-lg)' }}>
                                    ⚠️ <strong>Note:</strong> Hosting charges are optional and depend on third-party providers.
                                    We do not own a hosting platform. Hosting is an optional paid add-on, provided only if you request it.
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}

            {/* FAQ Section */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        Pricing <span className="text-gradient">FAQ</span>
                    </h2>

                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { q: 'Are these fixed prices?', a: 'These are starting prices. Final pricing depends on your specific requirements, complexity, and timeline.' },
                            { q: 'Do you offer discounts?', a: 'Yes! We offer discounts for bulk orders, long-term partnerships, and referrals. Contact us for special pricing.' },
                            { q: 'Is hosting included?', a: 'No, hosting is an optional add-on. You can self-host or use our hosting assistance service.' },
                            { q: 'What payment methods do you accept?', a: 'We accept UPI, bank transfers, and all major payment methods available in India.' },
                        ].map((faq, i) => (
                            <div key={i} className="glass-card">
                                <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--primary)' }}>{faq.q}</h4>
                                <p style={{ fontSize: '0.875rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>Need a Custom Quote?</h2>
                    <p style={{ maxWidth: '500px', margin: '0 auto var(--space-xl)' }}>
                        Every project is unique. Contact us for a personalized quote tailored to your specific needs.
                    </p>
                    <div className="flex gap-md justify-center">
                        <Link href="/contact?type=quote" className="btn btn-primary btn-lg">
                            Get Custom Price
                        </Link>
                        <Link href="/contact?type=expert" className="btn btn-outline btn-lg">
                            Talk to Expert
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
