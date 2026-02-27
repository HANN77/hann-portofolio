import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="py-12 px-6 md:px-12 text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="bg-black pixel-border p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl lg:text-3xl font-['Press_Start_2P',_cursive] text-primary tracking-widest text-pixel">GWA</h3>
                        <p className="text-muted-foreground font-['VT323',_monospace] mt-4 text-xl uppercase">CONTROLLING PIXELS WITH PRECISION.</p>
                    </div>

                    <div className="flex gap-6 relative">
                        {/* A retro chunky connector line */}
                        <div className="absolute top-1/2 -left-12 w-8 h-1 bg-foreground hidden md:block" />

                        <a href="#" className="p-3 pixel-border bg-white text-black hover:bg-primary transition-colors hover:-translate-y-1">
                            <Github size={24} strokeWidth={2.5} />
                        </a>
                        <a href="#" className="p-3 pixel-border bg-white text-black hover:bg-primary transition-colors hover:-translate-y-1">
                            <Linkedin size={24} strokeWidth={2.5} />
                        </a>
                        <a href="#" className="p-3 pixel-border bg-white text-black hover:bg-primary transition-colors hover:-translate-y-1">
                            <Twitter size={24} strokeWidth={2.5} />
                        </a>
                        <a href="mailto:contact@example.com" className="p-3 pixel-border bg-white text-black hover:bg-primary transition-colors hover:-translate-y-1">
                            <Mail size={24} strokeWidth={2.5} />
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center text-lg text-muted-foreground font-['VT323',_monospace] uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} GWA. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};
