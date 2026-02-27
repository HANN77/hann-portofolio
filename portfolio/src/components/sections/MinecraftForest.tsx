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

// --- NEW LIVELY ELEMENTS ---

const DistantMountains = () => {
    return (
        <div className="absolute bottom-0 w-full h-[30%] md:h-[40%] pointer-events-none z-[1] overflow-hidden flex items-end opacity-60">
            {/* Mountain 1 (Left, Far) */}
            <div className="absolute -left-[5%] border-b-[30vh] border-l-[25vw] border-r-[25vw] border-transparent border-b-[#8B5A2B] opacity-40"
                style={{ borderBottomColor: '#a7dbf2' /* atmospheric perspective (blending with sky) */ }} />

            {/* Mountain 2 (Right, Far) */}
            <div className="absolute -right-[10%] border-b-[40vh] border-l-[30vw] border-r-[30vw] border-transparent border-b-[#8B5A2B] opacity-50"
                style={{ borderBottomColor: '#8ecae6' }} />

            {/* Mountain 3 (Center, Closer) */}
            <div className="absolute left-[30%] border-b-[25vh] border-l-[20vw] border-r-[20vw] border-transparent border-b-[#8B5A2B] opacity-80"
                style={{ borderBottomColor: '#7dd3fc' }} />

            {/* Pixelation filter to make the CSS triangles look 8-bit */}
            <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" style={{ imageRendering: 'pixelated' }} />
        </div>
    );
};

interface CloudProps {
    width: number;
    height: number;
    top: number;
    speed: number;
    opacity: number;
    delay: number;
}

const DaytimeClouds = () => {
    const [clouds, setClouds] = useState<CloudProps[]>([]);

    useEffect(() => {
        const newClouds = Array.from({ length: 8 }).map(() => ({
            width: Math.random() * 150 + 100,
            height: Math.random() * 30 + 20,
            top: Math.random() * 30, // Keep in upper 30%
            speed: Math.random() * 80 + 40,
            opacity: Math.random() * 0.4 + 0.3,
            delay: Math.random() * 100,
        }));
        setClouds(newClouds);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[2]">
            {clouds.map((cloud, i) => (
                <div
                    key={i}
                    className="absolute bg-white rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.1)] cloud-scroll"
                    style={{
                        width: `${cloud.width}px`,
                        height: `${cloud.height}px`,
                        top: `${cloud.top}%`,
                        opacity: cloud.opacity,
                        animationDuration: `${cloud.speed}s`,
                        animationDelay: `-${cloud.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

const PixelBirds = () => {
    const [birds, setBirds] = useState<{ id: number, top: number, duration: number, delay: number, scale: number }[]>([]);

    useEffect(() => {
        // Spawn birds occasionally
        const spawnBird = () => {
            const newBird = {
                id: Date.now(),
                top: Math.random() * 40 + 10, // Upper sky
                duration: Math.random() * 10 + 15, // Slow horizontal flight
                delay: 0,
                scale: Math.random() * 0.5 + 0.5 // Different sizes to simulate depth
            };

            setBirds(prev => [...prev, newBird]);

            // Cleanup bird after it crosses (roughly duration * 1000 ms)
            setTimeout(() => {
                setBirds(prev => prev.filter(b => b.id !== newBird.id));
            }, newBird.duration * 1000 + 2000);

            // Random next bird between 10 to 20 seconds
            setTimeout(spawnBird, Math.random() * 10000 + 10000);
        };

        const timeoutId = setTimeout(spawnBird, 2000); // Initial bird soon after load
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
            {birds.map(bird => (
                <motion.div
                    key={bird.id}
                    className="absolute left-[-50px] flex items-center justify-center pixel-bird"
                    style={{ top: `${bird.top}%`, scale: bird.scale }}
                    animate={{
                        x: ['-5vw', '110vw'], // Fly left to right
                        y: [0, -10, 0, 10, 0] // Gentle bobbing
                    }}
                    transition={{
                        x: { duration: bird.duration, ease: "linear" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    {/* Small 8-bit bird shape */}
                    <motion.div
                        className="w-4 h-1 bg-gray-800 absolute"
                        animate={{ scaleY: [1, -1, 1] }} // Wing flap effect
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                    <div className="w-2 h-2 bg-gray-800 absolute top-[-2px] left-[2px]" />
                </motion.div>
            ))}
        </div>
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
                @keyframes cloudScrollX {
                    from { transform: translateX(110vw); }
                    to { transform: translateX(-150vw); }
                }

                .cloud-scroll {
                    animation-name: cloudScrollX;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    right: 0;
                }

                .minecraft-forest-container {
                    image-rendering: pixelated;
                }
                `}
            </style>

            <motion.div style={{ y: sunY }} className="absolute inset-0 z-[1]">
                <PixelSun />
            </motion.div>

            <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-[1]">
                <DistantMountains />
            </motion.div>

            <DaytimeClouds />
            <PixelBirds />
            <FloatingPollen />
        </div>
    );
};
