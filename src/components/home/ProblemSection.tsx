import { useReveal } from './useReveal';
import { Coins, Lock, Megaphone } from 'lucide-react';

const problems = [
    {
        icon: Coins,
        title: 'Commission Bias',
        description: 'Most platforms recommend universities that pay them — not what\'s best for you.',
        accent: 'hsla(0, 80%, 55%, 0.08)',
        accentBorder: 'hsla(0, 80%, 55%, 0.18)',
        iconColor: 'text-red-500',
    },
    {
        icon: Lock,
        title: 'Hidden Costs',
        description: 'Students spend ₹40–60L without clear ROI projections or financial clarity.',
        accent: 'hsla(35, 95%, 52%, 0.08)',
        accentBorder: 'hsla(35, 95%, 52%, 0.18)',
        iconColor: 'text-amber-500',
    },
    {
        icon: Megaphone,
        title: 'Sales-Driven Advice',
        description: 'Consultants push "safe" colleges instead of optimal ones for your career.',
        accent: 'hsla(262, 80%, 55%, 0.08)',
        accentBorder: 'hsla(262, 80%, 55%, 0.18)',
        iconColor: 'text-primary-500',
    },
];

function ProblemCard({ icon: Icon, title, description, accent, accentBorder, iconColor }: typeof problems[0]) {
    const ref = useReveal();
    return (
        <div ref={ref} className="reveal group rounded-2xl p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover"
            style={{ backgroundColor: accent, border: `1px solid ${accentBorder}` }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: 'var(--glass-bg)', border: `1px solid ${accentBorder}` }}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{description}</p>
        </div>
    );
}

export default function ProblemSection() {
    const titleRef = useReveal();

    return (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
            <div className="container-custom">
                <div ref={titleRef} className="reveal text-center mb-16">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>The Problem</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                        The Study Abroad Industry Has a{' '}
                        <span className="text-gradient">Trust Problem.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {problems.map(problem => (
                        <ProblemCard key={problem.title} {...problem} />
                    ))}
                </div>
            </div>
        </section>
    );
}
