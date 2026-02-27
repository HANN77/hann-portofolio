import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParticleProps {
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
}

const FloatingPollen = () => {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 40 }).map(() => ({
            size: Math.random() > 0.8 ? 4 : 2,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 5 + 3,
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-[#eab308] opacity-60" // Yellow pollen
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        boxShadow: '0 0 4px rgba(234, 179, 8, 0.8)'
                    }}
                    animate={{
                        y: ["-10px", "10px", "-10px"],
                        x: ["-5px", "5px", "-5px"],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const PixelSun = () => {
    return (
        <motion.div
            className="absolute top-8 left-8 md:top-16 md:left-24 pointer-events-none opacity-90 z-0"
            animate={{
                rotate: 360,
            }}
            transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            {/* Minimal CSS Pixel Sun */}
            <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div className="absolute inset-2 bg-yellow-300 rounded-full blur-[4px] opacity-40" />
                <div className="absolute top-[10%] left-[30%] w-[40%] h-[80%] bg-yellow-400 pixel-shadow" />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-yellow-400 pixel-shadow" />
                <div className="absolute top-[30%] left-[10%] w-[80%] h-[40%] bg-yellow-400 pixel-shadow" />

                {/* Sun Rays */}
                <div className="absolute top-[-10%] left-[45%] w-[10%] h-[20%] bg-yellow-300" />
                <div className="absolute bottom-[-10%] left-[45%] w-[10%] h-[20%] bg-yellow-300" />
                <div className="absolute left-[-10%] top-[45%] w-[20%] h-[10%] bg-yellow-300" />
                <div className="absolute right-[-10%] top-[45%] w-[20%] h-[10%] bg-yellow-300" />
            </div>
        </motion.div>
    );
};

export const MinecraftForest = () => {
    // We attach scroll tracking to the window for generic parallax
    // Because this section is in the normal flow, as we scroll down,
    // we can make elements move up/down at different speeds.
    const { scrollY } = useScroll();

    // Parallax values (moves elements slower or faster than the scroll)
    const backgroundY = useTransform(scrollY, [0, 1000], [0, 200]);
    const sunY = useTransform(scrollY, [0, 1000], [0, 300]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none minecraft-forest-container">
            {/* Base Daytime Sky to Forest Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] via-[#E0F6FF] to-[#34D399] z-[1] opacity-90" />

            <style>
                {`
                .minecraft-forest-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <motion.div style={{ y: sunY }} className="absolute inset-0 z-[2]">
                <PixelSun />
            </motion.div>

            <FloatingPollen />

            {/* Simulated Parallax Background Layers could go here */}
            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-[3]">
                {/* Empty for now, but ready for tree silhouettes */}
            </motion.div>
        </div>
    );
};
