import { useEffect, useState } from 'react';

interface LeafProps {
    width: number;
    height: number;
    left: number;
    speed: number;
    opacity: number;
    delay: number;
    rotate: number;
}

const Leaf = ({ width, height, left, speed, opacity, delay, rotate }: LeafProps) => {
    return (
        <div
            className="absolute rounded-none pointer-events-none leaf-fall"
            style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                background: `rgba(46, 139, 87, ${opacity})`, // SeaGreen
                boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)', // signature chunky pixel shadow
                animationDuration: `${speed}s`,
                animationDelay: `-${delay}s`, // start immediately at varied vertical positions
                transform: `rotate(${rotate}deg)`,
            }}
        />
    );
};

export const MinecraftForest = () => {
    // Generate an array of leaves once on mount using state to trigger re-render
    const [leaves, setLeaves] = useState<LeafProps[]>([]);

    useEffect(() => {
        const newLeaves: LeafProps[] = [];

        // Generate multiple layers of leaves with varying sizes, speeds, and opacities
        // to create a rich parallax effect.
        for (let i = 0; i < 25; i++) {
            // Front large leaves (fastest, most opaque)
            newLeaves.push({
                width: Math.random() * 20 + 15,
                height: Math.random() * 20 + 15,
                left: Math.random() * 100,
                speed: Math.random() * 15 + 10,
                opacity: Math.random() * 0.4 + 0.6,
                delay: Math.random() * 20, // Stagger uniformly
                rotate: Math.random() * 360,
            });

            // Mid background leaves
            newLeaves.push({
                width: Math.random() * 15 + 10,
                height: Math.random() * 15 + 10,
                left: Math.random() * 100,
                speed: Math.random() * 20 + 15,
                opacity: Math.random() * 0.3 + 0.3,
                delay: Math.random() * 25,
                rotate: Math.random() * 360,
            });

            // Far background leaves (slowest, faint)
            newLeaves.push({
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: Math.random() * 100,
                speed: Math.random() * 30 + 20,
                opacity: Math.random() * 0.2 + 0.1,
                delay: Math.random() * 30,
                rotate: Math.random() * 360,
            });
        }
        setLeaves(newLeaves);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a2b1a] pointer-events-none select-none minecraft-forest-container">
            {/* Base forest/dirt gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#112211]/80 to-[#221508]/90 z-[1]" />

            <style>
                {`
                @keyframes leafFallY {
                    0% { 
                        transform: translateY(-20vh) rotate(0deg); 
                    }
                    100% { 
                        transform: translateY(120vh) rotate(360deg); 
                    }
                }

                .leaf-fall {
                    animation-name: leafFallY;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    z-index: 0;
                    top: -10%; /* Start slightly above the container */
                }

                .minecraft-forest-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <div className="relative w-full h-full">
                {leaves.map((leaf, index) => (
                    <Leaf key={index} {...leaf} />
                ))}
            </div>
        </div>
    );
};
