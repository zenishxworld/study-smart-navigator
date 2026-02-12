import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TransparencyPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-secondary-900 mb-4">Our Transparency Commitment</h1>
                        <p className="text-xl text-secondary-600">
                            No commissions. No conflicts. Just honest, data-driven guidance.
                        </p>
                    </div>

                    {/* No Commission Policy */}
                    <div className="card mb-8">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-secondary-900 mb-3">100% Commission-Free</h2>
                                <p className="text-secondary-700 mb-4">
                                    We do not receive any commission, referral fees, or kickbacks from universities, consultants, or education agents.
                                    Our platform is funded by premium features (coming soon), not by steering you toward specific institutions.
                                </p>
                                <p className="text-secondary-700">
                                    <strong>This means:</strong> Every recommendation is based purely on data and your profile fit, not on how much
                                    a university pays us.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scoring Methodology */}
                    <div className="card mb-8">
                        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Transparent Scoring Methodology</h2>
                        <p className="text-secondary-700 mb-6">
                            Our Match Score is calculated using a transparent, weighted algorithm:
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-20 flex-shrink-0">
                                    <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-center font-bold">
                                        40%
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Academic Fit</h3>
                                    <p className="text-secondary-600">
                                        Compares your CGPA and IELTS score against university requirements. Higher scores for profiles that exceed requirements.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-20 flex-shrink-0">
                                    <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-center font-bold">
                                        30%
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Budget Fit</h3>
                                    <p className="text-secondary-600">
                                        Evaluates whether your budget covers total costs (tuition + living). Penalizes universities significantly beyond your budget.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-20 flex-shrink-0">
                                    <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-center font-bold">
                                        20%
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">ROI Score</h3>
                                    <p className="text-secondary-600">
                                        Based on break-even years (total cost ÷ estimated salary). Lower break-even = higher score. Rewards universities with strong career outcomes.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-20 flex-shrink-0">
                                    <div className="px-3 py-1 bg-primary-600 text-white rounded-full text-center font-bold">
                                        10%
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Visa Risk Score</h3>
                                    <p className="text-secondary-600">
                                        Considers visa rejection rates and immigration policies. Low-risk countries score higher.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Sources */}
                    <div className="card mb-8">
                        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Data Sources</h2>
                        <ul className="space-y-2 text-secondary-700">
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>University websites</strong> for official tuition and admission requirements</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Payscale, Glassdoor, LinkedIn</strong> for salary estimates</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Numbeo, Expatistan</strong> for cost of living data</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>Official immigration websites</strong> for visa acceptance rates</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-600 mr-2">•</span>
                                <span><strong>QS, THE, US News</strong> for global rankings</span>
                            </li>
                        </ul>
                        <p className="text-secondary-600 mt-4 text-sm italic">
                            Data is updated quarterly. If you notice outdated information, please contact us.
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <h3 className="text-lg font-bold text-yellow-900 mb-2">Important Disclaimer</h3>
                        <ul className="space-y-2 text-yellow-800 text-sm">
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>
                                    Salary and ROI projections are <strong>estimates</strong> based on historical data and market trends. Actual outcomes vary.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>
                                    Match scores are guidance tools, not admission guarantees. Always verify data with official university sources.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>
                                    Visa policies change frequently. Consult official immigration websites for current information.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">⚠️</span>
                                <span>
                                    This platform provides information, not financial or legal advice. Speak with certified advisors for personalized guidance.
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-12 text-center">
                        <a
                            href="mailto:hello@studyabroad.com"
                            className="btn btn-primary"
                        >
                            Questions? Contact Us
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
