'use client';

import { useState } from 'react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'MakeMyPortal',
        tagline: 'Your Digital Service Portal',
        email: 'hello@makemyportal.com',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        address: 'Mumbai, Maharashtra, India',
        currency: 'INR',
        currencySymbol: '₹',
        pricingNote: 'Prices may vary based on requirements.',
        hostingNote: 'Hosting charges are optional and depend on third-party providers.',
    });

    const handleSave = () => {
        alert('Settings saved successfully!');
    };

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xs)' }}>Settings</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Configure your website settings</p>
                </div>
            </div>

            <div className="grid grid-cols-2" style={{ gap: 'var(--space-xl)' }}>
                {/* General Settings */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>General Settings</h3>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Site Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Tagline</label>
                        <input
                            type="text"
                            className="form-input"
                            value={settings.tagline}
                            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Currency</label>
                        <div className="flex gap-md">
                            <select
                                className="form-input"
                                value={settings.currency}
                                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                                style={{ flex: 1 }}
                            >
                                <option value="INR">Indian Rupee (INR)</option>
                                <option value="USD">US Dollar (USD)</option>
                            </select>
                            <input
                                type="text"
                                className="form-input"
                                value={settings.currencySymbol}
                                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                                style={{ width: '80px' }}
                                placeholder="Symbol"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Settings */}
                <div className="glass-card">
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>Contact Information</h3>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                        <label className="form-label">WhatsApp</label>
                        <input
                            type="tel"
                            className="form-input"
                            value={settings.whatsapp}
                            onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-input"
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        />
                    </div>
                </div>

                {/* Pricing Text */}
                <div className="glass-card" style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ marginBottom: 'var(--space-lg)' }}>Pricing Text</h3>

                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                        <div className="form-group">
                            <label className="form-label">Pricing Note</label>
                            <textarea
                                className="form-input form-textarea"
                                value={settings.pricingNote}
                                onChange={(e) => setSettings({ ...settings, pricingNote: e.target.value })}
                                placeholder="This text appears on pricing pages..."
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-xs)' }}>
                                Displayed on the pricing and services pages.
                            </p>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Hosting Disclaimer</label>
                            <textarea
                                className="form-input form-textarea"
                                value={settings.hostingNote}
                                onChange={(e) => setSettings({ ...settings, hostingNote: e.target.value })}
                                placeholder="This text appears for hosting services..."
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--space-xs)' }}>
                                Displayed in the hosting section to clarify hosting terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div style={{ marginTop: 'var(--space-xl)', textAlign: 'right' }}>
                <button className="btn btn-primary btn-lg" onClick={handleSave}>
                    Save Settings
                </button>
            </div>
        </div>
    );
}
