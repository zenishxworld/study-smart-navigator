'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) setUser(JSON.parse(userStr));

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    const navLinks = [
        { href: '/universities', label: 'Universities' },
        { href: '/roi-calculator', label: 'ROI Calculator' },
        { href: '/admits', label: 'Admits' },
        { href: '/transparency', label: 'Transparency' },
    ];

    const userLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/applications', label: 'Applications' },
        { href: '/profile', label: 'Profile' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-white/80 backdrop-blur-sm'
            }`}>
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SA</span>
                        </div>
                        <span className="text-lg font-bold text-secondary-900">StudyAbroad<span className="text-primary-600">.AI</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'text-primary-600 bg-primary-50'
                                        : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <>
                                {userLinks.map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                                ? 'text-primary-600 bg-primary-50'
                                                : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="w-px h-6 bg-secondary-200" />
                                <span className="text-sm text-secondary-600">{user.fullName?.split(' ')[0]}</span>
                                <button onClick={logout} className="text-sm text-red-500 hover:text-red-700 font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="btn btn-secondary text-sm py-2">Log In</Link>
                                <Link href="/signup" className="btn btn-primary text-sm py-2">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 animate-slide-down">
                        <div className="space-y-1 py-2 border-t border-secondary-100">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium ${pathname === link.href ? 'text-primary-600 bg-primary-50' : 'text-secondary-600'
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {user && userLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-2 rounded-lg text-sm font-medium ${pathname === link.href ? 'text-primary-600 bg-primary-50' : 'text-secondary-600'
                                        }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-2 border-t border-secondary-100">
                                {user ? (
                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 font-medium">
                                        Logout ({user.fullName?.split(' ')[0]})
                                    </button>
                                ) : (
                                    <div className="flex gap-2 px-4">
                                        <Link href="/login" className="btn btn-secondary text-sm py-2 flex-1 text-center" onClick={() => setMenuOpen(false)}>Log In</Link>
                                        <Link href="/signup" className="btn btn-primary text-sm py-2 flex-1 text-center" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
