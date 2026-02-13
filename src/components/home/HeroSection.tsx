import { Link } from 'react-router-dom';
import { useReveal, useCounter } from './useReveal';

function StatBadge({ end, suffix, label }: { end: number; suffix: string; label: string }) {
    const { ref, displayValue } = useCounter(end, 2000, suffix);
    return (
        <div ref={ref} className="flex items-center gap-2 px-4 py-2 rounded-full glass" style={{ border: '1px solid var(--border-color)' }}>
            <span className="text-lg font-bold text-gradient">{displayValue}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
        </div>
    );
}

export default function HeroSection() {
    const ref = useReveal();

    return (
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-mesh" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-40 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, hsla(245, 80%, 60%, 0.15) 0%, transparent 70%)' }} />
            <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full blur-3xl animate-pulse-soft opacity-30"
                style={{ background: 'hsla(245, 67%, 55%, 0.2)' }} />
            <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full blur-3xl animate-pulse-soft opacity-20"
                style={{ background: 'hsla(174, 68%, 50%, 0.15)', animationDelay: '2s' }} />

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div ref={ref} className="reveal">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8"
                            style={{ backgroundColor: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', backdropFilter: 'blur(12px)' }}>
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Commission-Free Platform
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6" style={{ color: 'var(--text-primary)' }}>
                            Make ₹50L Study Abroad Decisions With{' '}
                            <span className="text-gradient">Data — Not Consultants.</span>
                        </h1>

                        <p className="text-lg lg:text-xl leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                            AI-powered university matching, ROI forecasting, and transparent rankings. No commissions. No bias. Just clarity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <Link to="/explore" className="btn btn-primary text-base px-8 py-3.5 shadow-lg hover:shadow-glow">
                                Analyze My Profile
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <a href="#how-it-works" className="btn btn-ghost text-base px-8 py-3.5">
                                See How It Works
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                { icon: '🛡️', text: '0% Commission' },
                                { icon: '📊', text: 'Data-Driven Rankings' },
                                { icon: '🔍', text: 'Transparent Methodology' },
                            ].map(badge => (
                                <div key={badge.text} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                                    style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                                    <span>{badge.icon}</span>
                                    {badge.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Dashboard mockup */}
                    <div className="relative hidden lg:block">
                        <div className="relative animate-float">
                            {/* Glow behind */}
                            <div className="absolute -inset-8 rounded-3xl opacity-50 blur-2xl"
                                style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 0.12), hsla(174, 68%, 50%, 0.08))' }} />

                            <div className="relative rounded-2xl overflow-hidden shadow-float"
                                style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                                {/* Browser chrome */}
                                <div className="flex items-center gap-2 px-4 py-3" style={{ backgroundColor: 'var(--section-alt-bg)', borderBottom: '1px solid var(--border-color)' }}>
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="flex-1 mx-3">
                                        <div className="max-w-xs mx-auto rounded-md px-3 py-1 text-[10px] font-mono"
                                            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-tertiary)' }}>
                                            studyabroad.ai/dashboard
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard content */}
                                <div className="p-5 space-y-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                    {/* Match Score */}
                                    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Match Score</span>
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">High Match</span>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-3xl font-extrabold text-gradient">87</span>
                                            <span className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>/100</span>
                                        </div>
                                        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                            <div className="h-full w-[87%] rounded-full" style={{ background: 'linear-gradient(90deg, hsla(245, 67%, 55%, 1), hsla(174, 68%, 50%, 1))' }} />
                                        </div>
                                    </div>

                                    {/* Mini cards */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>5-Year ROI</span>
                                            <p className="text-xl font-extrabold text-emerald-500 mt-1">₹42L</p>
                                        </div>
                                        <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Break-Even</span>
                                            <p className="text-xl font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>2.1 <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>yrs</span></p>
                                        </div>
                                    </div>

                                    {/* Mini chart */}
                                    <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>ROI Projection</span>
                                        </div>
                                        <div className="flex items-end gap-1 h-16">
                                            {[30, 45, 55, 40, 65, 50, 75, 60, 85, 70, 90, 80].map((h, i) => (
                                                <div key={i} className="flex-1 rounded-t transition-all duration-500"
                                                    style={{ height: `${h}%`, background: `linear-gradient(180deg, hsla(245, 67%, 55%, 0.7), hsla(174, 68%, 50%, 0.5))` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Stats */}
                <div className="flex flex-wrap justify-center gap-4 mt-16 lg:mt-20">
                    <StatBadge end={25} suffix="+" label="Universities" />
                    <StatBadge end={100} suffix="%" label="Transparent" />
                    <StatBadge end={0} suffix="%" label="Commission" />
                </div>
            </div>
        </section>
    );
}
