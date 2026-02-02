'use client';

import { useState } from 'react';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    date: string;
    status: 'new' | 'contacted' | 'converted' | 'closed';
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([
        { id: 'INQ-001', name: 'Raj Malhotra', email: 'raj@example.com', phone: '+91 98765 12345', service: 'Custom Web Tool', message: 'Need a custom inventory management tool for my business.', date: '2026-02-02', status: 'new' },
        { id: 'INQ-002', name: 'Meera Kapoor', email: 'meera@example.com', phone: '+91 87654 23456', service: 'E-commerce Website', message: 'Looking to build an online store for my fashion brand.', date: '2026-02-01', status: 'contacted' },
        { id: 'INQ-003', name: 'Suresh Iyer', email: 'suresh@example.com', phone: '+91 76543 34567', service: 'AI Chatbot', message: 'Want to implement chatbot for customer support on our website.', date: '2026-01-30', status: 'converted' },
        { id: 'INQ-004', name: 'Kavita Reddy', email: 'kavita@example.com', phone: '+91 65432 45678', service: 'Logo Design', message: 'Need a professional logo for my startup.', date: '2026-01-28', status: 'new' },
        { id: 'INQ-005', name: 'Arjun Nair', email: 'arjun@example.com', phone: '+91 54321 56789', service: 'WhatsApp Bot', message: 'Looking to automate our order confirmation and tracking via WhatsApp.', date: '2026-01-25', status: 'closed' },
    ]);

    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const filteredInquiries = filterStatus === 'all'
        ? inquiries
        : inquiries.filter(i => i.status === filterStatus);

    const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
        setInquiries(inquiries.map(i =>
            i.id === id ? { ...i, status: newStatus } : i
        ));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return 'badge-accent';
            case 'contacted': return 'badge-primary';
            case 'converted': return 'badge-success';
            case 'closed': return 'badge-error';
            default: return '';
        }
    };

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xs)' }}>Inquiries</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage client inquiries and leads</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="stat-card">
                    <div className="stat-card-value" style={{ color: 'var(--accent)' }}>
                        {inquiries.filter(i => i.status === 'new').length}
                    </div>
                    <div className="stat-card-label">New Inquiries</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{inquiries.filter(i => i.status === 'contacted').length}</div>
                    <div className="stat-card-label">Contacted</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value" style={{ color: 'var(--success)' }}>
                        {inquiries.filter(i => i.status === 'converted').length}
                    </div>
                    <div className="stat-card-label">Converted</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{inquiries.length}</div>
                    <div className="stat-card-label">Total Inquiries</div>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Filter:</span>
                    <div className="tabs">
                        {['all', 'new', 'contacted', 'converted', 'closed'].map(status => (
                            <button
                                key={status}
                                className={`tab ${filterStatus === status ? 'active' : ''}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inquiries Grid */}
            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                {filteredInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="glass-card">
                        <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-md)' }}>
                            <div>
                                <span className={`badge ${getStatusBadge(inquiry.status)}`}>{inquiry.status}</span>
                                <span style={{ marginLeft: 'var(--space-sm)', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                    {inquiry.date}
                                </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{inquiry.id}</span>
                        </div>

                        <h4 style={{ marginBottom: 'var(--space-xs)' }}>{inquiry.name}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: 'var(--space-sm)' }}>
                            {inquiry.email} • {inquiry.phone}
                        </p>

                        <div style={{
                            background: 'var(--bg-tertiary)',
                            padding: 'var(--space-sm)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginBottom: 'var(--space-xs)' }}>
                                Service: {inquiry.service}
                            </div>
                            <p style={{ fontSize: '0.875rem' }}>{inquiry.message}</p>
                        </div>

                        <div className="flex gap-sm">
                            <select
                                className="form-input"
                                value={inquiry.status}
                                onChange={(e) => handleStatusChange(inquiry.id, e.target.value as Inquiry['status'])}
                                style={{ flex: 1, padding: 'var(--space-xs) var(--space-sm)', fontSize: '0.75rem' }}
                            >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                                <option value="closed">Closed</option>
                            </select>
                            <button className="btn btn-primary btn-sm">
                                Reply
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredInquiries.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3 className="empty-state-title">No inquiries found</h3>
                    <p className="empty-state-description">
                        No inquiries match the selected filter.
                    </p>
                </div>
            )}
        </div>
    );
}
