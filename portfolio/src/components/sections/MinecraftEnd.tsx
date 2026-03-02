import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
    width: number;
    height: number;
    left: number;
    top: number;
    speed: number;
    opacity: number;
    delay: number;
    color: string;
    glow: string;
}

const endColors = [
    { bg: '#d63384', glow: 'rgba(214, 51, 132, 0.8)' },  // Magenta
    { bg: '#a855f7', glow: 'rgba(168, 85, 247, 0.8)' },  // Purple
    { bg: '#7c3aed', glow: 'rgba(124, 58, 237, 0.8)' },  // Violet
    { bg: '#c084fc', glow: 'rgba(192, 132, 252, 0.7)' },  // Light Purple
    { bg: '#e879f9', glow: 'rgba(232, 121, 249, 0.7)' },  // Pink-Purple
];

const EndermanParticle = ({ width, height, left, top, speed, opacity, delay, color, glow }: ParticleProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none end-particle"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: color,
                opacity: opacity,
                boxShadow: `0 0 10px 3px ${glow}`,
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

const EndPortalGlow = () => {
    return (
        <motion.div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.25) 0%, rgba(124, 58, 237, 0.1) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
    );
};

const EndPortalRing = () => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none"
            style={{
                width: '300px',
                height: '300px',
                border: '3px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.2), inset 0 0 30px rgba(168, 85, 247, 0.1)',
            }}
            animate={{ rotate: 360, scale: [0.8, 1.1, 0.8] }}
            transition={{
                rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
        />
    );
};

export const MinecraftEnd = () => {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    useEffect(() => {
        const newParticles: ParticleProps[] = [];

        for (let i = 0; i < 50; i++) {
            const c = endColors[Math.floor(Math.random() * endColors.length)];
            newParticles.push({
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
                left: Math.random() * 100,
                top: Math.random() * 100,
                speed: Math.random() * 10 + 6,
                opacity: Math.random() * 0.7 + 0.3,
                delay: Math.random() * 20,
                color: c.bg,
                glow: c.glow,
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0d0015] pointer-events-none select-none minecraft-end-container">
            {/* Vibrant purple-to-dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0030]/90 via-[#0d0015] to-[#2e1065]/50 z-[1]" />

            {/* Multiple radial glows for the void */}
            <div className="absolute inset-0 z-[2] opacity-40"
                style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(168, 85, 247, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(214, 51, 132, 0.15) 0%, transparent 40%), radial-gradient(ellipse at 75% 60%, rgba(124, 58, 237, 0.2) 0%, transparent 45%)' }} />

            <style>
                {`
                @keyframes endFloat {
                    0% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    50% { 
                        transform: translate(20px, -30px) scale(0.8);
                    }
                    90% {
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(-20px, -60px) scale(1.2);
                        opacity: 0;
                    }
                }

                .end-particle {
                    animation-name: endFloat;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                    z-index: 3;
                }

                .minecraft-end-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <EndPortalGlow />
            <EndPortalRing />

            <div className="relative w-full h-full z-[3]">
                {particles.map((particle, index) => (
                    <EndermanParticle key={index} {...particle} />
                ))}
            </div>
        </div>
    );
};
