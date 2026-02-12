import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-8">Terms of Service</h1>

                    <div className="prose max-w-none">
                        <p className="text-secondary-600 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-secondary-700">
                                By accessing or using the Study Abroad Intelligence Platform, you agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Description of Service</h2>
                            <p className="text-secondary-700 mb-4">
                                Our platform provides:
                            </p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>University comparison and match score calculations</li>
                                <li>ROI analysis and financial projections</li>
                                <li>Verified admit data browsing</li>
                                <li>Application tracking tools</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. User Responsibilities</h2>
                            <p className="text-secondary-700 mb-4">You agree to:</p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>Provide accurate and truthful information</li>
                                <li>Maintain the confidentiality of your account credentials</li>
                                <li>Not misuse the platform or upload malicious content</li>
                                <li>Verify all information with official university sources</li>
                                <li>Not scrape or systematically collect data from the platform</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Disclaimer of Warranties</h2>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-4">
                                <p className="text-yellow-900 font-semibold mb-2">IMPORTANT:</p>
                                <ul className="list-disc pl-6 text-yellow-800 space-y-2">
                                    <li>
                                        Match scores and ROI projections are estimates based on historical data and may not reflect actual outcomes
                                    </li>
                                    <li>We do not guarantee admission to any university</li>
                                    <li>Salary projections are not guarantees of future employment or income</li>
                                    <li>University data may become outdated - always verify with official sources</li>
                                    <li>We are not responsible for changes in visa policies or admission requirements</li>
                                </ul>
                            </div>
                            <p className="text-secondary-700">
                                THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Limitation of Liability</h2>
                            <p className="text-secondary-700">
                                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.
                                Our total liability shall not exceed $100 USD.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. No Professional Advice</h2>
                            <p className="text-secondary-700">
                                This platform provides information, not professional advice. We are not a licensed education consultant, financial advisor, or legal advisor.
                                Consult certified professionals for personalized guidance.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. User Content</h2>
                            <p className="text-secondary-700 mb-4">
                                When you upload admit letters or other content:
                            </p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>You grant us a license to display anonymized versions of your data</li>
                                <li>You represent that you own the rights to the content</li>
                                <li>We may remove content that violates our policies</li>
                                <li>Sensitive information may be blurred for privacy</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Termination</h2>
                            <p className="text-secondary-700">
                                We may terminate or suspend your account at any time for violations of these terms. You may delete your account at any time through settings.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Changes to Terms</h2>
                            <p className="text-secondary-700">
                                We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">10. Governing Law</h2>
                            <p className="text-secondary-700">
                                These terms shall be governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">11. Contact</h2>
                            <p className="text-secondary-700">
                                For questions about these Terms of Service, contact:{' '}
                                <a href="mailto:legal@studyabroad.com" className="text-primary-600 hover:underline">
                                    legal@studyabroad.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
