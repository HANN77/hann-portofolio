import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Magnet from '@/components/ui/Magnet';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/ui/DotGrid';
import { Gamepad2, Ghost, Coins, Swords } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
}

const letterVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
};

const titleContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const renderBouncingText = (text: string, className: string) => (
        <motion.span
            className={`inline-block whitespace-nowrap ${className}`}
            variants={titleContainer}
            initial="hidden"
            animate="visible"
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block relative">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.6, ease: 'easeIn' } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black/80 backdrop-blur-sm crt-overlay-container"
        >
            {/* Interactive Grid Background */}
            <DotGrid
                dotSize={6}
                gap={48}
                baseColor="#1e1e2e" // matching the dark theme
                activeColor="#fbbf24" // pixel yellow
                proximity={200}
                className="z-0 opacity-40 mix-blend-screen"
            />

            {/* Floating Game Icons Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[15%] left-[20%] text-primary opacity-30">
                    <Gamepad2 size={64} className="mix-blend-screen" />
                </motion.div>
                <motion.div animate={{ y: [0, 30, 0], x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] left-[10%] text-secondary opacity-30">
                    <Ghost size={80} className="mix-blend-screen" />
                </motion.div>
                <motion.div animate={{ y: [0, -15, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }} className="absolute top-[25%] right-[15%] text-yellow-400 opacity-40">
                    <Coins size={50} className="mix-blend-screen" />
                </motion.div>
                <motion.div animate={{ y: [0, 25, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[15%] right-[25%] text-slate-400 opacity-30">
                    <Swords size={70} className="mix-blend-screen" />
                </motion.div>
            </div>

            <div className="absolute top-8 right-8 animate-pulse text-primary font-['Press_Start_2P',_cursive] text-xs md:text-sm tracking-widest z-10 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                CREDIT 99
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl pointer-events-none">

                {/* 8-Bit Title Logo with Bouncing Letters */}
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Press_Start_2P',_cursive] text-pixel text-primary mb-6 leading-[1.5] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        <span className="block mb-4">
                            {renderBouncingText("HANIEL", "text-white")}
                        </span>
                        <span className="block">
                            {renderBouncingText("PRATAMA", "text-secondary")}
                        </span>
                    </h1>

                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}>
                        <div className="h-2 w-full max-w-sm mx-auto bg-foreground mb-1 pixel-shadow"></div>
                        <div className="h-1 w-3/4 max-w-xs mx-auto bg-foreground pixel-shadow"></div>
                    </motion.div>
                </div>

                {/* Blinking Subtext */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 1.5 }}
                    className="mb-12 h-8"
                >
                    <span className="text-xl md:text-2xl font-['VT323',_monospace] uppercase tracking-[0.4em] text-white animate-pulse bg-black/50 px-4 py-2 pixel-border drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        &gt; INSERT COIN _
                    </span>
                </motion.div>

                {/* Interactive Start Button */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 2.0 }}
                    className="pointer-events-auto"
                >
                    <Magnet padding={80} magnetStrength={1.5} wrapperClassName="z-50 pointer-events-auto">
                        <Button
                            onClick={onComplete}
                            size="lg"
                            className="bg-primary text-primary-foreground border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] hover:bg-yellow-400 active:shadow-none text-xl md:text-2xl px-12 py-8 mt-4 font-['Press_Start_2P',_cursive] tracking-widest transition-all duration-75"
                        >
                            PRESS START
                        </Button>
                    </Magnet>
                </motion.div>

            </div>

            {/* Retro Scanline Overlay just for the splash screen (in case global is disabled) */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,155,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-50 mix-blend-overlay"></div>
        </motion.div>
    );
}
