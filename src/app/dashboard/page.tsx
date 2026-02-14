'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import './dashboard.css';
import {
    LogOut,
    User as UserIcon,
    Package,
    Headphones,
    Sparkles,
    ArrowRight,
    ShoppingBag,
    TrendingUp,
    CheckCircle2,
    Clock,
    Send,
    Phone,
    MessageSquare,
    PenLine,
} from 'lucide-react';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    // Empty by default — real orders will come from Firestore later
    const orders: {
        id: string;
        service: string;
        amount: string;
        status: string;
        date: string;
        progress: number;
    }[] = [];

    const handleLogout = async () => {
        await logout();
    };

    const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
    const userEmail = user?.email || '';
    const userAvatar = user?.photoURL;
    const memberSince = user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recently';

    const totalOrders = orders.length;
    const inProgress = orders.filter(o => o.status === 'In Progress').length;
    const completed = orders.filter(o => o.status === 'Completed').length;

    const tabs = [
        { key: 'orders', label: 'My Orders', icon: Package },
        { key: 'profile', label: 'Profile', icon: UserIcon },
        { key: 'support', label: 'Support', icon: Headphones },
    ];

    return (
        <ProtectedRoute>
            <div className="dashboard-page">
                {/* Background Decoration */}
                <div className="dashboard-bg">
                    <div className="dashboard-bg-orb dashboard-bg-orb-1" />
                    <div className="dashboard-bg-orb dashboard-bg-orb-2" />
                </div>

                <div className="dashboard-container">
                    {/* Welcome Header */}
                    <div className="dashboard-header">
                        <div className="dashboard-header-left">
                            <div className="dashboard-avatar-wrapper">
                                {userAvatar ? (
                                    <img
                                        src={userAvatar}
                                        alt={userName}
                                        className="dashboard-avatar"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="dashboard-avatar-fallback">
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="dashboard-avatar-status" />
                            </div>
                            <div>
                                <h1 className="dashboard-welcome">
                                    Welcome back, <span className="dashboard-welcome-name">{userName}</span>! 👋
                                </h1>
                                <p className="dashboard-meta">
                                    {userEmail} &bull; Member since {memberSince}
                                </p>
                            </div>
                        </div>
                        <div className="dashboard-header-actions">
                            <Link href="/services" className="dashboard-btn-primary">
                                <Sparkles size={16} />
                                Request Service
                                <ArrowRight size={16} />
                            </Link>
                            <button onClick={handleLogout} className="dashboard-btn-outline">
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="dashboard-stats">
                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #673de6, #8b5cf6)' }}>
                                <ShoppingBag size={20} color="white" />
                            </div>
                            <div className="dashboard-stat-value">{totalOrders}</div>
                            <div className="dashboard-stat-label">Total Orders</div>
                        </div>
                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>
                                <Clock size={20} color="white" />
                            </div>
                            <div className="dashboard-stat-value">{inProgress}</div>
                            <div className="dashboard-stat-label">In Progress</div>
                        </div>
                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>
                                <CheckCircle2 size={20} color="white" />
                            </div>
                            <div className="dashboard-stat-value">{completed}</div>
                            <div className="dashboard-stat-label">Completed</div>
                        </div>
                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-icon" style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>
                                <TrendingUp size={20} color="white" />
                            </div>
                            <div className="dashboard-stat-value">₹0</div>
                            <div className="dashboard-stat-label">Total Spent</div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="dashboard-tabs">
                        {tabs.map((tab) => {
                            const IconComp = tab.icon;
                            return (
                                <button
                                    key={tab.key}
                                    className={`dashboard-tab ${activeTab === tab.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    <IconComp size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="dashboard-content">
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div className="dashboard-tab-content">
                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <div key={order.id} className="dashboard-order-card">
                                            <div className="dashboard-order-header">
                                                <div>
                                                    <h3 className="dashboard-order-title">{order.service}</h3>
                                                    <p className="dashboard-order-meta">
                                                        {order.id} &bull; {order.date}
                                                    </p>
                                                </div>
                                                <div className="dashboard-order-right">
                                                    <span className={`dashboard-badge ${order.status === 'Completed' ? 'badge-success' :
                                                            order.status === 'In Progress' ? 'badge-primary' :
                                                                'badge-warning'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                    <span className="dashboard-order-amount">{order.amount}</span>
                                                </div>
                                            </div>
                                            <div className="dashboard-progress-track">
                                                <div
                                                    className="dashboard-progress-bar"
                                                    style={{
                                                        width: `${order.progress}%`,
                                                        background: order.progress === 100
                                                            ? 'linear-gradient(90deg, #10b981, #34d399)'
                                                            : 'linear-gradient(90deg, #673de6, #8b5cf6)',
                                                    }}
                                                />
                                            </div>
                                            <p className="dashboard-progress-label">{order.progress}% complete</p>
                                        </div>
                                    ))
                                ) : (
                                    /* Empty State */
                                    <div className="dashboard-empty">
                                        <div className="dashboard-empty-icon">
                                            <Package size={48} strokeWidth={1.2} />
                                        </div>
                                        <h3 className="dashboard-empty-title">No orders yet</h3>
                                        <p className="dashboard-empty-text">
                                            You haven&apos;t placed any orders yet. Explore our services and get started with your first project!
                                        </p>
                                        <Link href="/services" className="dashboard-btn-primary" style={{ marginTop: '1rem' }}>
                                            <Sparkles size={16} />
                                            Browse Services
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="dashboard-tab-content">
                                <div className="dashboard-profile-card">
                                    <div className="dashboard-profile-header">
                                        <div className="dashboard-profile-avatar-wrapper">
                                            {userAvatar ? (
                                                <img
                                                    src={userAvatar}
                                                    alt={userName}
                                                    className="dashboard-profile-avatar"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <div className="dashboard-profile-avatar-fallback">
                                                    <UserIcon size={36} color="white" />
                                                </div>
                                            )}
                                            <button className="dashboard-profile-edit-badge">
                                                <PenLine size={12} />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="dashboard-profile-name">{userName}</h3>
                                            <p className="dashboard-profile-email">{userEmail}</p>
                                            <p className="dashboard-profile-since">Member since {memberSince}</p>
                                        </div>
                                    </div>

                                    <div className="dashboard-form-section">
                                        <h4 className="dashboard-form-heading">Personal Information</h4>
                                        <div className="dashboard-form-grid">
                                            <div className="dashboard-form-group">
                                                <label className="dashboard-form-label">Full Name</label>
                                                <input type="text" className="dashboard-form-input" defaultValue={userName} />
                                            </div>
                                            <div className="dashboard-form-group">
                                                <label className="dashboard-form-label">Email</label>
                                                <input type="email" className="dashboard-form-input" defaultValue={userEmail} readOnly style={{ opacity: 0.6 }} />
                                            </div>
                                            <div className="dashboard-form-group">
                                                <label className="dashboard-form-label">Phone</label>
                                                <input type="tel" className="dashboard-form-input" placeholder="+91 XXXXXXXXXX" />
                                            </div>
                                            <div className="dashboard-form-group">
                                                <label className="dashboard-form-label">Company (Optional)</label>
                                                <input type="text" className="dashboard-form-input" placeholder="Your company name" />
                                            </div>
                                        </div>
                                        <button className="dashboard-btn-primary" style={{ marginTop: '1.5rem' }}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Support Tab */}
                        {activeTab === 'support' && (
                            <div className="dashboard-tab-content">
                                <div className="dashboard-support-grid">
                                    {/* Quick Help */}
                                    <div className="dashboard-support-card">
                                        <div className="dashboard-support-card-header">
                                            <Headphones size={20} />
                                            <h3>Quick Help</h3>
                                        </div>
                                        <div className="dashboard-support-links">
                                            <Link href="/contact" className="dashboard-support-link">
                                                <div className="dashboard-support-link-icon" style={{ background: 'linear-gradient(135deg, #673de6, #8b5cf6)' }}>
                                                    <Send size={16} color="white" />
                                                </div>
                                                <div>
                                                    <p className="dashboard-support-link-title">Email Support</p>
                                                    <p className="dashboard-support-link-sub">Get help via email</p>
                                                </div>
                                                <ArrowRight size={16} className="dashboard-support-arrow" />
                                            </Link>
                                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="dashboard-support-link">
                                                <div className="dashboard-support-link-icon" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                                                    <MessageSquare size={16} color="white" />
                                                </div>
                                                <div>
                                                    <p className="dashboard-support-link-title">WhatsApp Chat</p>
                                                    <p className="dashboard-support-link-sub">Quick chat on WhatsApp</p>
                                                </div>
                                                <ArrowRight size={16} className="dashboard-support-arrow" />
                                            </a>
                                            <a href="tel:+919876543210" className="dashboard-support-link">
                                                <div className="dashboard-support-link-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                                                    <Phone size={16} color="white" />
                                                </div>
                                                <div>
                                                    <p className="dashboard-support-link-title">Call Us</p>
                                                    <p className="dashboard-support-link-sub">Talk to our team</p>
                                                </div>
                                                <ArrowRight size={16} className="dashboard-support-arrow" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Raise Ticket */}
                                    <div className="dashboard-support-card">
                                        <div className="dashboard-support-card-header">
                                            <Send size={20} />
                                            <h3>Raise a Ticket</h3>
                                        </div>
                                        <div className="dashboard-form-group">
                                            <label className="dashboard-form-label">Subject</label>
                                            <input type="text" className="dashboard-form-input" placeholder="Brief description" />
                                        </div>
                                        <div className="dashboard-form-group" style={{ marginTop: '1rem' }}>
                                            <label className="dashboard-form-label">Message</label>
                                            <textarea className="dashboard-form-input dashboard-textarea" placeholder="Describe your issue..." />
                                        </div>
                                        <button className="dashboard-btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                                            <Send size={16} />
                                            Submit Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
