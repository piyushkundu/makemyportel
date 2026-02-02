'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    // Mock data for dashboard
    const stats = [
        { label: 'Total Services', value: '32', icon: '🛠️', color: 'primary', change: '+5%' },
        { label: 'Active Orders', value: '12', icon: '📦', color: 'accent', change: '+12%' },
        { label: 'New Inquiries', value: '8', icon: '💬', color: 'success', change: '+3' },
        { label: 'Total Clients', value: '156', icon: '👥', color: 'warning', change: '+8%' },
    ];

    const recentOrders = [
        { id: 'ORD-001', client: 'Rahul Sharma', service: 'Business Website', amount: '₹12,999', status: 'In Progress', date: '2 Feb 2026' },
        { id: 'ORD-002', client: 'Priya Patel', service: 'Logo Design', amount: '₹2,499', status: 'Completed', date: '1 Feb 2026' },
        { id: 'ORD-003', client: 'Amit Kumar', service: 'WhatsApp Bot', amount: '₹5,999', status: 'Pending', date: '31 Jan 2026' },
        { id: 'ORD-004', client: 'Sneha Gupta', service: 'E-commerce Website', amount: '₹24,999', status: 'In Progress', date: '30 Jan 2026' },
        { id: 'ORD-005', client: 'Vikram Singh', service: 'Video Editing', amount: '₹3,999', status: 'Completed', date: '29 Jan 2026' },
    ];

    const recentInquiries = [
        { name: 'Vikram Singh', service: 'Custom Web Tool', time: '2 hours ago', email: 'vikram@email.com' },
        { name: 'Anita Desai', service: 'AI Chatbot', time: '5 hours ago', email: 'anita@email.com' },
        { name: 'Raj Malhotra', service: 'Portfolio Website', time: '1 day ago', email: 'raj@email.com' },
        { name: 'Meera Shah', service: 'Social Media Kit', time: '2 days ago', email: 'meera@email.com' },
    ];

    const recentActivity = [
        { action: 'New order placed', details: 'Rahul Sharma ordered Business Website', time: '2 hours ago', icon: '📦' },
        { action: 'Payment received', details: '₹12,999 from Priya Patel', time: '5 hours ago', icon: '💰' },
        { action: 'New client registered', details: 'Amit Kumar joined', time: '1 day ago', icon: '👤' },
        { action: 'Order completed', details: 'Logo Design for Sneha Gupta', time: '2 days ago', icon: '✅' },
    ];

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
                        <div className="admin-stat-change">{stat.change}</div>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="admin-grid">
                {/* Recent Orders */}
                <div className="admin-card admin-card-orders">
                    <div className="admin-card-header">
                        <h3>📦 Recent Orders</h3>
                        <Link href="/admin/orders" className="admin-card-link">View All →</Link>
                    </div>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Client</th>
                                    <th>Service</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td><strong>{order.id}</strong></td>
                                        <td>{order.client}</td>
                                        <td>{order.service}</td>
                                        <td className="admin-amount">{order.amount}</td>
                                        <td>
                                            <span className={`admin-badge admin-badge-${order.status === 'Completed' ? 'success' :
                                                    order.status === 'In Progress' ? 'primary' : 'warning'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="admin-date">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="admin-sidebar-cards">
                    {/* Recent Inquiries */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>💬 New Inquiries</h3>
                            <Link href="/admin/inquiries" className="admin-card-link">View All →</Link>
                        </div>
                        <div className="admin-inquiry-list">
                            {recentInquiries.map((inquiry, i) => (
                                <div key={i} className="admin-inquiry-item">
                                    <div className="admin-inquiry-avatar">
                                        {inquiry.name.charAt(0)}
                                    </div>
                                    <div className="admin-inquiry-content">
                                        <div className="admin-inquiry-name">{inquiry.name}</div>
                                        <div className="admin-inquiry-service">{inquiry.service}</div>
                                    </div>
                                    <div className="admin-inquiry-time">{inquiry.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="admin-card">
                        <div className="admin-card-header">
                            <h3>⚡ Recent Activity</h3>
                        </div>
                        <div className="admin-activity-list">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="admin-activity-item">
                                    <div className="admin-activity-icon">{activity.icon}</div>
                                    <div className="admin-activity-content">
                                        <div className="admin-activity-action">{activity.action}</div>
                                        <div className="admin-activity-details">{activity.details}</div>
                                    </div>
                                    <div className="admin-activity-time">{activity.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-card admin-quick-actions">
                <h3>⚡ Quick Actions</h3>
                <div className="admin-quick-actions-grid">
                    <Link href="/admin/services" className="admin-quick-action">
                        <span className="admin-quick-action-icon">🛠️</span>
                        <span>Manage Services</span>
                    </Link>
                    <Link href="/admin/orders" className="admin-quick-action">
                        <span className="admin-quick-action-icon">📦</span>
                        <span>View Orders</span>
                    </Link>
                    <Link href="/admin/clients" className="admin-quick-action">
                        <span className="admin-quick-action-icon">👥</span>
                        <span>Manage Clients</span>
                    </Link>
                    <Link href="/admin/inquiries" className="admin-quick-action">
                        <span className="admin-quick-action-icon">💬</span>
                        <span>Check Inquiries</span>
                    </Link>
                    <Link href="/admin/settings" className="admin-quick-action">
                        <span className="admin-quick-action-icon">⚙️</span>
                        <span>Settings</span>
                    </Link>
                    <Link href="/" className="admin-quick-action">
                        <span className="admin-quick-action-icon">🌐</span>
                        <span>View Website</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
