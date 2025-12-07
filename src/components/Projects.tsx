'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Projects() {
    const t = useTranslations('Projects');

    const projects = [
        {
            key: 'ssVault',
            tech: ['JavaScript', 'Electron', 'Bootstrap', 'SQLCipher'],
            github: 'https://github.com/mromasze/ssVault',
            live: 'https://mromasze.github.io/ssVault/',
            image: '/file.svg',
            screenshots: true,
        },
        {
            key: 'elcDelivery',
            tech: ['React', 'Java Spring Boot', 'Bootstrap', 'PostgreSQL', 'React Native', 'TypeScript', 'Cloudflare', 'OpenMapAPI'],
            live: 'http://37.59.114.253/',
            image: '/file.svg',
            screenshots: true,
        },
        {
            key: 'healthDataCenter',
            tech: ['Python', 'Java Spring Boot', 'Thymeleaf', 'Spring Security', 'Bootstrap'],
            image: '/file.svg',
            screenshots: true,
        },
        {
            key: 'nzoz',
            tech: ['React', 'Next.js', 'Bootstrap', 'Cloudflare'],
            live: 'https://nzozsrodmiescie.pl/',
            image: '/file.svg',
            screenshots: true,
        },
        {
            key: 'waterAnalysis',
            tech: ['C++', '.NET', 'SQLite'],
            image: '/file.svg',
            screenshots: false,
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center mb-12">{t('title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.key}
                            className="bg-gray-800 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-200 flex flex-col"
                        >
                            <div className="flex-shrink-0">
                                <Image src={project.image} alt={t(`${project.key}Desc`)} width={48} height={48} className="rounded-lg mb-4" />
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold mb-3">{t(project.key)}</h3>
                                <p className="text-gray-400 mb-4">{t(`${project.key}Desc`)}</p>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-400"
                                    >
                                        {t('githubButton')}
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-400"
                                    >
                                        {t('liveButton')}
                                    </a>
                                )}
                                {project.screenshots && (
                                    <button className="text-blue-500 hover:text-blue-400">
                                        {t('screenshotsButton')}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
