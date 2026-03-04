import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PixelAvatar } from '@/components/ui/PixelAvatar';
import { MinecraftSky } from '@/components/sections/MinecraftSky';

interface HeroSectionProps {
    showSplash?: boolean;
}

export const HeroSection = ({ showSplash = false }: HeroSectionProps) => {
    return (
        <section id="home" className="min-h-screen pt-16 pb-16 px-6 relative flex items-center justify-center overflow-hidden">
            <MinecraftSky />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-2 border-4 border-foreground bg-primary text-primary-foreground mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-sm font-bold uppercase tracking-widest font-['Press_Start_2P',_cursive] text-pixel">Ready Player 1</span>
                    </div>

                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-['VT323',_monospace] mb-6 text-foreground leading-[1.2] uppercase min-h-[3em]"
                        variants={{
                            hidden: { opacity: 1 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05, delayChildren: 0.5 }
                            }
                        }}
                        initial="hidden"
                        animate={!showSplash ? "show" : "hidden"}
                    >
                        {"Hi, I'm Haniel Pratama, a computer science student.".split(" ").map((word, wordIndex, array) => (
                            <span key={wordIndex} className="inline-block whitespace-nowrap">
                                {Array.from(word).map((char, charIndex) => {
                                    // "Haniel" is wordIndex 2. "Pratama," is wordIndex 3.
                                    const isName = (wordIndex === 2) || (wordIndex === 3 && char !== ',');

                                    return (
                                        <motion.span
                                            key={charIndex}
                                            variants={{
                                                hidden: { opacity: 0, display: "none" },
                                                show: { opacity: 1, display: "inline-block" }
                                            }}
                                            className={isName ? "text-primary text-pixel drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]" : ""}
                                        >
                                            {char}
                                        </motion.span>
                                    );
                                })}
                                {wordIndex !== array.length - 1 && (
                                    <motion.span
                                        variants={{
                                            hidden: { opacity: 0, display: "none" },
                                            show: { opacity: 1, display: "inline-block" }
                                        }}
                                    >
                                        &nbsp;
                                    </motion.span>
                                )}
                            </span>
                        ))}
                        <motion.span
                            className="inline-block w-[1ch] h-[1em] bg-foreground ml-2 align-text-bottom"
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                        />
                    </motion.h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl font-['VT323',_monospace]">
                        PASSIONATE ABOUT BUILDING 8-BIT & MODERN WEB EXPERIENCES.
                    </p>

                    <div className="flex gap-6">
                        <Button size="lg" className="px-8 font-['Press_Start_2P',_cursive] tracking-widest text-xs h-14" asChild>
                            <a href="#projects">START GAME</a>
                        </Button>
                        <Button size="lg" variant="outline" className="px-8 font-['Press_Start_2P',_cursive] tracking-widest text-xs h-14" asChild>
                            <a href="#contact">CO-OP MODE</a>
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative flex justify-center items-center w-full aspect-square md:p-8">
                        <div className="relative z-10 w-full max-w-sm md:max-w-md h-auto p-2 scale-90 md:scale-100">
                            {(!showSplash) && (
                                <motion.div layoutId="hero-image">
                                    <PixelAvatar
                                        src="/ᡣ𐭩_.jpg"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
