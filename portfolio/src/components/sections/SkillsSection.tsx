import { motion } from 'framer-motion';
import { FileCode2, LayoutTemplate, FileJson, Coffee, Globe, Database } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { MinecraftCaves } from '@/components/sections/MinecraftCaves';

const techStack = [
    { name: 'HTML5', icon: <FileCode2 className="text-orange-500 w-8 h-8" /> },
    { name: 'CSS3', icon: <LayoutTemplate className="text-blue-500 w-8 h-8" /> },
    { name: 'JS', icon: <FileJson className="text-yellow-500 w-8 h-8" /> },
    { name: 'JAVA', icon: <Coffee className="text-red-500 w-8 h-8" /> },
    { name: 'PHP', icon: <Globe className="text-indigo-400 w-8 h-8" /> },
    { name: 'SQL', icon: <Database className="text-emerald-500 w-8 h-8" /> },
];

export const SkillsSection = () => {
    return (
        <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden text-foreground">
            <MinecraftCaves />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-['Press_Start_2P',_cursive] text-primary mb-8 text-pixel">INVENTORY</h2>
                    <p className="mt-6 text-muted-foreground font-['VT323',_monospace] max-w-2xl mx-auto text-2xl uppercase">
                        COLLECTED TOOLS AND ABILITIES FOR NAVIGATING THE DIGITAL REALM.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.1, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="cursor-pointer pixel-border bg-black aspect-square p-4 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 hover:bg-zinc-900 transition-transform duration-100 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center justify-center">
                                    {tech.icon}
                                </div>
                                <span className="font-['Press_Start_2P',_cursive] text-[0.6rem] md:text-xs text-white text-center mt-2 group-hover:text-primary">{tech.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mb-16 text-center">
                    <div className="inline-flex items-center justify-center gap-4 mb-8 bg-black pixel-border p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <h2 className="text-xl md:text-2xl font-['Press_Start_2P',_cursive] tracking-widest text-primary text-pixel">SYSTEM LOG</h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2 }}
                        className="group w-full max-w-4xl mx-auto"
                    >
                        <div className="p-8 md:p-12 overflow-x-auto flex justify-center bg-black pixel-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                            <GitHubCalendar
                                username="HANN77"
                                colorScheme="dark"
                                theme={{
                                    dark: ['#1e1e2e', '#004400', '#007700', '#00aa00', '#39ff14'],
                                }}
                                fontSize={14}
                                blockSize={14}
                                blockMargin={4}
                                blockRadius={0}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
