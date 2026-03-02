import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface DustProps {
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

const colors = [
    { bg: '#ff6b6b', glow: 'rgba(255, 107, 107, 0.8)' },  // Bright Redstone
    { bg: '#74b9ff', glow: 'rgba(116, 185, 255, 0.8)' },  // Bright Lapis
    { bg: '#55efc4', glow: 'rgba(85, 239, 196, 0.8)' },   // Bright Emerald
    { bg: '#ffeaa7', glow: 'rgba(255, 234, 167, 0.8)' },  // Bright Gold
    { bg: '#a29bfe', glow: 'rgba(162, 155, 254, 0.8)' },  // Amethyst
    { bg: '#00cec9', glow: 'rgba(0, 206, 201, 0.9)' },    // Diamond
];

const Dust = ({ width, height, left, top, speed, opacity, delay, color, glow }: DustProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none dust-float"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: color,
                opacity: opacity,
                boxShadow: `0 0 12px 3px ${glow}`,
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

const CrystalCluster = ({ left, bottom, color, size }: { left: string, bottom: string, color: string, size: number }) => {
    return (
        <motion.div
            className="absolute pointer-events-none z-[2]"
            style={{ left, bottom }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Simple pixelated crystal shape */}
            <div style={{ width: size, height: size * 2, background: color, boxShadow: `0 0 16px 4px ${color}40` }} />
            <div style={{ width: size * 0.6, height: size * 1.5, background: color, position: 'absolute', left: size, bottom: 0, opacity: 0.7 }} />
        </motion.div>
    );
};

export const MinecraftCaves = () => {
    const [dusts, setDusts] = useState<DustProps[]>([]);

    useEffect(() => {
        const newDusts: DustProps[] = [];

        for (let i = 0; i < 50; i++) {
            const c = colors[Math.floor(Math.random() * colors.length)];
            newDusts.push({
                width: Math.random() * 5 + 3,
                height: Math.random() * 5 + 3,
                left: Math.random() * 100,
                top: Math.random() * 100,
                speed: Math.random() * 10 + 8,
                opacity: Math.random() * 0.7 + 0.3,
                delay: Math.random() * 20,
                color: c.bg,
                glow: c.glow,
            });
        }
        setDusts(newDusts);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0f172a] pointer-events-none select-none minecraft-caves-container">
            {/* Vibrant deep cave gradient with teal/blue tones */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#0c4a6e]/60 z-[1]" />

            {/* Subtle radial glow to simulate bioluminescence */}
            <div className="absolute inset-0 z-[2] opacity-30"
                style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(0, 206, 201, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(162, 155, 254, 0.2) 0%, transparent 50%)' }} />

            <style>
                {`
                @keyframes dustFloat {
                    0% { 
                        transform: translateY(0) scale(1);
                        opacity: 0;
                    }
                    25% {
                        opacity: 1;
                    }
                    50% { 
                        transform: translateY(-50px) scale(1.5);
                    }
                    75% {
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(-100px) scale(1);
                        opacity: 0;
                    }
                }

                .dust-float {
                    animation-name: dustFloat;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                    z-index: 3;
                }

                .minecraft-caves-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            {/* Crystal clusters as decorative accents */}
            <CrystalCluster left="10%" bottom="0%" color="#55efc4" size={8} />
            <CrystalCluster left="85%" bottom="0%" color="#a29bfe" size={6} />
            <CrystalCluster left="45%" bottom="0%" color="#00cec9" size={10} />
            <CrystalCluster left="65%" bottom="5%" color="#74b9ff" size={7} />

            <div className="relative w-full h-full z-[3]">
                {dusts.map((dust, index) => (
                    <Dust key={index} {...dust} />
                ))}
            </div>
        </div>
    );
};
