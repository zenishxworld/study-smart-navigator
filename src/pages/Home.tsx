import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function useCounter(end: number, duration: number = 2000, suffix: string = '') {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [started, end, duration]);

    return { count, ref, displayValue: `${count}${suffix}` };
}

function useReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: string }) {
    const ref = useReveal();
    return (
        <div ref={ref} className={`reveal ${delay} card-hover group p-8`}>
            <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/40 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{description}</p>
        </div>
    );
}

function StatCard({ end, suffix, label }: { end: number; suffix: string; label: string }) {
    const { ref, displayValue } = useCounter(end, 2200, suffix);
    return (
        <div ref={ref} className="text-center">
            <div className="stat-number mb-2">{displayValue}</div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</div>
        </div>
    );
}

function StepCard({ step, title, desc, idx }: { step: string; title: string; desc: string; icon: string; idx: number }) {
    const ref = useReveal();
    return (
        <div ref={ref} className={`reveal reveal-delay-${idx + 1} text-center group`}>
            <div className="relative mb-6 mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
                    <span className="text-white font-bold text-lg">{step}</span>
                </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
        </div>
    );
}

export default function Home() {
    const heroRef = useReveal();
    const productRef = useReveal();

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />

            {/* HERO */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-mesh overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-primary-400/5 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/10 dark:bg-accent-400/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

                <div className="container-custom relative z-10">
                    <div ref={heroRef} className="max-w-4xl mx-auto text-center reveal">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-8 border"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            100% Commission-Free • Data-Driven
                        </div>

                        <h1 className="text-display-lg md:text-display-xl mb-6" style={{ color: 'var(--text-primary)' }}>
                            Study Abroad.{' '}
                            <span className="text-gradient">Without the Bias.</span>
                        </h1>

                        <p className="text-subheading max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
                            Make ₹50L decisions with data, not consultants. AI-powered match scores, real ROI analysis, and zero commission model.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <Link to="/explore" className="btn btn-primary text-base px-8 py-3.5 shadow-lg hover:shadow-glow">
                                Start Free
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link to="/explore" className="btn btn-ghost text-base px-8 py-3.5">
                                Browse Universities
                            </Link>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>No credit card required • Free forever for basic features</p>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF */}
            <section className="py-16 md:py-20" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-tertiary)' }}>
                            Trusted by serious applicants
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto">
                        <StatCard end={1000} suffix="+" label="Active Users" />
                        <StatCard end={25} suffix="+" label="Universities" />
                        <StatCard end={0} suffix="%" label="Commission" />
                        <StatCard end={100} suffix="%" label="Transparent" />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
                        {['AI-Powered Matching', 'Verified Admit Data', 'Real ROI Analysis', 'No Hidden Fees'].map((badge) => (
                            <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                                style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRODUCT PREVIEW */}
            <section className="section-padding bg-mesh overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-primary-500">Platform Preview</p>
                        <h2 className="text-display mb-4" style={{ color: 'var(--text-primary)' }}>Your Decision Dashboard</h2>
                        <p className="text-subheading max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Everything you need to make the smartest study abroad decision — in one place.
                        </p>
                    </div>

                    <div ref={productRef} className="reveal max-w-5xl mx-auto">
                        <div className="relative rounded-3xl overflow-hidden shadow-float animate-float" style={{ border: '1px solid var(--border-color)' }}>
                            <div className="flex items-center gap-2 px-5 py-3.5" style={{ backgroundColor: 'var(--section-alt-bg)', borderBottom: '1px solid var(--border-color)' }}>
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="max-w-md mx-auto rounded-lg px-4 py-1.5 text-xs font-mono" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-tertiary)' }}>
                                        uwai.ai/dashboard
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                                    <div className="card-glass p-5 rounded-2xl">
                                        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Your Match Score</p>
                                        <div className="flex items-end gap-3">
                                            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">87</span>
                                            <span className="text-sm font-medium text-green-500 mb-1">↑ High Match</span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                            <div className="h-full w-[87%] bg-gradient-to-r from-primary-600 to-accent-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="card-glass p-5 rounded-2xl">
                                        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>5-Year ROI</p>
                                        <div className="flex items-end gap-3">
                                            <span className="text-4xl font-bold text-green-500">₹42L</span>
                                            <span className="text-sm font-medium text-green-500 mb-1">↑ Net Gain</span>
                                        </div>
                                        <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>After loan repayment &amp; living costs</p>
                                    </div>
                                    <div className="card-glass p-5 rounded-2xl">
                                        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Applications</p>
                                        <div className="flex items-end gap-3">
                                            <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>4</span>
                                            <span className="text-sm font-medium text-primary-500 mb-1">Active</span>
                                        </div>
                                        <div className="flex gap-1.5 mt-3">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div key={i} className={`h-2 flex-1 rounded-full ${i < 3 ? 'bg-primary-500' : ''}`}
                                                    style={i >= 3 ? { backgroundColor: 'var(--border-color)' } : {}} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="card-glass p-6 rounded-2xl">
                                    <div className="flex items-center justify-between mb-5">
                                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>ROI Comparison</p>
                                        <div className="flex gap-4">
                                            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500" /> TU Munich
                                            </span>
                                            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                                                <span className="w-2.5 h-2.5 rounded-full bg-accent-500" /> RWTH Aachen
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-between gap-3 h-32">
                                        {[40, 55, 70, 45, 85, 60, 90, 75, 95, 80, 70, 85].map((h, i) => (
                                            <div key={i} className="flex-1 flex gap-0.5 items-end">
                                                <div className="flex-1 rounded-t-md bg-primary-500/70 transition-all duration-500" style={{ height: `${h}%` }} />
                                                <div className="flex-1 rounded-t-md bg-accent-500/70 transition-all duration-500" style={{ height: `${Math.max(20, h - 15 + Math.random() * 20)}%` }} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-3 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                        <span>Year 1</span><span>Year 2</span><span>Year 3</span><span>Year 4</span><span>Year 5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-primary-500">Why UWAI</p>
                        <h2 className="text-display mb-4" style={{ color: 'var(--text-primary)' }}>Built for Smart Decisions</h2>
                        <p className="text-subheading max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                            Every feature designed to eliminate bias and maximize your outcomes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                            title="Transparent Match Score" description="AI-powered scores with full breakdown: 40% Academic, 30% Budget, 20% ROI, 10% Visa Risk." delay="reveal-delay-1"
                        />
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            title="ROI Calculator" description="Break-even analysis, loan simulations, and 5-year net gain projections for every university." delay="reveal-delay-2"
                        />
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                            title="Verified Admit Data" description="Browse real admit/reject data from students with similar profiles. Filter by CGPA, IELTS, and more." delay="reveal-delay-3"
                        />
                        <FeatureCard
                            icon={<svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                            title="No Commission Model" description="Zero revenue from university referrals. We earn from users, not institutions. That's real alignment." delay="reveal-delay-4"
                        />
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section-padding bg-section-alt">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-primary-500">How it Works</p>
                        <h2 className="text-display mb-4" style={{ color: 'var(--text-primary)' }}>Four Steps to Clarity</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Create Profile', desc: 'Enter your CGPA, test scores, budget, and career goals', icon: '👤' },
                            { step: '02', title: 'Get Matched', desc: 'Receive university rankings based on your unique profile', icon: '🎯' },
                            { step: '03', title: 'Compare ROI', desc: 'Analyze 5-year financial projections side by side', icon: '📊' },
                            { step: '04', title: 'Track & Apply', desc: 'Manage applications with deadlines and status updates', icon: '🚀' },
                        ].map((item, idx) => (
                            <StepCard key={idx} {...item} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
                <div className="absolute inset-0 bg-mesh opacity-30" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

                <div className="container-custom relative z-10 text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-display text-white mb-6">
                            Ready to Make <br className="hidden md:block" />Smarter Decisions?
                        </h2>
                        <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto">
                            Join thousands of students who chose transparency over commissions. Start free today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/explore" className="btn bg-white text-primary-700 hover:bg-surface-50 text-base px-8 py-3.5 shadow-xl hover:shadow-2xl font-semibold rounded-full">
                                Get Started &mdash; It&apos;s Free
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link to="/transparency" className="btn border-2 border-white/30 text-white hover:bg-white/10 text-base px-8 py-3.5 rounded-full font-medium">
                                Read Our Transparency Report
                            </Link>
                        </div>
                        <p className="text-xs text-white/40 mt-6">No credit card required • No consultants • No commissions</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
