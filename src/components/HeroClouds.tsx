'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function HeroClouds() {
    const t = useTranslations('Hero');

    // Define positions using percentages to ensure they stay in corners and scale with screen
    const clouds = [
        // Top Left - Web Development
        { 
            key: 'skills_web', 
            position: 'top-1/4 left-[10%] md:left-[15%]', 
            delay: 0,
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            )
        },
        // Top Right - Desktop Apps
        { 
            key: 'skills_desktop', 
            position: 'top-1/4 right-[10%] md:right-[15%]', 
            delay: 1.5,
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        // Bottom Left - Mobile Apps
        { 
            key: 'skills_mobile', 
            position: 'bottom-1/4 left-[10%] md:left-[15%]', 
            delay: 0.8,
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        // Bottom Right - Security
        { 
            key: 'skills_security', 
            position: 'bottom-1/4 right-[10%] md:right-[15%]', 
            delay: 2.2,
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
            {clouds.map((cloud, index) => (
                <CloudItem
                    key={cloud.key}
                    t={t}
                    item={cloud}
                />
            ))}
        </div>
    );
}

function CloudItem({ t, item }: { t: any, item: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
                duration: 0.8, 
                delay: 0.5 + (item.delay * 0.2),
                type: "spring",
                stiffness: 100
            }}
            className={`absolute z-20 pointer-events-auto ${item.position}`}
        >
             <motion.div
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay // Async floating
                }}
                className="group relative"
            >
                {/* Tech Tag Style */}
                <div className="
                    flex items-center gap-2 px-5 py-2.5 
                    bg-white/5 dark:bg-gray-900/60 backdrop-blur-md 
                    border border-gray-200/20 dark:border-blue-500/30 
                    rounded-lg shadow-lg dark:shadow-[0_0_15px_rgba(59,130,246,0.1)]
                    hover:bg-blue-500/10 dark:hover:bg-blue-500/20 
                    hover:border-blue-400 dark:hover:border-blue-400 
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
                    transition-all duration-300 cursor-pointer
                ">
                    <span className="text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 font-mono text-sm font-semibold tracking-wide">
                        {t(item.key)}
                    </span>
                    
                    {/* Decorative tiny corner accents for "Cyber" feel */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-blue-500/50 rounded-tl-[2px] opacity-50" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-blue-500/50 rounded-br-[2px] opacity-50" />
                </div>

                {/* Tooltip */}
                <div className={`
                    absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 p-3 
                    bg-white dark:bg-gray-900/95 backdrop-blur-xl 
                    rounded-lg shadow-xl opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2
                    transition-all duration-300 pointer-events-none 
                    border border-gray-100 dark:border-gray-700 
                    text-center z-30
                `}>
                     <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-t border-l border-gray-100 dark:border-gray-700"></div>
                     <p className="text-xs text-gray-600 dark:text-gray-300 relative z-10 font-medium">
                         {t(`${item.key}_desc`)}
                     </p>
                </div>
            </motion.div>
        </motion.div>
    );
}