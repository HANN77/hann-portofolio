import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EmberProps {
    width: number;
    height: number;
    left: number;
    speed: number;
    opacity: number;
    delay: number;
    color: string;
    glow: string;
}

const emberColors = [
    { bg: '#ff6348', glow: 'rgba(255, 99, 72, 0.8)' },   // Bright red-orange
    { bg: '#ffa502', glow: 'rgba(255, 165, 2, 0.8)' },    // Vibrant orange
    { bg: '#ff4757', glow: 'rgba(255, 71, 87, 0.8)' },    // Crimson
    { bg: '#fffa65', glow: 'rgba(255, 250, 101, 0.7)' },  // Hot yellow
    { bg: '#eccc68', glow: 'rgba(236, 204, 104, 0.6)' },  // Golden
];

const Ember = ({ width, height, left, speed, opacity, delay, color, glow }: EmberProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none ember-rise"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                background: color,
                opacity: opacity,
                boxShadow: `0 0 14px 3px ${glow}`,
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

const LavaPool = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[8%] z-[2] overflow-hidden">
            <motion.div
                className="w-full h-full"
                style={{
                    background: 'linear-gradient(0deg, #ff6348 0%, #ff4757 40%, transparent 100%)',
                    boxShadow: '0 -20px 60px rgba(255, 99, 72, 0.5)',
                }}
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

export const MinecraftNether = () => {
    const [embers, setEmbers] = useState<EmberProps[]>([]);

    useEffect(() => {
        const newEmbers: EmberProps[] = [];

        for (let i = 0; i < 45; i++) {
            const c = emberColors[Math.floor(Math.random() * emberColors.length)];
            newEmbers.push({
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                left: Math.random() * 100,
                speed: Math.random() * 8 + 4,
                opacity: Math.random() * 0.8 + 0.3,
                delay: Math.random() * 10,
                color: c.bg,
                glow: c.glow,
            });
        }
        setEmbers(newEmbers);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a0a00] pointer-events-none select-none minecraft-nether-container">
            {/* Vibrant warm gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#7f1d1d]/80 via-[#450a0a]/60 to-[#1c1917]/80 z-[1]" />

            {/* Warm radial glow from the bottom (lava light) */}
            <div className="absolute inset-0 z-[2] opacity-40"
                style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 99, 72, 0.5) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255, 165, 2, 0.3) 0%, transparent 40%)' }} />

            <style>
                {`
                @keyframes emberRise {
                    0% { 
                        transform: translateY(120vh) rotate(0deg) scale(1.5); 
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% { 
                        transform: translateY(-20vh) rotate(360deg) scale(0.5); 
                        opacity: 0;
                    }
                }

                .ember-rise {
                    animation-name: emberRise;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    z-index: 3;
                    bottom: -10%;
                }

                .minecraft-nether-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <LavaPool />

            <div className="relative w-full h-full z-[3]">
                {embers.map((ember, index) => (
                    <Ember key={index} {...ember} />
                ))}
            </div>
        </div>
    );
};
