import { motion } from 'framer-motion';
import { MinecraftForest } from '@/components/sections/MinecraftForest';

export const AboutSection = () => {
    return (
        <section id="about" className="py-32 px-6 md:px-12 relative overflow-hidden text-foreground">
            <MinecraftForest />
            <div className="max-w-6xl mx-auto relative flex flex-col items-center z-10">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-['Press_Start_2P',_cursive] text-secondary mb-12 text-center text-pixel"
                >
                    PLAYER INFO
                </motion.h2>

                {/* Player Stats Block */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full pixel-border bg-[#0000aa]/90 backdrop-blur-sm mb-12 p-6 flex flex-col md:flex-row justify-between gap-6 font-['Press_Start_2P',_cursive] text-xs md:text-sm text-white"
                >
                    <div className="flex flex-col gap-2"><span className="text-blue-300">NAME</span>HANIEL PRATAMA</div>
                    <div className="flex flex-col gap-2"><span className="text-blue-300">CLASS</span>FULL STACK</div>
                    <div className="flex flex-col gap-2"><span className="text-blue-300">LVL</span>1 (BEGINNER)</div>
                    <div className="flex flex-col gap-2"><span className="text-blue-300">BASE</span>PALEMBANG / REMOTE</div>
                </motion.div>

                {/* Classic RPG Dialogue Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full relative pixel-border bg-[#0000aa]/90 backdrop-blur-sm border-white p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                >
                    {/* Character Portrait */}
                    <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 pixel-border border-white overflow-hidden bg-black p-1 shadow-none">
                        <img
                            src="/ᡣ𐭩_.jpg"
                            alt="Avatar"
                            className="w-full h-full object-cover scale-110"
                            style={{ imageRendering: 'pixelated', filter: 'contrast(1.3) saturate(0) sepia(1) hue-rotate(180deg) brightness(1.2)' }}
                        />
                    </div>

                    {/* Dialogue Text */}
                    <div className="flex-1 font-['VT323',_monospace] text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white min-h-[200px] pb-8 relative">
                        <p className="mb-6 uppercase tracking-wider">
                            * I AM A PASSIONATE DEVELOPER WITH A STRONG FOUNDATION IN MODERN WEB TECHNOLOGIES.
                        </p>
                        <p className="mb-6 uppercase tracking-wider text-green-300">
                            * MY FOCUS IS ON DELIVERING ELEGANT, ROBUST, AND SCALABLE SOLUTIONS THAT BRIDGE THE GAP BETWEEN COMPLEX PROBLEMS AND BEAUTIFUL INTERFACES. CHUNKY PIXELS INCLUDED.
                        </p>

                        {/* Blinking Dialogue Arrow */}
                        <motion.div
                            className="absolute bottom-0 right-2 w-0 h-0 border-l-[16px] border-l-transparent border-t-[20px] border-t-white border-r-[16px] border-r-transparent"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
