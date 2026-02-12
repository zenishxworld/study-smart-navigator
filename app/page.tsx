'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-primary-50 to-blue-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
                            🎓 100% Commission-Free • Data-Driven • Transparent
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 animate-slide-up">
                            Make Smarter Study Abroad Decisions
                        </h1>
                        <p className="text-xl text-secondary-600 mb-8 animate-slide-up">
                            Stop relying on consultants with conflicts of interest. Our AI-powered platform gives you
                            transparent, ROI-based university rankings tailored to your profile.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                            <Link href="/signup" className="btn btn-primary text-lg px-8 py-3">
                                Get Started Free
                            </Link>
                            <Link href="/universities" className="btn btn-outline text-lg px-8 py-3">
                                Browse Universities
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
                                <div className="text-sm text-secondary-600">Top Universities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">0%</div>
                                <div className="text-sm text-secondary-600">Commission</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
                                <div className="text-sm text-secondary-600">Transparent</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary-900 mb-4">Why Choose Our Platform?</h2>
                        <p className="text-lg text-secondary-600">Data-driven insights without hidden agendas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Match Score Engine</h3>
                            <p className="text-secondary-600">
                                Get personalized university rankings based on your CGPA, IELTS, budget, and career goals.
                                40% Academic Fit + 30% Budget + 20% ROI + 10% Visa Risk.
                            </p>
                        </div>

                        <div className="card text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">ROI Calculator</h3>
                            <p className="text-secondary-600">
                                Compare universities with break-even analysis, loan simulations, and 5-year net gain projections.
                                Make financially intelligent decisions.
                            </p>
                        </div>

                        <div className="card text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Verified Admits</h3>
                            <p className="text-secondary-600">
                                Browse real admit/reject data from students with similar profiles. Filter by CGPA, IELTS,
                                country, and program.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-secondary-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary-900 mb-4">How It Works</h2>
                        <p className="text-lg text-secondary-600">Four simple steps to smarter decisions</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '1', title: 'Create Profile', desc: 'Enter your CGPA, IELTS, and budget' },
                            { step: '2', title: 'Get Matches', desc: 'Receive personalized university rankings' },
                            { step: '3', title: 'Compare ROI', desc: 'Analyze financial outcomes side-by-side' },
                            { step: '4', title: 'Track Applications', desc: 'Manage your application journey' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-secondary-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Make Data-Driven Decisions?</h2>
                    <p className="text-xl mb-8 opacity-90">Join students who chose transparency over commissions</p>
                    <Link href="/signup" className="btn bg-white text-primary-600 hover:bg-secondary-50 text-lg px-8 py-3 inline-block">
                        Sign Up Free - No Credit Card Required
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
