import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-8">Important Disclaimer</h1>

                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-yellow-900 mb-4">⚠️ Please Read Carefully</h2>
                        <p className="text-yellow-800 text-lg">
                            This platform provides educational information and decision-making tools. It is NOT a substitute for professional advice
                            or official university communications.
                        </p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Financial Projections</h2>
                            <div className="bg-white border border-secondary-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 text-secondary-700 space-y-3">
                                    <li>
                                        <strong>ROI calculations are ESTIMATES only.</strong> Actual salaries, employment rates, and financial outcomes vary significantly based on individual circumstances, economic conditions, and career choices.
                                    </li>
                                    <li>
                                        Salary data is sourced from public databases and may not reflect current market conditions or specific roles.
                                    </li>
                                    <li>
                                        Break-even projections assume continuous employment and do not account for unemployment, career changes, or economic downturns.
                                    </li>
                                    <li>
                                        We are not financial advisors. Consult a certified financial planner before making significant financial decisions.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. University Data Accuracy</h2>
                            <div className="bg-white border border-secondary-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 text-secondary-700 space-y-3">
                                    <li>
                                        University information (tuition, requirements, rankings) is updated quarterly but may become outdated.
                                    </li>
                                    <li>
                                        <strong>Always verify with official university websites</strong> before making decisions.
                                    </li>
                                    <li>
                                        Admission requirements, fees, and program availability can change at any time.
                                    </li>
                                    <li>
                                        Rankings are subjective and vary across different ranking systems.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Match Scores</h2>
                            <div className="bg-white border border-secondary-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 text-secondary-700 space-y-3">
                                    <li>
                                        Match scores are algorithmic assessments based on limited data points. They do not consider:
                                        <ul className="list-circle pl-6 mt-2 space-y-1">
                                            <li>Your unique background, experiences, or extracurriculars</li>
                                            <li>Recommendation letters or essays</li>
                                            <li>Interview performance</li>
                                            <li>University-specific priorities or quotas</li>
                                        </ul>
                                    </li>
                                    <li>
                                        A high match score does NOT guarantee admission. A low score does NOT mean you shouldn't apply.
                                    </li>
                                    <li>
                                        Use match scores as ONE of many factors in your decision-making process.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Visa and Immigration</h2>
                            <div className="bg-white border border-secondary-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 text-secondary-700 space-y-3">
                                    <li>
                                        Visa risk assessments are based on historical data and general trends.
                                    </li>
                                    <li>
                                        <strong>Immigration policies change frequently.</strong> Always consult official government websites and immigration attorneys.
                                    </li>
                                    <li>
                                        We cannot predict individual visa outcomes.
                                    </li>
                                    <li>
                                        Post-study work rights and pathways to residency vary by country and change regularly.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Verified Admits Data</h2>
                            <div className="bg-white border border-secondary-200 rounded-lg p-6">
                                <ul className="list-disc pl-6 text-secondary-700 space-y-3">
                                    <li>
                                        Admit/reject data is user-submitted and verified to the best of our ability, but authenticity cannot be 100% guaranteed.
                                    </li>
                                    <li>
                                        Past admission decisions do not predict future outcomes.
                                    </li>
                                    <li>
                                        Universities consider holistic profiles - similar academic stats do not guarantee similar results.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. No Liability</h2>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <p className="text-red-800 font-semibold mb-3">
                                    We are NOT LIABLE for:
                                </p>
                                <ul className="list-disc pl-6 text-red-700 space-y-2">
                                    <li>Admission rejections based on reliance on our match scores</li>
                                    <li>Financial losses from education investments</li>
                                    <li>Visa rejections or immigration issues</li>
                                    <li>Changes in university policies or costs</li>
                                    <li>Employment outcomes or salary expectations</li>
                                    <li>Outdated or inaccurate data despite best efforts</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Our Recommendation</h2>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <p className="text-green-800 font-semibold mb-3">
                                    ✅ Use this platform as ONE tool in your decision-making arsenal:
                                </p>
                                <ul className="list-disc pl-6 text-green-700 space-y-2">
                                    <li>Cross-reference all data with official sources</li>
                                    <li>Consult with certified education advisors</li>
                                    <li>Speak with current students and alumni</li>
                                    <li>Consider your personal goals beyond financial ROI</li>
                                    <li>Get professional advice for visa and financial planning</li>
                                </ul>
                            </div>
                        </section>

                        <div className="text-center mt-12 p-6 bg-primary-50 rounded-lg">
                            <p className="text-secondary-700">
                                By using this platform, you acknowledge that you have read and understood this disclaimer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
