import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

const TwinklingStars = () => {
    const [stars, setStars] = useState<{ x: number, y: number, size: number, delay: number, duration: number }[]>([]);

    useEffect(() => {
        const newStars = Array.from({ length: 60 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 70, // Keep stars mostly in the upper 70% of the screen
            size: Math.random() > 0.8 ? 3 : 2, // Mostly 2px, some 3px
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        boxShadow: '0 0 2px rgba(255,255,255,0.8)'
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};

const ShootingStar = () => {
    const [star, setStar] = useState<{ x: number; y: number; delay: number; id: number } | null>(null);

    useEffect(() => {
        const spawnStar = () => {
            setStar({
                x: Math.random() * 60 + 20, // Spawn somewhere in the middle-right
                y: Math.random() * 30, // High up
                delay: 0,
                id: Date.now()
            });

            // Random next star between 8 to 15 seconds
            setTimeout(spawnStar, Math.random() * 7000 + 8000);
        };

        const timeoutId = setTimeout(spawnStar, 5000);
        return () => clearTimeout(timeoutId);
    }, []);

    if (!star) return null;

    return (
        <motion.div
            key={star.id}
            className="absolute h-1 bg-white pointer-events-none z-0"
            style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                width: '100px',
                background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
                transformOrigin: 'left center',
                rotate: '-35deg',
                boxShadow: '0 0 4px rgba(255,255,255,0.5)'
            }}
            initial={{ opacity: 0, scaleX: 0, x: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1.5, 0],
                x: -500, // Move left
                y: 350,  // Move down
            }}
            transition={{
                duration: 1.2,
                ease: "easeIn"
            }}
        />
    );
};

const PixelMoon = () => {
    return (
        <motion.div
            className="absolute top-12 right-12 md:top-24 md:right-32 pointer-events-none opacity-80 z-0"
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {/* Minimal CSS Pixel Moon composed of blocks */}
            <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div className="absolute inset-2 bg-yellow-100 rounded-full blur-[2px] opacity-20" />
                <div className="absolute top-[10%] left-[30%] w-[40%] h-[80%] bg-yellow-100/90 pixel-shadow" />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-yellow-100/90 pixel-shadow" />
                <div className="absolute top-[30%] left-[10%] w-[80%] h-[40%] bg-yellow-100/90 pixel-shadow" />
                {/* Moon craters */}
                <div className="absolute top-[40%] left-[60%] w-[10%] h-[10%] bg-yellow-200/50" />
                <div className="absolute top-[30%] left-[30%] w-[15%] h-[15%] bg-yellow-200/50" />
                <div className="absolute top-[65%] left-[45%] w-[12%] h-[12%] bg-yellow-200/50" />
            </div>
        </motion.div>
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

            <TwinklingStars />
            <PixelMoon />
            <ShootingStar />

            <div className="relative w-full h-full z-10">
                {clouds.map((cloud, index) => (
                    <Cloud key={index} {...cloud} />
                ))}
            </div>
        </div>
    );
};
