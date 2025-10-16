'use client';

import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './auth/AuthButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-2xl relative">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-purple-400/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 py-6 relative z-10">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-500 group-hover:scale-110 transform">
                                <span className="text-white font-bold text-xl group-hover:animate-pulse">SR</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse group-hover:animate-bounce"></div>
                            {/* Orbiting ring */}
                            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '3s' }}></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-500 group-hover:scale-105 transform">
                                Santiago Ruiz
                            </h1>
                            <p className="text-cyan-200 text-sm font-medium group-hover:text-cyan-100 transition-colors duration-300">
                                Developer
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a
                            href="https://github.com/devsantiagox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-cyan-300 transition-all duration-300 font-medium hover:scale-105 transform relative group"
                        >
                            GitHub
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 group-hover:w-full transition-all duration-300"></div>
                        </a>
                        <AuthButton />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden mt-4 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 space-y-4">
                        <a
                            href="https://github.com/devsantiagox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 text-white hover:text-cyan-300 transition-colors duration-300 font-medium"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span>GitHub</span>
                        </a>
                        <div className="pt-2 border-t border-white/20">
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
