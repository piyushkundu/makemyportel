'use client';

import { useEffect, useState } from 'react';
import { UsersDB, OrdersDB, User, Order } from '@/lib/db';
import { Timestamp } from 'firebase/firestore';

export default function AdminClientsPage() {
    const [clients, setClients] = useState<(User & { totalOrders: number; totalSpent: number })[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [usersData, ordersData] = await Promise.all([
                    UsersDB.getAll(),
                    OrdersDB.getAll()
                ]);

                // Only show clients (not admins)
                const clientUsers = usersData.filter(u => u.role === 'client');

                // Compute totals per client
                const clientsWithStats = clientUsers.map(client => {
                    const clientOrders = ordersData.filter(o => o.userId === client.id);
                    return {
                        ...client,
                        totalOrders: clientOrders.length,
                        totalSpent: clientOrders
                            .filter(o => o.status === 'completed')
                            .reduce((sum, o) => sum + (o.amount || 0), 0)
                    };
                });

                setClients(clientsWithStats);
            } catch (err) {
                console.error('Failed to load clients:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp?.toDate) return '—';
        return timestamp.toDate().toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const totalRevenue = clients.reduce((sum, c) => sum + c.totalSpent, 0);
    const totalOrders = clients.reduce((sum, c) => sum + c.totalOrders, 0);

    if (loading) {
        return (
            <div className="admin-page">
                <div style={{ textAlign: 'center', padding: '4rem', color: '#9ca3af' }}>
                    Loading clients...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Clients</h1>
                    <p>View and manage your clients</p>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                    <div className="stat-card-value">{clients.length}</div>
                    <div className="stat-card-label">Total Clients</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{totalOrders}</div>
                    <div className="stat-card-label">Total Orders</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-value">{formatAmount(totalRevenue)}</div>
                    <div className="stat-card-label">Total Revenue</div>
                </div>
            </div>

            {/* Search */}
            <div className="glass-card" style={{ marginBottom: '1rem', padding: '1rem' }}>
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
            {filteredClients.length > 0 ? (
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
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClients.map((client) => (
                                    <tr key={client.id}>
                                        <td>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{client.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{client.email}</div>
                                            </div>
                                        </td>
                                        <td>{client.phone || '—'}</td>
                                        <td>{client.totalOrders}</td>
                                        <td style={{ fontWeight: 600, color: '#059669' }}>{formatAmount(client.totalSpent)}</td>
                                        <td>{formatDate(client.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                    {searchQuery ? 'No clients match your search' : 'No clients yet'}
                </div>
            )}
        </div>
    );
}
