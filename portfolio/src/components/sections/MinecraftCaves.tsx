import { useEffect, useState } from 'react';

interface DustProps {
    width: number;
    height: number;
    left: number;
    top: number;
    speed: number;
    opacity: number;
    delay: number;
    color: string;
}

const colors = [
    '#ff5555', // Redstone
    '#5555ff', // Lapis
    '#55ffff', // Diamond
    '#1cf363', // Emerald
    '#fce205', // Gold
];

const Dust = ({ width, height, left, top, speed, opacity, delay, color }: DustProps) => {
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
                boxShadow: `0 0 8px 1px ${color}`, // glowing effect
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

export const MinecraftCaves = () => {
    const [dusts, setDusts] = useState<DustProps[]>([]);

    useEffect(() => {
        const newDusts: DustProps[] = [];

        for (let i = 0; i < 40; i++) {
            newDusts.push({
                width: Math.random() * 4 + 2, // 2px to 6px (very small dust)
                height: Math.random() * 4 + 2,
                left: Math.random() * 100,
                top: Math.random() * 100,
                speed: Math.random() * 10 + 10, // 10s to 20s
                opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
                delay: Math.random() * 20,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        setDusts(newDusts);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1e1e1e] pointer-events-none select-none minecraft-caves-container">
            {/* Deep cave gradient to give depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 to-[#1e1e1e]/60 z-[1]" />

            <style>
                {`
                @keyframes dustFloat {
                    0% { 
                        transform: translateY(0) scale(1);
                        opacity: 0;
                    }
                    25% {
                        opacity: var(--tw-bg-opacity, 1); /* will inherit inline opacity via trick below */
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
                    z-index: 0;
                }

                .minecraft-caves-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <div className="relative w-full h-full">
                {dusts.map((dust, index) => (
                    <Dust key={index} {...dust} />
                ))}
            </div>
        </div>
    );
};
