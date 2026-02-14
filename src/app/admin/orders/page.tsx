'use client';

import { useEffect, useState } from 'react';
import { OrdersDB, UsersDB, Order, User } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<Record<string, User>>({});
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ordersData, usersData] = await Promise.all([
                    OrdersDB.getAll(),
                    UsersDB.getAll()
                ]);
                setOrders(ordersData);
                const usersMap: Record<string, User> = {};
                usersData.forEach(u => { if (u.id) usersMap[u.id] = u; });
                setUsers(usersMap);
            } catch (err) {
                console.error('Failed to load orders:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredOrders = filterStatus === 'all'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    const handleStatusChange = async (id: string, newStatus: Order['status']) => {
        try {
            await OrdersDB.updateStatus(id, newStatus);
            setOrders(orders.map(o =>
                o.id === id ? { ...o, status: newStatus } : o
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

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return 'badge-success';
            case 'in_progress': return 'badge-primary';
            case 'pending': case 'confirmed': return 'badge-warning';
            case 'cancelled': return 'badge-error';
            default: return '';
        }
    };

    const stats = [
        { label: 'Total Orders', value: orders.length },
        { label: 'Pending', value: orders.filter(o => o.status === 'pending').length },
        { label: 'In Progress', value: orders.filter(o => o.status === 'in_progress').length },
        { label: 'Completed', value: orders.filter(o => o.status === 'completed').length },
    ];

    if (loading) {
        return (
            <div className="admin-page">
                <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                    Loading orders...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Orders</h1>
                    <p>Manage and track client orders</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-card-value">{stat.value}</div>
                        <div className="stat-card-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="glass-card" style={{ marginBottom: '1rem', padding: '1rem' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Filter by Status:</span>
                    <div className="tabs">
                        {['all', 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(status => (
                            <button
                                key={status}
                                className={`tab ${filterStatus === status ? 'active' : ''}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length > 0 ? (
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => {
                                    const client = users[order.userId];
                                    return (
                                        <tr key={order.id}>
                                            <td>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{client?.name || 'Unknown'}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{client?.email || '—'}</div>
                                                </div>
                                            </td>
                                            <td>{order.serviceName}</td>
                                            <td style={{ fontWeight: 600 }}>{formatAmount(order.amount)}</td>
                                            <td>{formatDate(order.createdAt)}</td>
                                            <td>
                                                <span className={`badge ${getStatusBadge(order.status)}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
                                                <select
                                                    className="form-input"
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id!, e.target.value as Order['status'])}
                                                    style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                    No orders found
                </div>
            )}
        </div>
    );
}
