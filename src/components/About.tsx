'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const t = useTranslations('About');
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    
    // We create a simpler opacity reveal. 
    // As the user scrolls down into the section, the text becomes fully visible.
    const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0.3, 1]);

    return (
        <section id="about" ref={containerRef} className="py-32 bg-gray-950 relative min-h-[80vh] flex items-center">
             {/* Decorative elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">
                        {t('title')}
                    </h2>
                </motion.div>

                <div className="space-y-12 text-center md:text-left">
                     {/* 
                       The "Reading Highlight" effect:
                       We split paragraphs into sentences or keep them as blocks, but we want the feel of "lighting up".
                       A simple way is setting base color to gray and highlighting to white on scroll.
                       Since `useTransform` works on the whole container, let's apply it per paragraph or simply to the whole block 
                       if we want a general fade-in.
                       
                       However, for a "scrollytelling" feel where lines light up one by one, we need more granular control or 
                       just a strong hover effect. The user asked for "highlightuje sie tekst do czytania". 
                       Commonly this means `background-clip: text` with a gradient that moves, OR opacity change based on scroll position.
                       Let's go with the Opacity change on scroll for the whole block to keep it clean but effective.
                     */}
                    
                    {[t('p1'), t('p2'), t('p3')].map((paragraph, i) => (
                        <motion.p
                            key={i}
                            initial={{ opacity: 0.2, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-10% 0px -10% 0px", amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-2xl md:text-4xl font-semibold leading-tight text-gray-200 transition-colors duration-500 hover:text-white"
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    );
}
