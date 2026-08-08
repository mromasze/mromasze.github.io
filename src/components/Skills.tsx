'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SkillTree from './SkillTree';

export default function Skills() {
    const t = useTranslations('Skills');

    return (
        <section
            id="skills"
            className="py-24 relative bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-blue-500/5 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-6 text-center"
                >
                    {t('title')}
                </motion.h2>

                {/* The opinion this section is built around */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 text-center"
                >
                    <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                        {t('manifestoTitle')}
                    </h3>
                    <p className="mt-6 text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
                        {t('manifestoLead')}
                    </p>
                    <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {t('manifestoBody')}
                    </p>
                </motion.div>

                {/* Quote — verbatim, with a link to the primary source */}
                <motion.figure
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-16 relative pl-6 md:pl-10 border-l-4 border-blue-500/60 max-w-3xl mx-auto"
                >
                    <span
                        className="absolute -top-6 -left-1 text-7xl leading-none text-blue-500/15 dark:text-blue-400/15 select-none font-serif"
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>
                    <blockquote className="space-y-4">
                        <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-100 italic">
                            &ldquo;{t('quoteLaw')}&rdquo;
                        </p>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 italic">
                            &ldquo;{t('quoteFollow')}&rdquo;
                        </p>
                    </blockquote>
                    <figcaption className="mt-5 text-sm text-gray-500 dark:text-gray-500">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Joel Spolsky</span>
                        {' — '}
                        <a
                            href="https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-dotted underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            {t('quoteSource')}
                        </a>
                    </figcaption>
                </motion.figure>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6 }}
                >
                    <SkillTree />
                    <p className="mt-3 text-center font-mono text-xs text-gray-400 dark:text-gray-600">
                        {t('treeKeyboardHint')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
