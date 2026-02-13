import { useReveal, useCounter } from './useReveal';
import { Search, Ban, Wallet, Crosshair } from 'lucide-react';

function AnimatedStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
    const { ref, displayValue } = useCounter(end, 2200, suffix);
    return (
        <div ref={ref} className="text-center">
            <div className="stat-number mb-1">{displayValue}</div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{label}</div>
        </div>
    );
}

const reasons = [
    { icon: Search, text: 'Transparent scoring logic' },
    { icon: Ban, text: 'No hidden incentives' },
    { icon: Wallet, text: 'Financial-first thinking' },
    { icon: Crosshair, text: 'Built for serious applicants' },
];

export default function TrustSection() {
    const titleRef = useReveal();
    const gridRef = useReveal();

    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
            <div className="container-custom">
                <div ref={titleRef} className="reveal text-center mb-16">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>Trust & Credibility</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                        Why Students Are{' '}
                        <span className="text-gradient">Switching.</span>
                    </h2>
                </div>

                <div ref={gridRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-16">
                    {reasons.map(reason => (
                        <div key={reason.text} className="text-center group cursor-default">
                            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-card group-hover:-translate-y-1"
                                style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                                <reason.icon className="w-5 h-5 text-primary-500 transition-colors duration-300 group-hover:text-primary-600" />
                            </div>
                            <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>{reason.text}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto py-10 px-8 rounded-2xl"
                    style={{ backgroundColor: 'var(--section-alt-bg)', border: '1px solid var(--border-color)' }}>
                    <AnimatedStat end={25} suffix="+" label="Universities" />
                    <AnimatedStat end={100} suffix="%" label="Transparent" />
                    <AnimatedStat end={0} suffix="%" label="Commission" />
                </div>
            </div>
        </section>
    );
}
