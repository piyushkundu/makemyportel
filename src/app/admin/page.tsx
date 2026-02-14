'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrdersDB, InquiriesDB, UsersDB, Order, Inquiry, User } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';

export default function AdminDashboardPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [clients, setClients] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ordersData, inquiriesData, usersData] = await Promise.all([
                    OrdersDB.getAll(),
                    InquiriesDB.getAll(),
                    UsersDB.getAll()
                ]);
                setOrders(ordersData);
                setInquiries(inquiriesData);
                setClients(usersData.filter(u => u.role === 'client'));
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp?.toDate) return '—';
        return timestamp.toDate().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + (o.amount || 0), 0);

    const stats = [
        { label: 'Total Orders', value: orders.length.toString(), icon: '📦', color: 'primary' },
        { label: 'Active Orders', value: orders.filter(o => o.status === 'in_progress').length.toString(), icon: '🔄', color: 'accent' },
        { label: 'New Inquiries', value: inquiries.filter(i => i.status === 'new').length.toString(), icon: '💬', color: 'success' },
        { label: 'Total Clients', value: clients.length.toString(), icon: '👥', color: 'warning' },
    ];

    const recentOrders = orders.slice(0, 5);
    const recentInquiries = inquiries.slice(0, 5);

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9ca3af' }}>
                    Loading dashboard data...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Welcome Section */}
            <div className="admin-welcome">
                <div className="admin-welcome-text">
                    <h1>Welcome back, Admin! 👋</h1>
                    <p>Here&apos;s what&apos;s happening with your business today.</p>
                </div>
                <div className="admin-welcome-actions">
                    <Link href="/admin/services" className="btn btn-primary">
                        <span>➕</span> Add Service
                    </Link>
                    <Link href="/admin/orders" className="btn btn-outline">
                        <span>📦</span> View All Orders
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="admin-stats-grid">
                {stats.map((stat, i) => (
                    <div key={i} className={`admin-stat-card admin-stat-${stat.color}`}>
                        <div className="admin-stat-icon">{stat.icon}</div>
                        <div className="admin-stat-content">
                            <div className="admin-stat-value">{stat.value}</div>
                            <div className="admin-stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="admin-grid">
                {/* Recent Orders */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3>📦 Recent Orders</h3>
                        <Link href="/admin/orders" className="admin-card-link">View All →</Link>
                    </div>

                    {recentOrders.length > 0 ? (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td><strong>{order.serviceName}</strong></td>
                                            <td className="admin-amount">{formatAmount(order.amount)}</td>
                                            <td>
                                                <span className={`admin-badge ${order.status === 'completed' ? 'admin-badge-success' :
                                                    order.status === 'in_progress' ? 'admin-badge-primary' :
                                                        'admin-badge-warning'
                                                    }`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="admin-date">{formatDate(order.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                            No orders yet
                        </div>
                    )}
                </div>

                {/* Sidebar Cards */}
                <div className="admin-sidebar-cards">
                    {/* Recent Inquiries */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>💬 Recent Inquiries</h3>
                            <Link href="/admin/inquiries" className="admin-card-link">View All →</Link>
                        </div>

                        {recentInquiries.length > 0 ? (
                            <div className="admin-inquiry-list">
                                {recentInquiries.map((inq) => (
                                    <div key={inq.id} className="admin-inquiry-item">
                                        <div className="admin-inquiry-avatar">
                                            {inq.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="admin-inquiry-content">
                                            <div className="admin-inquiry-name">{inq.name}</div>
                                            <div className="admin-inquiry-service">{inq.subject}</div>
                                        </div>
                                        <div className="admin-inquiry-time">{formatDate(inq.createdAt)}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#9ca3af' }}>
                                No inquiries yet
                            </div>
                        )}
                    </div>

                    {/* Revenue Card */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>💰 Revenue</h3>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1e1b4b' }}>
                                {formatAmount(totalRevenue)}
                            </div>
                            <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                From {orders.filter(o => o.status === 'completed').length} completed orders
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-quick-actions">
                <h3>⚡ Quick Actions</h3>
                <div className="admin-quick-actions-grid">
                    <Link href="/admin/services" className="admin-quick-action">
                        <div className="admin-quick-action-icon">🛠️</div>
                        Manage Services
                    </Link>
                    <Link href="/admin/orders" className="admin-quick-action">
                        <div className="admin-quick-action-icon">📦</div>
                        View Orders
                    </Link>
                    <Link href="/admin/clients" className="admin-quick-action">
                        <div className="admin-quick-action-icon">👥</div>
                        Manage Clients
                    </Link>
                    <Link href="/admin/inquiries" className="admin-quick-action">
                        <div className="admin-quick-action-icon">💬</div>
                        Inquiries
                    </Link>
                    <Link href="/admin/settings" className="admin-quick-action">
                        <div className="admin-quick-action-icon">⚙️</div>
                        Settings
                    </Link>
                    <Link href="/" className="admin-quick-action">
                        <div className="admin-quick-action-icon">🌐</div>
                        View Website
                    </Link>
                </div>
            </div>
        </div>
    );
}
