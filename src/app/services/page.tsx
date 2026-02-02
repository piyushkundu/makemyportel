'use client';

import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import servicesData from '@/data/services.json';

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const { services, categories } = servicesData;

    const filteredServices = activeCategory === 'all'
        ? services.filter(s => s.enabled)
        : services.filter(s => s.category === activeCategory && s.enabled);

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="section">
                <div className="container text-center">
                    <h1>Our <span className="text-gradient">Services</span></h1>
                    <p style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0', fontSize: '1.125rem' }}>
                        Explore our comprehensive range of digital services.
                        All prices are in Indian Rupees (₹ INR) and represent starting prices.
                    </p>
                </div>
            </section>

            {/* Category Tabs */}
            <section style={{ background: 'var(--bg-secondary)', padding: 'var(--space-lg) 0' }}>
                <div className="container">
                    <div className="tabs" style={{ justifyContent: 'center' }}>
                        <button
                            className={`tab ${activeCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('all')}
                        >
                            All Services
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    {activeCategory !== 'all' && (
                        <div style={{ marginBottom: 'var(--space-2xl)' }}>
                            <h2 id={activeCategory}>
                                {categories.find(c => c.id === activeCategory)?.icon}{' '}
                                {categories.find(c => c.id === activeCategory)?.name}
                            </h2>
                            <p>{categories.find(c => c.id === activeCategory)?.description}</p>
                        </div>
                    )}

                    <div className="price-grid">
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                {...service}
                                icon={categories.find(c => c.id === service.category)?.icon}
                            />
                        ))}
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-state-icon">🔍</div>
                            <h3 className="empty-state-title">No services found</h3>
                            <p className="empty-state-description">
                                No services available in this category at the moment.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Disclaimer */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="disclaimer" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <strong>💡 Important Notes:</strong>
                        <ul style={{ marginTop: 'var(--space-sm)', paddingLeft: 'var(--space-lg)' }}>
                            <li>Prices shown are starting prices and may vary based on specific requirements.</li>
                            <li>All prices are in Indian Rupees (₹ INR).</li>
                            <li>Hosting charges are optional and depend on third-party providers.</li>
                            <li>Contact us for a custom quote tailored to your project needs.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
