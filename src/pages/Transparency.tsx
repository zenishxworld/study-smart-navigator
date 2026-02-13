import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Transparency() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Our Transparency Commitment</h1>
                        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>No commissions. No conflicts. Just honest, data-driven guidance.</p>
                    </div>

                    <div className="card mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>100% Commission-Free</h2>
                                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    We do not receive any commission, referral fees, or kickbacks from universities, consultants, or education agents.
                                    Our platform is funded by premium features (coming soon), not by steering you toward specific institutions.
                                </p>
                                <p style={{ color: 'var(--text-secondary)' }}>
                                    <strong>This means:</strong> Every recommendation is based purely on data and your profile fit, not on how much a university pays us.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-8">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Transparent Scoring Methodology</h2>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Our Match Score is calculated using a transparent, weighted algorithm:</p>
                        <div className="space-y-4">
                            {[
                                { pct: '40%', title: 'Academic Fit', desc: 'Compares your CGPA and IELTS score against university requirements. Higher scores for profiles that exceed requirements.' },
                                { pct: '30%', title: 'Budget Fit', desc: 'Evaluates whether your budget covers total costs (tuition + living). Penalizes universities significantly beyond your budget.' },
                                { pct: '20%', title: 'ROI Score', desc: 'Based on break-even years (total cost ÷ estimated salary). Lower break-even = higher score. Rewards universities with strong career outcomes.' },
                                { pct: '10%', title: 'Visa Risk Score', desc: 'Considers visa rejection rates and immigration policies. Low-risk countries score higher.' },
                            ].map(item => (
                                <div key={item.title} className="flex items-start space-x-4">
                                    <div className="w-20 flex-shrink-0">
                                        <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-center font-bold">{item.pct}</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card mb-8">
                        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Data Sources</h2>
                        <ul className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
                            {[
                                { bold: 'University websites', rest: ' for official tuition and admission requirements' },
                                { bold: 'Payscale, Glassdoor, LinkedIn', rest: ' for salary estimates' },
                                { bold: 'Numbeo, Expatistan', rest: ' for cost of living data' },
                                { bold: 'Official immigration websites', rest: ' for visa acceptance rates' },
                                { bold: 'QS, THE, US News', rest: ' for global rankings' },
                            ].map(item => (
                                <li key={item.bold} className="flex items-start">
                                    <span className="text-primary-600 mr-2">•</span>
                                    <span><strong>{item.bold}</strong>{item.rest}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm italic" style={{ color: 'var(--text-tertiary)' }}>Data is updated quarterly. If you notice outdated information, please contact us.</p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6">
                        <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-300 mb-2">Important Disclaimer</h3>
                        <ul className="space-y-2 text-yellow-800 dark:text-yellow-200 text-sm">
                            <li className="flex items-start"><span className="mr-2">⚠️</span><span>Salary and ROI projections are <strong>estimates</strong> based on historical data and market trends. Actual outcomes vary.</span></li>
                            <li className="flex items-start"><span className="mr-2">⚠️</span><span>Match scores are guidance tools, not admission guarantees. Always verify data with official university sources.</span></li>
                            <li className="flex items-start"><span className="mr-2">⚠️</span><span>Visa policies change frequently. Consult official immigration websites for current information.</span></li>
                            <li className="flex items-start"><span className="mr-2">⚠️</span><span>This platform provides information, not financial or legal advice. Speak with certified advisors for personalized guidance.</span></li>
                        </ul>
                    </div>

                    <div className="mt-12 text-center">
                        <a href="mailto:hello@uwai.ai" className="btn btn-primary">Questions? Contact Us</a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
