'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';

type Repo = {
    key: string;
    /** Repository name under github.com/mromasze. */
    repo: string;
    language: string;
    tech: string[];
    live?: string;
    /** Only set when a `${key}LongDesc` message exists to fill the modal. */
    details?: { image: string };
};

const LANGUAGE_DOT: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Java: 'bg-orange-600',
    Kotlin: 'bg-purple-500',
    Python: 'bg-emerald-500',
    'C++': 'bg-pink-500',
};

const REPOS: Repo[] = [
    {
        key: 'ssVault',
        repo: 'ssVault',
        language: 'JavaScript',
        tech: ['Electron', 'SQLCipher', 'GPG', 'AES-256'],
        live: 'https://mromasze.github.io/ssVault/',
        details: { image: '/projects/ss-vault.svg' },
    },
    {
        key: 'driperskaLiga',
        repo: 'driperska-liga',
        language: 'Java',
        tech: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Riot API'],
        live: 'https://driperska.pl/',
    },
    {
        key: 'tAccess',
        repo: 'TAccess',
        language: 'Java',
        tech: ['React', 'PostgreSQL', 'Telegram API'],
        details: { image: '/projects/tg.svg' },
    },
    {
        key: 'typengine',
        repo: 'typengine',
        language: 'C++',
        tech: ['TypeScript', 'OpenGL'],
    },
    {
        key: 'universalCli',
        repo: 'universal-cli',
        language: 'TypeScript',
        tech: ['Node.js', 'LLM', 'OpenAI API'],
    },
    {
        key: 'dishAtlas',
        repo: 'DishAtlas',
        language: 'Kotlin',
        tech: ['Jetpack Compose', 'Android'],
    },
    {
        key: 'transitSim',
        repo: 'transit-network-simulation',
        language: 'Python',
        tech: ['NumPy', 'Simulation'],
    },
    {
        key: 'blockchainJava',
        repo: 'Blockchain-Java',
        language: 'Java',
        tech: ['Apache Commons Codec', 'SHA-256'],
    },
];

export default function PersonalProjects() {
    const t = useTranslations('Projects');
    const [selected, setSelected] = useState<Repo | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REPOS.map((repo, index) => (
                    <motion.article
                        key={repo.key}
                        // Animated on mount rather than on scroll: this grid only ever appears
                        // after a tab click, and whileInView would leave the cards below the
                        // fold invisible until the visitor happened to scroll.
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
                        whileHover={{ y: -6 }}
                        className="flex flex-col bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 border border-gray-200 dark:border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-colors duration-300 group"
                    >
                        <div className="flex items-start gap-2 mb-3">
                            <span className="text-gray-400 dark:text-gray-600 shrink-0 mt-0.5" aria-hidden="true">
                                {/* GitHub mark */}
                                <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </span>
                            <h4 className="font-mono text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                                mromasze/<span className="font-bold">{repo.repo}</span>
                            </h4>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                            {t(`${repo.key}Desc`)}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {repo.tech.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-600/30"
                                >
                                    {tech}
                                </span>
                            ))}
                            {repo.tech.length > 3 && (
                                <span className="px-2 py-0.5 text-gray-500 dark:text-gray-400 text-xs">
                                    +{repo.tech.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3 border-t border-gray-200 dark:border-gray-700/50 text-xs">
                            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_DOT[repo.language] ?? 'bg-gray-400'}`}
                                    aria-hidden="true"
                                />
                                {repo.language}
                            </span>
                            <div className="flex items-center gap-3 whitespace-nowrap">
                                {repo.details && (
                                    <button
                                        type="button"
                                        onClick={() => setSelected(repo)}
                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors font-medium"
                                    >
                                        {t('detailsButton')}
                                    </button>
                                )}
                                {repo.live && (
                                    <a
                                        href={repo.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                    >
                                        Live
                                    </a>
                                )}
                                <a
                                    href={`https://github.com/mromasze/${repo.repo}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                                >
                                    GitHub →
                                </a>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
                <a
                    href="https://github.com/mromasze?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    {t('moreOnGithub')}
                </a>
            </p>

            <ProjectModal
                project={
                    selected?.details
                        ? {
                              key: selected.key,
                              type: 'opensource',
                              tech: selected.tech,
                              image: selected.details.image,
                              screenshotUrls: [selected.details.image],
                              github: `https://github.com/mromasze/${selected.repo}`,
                              live: selected.live,
                          }
                        : null
                }
                isOpen={!!selected}
                onClose={() => setSelected(null)}
            />
        </>
    );
}
