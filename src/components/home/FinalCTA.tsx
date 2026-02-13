import { Link } from 'react-router-dom';
import { useReveal } from './useReveal';

export default function FinalCTA() {
    const ref = useReveal();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Dark gradient background */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(245, 50%, 12%, 1), hsla(240, 30%, 8%, 1), hsla(245, 40%, 15%, 1))' }} />
            <div className="absolute inset-0 bg-mesh opacity-20" />
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-30"
                style={{ background: 'hsla(245, 67%, 55%, 0.2)' }} />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{ background: 'hsla(174, 68%, 50%, 0.15)' }} />

            <div className="container-custom relative z-10 text-center">
                <div ref={ref} className="reveal max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                        Stop Guessing.{' '}
                        <span className="opacity-60">Start Deciding.</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/50 mb-10 max-w-lg mx-auto leading-relaxed">
                        Join students who chose data over sales pitches. Get your personalized match score — completely free.
                    </p>
                    <Link to="/explore" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-white text-primary-700 hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5">
                        Get My Match Score
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <p className="text-xs text-white/30 mt-6">No credit card required • No consultants • No commissions</p>
                </div>
            </div>
        </section>
    );
}
