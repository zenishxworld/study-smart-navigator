import { useReveal } from './useReveal';

const features = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Transparent Match Score',
        description: 'See exactly why a university matches your profile — with a full breakdown of every scoring factor.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'ROI Calculator',
        description: 'Calculate total cost, break-even years, and 5-year earnings projection for every university.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Verified Admit Data',
        description: 'See real profiles — admits and rejects — from students with backgrounds like yours.',
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: 'Commission-Free Model',
        description: 'We don\'t get paid by universities. Our incentives are aligned with yours. Period.',
    },
];

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    const ref = useReveal();
    return (
        <div ref={ref} className="reveal card-glass group glow-border p-7 hover:shadow-card-hover">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 0.1), hsla(174, 68%, 50%, 0.1))', color: 'var(--text-primary)' }}>
                {icon}
            </div>
            <h3 className="text-base font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>{description}</p>
        </div>
    );
}

export default function SolutionSection() {
    const titleRef = useReveal();

    return (
        <section className="section-padding bg-section-alt">
            <div className="container-custom">
                <div ref={titleRef} className="reveal text-center mb-16">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-gradient inline-block">The Solution</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                        Built for Students.{' '}
                        <span style={{ color: 'var(--text-tertiary)' }}>Not Universities.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {features.map(feature => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
