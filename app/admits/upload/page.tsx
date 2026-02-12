'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdmitUploadPage() {
    const router = useRouter();
    const [universities, setUniversities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [form, setForm] = useState({
        universityId: '',
        program: '',
        admitType: 'admit',
        cgpa: '',
        ielts: '',
        gre: '',
        workExperience: '0',
        year: new Date().getFullYear().toString(),
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { router.push('/login'); return; }
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        const res = await fetch('/api/universities');
        const data = await res.json();
        setUniversities(data.universities || []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        if (!form.universityId) {
            setMessage('❌ Please select a university');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/admits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    universityId: parseInt(form.universityId),
                    program: form.program || null,
                    admitType: form.admitType,
                    cgpa: form.cgpa ? parseFloat(form.cgpa) : null,
                    ielts: form.ielts ? parseFloat(form.ielts) : null,
                    gre: form.gre ? parseInt(form.gre) : null,
                    workExperience: parseInt(form.workExperience) || 0,
                    year: parseInt(form.year),
                }),
            });

            if (res.ok) {
                setMessage('✅ Admit data submitted for verification! Thank you for contributing.');
                setTimeout(() => router.push('/admits'), 2000);
            } else {
                const data = await res.json();
                setMessage(`❌ ${data.error || 'Failed to submit'}`);
            }
        } catch {
            setMessage('❌ Error submitting data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-2xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary-900 mb-2">Share Your Admit</h1>
                        <p className="text-secondary-600">Help other students by sharing your application result</p>
                    </div>

                    <div className="card">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* University */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">University *</label>
                                <select className="input" value={form.universityId} onChange={(e) => setForm({ ...form, universityId: e.target.value })} required>
                                    <option value="">Select University</option>
                                    {universities.map(u => (
                                        <option key={u.id} value={u.id}>{u.name} ({u.country})</option>
                                    ))}
                                </select>
                            </div>

                            {/* Program */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Program</label>
                                <input type="text" className="input" placeholder="e.g. MS Computer Science"
                                    value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
                            </div>

                            {/* Result Type */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-3">Result *</label>
                                <div className="flex gap-3">
                                    {[
                                        { value: 'admit', label: '✅ Admitted', color: 'bg-green-100 text-green-700 border-green-300' },
                                        { value: 'reject', label: '❌ Rejected', color: 'bg-red-100 text-red-700 border-red-300' },
                                        { value: 'waitlist', label: '⏳ Waitlisted', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
                                    ].map(opt => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setForm({ ...form, admitType: opt.value })}
                                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${form.admitType === opt.value ? opt.color : 'bg-white text-secondary-500 border-secondary-200'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Academic Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">GRE</label>
                                    <input type="number" className="input" placeholder="320" min="260" max="340"
                                        value={form.gre} onChange={(e) => setForm({ ...form, gre: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 mb-2">Experience</label>
                                    <input type="number" className="input" placeholder="0" min="0"
                                        value={form.workExperience} onChange={(e) => setForm({ ...form, workExperience: e.target.value })} />
                                </div>
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 mb-2">Application Year</label>
                                <input type="number" className="input w-32" min="2020" max="2030"
                                    value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                            </div>

                            {message && (
                                <div className={`p-4 rounded-lg ${message.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {message}
                                </div>
                            )}

                            <button type="submit" disabled={loading} className="btn btn-primary w-full">
                                {loading ? 'Submitting...' : 'Submit Admit Data'}
                            </button>
                        </form>

                        <p className="text-xs text-secondary-400 mt-4 text-center">
                            Your data will be reviewed before being published. All personal identifiers are kept private.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
