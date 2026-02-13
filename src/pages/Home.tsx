import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProblemSection from '@/components/home/ProblemSection';
import SolutionSection from '@/components/home/SolutionSection';
import ProductPreview from '@/components/home/ProductPreview';
import HowItWorks from '@/components/home/HowItWorks';
import TrustSection from '@/components/home/TrustSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Navbar />
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <ProductPreview />
            <HowItWorks />
            <TrustSection />
            <FinalCTA />
            <Footer />
        </div>
    );
}
