import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary-900 text-white mt-20">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-xl font-bold">StudyAbroad</span>
                        </div>
                        <p className="text-secondary-400 text-sm">
                            Commission-neutral, data-driven platform for transparent study abroad decisions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/universities" className="text-secondary-400 hover:text-white transition-colors">
                                    Browse Universities
                                </Link>
                            </li>
                            <li>
                                <Link href="/admits" className="text-secondary-400 hover:text-white transition-colors">
                                    Verified Admits
                                </Link>
                            </li>
                            <li>
                                <Link href="/roi-calculator" className="text-secondary-400 hover:text-white transition-colors">
                                    ROI Calculator
                                </Link>
                            </li>
                            <li>
                                <Link href="/transparency" className="text-secondary-400 hover:text-white transition-colors">
                                    Our Transparency
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/about" className="text-secondary-400 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-secondary-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-secondary-400 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="text-secondary-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-secondary-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/disclaimer" className="text-secondary-400 hover:text-white transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-sm text-secondary-400">
                    <p>&copy; {new Date().getFullYear()} StudyAbroad Intelligence Platform. All rights reserved.</p>
                    <p className="mt-2">
                        <span className="font-medium text-primary-400">100% Commission-Free</span> • Data-Driven • Transparent
                    </p>
                </div>
            </div>
        </footer>
    );
}
