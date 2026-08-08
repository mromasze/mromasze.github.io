'use client';

import { useLocale } from '@/contexts/LocaleContext';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    const tabs = [
        { id: 'pl', label: 'PL' },
        { id: 'en', label: 'EN' },
    ];

    return (
        <div className="flex space-x-1 rounded-full bg-gray-200/70 dark:bg-gray-800/50 p-1 border border-gray-300/60 dark:border-gray-700/50 backdrop-blur-sm">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setLocale(tab.id)}
                    className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                        locale === tab.id
                            ? 'text-white'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                >
                    {locale === tab.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-blue-600 rounded-full"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}