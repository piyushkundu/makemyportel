'use client';

import { useEffect, useState } from 'react';
import { InquiriesDB, Inquiry } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await InquiriesDB.getAll();
                setInquiries(data);
            } catch (err) {
                console.error('Failed to load inquiries:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredInquiries = filterStatus === 'all'
        ? inquiries
        : inquiries.filter(i => i.status === filterStatus);

    const handleStatusChange = async (id: string, newStatus: Inquiry['status']) => {
        try {
            await InquiriesDB.updateStatus(id, newStatus);
            setInquiries(inquiries.map(i =>
                i.id === id ? { ...i, status: newStatus } : i
            ));
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp?.toDate) return '—';
        return timestamp.toDate().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return 'badge-accent';
            case 'replied': return 'badge-primary';
            case 'closed': return 'badge-error';
            default: return '';
        }
    };

    if (loading) {
        return (
            <div className="admin-page">
                <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                    Loading inquiries...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Inquiries</h1>
                    <p>Manage client inquiries and leads</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                    <div className="stat-card-value" style={{ color: '#2563eb' }}>
                        {inquiries.filter(i => i.status === 'new').length}
                    </div>
                    <div className="stat-card-label">New</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">
                        {inquiries.filter(i => i.status === 'replied').length}
                    </div>
                    <div className="stat-card-label">Replied</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">
                        {inquiries.filter(i => i.status === 'closed').length}
                    </div>
                    <div className="stat-card-label">Closed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{inquiries.length}</div>
                    <div className="stat-card-label">Total</div>
                </div>
            </div>

            {/* Filter */}
            <div className="glass-card" style={{ marginBottom: '1rem', padding: '1rem' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Filter:</span>
                    <div className="tabs">
                        {['all', 'new', 'replied', 'closed'].map(status => (
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
            {filteredInquiries.length > 0 ? (
                <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                    {filteredInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="glass-card">
                            <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                                <div>
                                    <span className={`badge ${getStatusBadge(inquiry.status)}`}>{inquiry.status}</span>
                                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                                        {formatDate(inquiry.createdAt)}
                                    </span>
                                </div>
                                <span style={{ fontSize: '0.7rem', color: '#d1d5db' }}>{inquiry.type}</span>
                            </div>

                            <h4 style={{ marginBottom: '0.25rem' }}>{inquiry.name}</h4>
                            <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                                {inquiry.email} {inquiry.phone ? `• ${inquiry.phone}` : ''}
                            </p>

                            <div style={{
                                background: '#f9f8ff',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                marginBottom: '0.75rem'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#673de6', marginBottom: '0.25rem', fontWeight: 600 }}>
                                    {inquiry.subject}
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>{inquiry.message}</p>
                            </div>

                            <div className="flex gap-sm">
                                <select
                                    className="form-input"
                                    value={inquiry.status}
                                    onChange={(e) => handleStatusChange(inquiry.id!, e.target.value as Inquiry['status'])}
                                    style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.75rem' }}
                                >
                                    <option value="new">New</option>
                                    <option value="replied">Replied</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    {filterStatus !== 'all' ? 'No inquiries match the filter' : 'No inquiries yet'}
                </div>
            )}
        </div>
    );
}
