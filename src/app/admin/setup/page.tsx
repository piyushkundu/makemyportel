'use client';

import { useState, useEffect } from 'react';
import { seedDatabase, createAdminUserDoc } from '@/lib/seed';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function AdminSetupPage() {
    const [results, setResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [adminCreated, setAdminCreated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => unsub();
    }, []);

    const handleSeed = async () => {
        setLoading(true);
        setResults([]);
        try {
            const res = await seedDatabase();
            setResults(res);
        } catch (err) {
            setResults(['❌ Seed failed: ' + (err instanceof Error ? err.message : 'Unknown error')]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async () => {
        if (!user) return;
        try {
            await createAdminUserDoc(user.uid, user.email || '', user.displayName || user.email?.split('@')[0] || 'Admin');
            setAdminCreated(true);
        } catch (err) {
            alert('Failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
        }
    };

    return (
        <div className="admin-page">
            <div style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Database Setup</h1>
                <p>Initialize Firestore collections and configure your admin account</p>
            </div>

            {/* Current User */}
            {user && (
                <div className="glass-card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>👤 Current Admin User</h3>
                    <p style={{ fontSize: '0.9rem' }}>
                        <strong>Email:</strong> {user.email}<br />
                        <strong>UID:</strong> {user.uid}
                    </p>

                    {!adminCreated ? (
                        <button
                            className="btn btn-primary"
                            onClick={handleCreateAdmin}
                            style={{ marginTop: '0.75rem' }}
                        >
                            Save as Admin in Database
                        </button>
                    ) : (
                        <div style={{ marginTop: '0.75rem', color: '#059669', fontWeight: 600 }}>
                            ✅ Admin user saved to Firestore
                        </div>
                    )}
                </div>
            )}

            {/* Seed Database */}
            <div className="glass-card" style={{ marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: '0.75rem' }}>🗄️ Initialize Database</h3>
                <p style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
                    This will create the default settings and check all required collections.
                    Firestore creates collections automatically when the first document is added.
                </p>

                <button
                    className="btn btn-primary"
                    onClick={handleSeed}
                    disabled={loading}
                >
                    {loading ? 'Setting up...' : '🚀 Initialize Database'}
                </button>

                {results.length > 0 && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f9f8ff',
                        borderRadius: '12px',
                        fontSize: '0.875rem'
                    }}>
                        {results.map((r, i) => (
                            <div key={i} style={{ marginBottom: '0.35rem' }}>{r}</div>
                        ))}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="glass-card">
                <h3 style={{ marginBottom: '0.75rem' }}>ℹ️ How Collections Work</h3>
                <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.7 }}>
                    <p><strong>users</strong> — Created when clients sign up or you save your admin profile above</p>
                    <p><strong>orders</strong> — Created when the first order is placed by a client</p>
                    <p><strong>inquiries</strong> — Created when someone submits the contact form on your website</p>
                    <p><strong>settings</strong> — Created by clicking &quot;Initialize Database&quot; above with your site defaults</p>
                </div>
            </div>
        </div>
    );
}
