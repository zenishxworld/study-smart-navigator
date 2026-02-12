'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ApplicationsPage() {
    const router = useRouter();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editStatus, setEditStatus] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        fetchApplications(token);
    }, []);

    const fetchApplications = async (token: string) => {
        try {
            const res = await fetch('/api/applications', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setApplications(data.applications || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                setApplications(prev => prev.map(a =>
                    a.id === id ? { ...a, status } : a
                ));
                setEditingId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deleteApplication = async (id: number) => {
        const token = localStorage.getItem('token');
        if (!token || !confirm('Remove this application?')) return;

        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                setApplications(prev => prev.filter(a => a.id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getStatusColor = (status: string) => {
        const map: Record<string, string> = {
            applied: 'bg-blue-100 text-blue-700',
            under_review: 'bg-yellow-100 text-yellow-700',
            interview: 'bg-purple-100 text-purple-700',
            admitted: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700',
            withdrawn: 'bg-gray-100 text-gray-700',
        };
        return map[status] || 'bg-gray-100 text-gray-700';
    };

    const statuses = ['applied', 'under_review', 'interview', 'admitted', 'rejected', 'withdrawn'];

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-50">
                <Navbar />
                <div className="pt-32 flex justify-center"><LoadingSpinner size="lg" /></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-secondary-900 mb-2">Application Tracker</h1>
                            <p className="text-secondary-600">Manage and track your university applications</p>
                        </div>
                        <Link href="/universities" className="btn btn-primary">
                            + Browse Universities
                        </Link>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {[
                            { label: 'Total', count: applications.length, color: 'bg-secondary-100 text-secondary-700' },
                            { label: 'Applied', count: applications.filter(a => a.status === 'applied').length, color: 'bg-blue-100 text-blue-700' },
                            { label: 'Under Review', count: applications.filter(a => a.status === 'under_review').length, color: 'bg-yellow-100 text-yellow-700' },
                            { label: 'Admitted', count: applications.filter(a => a.status === 'admitted').length, color: 'bg-green-100 text-green-700' },
                            { label: 'Rejected', count: applications.filter(a => a.status === 'rejected').length, color: 'bg-red-100 text-red-700' },
                        ].map(s => (
                            <div key={s.label} className="card text-center">
                                <p className="text-sm text-secondary-500">{s.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${s.color.split(' ')[1]}`}>{s.count}</p>
                            </div>
                        ))}
                    </div>

                    {applications.length === 0 ? (
                        <div className="card text-center py-16">
                            <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-secondary-700 mb-2">No Applications Yet</h3>
                            <p className="text-secondary-500 mb-6">Start by browsing universities and tracking your applications</p>
                            <Link href="/universities" className="btn btn-primary">Browse Universities</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {applications.map(app => (
                                <div key={app.id} className="card hover:shadow-lg transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <Link href={`/universities/${app.university_id}`} className="text-lg font-semibold text-secondary-900 hover:text-primary-600 transition-colors">
                                                {app.university_name}
                                            </Link>
                                            <p className="text-sm text-secondary-500">{app.city}, {app.country}</p>
                                            {app.deadline && (
                                                <p className="text-sm text-secondary-600 mt-1">
                                                    Deadline: {new Date(app.deadline).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {editingId === app.id ? (
                                                <select
                                                    className="input text-sm py-1"
                                                    value={editStatus || app.status}
                                                    onChange={(e) => {
                                                        setEditStatus(e.target.value);
                                                        updateStatus(app.id, e.target.value);
                                                    }}
                                                    onBlur={() => setEditingId(null)}
                                                    autoFocus
                                                >
                                                    {statuses.map(s => (
                                                        <option key={s} value={s}>{s.replace('_', ' ')}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <button
                                                    onClick={() => { setEditingId(app.id); setEditStatus(app.status); }}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(app.status)}`}
                                                >
                                                    {app.status.replace('_', ' ')}
                                                </button>
                                            )}

                                            <button
                                                onClick={() => deleteApplication(app.id)}
                                                className="text-secondary-400 hover:text-red-500 transition-colors"
                                                title="Remove"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
