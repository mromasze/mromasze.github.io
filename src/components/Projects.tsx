'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Projects() {
    const t = useTranslations('Projects');

    // Projects ordered: ssVault, Health Data Center, TAccess, ELC Delivery, NZOZ, Water Analysis
    const projects = [
        {
            key: 'ssVault',
            type: 'opensource',
            tech: ['JavaScript', 'Electron', 'Bootstrap', 'SQLCipher'],
            github: 'https://github.com/mromasze/ssVault',
            live: 'https://mromasze.github.io/ssVault/',
            image: '/projects/ss-vault.svg',
            screenshots: true,
        },
        {
            key: 'healthDataCenter',
            type: 'scientific',
            tech: ['Python', 'Java Spring Boot', 'Thymeleaf', 'Spring Security', 'Bootstrap'],
            image: '/projects/uj.svg',
            screenshots: true,
        },
        {
            key: 'tAccess',
            type: 'opensource',
            tech: ['Java', 'React', 'PostgreSQL', 'Telegram API'],
            // Assuming open source implies GitHub link availability, adding placeholder if known, else standard handling
            image: '/projects/tg.svg',
            screenshots: false,
        },
        {
            key: 'elcDelivery',
            type: 'commercial',
            tech: ['React', 'Java Spring Boot', 'Bootstrap', 'PostgreSQL', 'React Native', 'TypeScript', 'Cloudflare', 'OpenMapAPI'],
            live: 'http://37.59.114.253/',
            image: '/projects/elc-delivery.svg',
            screenshots: true,
        },
        {
            key: 'nzoz',
            type: 'commercial',
            tech: ['React', 'Next.js', 'Bootstrap', 'Cloudflare'],
            live: 'https://nzozsrodmiescie.pl/',
            image: '/projects/nzoz.png',
            screenshots: true,
        },
        {
            key: 'waterAnalysis',
            type: 'scientific',
            tech: ['C++', '.NET', 'SQLite'],
            image: '/projects/wodociagi.png',
            screenshots: false,
        },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'commercial': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            case 'opensource': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            case 'scientific': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
            default: return 'bg-gray-700 text-gray-300';
        }
    };

    return (
        <section id="projects" className="py-20 bg-gray-900 relative">
             <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-center mb-16 text-white"
                >
                    {t('title')}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col group relative overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300 p-2">
                                     <div className="relative w-full h-full">
                                        <Image 
                                            src={project.image} 
                                            alt={t(`${project.key}Desc`)} 
                                            fill 
                                            className="opacity-70 group-hover:opacity-100 object-contain" 
                                            sizes="48px"
                                        />
                                     </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(project.type)}`}>
                                    {t(`type_${project.type}`)}
                                </span>
                            </div>
                            
                            <div className="flex-grow relative z-10">
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{t(project.key)}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed text-sm">{t(`${project.key}Desc`)}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                {project.tech.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-0.5 bg-gray-700/50 text-gray-300 rounded text-xs font-medium border border-gray-600/30"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-auto pt-4 border-t border-gray-700/50 relative z-10">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1 font-medium"
                                    >
                                        Website
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
