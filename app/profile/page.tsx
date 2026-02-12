'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        cgpa: '',
        ielts: '',
        budget: '',
        work_experience_years: '0',
        preferred_countries: [] as string[],
    });

    const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Singapore', 'Netherlands', 'Ireland'];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        fetchProfile(token);
    }, []);

    const fetchProfile = async (token: string) => {
        try {
            const res = await fetch('/api/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                const p = data.profile;
                setProfile({
                    full_name: p.full_name || '',
                    email: p.email || '',
                    cgpa: p.cgpa?.toString() || '',
                    ielts: p.ielts?.toString() || '',
                    budget: p.budget?.toString() || '',
                    work_experience_years: p.work_experience_years?.toString() || '0',
                    preferred_countries: p.preferred_countries || [],
                });
            } else {
                router.push('/login');
            }
        } catch {
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setSaving(true);
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fullName: profile.full_name,
                    cgpa: profile.cgpa ? parseFloat(profile.cgpa) : null,
                    ielts: profile.ielts ? parseFloat(profile.ielts) : null,
                    budget: profile.budget ? parseFloat(profile.budget) : null,
                    workExperienceYears: parseInt(profile.work_experience_years) || 0,
                    preferredCountries: profile.preferred_countries,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                // Update local storage
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    user.fullName = profile.full_name;
                    user.cgpa = parseFloat(profile.cgpa);
                    user.ielts = parseFloat(profile.ielts);
                    user.budget = parseFloat(profile.budget);
                    localStorage.setItem('user', JSON.stringify(user));
                }
                setMessage('✅ Profile updated successfully!');
            } else {
                setMessage('❌ Failed to update profile');
            }
        } catch {
            setMessage('❌ Error saving profile');
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const toggleCountry = (country: string) => {
        setProfile(prev => ({
            ...prev,
            preferred_countries: prev.preferred_countries.includes(country)
                ? prev.preferred_countries.filter(c => c !== country)
                : [...prev.preferred_countries, country],
        }));
    };

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
                <div className="container-custom max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary-900 mb-2">Your Profile</h1>
                        <p className="text-secondary-600">Complete your profile for personalized match scores</p>
                    </div>

                    <div className="card">
                        {/* Personal Info */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold mr-3">1</span>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Full Name</label>
                                    <input type="text" className="input" value={profile.full_name}
                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Email</label>
                                    <input type="email" className="input bg-secondary-100" value={profile.email} disabled />
                                </div>
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold mr-3">2</span>
                                Academic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">CGPA (out of 4.0)</label>
                                    <input type="number" className="input" placeholder="3.5" min="0" max="4" step="0.01"
                                        value={profile.cgpa} onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">IELTS Score</label>
                                    <input type="number" className="input" placeholder="7.0" min="0" max="9" step="0.5"
                                        value={profile.ielts} onChange={(e) => setProfile({ ...profile, ielts: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Work Experience (years)</label>
                                    <input type="number" className="input" placeholder="0" min="0"
                                        value={profile.work_experience_years} onChange={(e) => setProfile({ ...profile, work_experience_years: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold mr-3">3</span>
                                Budget & Preferences
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Annual Budget (USD)</label>
                                <input type="number" className="input" placeholder="50000"
                                    value={profile.budget} onChange={(e) => setProfile({ ...profile, budget: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-3">Preferred Countries</label>
                                <div className="flex flex-wrap gap-2">
                                    {countries.map(country => (
                                        <button
                                            key={country}
                                            type="button"
                                            onClick={() => toggleCountry(country)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${profile.preferred_countries.includes(country)
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                                                }`}
                                        >
                                            {country}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Save */}
                        <div className="flex items-center gap-4">
                            <button onClick={handleSave} disabled={saving} className="btn btn-primary px-8">
                                {saving ? 'Saving...' : 'Save Profile'}
                            </button>
                            {message && <p className="text-sm font-medium">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
