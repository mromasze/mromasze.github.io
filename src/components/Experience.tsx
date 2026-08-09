'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Entry = {
    key: string;
    period: string;
    current?: boolean;
    /** Logo from /public/projects, or a monogram is drawn instead. */
    image?: string;
    monogram?: string;
    tech: string[];
    /** Number of `${key}B<n>` bullet messages. */
    bullets: number;
};

const ENTRIES: Entry[] = [
    {
        key: 'expTriumpho',
        period: '03.2026 — ',
        current: true,
        monogram: 'T',
        tech: ['Java 17', 'Spring Boot', 'Keycloak', 'PostgreSQL', 'Flyway', 'Kafka', 'WebSocket', 'Docker', 'Helm', 'Spock'],
        bullets: 3,
    },
    {
        key: 'expIcdz',
        period: '11.2025 — ',
        current: true,
        image: '/projects/uj.svg',
        tech: ['Python', 'FastAPI', 'Next.js', 'Java Spring Boot', 'PostgreSQL', 'MySQL', 'Docker', 'llama.cpp', 'OMOP CDM'],
        bullets: 4,
    },
    {
        key: 'expNzoz',
        period: '12.2025',
        image: '/projects/nzoz.png',
        tech: ['React', 'Next.js', 'Bootstrap', 'Cloudflare'],
        bullets: 2,
    },
    {
        key: 'expElc',
        period: '10.2025 — 01.2026',
        image: '/projects/elc-delivery.svg',
        tech: ['React', 'Java Spring Boot', 'PostgreSQL', 'React Native', 'TypeScript', 'Cloudflare'],
        bullets: 3,
    },
    {
        key: 'expWater',
        period: '',
        image: '/projects/wodociagi.png',
        tech: ['C++', '.NET', 'SQLite'],
        bullets: 2,
    },
];

export default function Experience() {
    const t = useTranslations('Projects');

    return (
        <ol className="relative">
            {/* Timeline spine */}
            <span
                className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/50 via-gray-300 to-transparent dark:via-gray-700 hidden sm:block"
                aria-hidden="true"
            />

            {ENTRIES.map((entry, index) => (
                <motion.li
                    key={entry.key}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
                    className="relative sm:pl-20 pb-12 last:pb-0"
                >
                    {/* Marker */}
                    <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center overflow-hidden shadow-sm">
                        {entry.image ? (
                            <div className="relative w-7 h-7">
                                <Image src={entry.image} alt="" fill className="object-contain" sizes="28px" />
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{entry.monogram}</span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">{t(entry.key)}</h4>
                        {entry.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                <span className="relative flex w-1.5 h-1.5">
                                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                                    <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                </span>
                                {t('ongoingBadge')}
                            </span>
                        )}
                    </div>

                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                        {t(`${entry.key}Role`)}
                        {entry.period && (
                            <span className="text-gray-500 dark:text-gray-500 font-normal">
                                {' · '}
                                {entry.period}
                                {entry.current && t('current')}
                            </span>
                        )}
                    </p>

                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t(`${entry.key}Desc`)}</p>

                    <ul className="space-y-2 mb-5">
                        {Array.from({ length: entry.bullets }, (_, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" aria-hidden="true">
                                    ▹
                                </span>
                                <span className="leading-relaxed">{t(`${entry.key}B${i + 1}`)}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                        {entry.tech.map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-0.5 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded text-xs font-medium border border-gray-200 dark:border-gray-600/30"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}
