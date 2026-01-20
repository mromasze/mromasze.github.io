'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Navbar');
    
    const navLinks = ['about', 'skills', 'projects', 'contact'];

    return (
        <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <a href="#hero" className="text-2xl font-bold text-blue-600 dark:text-blue-500">mromasze</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200 font-medium"
                            >
                                {t(link)}
                            </a>
                        ))}
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 ml-4"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link}`}
                                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                {t(link)}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
