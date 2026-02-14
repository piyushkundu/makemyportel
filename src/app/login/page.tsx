'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import './login.css';

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function LoginContent() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signInWithGoogle, signInWithEmail, signUp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get('redirect') || '/dashboard';
    const serviceId = searchParams.get('service');

    const handleRedirect = () => {
        router.push(redirectTo);
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithGoogle();
            handleRedirect();
        } catch (err: unknown) {
            const error = err as { code?: string; message?: string };
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign-in cancelled. Please try again.');
            } else if (error.code === 'auth/configuration-not-found' || error.code === 'auth/operation-not-allowed') {
                setError('Google Sign-In is not enabled yet. Please use Email/Password to create an account, or contact the admin to enable Google Sign-In.');
            } else {
                setError(error.message || 'Google sign-in failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignUp) {
                if (!name.trim()) {
                    setError('Please enter your name.');
                    setLoading(false);
                    return;
                }
                await signUp(email, password, name);
            } else {
                await signInWithEmail(email, password);
            }
            handleRedirect();
        } catch (err: unknown) {
            const error = err as { code?: string; message?: string };
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password. Please try again.');
                    break;
                case 'auth/email-already-in-use':
                    setError('An account with this email already exists.');
                    break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters.');
                    break;
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.');
                    break;
                case 'auth/invalid-credential':
                    setError('Invalid email or password. Please try again.');
                    break;
                case 'auth/configuration-not-found':
                case 'auth/operation-not-allowed':
                    setError('Email/Password sign-in is not enabled yet. Please contact the admin to enable it in Firebase Console.');
                    break;
                default:
                    setError(error.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Animated Background */}
            <div className="login-bg">
                <div className="login-orb login-orb-1" />
                <div className="login-orb login-orb-2" />
                <div className="login-orb login-orb-3" />
            </div>

            <div className="login-container">
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <Link href="/" className="login-logo">
                            <div className="login-logo-icon">
                                <Sparkles size={24} color="white" />
                            </div>
                            <div className="login-logo-text">
                                MakeMy<span>Portal</span>
                            </div>
                        </Link>
                        <h1 className="login-title">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="login-subtitle">
                            {isSignUp
                                ? 'Sign up to access your client portal'
                                : 'Sign in to your client portal'
                            }
                        </p>
                    </div>

                    {/* Service Notice */}
                    {serviceId && (
                        <div className="login-service-notice">
                            <span className="login-service-notice-icon">🎯</span>
                            <p className="login-service-notice-text">
                                Please <strong>{isSignUp ? 'sign up' : 'sign in'}</strong> to continue with your selected service.
                            </p>
                        </div>
                    )}

                    {/* Google Sign-In */}
                    <button
                        className="login-google-btn"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        type="button"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="login-divider">
                        <div className="login-divider-line" />
                        <span className="login-divider-text">or continue with email</span>
                        <div className="login-divider-line" />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="login-error">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className="login-input-group">
                                <input
                                    type="text"
                                    className="login-input"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                                <User size={18} className="login-input-icon" />
                            </div>
                        )}

                        <div className="login-input-group">
                            <input
                                type="email"
                                className="login-input"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                            <Mail size={18} className="login-input-icon" />
                        </div>

                        <div className="login-input-group">
                            <input
                                type="password"
                                className="login-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                            />
                            <Lock size={18} className="login-input-icon" />
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? '⏳ Please wait...'
                                : isSignUp
                                    ? '✨ Create Account'
                                    : '🚀 Sign In'
                            }
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className="login-toggle">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        <button
                            className="login-toggle-btn"
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError('');
                            }}
                            type="button"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>

                {/* Back to Home */}
                <Link href="/" className="login-back">
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="login-page">
                <div className="login-bg">
                    <div className="login-orb login-orb-1" />
                    <div className="login-orb login-orb-2" />
                    <div className="login-orb login-orb-3" />
                </div>
                <div className="login-container">
                    <div className="login-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            border: '4px solid rgba(139, 92, 246, 0.2)',
                            borderTopColor: '#8b5cf6',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                        }} />
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
