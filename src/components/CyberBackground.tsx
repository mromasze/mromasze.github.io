'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CyberBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Symbols representing Dev (Full Stack), Science, and Security
    const symbols = ['{ }', '< />', '01', '∫', '≠', '&&', '||', '=>', '⚡', '🔒'];

    // Generate random particles
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // %
        y: Math.random() * 100, // %
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
        scale: 0.5 + Math.random() * 0.5,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* 1. Dark Base Background */}
            <div className="absolute inset-0 bg-gray-950 dark:bg-black transition-colors duration-300" />

            {/* 2. Cyber Grid (Perspective) */}
            <div className="absolute inset-0 opacity-20 dark:opacity-30">
                <div 
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                    style={{ transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(3)' }}
                />
            </div>

            {/* 3. Floating Code/Math Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute text-blue-500/20 dark:text-blue-400/20 font-mono font-bold select-none"
                    style={{
                        left: `${p.x}%`,
                        fontSize: `${p.scale}rem`,
                    }}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ 
                        y: '-10vh', 
                        opacity: [0, 1, 1, 0] 
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                >
                    {p.symbol}
                </motion.div>
            ))}

            {/* 4. Ambient Glows (Cyber/Scientific) */}
            {/* Blue Glow (Tech) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[10s]" />
            {/* Purple Glow (Creative/HipHop) */}
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] mix-blend-screen animate-pulse duration-[7s]" />
            
            {/* 5. Noise Overlay (Urban/Raw Texture) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay"
                 style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                 }}
            />
            
            {/* 6. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>
    );
}
