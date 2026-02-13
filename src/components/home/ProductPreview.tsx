import { useReveal } from './useReveal';

export default function ProductPreview() {
    const ref = useReveal();
    const contentRef = useReveal();

    return (
        <section className="section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left text */}
                    <div ref={contentRef} className="reveal">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-gradient inline-block">Product Preview</p>
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
                            Financial clarity{' '}
                            <span style={{ color: 'var(--text-tertiary)' }}>before you apply.</span>
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                            See match scores, ROI projections, and score breakdowns — all in one intelligent dashboard designed for serious applicants.
                        </p>
                        <div className="space-y-4">
                            {[
                                { label: 'Match Score UI', desc: 'Instantly see how well you fit each university' },
                                { label: 'ROI Comparison', desc: 'Side-by-side financial projections' },
                                { label: 'Score Breakdown', desc: 'Full transparency into every factor' },
                            ].map(item => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 0.2), hsla(174, 68%, 50%, 0.2))' }}>
                                        <svg className="w-3 h-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right mockup */}
                    <div ref={ref} className="reveal relative">
                        {/* Animated glow */}
                        <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-40 animate-pulse-soft"
                            style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 0.15), hsla(174, 68%, 50%, 0.1))' }} />

                        <div className="relative rounded-2xl overflow-hidden shadow-float animate-float"
                            style={{ border: '1px solid var(--border-color)' }}>
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3"
                                style={{ backgroundColor: 'var(--section-alt-bg)', borderBottom: '1px solid var(--border-color)' }}>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                                </div>
                                <div className="flex-1 mx-3">
                                    <div className="max-w-xs mx-auto rounded-md px-3 py-1 text-[10px] font-mono"
                                        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-tertiary)' }}>
                                        studyabroad.ai/compare
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 space-y-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
                                {/* Score breakdown */}
                                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Score Breakdown — TU Munich</p>
                                    {[
                                        { label: 'Academic Fit', value: 92, weight: '40%' },
                                        { label: 'Budget Fit', value: 85, weight: '30%' },
                                        { label: 'ROI Score', value: 78, weight: '20%' },
                                        { label: 'Visa Score', value: 95, weight: '10%' },
                                    ].map(item => (
                                        <div key={item.label} className="mb-2 last:mb-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                                                <span className="text-[11px] font-bold" style={{ color: 'var(--text-primary)' }}>{item.value}% <span className="font-normal" style={{ color: 'var(--text-tertiary)' }}>({item.weight})</span></span>
                                            </div>
                                            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                                                <div className="h-full rounded-full transition-all duration-1000"
                                                    style={{ width: `${item.value}%`, background: 'linear-gradient(90deg, hsla(245, 67%, 55%, 1), hsla(174, 68%, 50%, 1))' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Comparison bars */}
                                <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>ROI Comparison</span>
                                        <div className="flex gap-3">
                                            <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                                <span className="w-2 h-2 rounded-full" style={{ background: 'hsla(245, 67%, 55%, 0.8)' }} /> TU Munich
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                                                <span className="w-2 h-2 rounded-full" style={{ background: 'hsla(174, 68%, 50%, 0.8)' }} /> RWTH Aachen
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-1.5 h-20">
                                        {[35, 50, 65, 45, 80, 55, 85, 70, 90, 75].map((h, i) => (
                                            <div key={i} className="flex-1 flex gap-0.5 items-end">
                                                <div className="flex-1 rounded-t" style={{ height: `${h}%`, background: 'hsla(245, 67%, 55%, 0.6)' }} />
                                                <div className="flex-1 rounded-t" style={{ height: `${Math.max(20, h - 10 + Math.random() * 15)}%`, background: 'hsla(174, 68%, 50%, 0.6)' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
