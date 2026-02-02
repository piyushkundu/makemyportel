'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitted(true);
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (submitted) {
        return (
            <div className="page-transition" style={{ paddingTop: '100px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
                <div className="container text-center">
                    <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto', padding: 'var(--space-3xl)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-lg)' }}>✅</div>
                        <h2 style={{ marginBottom: 'var(--space-md)' }}>Thank You!</h2>
                        <p style={{ marginBottom: 'var(--space-xl)' }}>
                            Your message has been received. Our team will get back to you within 24 hours.
                        </p>
                        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                            Send Another Message
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-transition" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <section className="section">
                <div className="container text-center">
                    <h1>Get In <span className="text-gradient">Touch</span></h1>
                    <p style={{ maxWidth: '600px', margin: 'var(--space-md) auto 0', fontSize: '1.125rem' }}>
                        Have a project in mind? Let&apos;s discuss how we can help you achieve your digital goals.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-3xl)' }}>
                        {/* Form */}
                        <div className="glass-card">
                            <h3 style={{ marginBottom: 'var(--space-xl)' }}>Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)', marginTop: 'var(--space-lg)' }}>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="form-input"
                                            placeholder="+91 XXXXXXXXXX"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="service">Service Interested In</label>
                                        <select
                                            id="service"
                                            name="service"
                                            className="form-input"
                                            value={formData.service}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a service</option>
                                            <option value="website">Website Development</option>
                                            <option value="ecommerce">E-commerce Website</option>
                                            <option value="bot">Bots & Automation</option>
                                            <option value="design">Design & Branding</option>
                                            <option value="video">Video & Media</option>
                                            <option value="tools">Tools & Custom Platforms</option>
                                            <option value="hosting">Hosting & Deployment</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
                                    <label className="form-label" htmlFor="budget">Budget Range (₹ INR)</label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        className="form-input"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="under-5k">Under ₹5,000</option>
                                        <option value="5k-10k">₹5,000 - ₹10,000</option>
                                        <option value="10k-25k">₹10,000 - ₹25,000</option>
                                        <option value="25k-50k">₹25,000 - ₹50,000</option>
                                        <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                                        <option value="above-1l">Above ₹1,00,000</option>
                                    </select>
                                </div>

                                <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
                                    <label className="form-label" htmlFor="message">Project Details *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-input form-textarea"
                                        placeholder="Tell us about your project requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%', marginTop: 'var(--space-xl)' }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                                <h3 style={{ marginBottom: 'var(--space-xl)' }}>Contact Information</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                                    <div className="flex items-center gap-md">
                                        <div className="price-card-icon" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
                                            📧
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Email</div>
                                            <a href="mailto:hello@makemyportal.com" style={{ color: 'var(--text-secondary)' }}>
                                                hello@makemyportal.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-md">
                                        <div className="price-card-icon" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
                                            📞
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>Phone</div>
                                            <a href="tel:+919876543210" style={{ color: 'var(--text-secondary)' }}>
                                                +91 98765 43210
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-md">
                                        <div className="price-card-icon" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
                                            💬
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>WhatsApp</div>
                                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                                                Chat with us on WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                                <h4 style={{ marginBottom: 'var(--space-md)' }}>Business Hours</h4>
                                <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-sm)' }}>
                                    <strong>Monday - Saturday:</strong> 10:00 AM - 7:00 PM IST
                                </p>
                                <p style={{ fontSize: '0.875rem' }}>
                                    <strong>Sunday:</strong> Closed
                                </p>
                            </div>

                            <div className="glass-card">
                                <h4 style={{ marginBottom: 'var(--space-md)' }}>Quick Response</h4>
                                <p style={{ fontSize: '0.875rem' }}>
                                    We typically respond within <strong>24 hours</strong>. For urgent queries,
                                    please reach out via WhatsApp for faster response.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <h2 className="text-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                        Frequently Asked <span className="text-gradient">Questions</span>
                    </h2>

                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { q: 'How long does a project take?', a: 'Project timelines vary based on complexity. A basic website takes 5-7 days, while complex projects can take 2-4 weeks.' },
                            { q: 'Do you provide support after delivery?', a: 'Yes! We provide free support for 30 days after project delivery. Extended support plans are also available.' },
                            { q: 'Can I get a custom quote?', a: 'Absolutely! Contact us with your requirements and we\'ll provide a detailed quote within 24 hours.' },
                            { q: 'What payment methods do you accept?', a: 'We accept UPI, bank transfers, Razorpay, and all major payment methods available in India.' },
                        ].map((faq, i) => (
                            <div key={i} className="glass-card">
                                <h4 style={{ marginBottom: 'var(--space-sm)', color: 'var(--primary)' }}>{faq.q}</h4>
                                <p style={{ fontSize: '0.875rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
