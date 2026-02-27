import { useEffect, useState } from 'react';

interface ParticleProps {
    width: number;
    height: number;
    left: number;
    top: number;
    speed: number;
    opacity: number;
    delay: number;
}

const EndermanParticle = ({ width, height, left, top, speed, opacity, delay }: ParticleProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none end-particle"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: `${top}%`,
                background: `rgba(168, 85, 247, ${opacity})`, // Purple-500 equivalent
                boxShadow: '0 0 6px 1px rgba(168, 85, 247, 0.4)', // Faint purple glow
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

export const MinecraftEnd = () => {
    const [particles, setParticles] = useState<ParticleProps[]>([]);

    useEffect(() => {
        const newParticles: ParticleProps[] = [];

        for (let i = 0; i < 40; i++) {
            newParticles.push({
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: Math.random() * 100,
                top: Math.random() * 100,
                speed: Math.random() * 12 + 8, // Medium floating speed
                opacity: Math.random() * 0.6 + 0.1,
                delay: Math.random() * 20,
            });
        }
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none select-none minecraft-end-container">
            {/* Very faint dark purple gradient from the bottom to simulate the void edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100020]/60 to-transparent z-[1]" />

            <style>
                {`
                @keyframes endFloat {
                    0% { 
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: var(--tw-bg-opacity, 1);
                    }
                    50% { 
                        transform: translate(${Math.random() > 0.5 ? '20px' : '-20px'}, -30px) scale(0.8);
                    }
                    90% {
                        opacity: 1;
                    }
                    100% { 
                        transform: translate(${Math.random() > 0.5 ? '-20px' : '20px'}, -60px) scale(1.2);
                        opacity: 0;
                    }
                }

                .end-particle {
                    animation-name: endFloat;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                    z-index: 0;
                }

                .minecraft-end-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <div className="relative w-full h-full">
                {particles.map((particle, index) => (
                    <EndermanParticle key={index} {...particle} />
                ))}
            </div>
        </div>
    );
};
