'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('orders');

    // Mock user data
    const user = {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        memberSince: 'October 2025',
    };

    // Mock orders
    const orders = [
        { id: 'ORD-001', service: 'Business Website', amount: '₹12,999', status: 'In Progress', date: '2026-02-01', progress: 60 },
        { id: 'ORD-002', service: 'Logo Design', amount: '₹2,499', status: 'Completed', date: '2026-01-15', progress: 100 },
        { id: 'ORD-003', service: 'WhatsApp Bot', amount: '₹5,999', status: 'Pending', date: '2026-02-02', progress: 0 },
    ];

    return (
        <div className="page-transition" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                {/* Header */}
                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <div>
                        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Welcome, {user.name}! 👋</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Member since {user.memberSince}</p>
                    </div>
                    <Link href="/contact" className="btn btn-primary">
                        + Request New Service
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4" style={{ gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
                    <div className="glass-card text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>3</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Orders</div>
                    </div>
                    <div className="glass-card text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>1</div>
                        <div style={{ color: 'var(--text-secondary)' }}>In Progress</div>
                    </div>
                    <div className="glass-card text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>1</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Completed</div>
                    </div>
                    <div className="glass-card text-center">
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>₹21,497</div>
                        <div style={{ color: 'var(--text-secondary)' }}>Total Spent</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: 'var(--space-xl)' }}>
                    <button
                        className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        📦 My Orders
                    </button>
                    <button
                        className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Profile
                    </button>
                    <button
                        className={`tab ${activeTab === 'support' ? 'active' : ''}`}
                        onClick={() => setActiveTab('support')}
                    >
                        💬 Support
                    </button>
                </div>

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div>
                        {orders.map((order) => (
                            <div key={order.id} className="glass-card" style={{ marginBottom: 'var(--space-lg)' }}>
                                <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-md)' }}>
                                    <div>
                                        <div className="flex items-center gap-md">
                                            <h3 style={{ marginBottom: 0 }}>{order.service}</h3>
                                            <span className={`badge ${order.status === 'Completed' ? 'badge-success' :
                                                    order.status === 'In Progress' ? 'badge-primary' :
                                                        'badge-warning'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                                            Order ID: {order.id} • Ordered on {order.date}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{order.amount}</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-full)',
                                    height: '8px',
                                    marginBottom: 'var(--space-sm)'
                                }}>
                                    <div style={{
                                        background: order.progress === 100 ? 'var(--success)' : 'linear-gradient(90deg, var(--primary), var(--accent))',
                                        width: `${order.progress}%`,
                                        height: '100%',
                                        borderRadius: 'var(--radius-full)',
                                        transition: 'width 0.3s ease'
                                    }} />
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                    Progress: {order.progress}%
                                </div>
                            </div>
                        ))}

                        {orders.length === 0 && (
                            <div className="empty-state">
                                <div className="empty-state-icon">📦</div>
                                <h3 className="empty-state-title">No orders yet</h3>
                                <p className="empty-state-description">
                                    You haven&apos;t placed any orders yet. Get started by requesting a service!
                                </p>
                                <Link href="/services" className="btn btn-primary" style={{ marginTop: 'var(--space-lg)' }}>
                                    Browse Services
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="glass-card" style={{ maxWidth: '600px' }}>
                        <h3 style={{ marginBottom: 'var(--space-xl)' }}>Profile Information</h3>

                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" defaultValue={user.name} />
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input" defaultValue={user.email} />
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                            <label className="form-label">Phone</label>
                            <input type="tel" className="form-input" placeholder="+91 XXXXXXXXXX" />
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--space-xl)' }}>
                            <label className="form-label">Company (Optional)</label>
                            <input type="text" className="form-input" placeholder="Your company name" />
                        </div>

                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                )}

                {/* Support Tab */}
                {activeTab === 'support' && (
                    <div className="grid grid-cols-2" style={{ gap: 'var(--space-xl)' }}>
                        <div className="glass-card">
                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Quick Help</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                <Link href="/contact" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                    📧 Email Support
                                </Link>
                                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                    💬 WhatsApp Chat
                                </a>
                                <a href="tel:+919876543210" className="btn btn-outline" style={{ justifyContent: 'flex-start' }}>
                                    📞 Call Us
                                </a>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ marginBottom: 'var(--space-lg)' }}>Raise a Ticket</h3>
                            <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                                <label className="form-label">Subject</label>
                                <input type="text" className="form-input" placeholder="Brief description of your issue" />
                            </div>
                            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
                                <label className="form-label">Message</label>
                                <textarea className="form-input form-textarea" placeholder="Describe your issue in detail..." />
                            </div>
                            <button className="btn btn-primary">Submit Ticket</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
