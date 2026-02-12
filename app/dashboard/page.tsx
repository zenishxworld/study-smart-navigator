'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScoreCircle from '@/components/ScoreCircle';
import LoadingSpinner from '@/components/LoadingSpinner';

interface User {
    id: string;
    email: string;
    fullName: string;
    cgpa?: number;
    ielts?: number;
    budget?: number;
    role?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (!token || !userStr) {
            router.push('/login');
            return;
        }

        const userData = JSON.parse(userStr);
        setUser(userData);
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
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            applied: 'bg-blue-100 text-blue-700',
            under_review: 'bg-yellow-100 text-yellow-700',
            interview: 'bg-purple-100 text-purple-700',
            admitted: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700',
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary-50">
                <Navbar />
                <div className="pt-32 flex justify-center">
                    <LoadingSpinner size="lg" />
                </div>
            </div>
        );
    }

    const hasProfile = user?.cgpa && user?.ielts && user?.budget;

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary-900 mb-2">
                            Welcome back, {user?.fullName?.split(' ')[0]}!
                        </h1>
                        <p className="text-secondary-600">Your study abroad journey dashboard</p>
                    </div>

                    {/* Profile Completion Alert */}
                    {!hasProfile && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                            <div className="flex items-start space-x-4">
                                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-yellow-900 mb-1">Complete Your Profile</h3>
                                    <p className="text-yellow-800 text-sm mb-3">
                                        Add your CGPA, IELTS score, and budget to get personalized university match scores.
                                    </p>
                                    <Link href="/profile" className="btn btn-primary btn-sm">
                                        Update Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-secondary-600 text-sm mb-1">Applications</p>
                                    <p className="text-3xl font-bold text-secondary-900">{applications.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-secondary-600 text-sm mb-1">In Review</p>
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {applications.filter(a => a.status === 'under_review').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-secondary-600 text-sm mb-1">Admitted</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {applications.filter(a => a.status === 'admitted').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-secondary-600 text-sm mb-1">Profile</p>
                                    <p className="text-3xl font-bold text-secondary-900">
                                        {hasProfile ? '100%' : '40%'}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Link href="/universities" className="card hover:shadow-lg transition-all hover:-translate-y-1 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-600 transition-colors">Find Universities</h3>
                                    <p className="text-secondary-600 text-sm">Browse and compare with match scores</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/roi-calculator" className="card hover:shadow-lg transition-all hover:-translate-y-1 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-green-600 transition-colors">ROI Calculator</h3>
                                    <p className="text-secondary-600 text-sm">Compare financial outcomes</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/admits" className="card hover:shadow-lg transition-all hover:-translate-y-1 group">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">Verified Admits</h3>
                                    <p className="text-secondary-600 text-sm">See real admit data</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Application Tracker */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-secondary-900">Your Applications</h2>
                            <Link href="/applications" className="text-primary-600 font-medium hover:text-primary-700 text-sm">
                                View All →
                            </Link>
                        </div>

                        {applications.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-secondary-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-secondary-600 mb-4">No applications tracked yet</p>
                                <Link href="/universities" className="btn btn-primary">
                                    Browse Universities
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-secondary-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-700">University</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-700">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-700">Deadline</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-secondary-200">
                                        {applications.slice(0, 5).map((app) => (
                                            <tr key={app.id} className="hover:bg-secondary-50 transition-colors">
                                                <td className="px-4 py-4">
                                                    <div className="font-medium text-secondary-900">{app.university_name}</div>
                                                    <div className="text-sm text-secondary-600">{app.city}, {app.country}</div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                                        {app.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-secondary-700">
                                                    {app.deadline ? new Date(app.deadline).toLocaleDateString() : 'No deadline'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
