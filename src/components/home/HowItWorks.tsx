import { useReveal } from './useReveal';

const steps = [
    { num: '01', title: 'Enter Your Profile', desc: 'Add your CGPA, test scores, budget, and preferences.', icon: '📝' },
    { num: '02', title: 'Compare Universities', desc: 'Get ranked matches with transparent scoring breakdowns.', icon: '🔍' },
    { num: '03', title: 'Choose Based on ROI & Fit', desc: 'Make decisions backed by data, not sales pitches.', icon: '🎯' },
];

function StepCard({ num, title, desc, icon }: typeof steps[0]) {
    const ref = useReveal();
    return (
        <div ref={ref} className="reveal text-center relative">
            <div className="relative mb-5 mx-auto">
                <div className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-card transition-all duration-300 hover:shadow-glow hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 0.1), hsla(174, 68%, 50%, 0.1))', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
                    <span className="text-2xl">{icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, hsla(245, 67%, 55%, 1), hsla(174, 68%, 50%, 1))' }}>
                    {num}
                </div>
            </div>
            <h3 className="text-base font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
        </div>
    );
}

export default function HowItWorks() {
    const titleRef = useReveal();

    return (
        <section id="how-it-works" className="section-padding bg-section-alt">
            <div className="container-custom">
                <div ref={titleRef} className="reveal text-center mb-16">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>How It Works</p>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Three steps to clarity.
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px"
                            style={{ background: 'linear-gradient(90deg, var(--border-color), hsla(245, 67%, 55%, 0.3), var(--border-color))' }} />

                        {steps.map(step => (
                            <StepCard key={step.num} {...step} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
