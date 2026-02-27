import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Lightbulb },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
];

export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('Home');
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    // Update active section based on scroll position - optimized with requestAnimationFrame
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (isScrolling.current) return;

            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sections = navLinks.map(link => link.name.toLowerCase());
                    let current = 'Home';

                    for (const section of sections) {
                        const element = document.getElementById(section);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            if (rect.top <= 150 && rect.bottom >= 150) {
                                current = section.charAt(0).toUpperCase() + section.slice(1);
                            }
                        }
                    }
                    setActiveSection(current);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, sectionName: string) => {
        e.preventDefault();

        // Disable scroll listener updates while the programmatic scroll is happening
        isScrolling.current = true;
        setActiveSection(sectionName);

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        const element = document.getElementById(targetId.substring(1));
        if (element) {
            const yOffset = -48; // Set offset to push the scroll position slightly up, making the text align closely below the Navbar
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }

        // Re-enable scroll listener after animation completes (~1 second)
        scrollTimeout.current = setTimeout(() => {
            isScrolling.current = false;
        }, 1000);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="fixed top-6 inset-x-0 w-full flex justify-center z-50 pointer-events-none px-4"
        >
            {/* Retro HUD Box */}
            <div className="pointer-events-auto relative flex items-center p-2 bg-background pixel-border">
                {navLinks.map((link) => {
                    const isActive = activeSection === link.name;
                    const isHovered = hoveredSection === link.name;
                    const isFocused = isActive || isHovered;
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHoveredSection(link.name)}
                            onMouseLeave={() => setHoveredSection(null)}
                            onClick={(e) => handleNavClick(e, link.href, link.name)}
                            className="relative flex items-center justify-center h-12 transition-none z-10 px-4 group cursor-pointer"
                        >
                            {/* Chunky Active Indicator Block */}
                            {isFocused && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute inset-0 bg-primary border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -z-10"
                                    transition={{ type: "spring", stiffness: 600, damping: 40 }}
                                />
                            )}

                            {/* Content Wrapper */}
                            <div className="relative flex items-center justify-center z-10 gap-3">
                                <Icon
                                    size={20}
                                    strokeWidth={3}
                                    className={cn(
                                        "transition-none",
                                        isFocused ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                />

                                {(isFocused || true) && (
                                    <span className={cn(
                                        "text-xs font-bold tracking-widest uppercase mt-1",
                                        isFocused ? "text-primary-foreground" : "text-muted-foreground hidden md:block"
                                    )} style={{ fontFamily: "'Press Start 2P', cursive" }}>
                                        {link.name}
                                    </span>
                                )}
                            </div>
                        </a>
                    );
                })}
            </div>
        </motion.nav>
    );
};
