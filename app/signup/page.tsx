'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        cgpa: '',
        ielts: '',
        budget: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: form.fullName,
                    email: form.email,
                    password: form.password,
                    cgpa: form.cgpa ? parseFloat(form.cgpa) : undefined,
                    ielts: form.ielts ? parseFloat(form.ielts) : undefined,
                    budget: form.budget ? parseFloat(form.budget) : undefined,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // Auto-login after signup
                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: form.email, password: form.password }),
                });
                const loginData = await loginRes.json();

                if (loginRes.ok) {
                    localStorage.setItem('token', loginData.session.access_token);
                    localStorage.setItem('user', JSON.stringify(loginData.user));
                    router.push('/dashboard');
                } else {
                    router.push('/login');
                }
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-lg">SA</span>
                        </div>
                        <span className="text-2xl font-bold text-white">StudyAbroad<span className="text-primary-200">.AI</span></span>
                    </Link>
                    <p className="text-primary-200">Create your account and start your journey</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Full Name *</label>
                                <input type="text" className="input" placeholder="John Doe"
                                    value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Email *</label>
                                <input type="email" className="input" placeholder="your@email.com"
                                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Password *</label>
                                <input type="password" className="input" placeholder="••••••••" minLength={6}
                                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Confirm Password *</label>
                                <input type="password" className="input" placeholder="••••••••"
                                    value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
                            </div>
                        </div>

                        <div className="border-t border-secondary-100 pt-5 mt-5">
                            <p className="text-sm text-secondary-600 mb-3">Optional — fill these to get instant match scores:</p>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">CGPA</label>
                                    <input type="number" className="input" placeholder="3.5" step="0.01" min="0" max="4"
                                        value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">IELTS</label>
                                    <input type="number" className="input" placeholder="7.0" step="0.5" min="0" max="9"
                                        value={form.ielts} onChange={(e) => setForm({ ...form, ielts: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Budget ($)</label>
                                    <input type="number" className="input" placeholder="50000"
                                        value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn btn-primary w-full py-3">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-secondary-500 mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
