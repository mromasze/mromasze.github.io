'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import HeroClouds from './HeroClouds';
import CyberBackground from './CyberBackground';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            
            {/* New Cyber Background */}
            <CyberBackground />

            {/* Clouds Layer */}
            <HeroClouds />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 dark:border-blue-500/30 overflow-hidden relative shadow-lg dark:shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-sm">
                        <Image
                            src="/avatar.png"
                            alt="Profile Avatar"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                        {t('greeting')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
                            {t('name')}
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 h-[40px] flex justify-center items-center"
                >
                    <Typewriter
                        options={{
                            strings: [t('subtitle')],
                            autoStart: true,
                            loop: false,
                            delay: 50,
                            deleteSpeed: Infinity, // Prevent deletion
                            cursor: '|',
                            wrapperClassName: "text-blue-600 dark:text-blue-200 font-medium font-mono", // Font mono for code vibe
                        }}
                        onInit={(typewriter) => {
                            typewriter.typeString(t('subtitle'))
                                .callFunction(() => {
                                    // Remove cursor after typing is complete
                                    document.querySelector('.Typewriter__cursor')?.remove();
                                })
                                .start();
                        }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-4 justify-center"
                >
                    <a
                        href="#projects"
                        className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] shadow-lg"
                    >
                        {t('projectsButton')}
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/5 backdrop-blur-sm bg-white/5"
                    >
                        {t('contactButton')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}