'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const spring = { damping: 28, stiffness: 420, mass: 0.35 };

export default function CyberCursor() {
    const pointerX = useMotionValue(-100);
    const pointerY = useMotionValue(-100);
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);

    useEffect(() => {
        const handlePointerMove = (event: PointerEvent) => {
            pointerX.set(event.clientX);
            pointerY.set(event.clientY);
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', handlePointerMove);
    }, [pointerX, pointerY]);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-7 w-7 rounded-full border border-blue-400/80 shadow-[0_0_16px_rgba(59,130,246,0.75)] md:block"
            style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        >
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
        </motion.div>
    );
}
