import { useEffect, useState } from 'react';

interface CloudProps {
    width: number;
    height: number;
    top: number;
    speed: number;
    opacity: number;
    delay?: number;
}

const Cloud = ({ width, height, top, speed, opacity, delay = 0 }: CloudProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none cloud-scroll"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                top: `${top}%`,
                background: `rgba(255, 255, 255, ${opacity})`,
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.2)', // signature chunky pixel shadow
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`,
            }}
        />
    );
};

export const MinecraftSky = () => {
    // Generate an array of clouds once on mount using state to trigger re-render
    const [clouds, setClouds] = useState<CloudProps[]>([]);

    useEffect(() => {
        const newClouds: CloudProps[] = [];

        // Generate multiple layers of clouds with varying sizes, speeds, and opacities
        // to create a rich parallax effect.
        for (let i = 0; i < 15; i++) {
            // Front large clouds (fastest, most opaque)
            newClouds.push({
                width: Math.random() * 200 + 150,
                height: Math.random() * 40 + 20,
                top: Math.random() * 40 + 5, // keep mostly in the top half
                speed: Math.random() * 60 + 40,
                opacity: Math.random() * 0.15 + 0.1,
                delay: Math.random() * 100, // Stagger uniformly
            });

            // Mid background clouds
            newClouds.push({
                width: Math.random() * 150 + 80,
                height: Math.random() * 30 + 15,
                top: Math.random() * 50 + 10,
                speed: Math.random() * 90 + 70,
                opacity: Math.random() * 0.1 + 0.05,
                delay: Math.random() * 100,
            });

            // Far background clouds (slowest, faint)
            newClouds.push({
                width: Math.random() * 100 + 50,
                height: Math.random() * 20 + 10,
                top: Math.random() * 60,
                speed: Math.random() * 150 + 120,
                opacity: Math.random() * 0.05 + 0.02,
                delay: Math.random() * 100,
            });
        }
        setClouds(newClouds);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a1b26] pointer-events-none select-none minecraft-sky-container">
            {/* Base night/dark sky gradient overlay to keep it feeling retro/cool and not overly bright */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#161622]/80 to-transparent z-[1]" />

            <style>
                {`
                @keyframes cloudScrollX {
                    from { transform: translateX(110vw); }
                    to { transform: translateX(-150vw); }
                }

                .cloud-scroll {
                    animation-name: cloudScrollX;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    z-index: 0;
                    right: 0; /* Align right to start */
                }

                .minecraft-sky-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <div className="relative w-full h-full">
                {clouds.map((cloud, index) => (
                    <Cloud key={index} {...cloud} />
                ))}
            </div>
        </div>
    );
};
