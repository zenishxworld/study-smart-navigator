'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.session.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-lg">SA</span>
                        </div>
                        <span className="text-2xl font-bold text-white">StudyAbroad<span className="text-primary-200">.AI</span></span>
                    </Link>
                    <p className="text-primary-200">Welcome back! Log in to your account.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-secondary-700 mb-2">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-secondary-500 mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-primary-600 font-medium hover:text-primary-700">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
