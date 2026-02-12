import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>

                    <div className="prose max-w-none">
                        <p className="text-secondary-600 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Information We Collect</h2>
                            <p className="text-secondary-700 mb-4">
                                We collect information you provide directly to us, including:
                            </p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>Account information (name, email, password)</li>
                                <li>Academic profile (CGPA, IELTS scores, budget)</li>
                                <li>University preferences and application tracking data</li>
                                <li>Uploaded documents (admit/reject letters)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. How We Use Your Information</h2>
                            <p className="text-secondary-700 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>Provide personalized university match scores</li>
                                <li>Calculate ROI projections based on your profile</li>
                                <li>Allow you to track your applications</li>
                                <li>Display verified admit data (anonymized)</li>
                                <li>Improve our platform and services</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Information Sharing</h2>
                            <p className="text-secondary-700 mb-4">
                                We DO NOT sell, rent, or share your personal information with third parties for marketing purposes.
                            </p>
                            <p className="text-secondary-700">
                                We may share anonymized, aggregated data (e.g., admit statistics) to help other students make informed decisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Data Security</h2>
                            <p className="text-secondary-700">
                                We implement appropriate security measures to protect your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2 mt-4">
                                <li>Encrypted password storage</li>
                                <li>Secure HTTPS connections</li>
                                <li>Regular security audits</li>
                                <li>Limited employee access to personal data</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Your Rights</h2>
                            <p className="text-secondary-700 mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 text-secondary-700 space-y-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your account and data</li>
                                <li>Opt-out of certain data processing</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Cookies</h2>
                            <p className="text-secondary-700">
                                We use essential cookies for authentication and session management. We do not use tracking cookies or third-party analytics.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Children's Privacy</h2>
                            <p className="text-secondary-700">
                                Our platform is intended for users 16 years and older. We do not knowingly collect information from children under 16.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Changes to This Policy</h2>
                            <p className="text-secondary-700">
                                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Contact Us</h2>
                            <p className="text-secondary-700">
                                If you have questions about this Privacy Policy, please contact us at:{' '}
                                <a href="mailto:privacy@studyabroad.com" className="text-primary-600 hover:underline">
                                    privacy@studyabroad.com
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
