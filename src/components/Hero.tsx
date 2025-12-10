'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
            {/* Modern animated background gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-black"></div>
            
            {/* Subtle overlay texture */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div> 
            {/* Note: If grid.svg doesn't exist, it will just be transparent, which is fine. The gradient carries the weight. */}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Backlight effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight">
                        {t('greeting')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            {t('name')}
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 mb-10 h-[40px] flex justify-center items-center"
                >
                    <Typewriter
                        options={{
                            strings: [t('subtitle')],
                            autoStart: true,
                            loop: false,
                            delay: 50,
                            deleteSpeed: Infinity, // Prevent deletion
                            cursor: '|',
                            wrapperClassName: "text-blue-200 font-medium",
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
                        className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                    >
                        {t('projectsButton')}
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-full font-medium transition-all duration-300 hover:bg-white/5"
                    >
                        {t('contactButton')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
}