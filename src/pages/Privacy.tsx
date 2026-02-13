import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
                    <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                    {[
                        { title: '1. Information We Collect', content: 'We collect information you provide directly to us, including: account information (name, email), academic profile (CGPA, IELTS scores, budget), and university preferences.' },
                        { title: '2. How We Use Your Information', content: 'We use the information to provide personalized university match scores, calculate ROI projections, and improve our platform.' },
                        { title: '3. Information Sharing', content: 'We DO NOT sell, rent, or share your personal information with third parties for marketing purposes.' },
                        { title: '4. Data Security', content: 'We implement appropriate security measures to protect your personal information, including encrypted connections and regular security audits.' },
                        { title: '5. Your Rights', content: 'You have the right to access your personal data, correct inaccurate information, and request deletion of your account.' },
                        { title: '6. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at privacy@uwai.ai' },
                    ].map(section => (
                        <section key={section.title} className="mb-8">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{section.title}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{section.content}</p>
                        </section>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
