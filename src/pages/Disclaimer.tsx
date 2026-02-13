import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Disclaimer() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Important Disclaimer</h1>

                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-yellow-900 mb-4">⚠️ Please Read Carefully</h2>
                        <p className="text-yellow-800 text-lg">
                            This platform provides educational information and decision-making tools. It is NOT a substitute for professional advice or official university communications.
                        </p>
                    </div>

                    {[
                        { title: '1. Financial Projections', items: ['ROI calculations are ESTIMATES only. Actual salaries, employment rates, and financial outcomes vary significantly.', 'Salary data is sourced from public databases and may not reflect current market conditions.', 'Break-even projections assume continuous employment.', 'We are not financial advisors. Consult a certified financial planner.'] },
                        { title: '2. University Data Accuracy', items: ['University information is updated quarterly but may become outdated.', 'Always verify with official university websites before making decisions.', 'Admission requirements, fees, and program availability can change at any time.', 'Rankings are subjective and vary across different ranking systems.'] },
                        { title: '3. Match Scores', items: ['Match scores are algorithmic assessments based on limited data points.', 'A high match score does NOT guarantee admission.', 'Use match scores as ONE of many factors in your decision-making process.'] },
                        { title: '4. Visa and Immigration', items: ['Visa risk assessments are based on historical data and general trends.', 'Immigration policies change frequently. Always consult official government websites.', 'We cannot predict individual visa outcomes.'] },
                    ].map(section => (
                        <section key={section.title} className="mb-8">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{section.title}</h2>
                            <div className="card">
                                <ul className="list-disc pl-6 space-y-3" style={{ color: 'var(--text-secondary)' }}>
                                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </section>
                    ))}

                    <div className="text-center mt-12 p-6 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)' }}>By using this platform, you acknowledge that you have read and understood this disclaimer.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
