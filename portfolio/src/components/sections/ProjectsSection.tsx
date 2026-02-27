import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MinecraftNether } from '@/components/sections/MinecraftNether';

const projects = [
    {
        title: 'E-Commerce Platform',
        category: 'STAGE 1',
        description: 'A robust online shopping platform featuring real-time inventory, secure payment gateways, and a custom admin dashboard.',
        tech: ['Next.js', 'Prisma', 'Stripe'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        link: '#'
    },
    {
        title: 'Dashboard Analytics',
        category: 'STAGE 2',
        description: 'Data visualization dashboard with interactive charts and real-time data streaming.',
        tech: ['React', 'Recharts', 'Tailwind'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
        link: '#'
    },
    {
        title: 'Social Connect',
        category: 'STAGE 3',
        description: 'A community-driven application focusing on meaningful connections through shared interests.',
        tech: ['React Native', 'Firebase'],
        image: 'https://images.unsplash.com/photo-1511649475669-e288648b2339?w=800&q=80',
        link: '#'
    }
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden text-foreground">
            <MinecraftNether />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-['Press_Start_2P',_cursive] text-primary mb-2 text-pixel">STAGE SELECT</h2>
                    <div className="w-24 h-2 bg-foreground mx-auto mt-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                            className="bg-black pixel-border p-2 group cursor-pointer hover:-translate-y-4 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col"
                        >
                            <div className="h-48 overflow-hidden relative pixel-border border-b-4 border-foreground mb-4">
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                    style={{ imageRendering: 'pixelated' }}
                                />
                                <div className="absolute top-2 left-2 z-20 bg-black pixel-border border-2 px-2 py-1 text-[0.6rem] font-['Press_Start_2P',_cursive] text-secondary">
                                    {project.category}
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="text-xl md:text-2xl font-['VT323',_monospace] font-bold text-white mb-3 flex items-center justify-between uppercase">
                                    {project.title}
                                    <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                </h3>
                                <p className="text-muted-foreground font-['VT323',_monospace] text-lg mb-6 flex-1 uppercase">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map(tech => (
                                        <span key={tech} className="px-2 py-1 bg-primary text-black text-[0.6rem] font-['Press_Start_2P',_cursive] pixel-border border-2 border-black">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
