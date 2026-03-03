import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, Mail } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Lightbulb },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
];

// Theme config for each section
const sectionThemes: Record<string, {
    bg: string;
    border: string;
    activeBg: string;
    activeText: string;
    inactiveText: string;
    shadow: string;
    glow: string;
}> = {
    Home: {
        bg: '#1e1e2e',
        border: '#ffffff',
        activeBg: '#fbbf24',
        activeText: '#1e1e2e',
        inactiveText: '#a0a0a0',
        shadow: 'rgba(0,0,0,1)',
        glow: 'none',
    },
    About: {
        bg: '#0f2e1a',
        border: '#ffffff',
        activeBg: '#34d399',
        activeText: '#0f2e1a',
        inactiveText: '#a0a0a0',
        shadow: 'rgba(0,0,0,1)',
        glow: 'none',
    },
    Skills: {
        bg: '#0c1929',
        border: '#ffffff',
        activeBg: '#00cec9',
        activeText: '#0c1929',
        inactiveText: '#a0a0a0',
        shadow: 'rgba(0,0,0,1)',
        glow: 'none',
    },
    Projects: {
        bg: '#1a0a00',
        border: '#ffffff',
        activeBg: '#ff6348',
        activeText: '#1a0a00',
        inactiveText: '#a0a0a0',
        shadow: 'rgba(0,0,0,1)',
        glow: 'none',
    },
    Contact: {
        bg: '#0d0015',
        border: '#ffffff',
        activeBg: '#a855f7',
        activeText: '#0d0015',
        inactiveText: '#a0a0a0',
        shadow: 'rgba(0,0,0,1)',
        glow: 'none',
    },
};

// Tiny pixel decorations for each section theme
const SectionDecorations = ({ section }: { section: string }) => {
    const decorations: Record<string, React.ReactNode> = {
        Home: (
            <>
                {/* Tiny pixel stars */}
                <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-300 opacity-80" />
                <div className="absolute top-3 right-3 w-[3px] h-[3px] bg-yellow-200 opacity-60" />
                <div className="absolute bottom-2 left-4 w-[2px] h-[2px] bg-yellow-400 opacity-70" />
            </>
        ),
        About: (
            <>
                {/* Tiny pixel leaves */}
                <div className="absolute top-1 left-2 w-[6px] h-[4px] bg-emerald-400 opacity-80" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                <div className="absolute bottom-1 right-3 w-[5px] h-[3px] bg-green-300 opacity-60" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
                <div className="absolute top-2 right-8 w-[4px] h-[3px] bg-emerald-300 opacity-70" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
            </>
        ),
        Skills: (
            <>
                {/* Tiny pixel crystals */}
                <div className="absolute top-1 left-3 w-[3px] h-[6px] bg-cyan-400 opacity-80" style={{ clipPath: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)' }} />
                <div className="absolute bottom-1 right-4 w-[3px] h-[5px] bg-teal-300 opacity-60" style={{ clipPath: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)' }} />
                <div className="absolute top-2 right-2 w-[2px] h-[4px] bg-cyan-300 opacity-70" />
            </>
        ),
        Projects: (
            <>
                {/* Tiny pixel embers */}
                <div className="absolute top-2 left-2 w-[3px] h-[3px] bg-orange-400 opacity-90" style={{ boxShadow: '0 0 4px rgba(255,165,0,0.8)' }} />
                <div className="absolute bottom-2 right-3 w-[2px] h-[2px] bg-red-400 opacity-70" style={{ boxShadow: '0 0 3px rgba(255,69,0,0.6)' }} />
                <div className="absolute top-1 right-6 w-[2px] h-[2px] bg-yellow-400 opacity-80" style={{ boxShadow: '0 0 3px rgba(255,200,0,0.6)' }} />
            </>
        ),
        Contact: (
            <>
                {/* Tiny pixel portal particles */}
                <div className="absolute top-1 left-3 w-[3px] h-[3px] bg-purple-400 opacity-80" style={{ boxShadow: '0 0 4px rgba(168,85,247,0.6)' }} />
                <div className="absolute bottom-2 right-2 w-[2px] h-[2px] bg-pink-400 opacity-70" style={{ boxShadow: '0 0 3px rgba(232,121,249,0.5)' }} />
                <div className="absolute top-3 right-5 w-[2px] h-[2px] bg-violet-300 opacity-60" style={{ boxShadow: '0 0 3px rgba(167,139,250,0.5)' }} />
            </>
        ),
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={section}
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {decorations[section] || null}
            </motion.div>
        </AnimatePresence>
    );
};

export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('Home');
    const [hoveredSection, setHoveredSection] = useState<string | null>(null);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    const theme = useMemo(() => sectionThemes[activeSection] || sectionThemes.Home, [activeSection]);

    // Update active section based on scroll position
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

        isScrolling.current = true;
        setActiveSection(sectionName);

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        const element = document.getElementById(targetId.substring(1));
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }

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
            <LayoutGroup>
                <motion.div
                    layout
                    className="pointer-events-auto relative flex items-center p-2 gap-1 overflow-hidden"
                    animate={{
                        backgroundColor: theme.bg,
                        borderColor: theme.border,
                        boxShadow: `4px 4px 0px 0px ${theme.shadow}`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        border: '4px solid',
                        imageRendering: 'pixelated' as const,
                    }}
                >
                    {/* Ambient glow behind the navbar */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none -z-10"
                        animate={{ boxShadow: theme.glow }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    {/* Section-specific pixel decorations */}
                    <SectionDecorations section={activeSection} />

                    {navLinks.map((link) => {
                        const isActive = activeSection === link.name;
                        const isHovered = hoveredSection === link.name;
                        // Only ONE item gets the indicator: hover takes priority, else the active one
                        const showIndicator = hoveredSection
                            ? isHovered
                            : isActive;
                        // Show text label when indicator is visible
                        const showLabel = showIndicator;
                        // Use the *displayed item's* own theme for indicator color
                        const itemTheme = sectionThemes[link.name] || sectionThemes.Home;
                        const Icon = link.icon;

                        return (
                            <motion.a
                                key={link.name}
                                layout
                                href={link.href}
                                onMouseEnter={() => setHoveredSection(link.name)}
                                onMouseLeave={() => setHoveredSection(null)}
                                onClick={(e) => handleNavClick(e, link.href, link.name)}
                                className="relative flex items-center justify-center h-12 z-10 px-3 cursor-pointer overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                {/* Single indicator — only ONE item renders this at a time */}
                                {showIndicator && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute inset-0 -z-10"
                                        animate={{
                                            backgroundColor: itemTheme.activeBg,
                                            borderColor: itemTheme.border,
                                        }}
                                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                        style={{
                                            border: '4px solid',
                                            boxShadow: `4px 4px 0px 0px ${itemTheme.shadow}`,
                                        }}
                                    />
                                )}

                                {/* Content */}
                                <motion.div
                                    layout
                                    className="relative flex items-center justify-center z-10 gap-3"
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <motion.div
                                        animate={{ color: showIndicator ? itemTheme.activeText : theme.inactiveText }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Icon size={20} strokeWidth={3} />
                                    </motion.div>

                                    <AnimatePresence mode="popLayout">
                                        {showLabel && (
                                            <motion.span
                                                key={`label-${link.name}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="text-xs font-bold tracking-widest uppercase whitespace-nowrap"
                                                style={{
                                                    fontFamily: "'Press Start 2P', cursive",
                                                    color: itemTheme.activeText,
                                                }}
                                            >
                                                {link.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </LayoutGroup>
        </motion.nav>
    );
};
