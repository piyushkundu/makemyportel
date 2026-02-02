'use client';

import { useState } from 'react';

interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
    totalSpent: string;
    joinedDate: string;
    status: 'active' | 'inactive';
}

export default function AdminClientsPage() {
    const [clients] = useState<Client[]>([
        { id: 'CLT-001', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 98765 43210', totalOrders: 3, totalSpent: '₹24,999', joinedDate: '2025-10-15', status: 'active' },
        { id: 'CLT-002', name: 'Priya Patel', email: 'priya@example.com', phone: '+91 87654 32109', totalOrders: 2, totalSpent: '₹7,498', joinedDate: '2025-11-20', status: 'active' },
        { id: 'CLT-003', name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 76543 21098', totalOrders: 1, totalSpent: '₹5,999', joinedDate: '2026-01-10', status: 'active' },
        { id: 'CLT-004', name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 65432 10987', totalOrders: 4, totalSpent: '₹52,996', joinedDate: '2025-08-05', status: 'active' },
        { id: 'CLT-005', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 54321 09876', totalOrders: 1, totalSpent: '₹9,999', joinedDate: '2026-02-01', status: 'active' },
        { id: 'CLT-006', name: 'Anita Desai', email: 'anita@example.com', phone: '+91 43210 98765', totalOrders: 2, totalSpent: '₹11,998', joinedDate: '2025-12-15', status: 'inactive' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xs)' }}>Clients</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>View and manage your clients</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="stat-card">
                    <div className="stat-card-value">{clients.length}</div>
                    <div className="stat-card-label">Total Clients</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{clients.filter(c => c.status === 'active').length}</div>
                    <div className="stat-card-label">Active Clients</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{clients.reduce((sum, c) => sum + c.totalOrders, 0)}</div>
                    <div className="stat-card-label">Total Orders</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">₹1.14L</div>
                    <div className="stat-card-label">Total Revenue</div>
                </div>
            </div>

            {/* Search */}
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Search:</span>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ maxWidth: '300px' }}
                    />
                </div>
            </div>

            {/* Clients Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Phone</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Joined</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id}>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{client.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{client.email}</div>
                                        </div>
                                    </td>
                                    <td>{client.phone}</td>
                                    <td>{client.totalOrders}</td>
                                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>{client.totalSpent}</td>
                                    <td>{client.joinedDate}</td>
                                    <td>
                                        <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                                            {client.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
