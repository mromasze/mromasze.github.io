'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Experience from './Experience';
import PersonalProjects from './PersonalProjects';

const TABS = ['experience', 'personal'] as const;
type Tab = (typeof TABS)[number];

export default function Projects() {
    const t = useTranslations('Projects');
    const [tab, setTab] = useState<Tab>('experience');

    return (
        <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900 relative transition-colors duration-300">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
                >
                    {t('title')}
                </motion.h2>

                {/* Tab switcher */}
                <div className="flex justify-center mb-14">
                    <div
                        role="tablist"
                        aria-label={t('title')}
                        className="inline-flex gap-1 p-1 rounded-full bg-gray-200/70 dark:bg-gray-800/60 border border-gray-300/60 dark:border-gray-700/50 backdrop-blur-sm"
                    >
                        {TABS.map((id) => (
                            <button
                                key={id}
                                role="tab"
                                aria-selected={tab === id}
                                onClick={() => setTab(id)}
                                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                                    tab === id
                                        ? 'text-white'
                                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                            >
                                {tab === id && (
                                    <motion.span
                                        layoutId="projects-tab"
                                        className="absolute inset-0 rounded-full bg-blue-600"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{t(id === 'experience' ? 'tabExperience' : 'tabPersonal')}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div role="tabpanel">
                    {tab === 'experience' ? <Experience /> : <PersonalProjects />}
                </div>
            </div>
        </section>
    );
}
