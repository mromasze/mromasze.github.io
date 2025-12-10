'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                    © {currentYear} Michał Romaszewski. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <a 
                        href="https://github.com/mromasze" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                        GitHub
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/michał-romaszewski-bb9b94275/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
