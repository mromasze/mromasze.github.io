'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Reading progress for the whole page, drawn along the bottom edge of the navbar so it
 * reads as part of the chrome rather than as another floating element.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            style={{ scaleX }}
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400"
            aria-hidden="true"
        />
    );
}
