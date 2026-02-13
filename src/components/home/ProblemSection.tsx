import { useReveal } from './useReveal';

const problems = [
    {
        icon: '💰',
        title: 'Commission Bias',
        description: 'Most platforms recommend universities that pay them — not what\'s best for you.',
        accent: 'hsla(0, 72%, 51%, 0.1)',
        accentBorder: 'hsla(0, 72%, 51%, 0.15)',
    },
    {
        icon: '🔒',
        title: 'Hidden Costs',
        description: 'Students spend ₹40–60L without clear ROI projections or financial clarity.',
        accent: 'hsla(38, 92%, 50%, 0.1)',
        accentBorder: 'hsla(38, 92%, 50%, 0.15)',
    },
    {
        icon: '📢',
        title: 'Sales-Driven Advice',
        description: 'Consultants push "safe" colleges instead of optimal ones for your career.',
        accent: 'hsla(245, 67%, 55%, 0.1)',
        accentBorder: 'hsla(245, 67%, 55%, 0.15)',
    },
];

function ProblemCard({ icon, title, description, accent, accentBorder }: typeof problems[0]) {
    const ref = useReveal();
    return (
        <div ref={ref} className="reveal group rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
            style={{ backgroundColor: accent, border: `1px solid ${accentBorder}` }}>
            <span className="text-3xl block mb-4">{icon}</span>
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
