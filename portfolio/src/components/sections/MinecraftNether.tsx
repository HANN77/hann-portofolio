import { useEffect, useState } from 'react';

interface EmberProps {
    width: number;
    height: number;
    left: number;
    speed: number;
    opacity: number;
    delay: number;
}

const Ember = ({ width, height, left, speed, opacity, delay }: EmberProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none ember-rise"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                background: `rgba(255, 165, 0, ${opacity})`, // Orange ember
                boxShadow: '0 0 10px 2px rgba(255, 69, 0, 0.6)', // Red/Orange glow
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

export const MinecraftNether = () => {
    const [embers, setEmbers] = useState<EmberProps[]>([]);

    useEffect(() => {
        const newEmbers: EmberProps[] = [];

        for (let i = 0; i < 35; i++) {
            newEmbers.push({
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                left: Math.random() * 100,
                speed: Math.random() * 10 + 5, // Fast rising
                opacity: Math.random() * 0.8 + 0.2, // Bright embers
                delay: Math.random() * 10,
            });
        }
        setEmbers(newEmbers);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#2a0000] pointer-events-none select-none minecraft-nether-container">
            {/* Intense heat gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4a0000]/80 to-[#1a0000]/90 z-[1]" />

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
                    z-index: 0;
                    bottom: -10%; /* Start slightly below the container */
                }

                .minecraft-nether-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <div className="relative w-full h-full">
                {embers.map((ember, index) => (
                    <Ember key={index} {...ember} />
                ))}
            </div>
        </div>
    );
};
