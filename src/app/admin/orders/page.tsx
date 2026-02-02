'use client';

import { useState } from 'react';

interface Order {
    id: string;
    client: string;
    email: string;
    service: string;
    amount: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    date: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([
        { id: 'ORD-001', client: 'Rahul Sharma', email: 'rahul@example.com', service: 'Business Website', amount: '₹12,999', status: 'in-progress', date: '2026-02-01' },
        { id: 'ORD-002', client: 'Priya Patel', email: 'priya@example.com', service: 'Logo Design', amount: '₹2,499', status: 'completed', date: '2026-01-28' },
        { id: 'ORD-003', client: 'Amit Kumar', email: 'amit@example.com', service: 'WhatsApp Bot', amount: '₹5,999', status: 'pending', date: '2026-02-02' },
        { id: 'ORD-004', client: 'Sneha Gupta', email: 'sneha@example.com', service: 'E-commerce Website', amount: '₹24,999', status: 'in-progress', date: '2026-01-25' },
        { id: 'ORD-005', client: 'Vikram Singh', email: 'vikram@example.com', service: 'AI Chatbot', amount: '₹9,999', status: 'pending', date: '2026-02-02' },
        { id: 'ORD-006', client: 'Anita Desai', email: 'anita@example.com', service: 'Portfolio Website', amount: '₹5,999', status: 'completed', date: '2026-01-20' },
    ]);

    const [filterStatus, setFilterStatus] = useState('all');

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    const handleStatusChange = (id: string, newStatus: Order['status']) => {
        setOrders(orders.map(o =>
            o.id === id ? { ...o, status: newStatus } : o
        ));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return 'badge-success';
            case 'in-progress': return 'badge-primary';
            case 'pending': return 'badge-warning';
            case 'cancelled': return 'badge-error';
            default: return '';
        }
    };

    const stats = [
        { label: 'Total Orders', value: orders.length, color: 'primary' },
        { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'warning' },
        { label: 'In Progress', value: orders.filter(o => o.status === 'in-progress').length, color: 'primary' },
        { label: 'Completed', value: orders.filter(o => o.status === 'completed').length, color: 'success' },
    ];

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xs)' }}>Orders</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage and track client orders</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-card-value">{stat.value}</div>
                        <div className="stat-card-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Filter by Status:</span>
                    <div className="tabs">
                        {['all', 'pending', 'in-progress', 'completed', 'cancelled'].map(status => (
                            <button
                                key={status}
                                className={`tab ${filterStatus === status ? 'active' : ''}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{order.client}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{order.email}</div>
                                        </div>
                                    </td>
                                    <td>{order.service}</td>
                                    <td style={{ fontWeight: 600 }}>{order.amount}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(order.status)}`}>
                                            {order.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="form-input"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                            style={{ padding: 'var(--space-xs) var(--space-sm)', fontSize: '0.75rem' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
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
