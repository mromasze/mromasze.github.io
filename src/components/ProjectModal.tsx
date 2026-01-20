'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';

interface Project {
    key: string;
    type: string;
    tech: string[];
    github?: string;
    live?: string;
    image: string;
    screenshotUrls?: string[];
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const t = useTranslations('Projects');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer z-40"
                    />

                    {/* Modal Content - Compact Bento Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl z-50 pointer-events-none max-h-[90vh] flex flex-col"
                    >
                        <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-4 gap-3 w-full h-full overflow-y-auto md:overflow-hidden p-1">
                            
                            {/* 1. Header Tile */}
                            <div className="md:col-span-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
                                
                                <div className="relative w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl p-2 flex-shrink-0 border border-gray-200 dark:border-gray-700">
                                    <Image
                                        src={project.image}
                                        alt={t(project.key)}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{t(project.key)}</h2>
                                    <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-500/20 mt-1">
                                        {t(`type_${project.type}`)}
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* 2. Actions Tile */}
                            <div className="md:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex flex-col justify-center gap-2 shadow-lg">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors w-full border border-gray-200 dark:border-gray-700"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors w-full shadow-sm"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>

                            {/* 3. Description Tile */}
                            <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col overflow-y-auto max-h-[200px] md:max-h-[250px] custom-scrollbar">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 sticky top-0 bg-white dark:bg-gray-900 py-1">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    About
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-snug text-sm">
                                    {t(`${project.key}LongDesc`)}
                                </p>
                            </div>

                            {/* 4. Technologies Tile */}
                            <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-1.5 content-start overflow-y-auto max-h-[180px] custom-scrollbar">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-700"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Gallery Tile */}
                            <div className="md:col-span-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-lg flex flex-col min-h-[220px]">
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Gallery
                                </h3>
                                
                                {project.screenshotUrls && project.screenshotUrls.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
                                        {project.screenshotUrls.map((url, idx) => (
                                            <div key={idx} className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-sm">
                                                <Image
                                                    src={url}
                                                    alt={`${t(project.key)} screenshot ${idx + 1}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                                        <div className="flex items-center gap-2 text-amber-500/80 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            <span className="font-bold text-xs uppercase tracking-wider">NDA Restricted</span>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-center text-xs max-w-sm">
                                            {t('noScreenshots')}
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
