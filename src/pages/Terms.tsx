import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <div className="pt-24 pb-12">
                <div className="container-custom max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
                    <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                    {[
                        { title: '1. Acceptance of Terms', content: 'By accessing or using the Study Abroad Intelligence Platform, you agree to be bound by these Terms of Service and our Privacy Policy.' },
                        { title: '2. Description of Service', content: 'Our platform provides university comparison and match score calculations, ROI analysis and financial projections, and application tracking tools.' },
                        { title: '3. User Responsibilities', content: 'You agree to provide accurate and truthful information, maintain the confidentiality of your account, and verify all information with official university sources.' },
                        { title: '4. Disclaimer of Warranties', content: 'Match scores and ROI projections are estimates based on historical data and may not reflect actual outcomes. We do not guarantee admission to any university. The platform is provided as-is without warranties of any kind.' },
                        { title: '5. Limitation of Liability', content: 'We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.' },
                        { title: '6. No Professional Advice', content: 'This platform provides information, not professional advice. We are not a licensed education consultant, financial advisor, or legal advisor.' },
                        { title: '7. Contact', content: 'For questions about these Terms of Service, contact legal@uwai.ai' },
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
