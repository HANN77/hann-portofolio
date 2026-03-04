import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Home, User, Lightbulb, Briefcase, Mail } from 'lucide-react';

/* ───────────────────────── NAV CONFIG ───────────────────────── */
const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Lightbulb },
    { name: 'Projects', href: '#projects', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
];

/* ─── Section theme palette (reused from previous design) ──── */
const sectionThemes: Record<string, {
    accent: string;
    accentText: string;
    glow: string;
}> = {
    Home: {
        accent: '#fbbf24',
        accentText: '#1e1e2e',
        glow: 'rgba(251,191,36,0.35)',
    },
    About: {
        accent: '#34d399',
        accentText: '#0f2e1a',
        glow: 'rgba(52,211,153,0.35)',
    },
    Skills: {
        accent: '#00cec9',
        accentText: '#0c1929',
        glow: 'rgba(0,206,201,0.35)',
    },
    Projects: {
        accent: '#ff6348',
        accentText: '#1a0a00',
        glow: 'rgba(255,99,72,0.35)',
    },
    Contact: {
        accent: '#a855f7',
        accentText: '#0d0015',
        glow: 'rgba(168,85,247,0.35)',
    },
};

/* ─── Shared spring config — light & snappy ─── */
const springTransition = { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.8 };
const colorTransition = { duration: 0.4, ease: 'easeOut' as const };

/* ═════════════════════════════════════════════════════════════ */
export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('Home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const theme = useMemo(
        () => sectionThemes[activeSection] || sectionThemes.Home,
        [activeSection],
    );

    /* ─── Scroll spy ─── */
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (isScrolling.current) return;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    /* Active section detection */
                    const sections = navLinks.map((l) => l.name.toLowerCase());
                    let current = 'Home';
                    for (const section of sections) {
                        const el = document.getElementById(section);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top <= 150 && rect.bottom >= 150) {
                                current = section.charAt(0).toUpperCase() + section.slice(1);
                            }
                        }
                    }
                    setActiveSection(current);

                    /* Scroll progress (0-1) */
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ─── Nav click handler ─── */
    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
            e.preventDefault();
            isScrolling.current = true;
            setActiveSection(name);

            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

            const el = document.getElementById(href.substring(1));
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }

            scrollTimeout.current = setTimeout(() => {
                isScrolling.current = false;
            }, 1000);
        },
        [],
    );

    /* ═══════════════════  RENDER  ══════════════════════════════ */
    return (
        <>
            {/* ── Desktop: vertical left dock ── */}
            <motion.nav
                aria-label="Main navigation"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.6 }}
                className="fixed left-3 top-0 bottom-0 z-50 hidden md:flex flex-col items-center justify-center"
                style={{ willChange: 'transform, opacity' }}
            >
                <LayoutGroup>
                    <motion.div
                        layout
                        className="relative flex flex-col items-center gap-1 p-2"
                        animate={{
                            borderColor: theme.accent,
                            boxShadow: `4px 4px 0px 0px rgba(0,0,0,1)`,
                        }}
                        transition={{
                            layout: springTransition,
                            borderColor: colorTransition,
                            boxShadow: colorTransition,
                        }}
                        style={{
                            border: '3px solid',
                            backgroundColor: 'rgba(10,10,20,0.88)',
                            backdropFilter: 'blur(6px)',
                            imageRendering: 'pixelated' as const,
                        }}
                    >
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.name;
                            const isHovered = hoveredItem === link.name;
                            const itemTheme = sectionThemes[link.name] || sectionThemes.Home;
                            const Icon = link.icon;

                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                                    onMouseEnter={() => setHoveredItem(link.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className="relative flex items-center justify-center w-11 h-11 z-10 cursor-pointer"
                                    whileHover={{ scale: 1.12 }}
                                    whileTap={{ scale: 0.88 }}
                                    transition={springTransition}
                                >
                                    {/* Active slot indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-slot"
                                            className="absolute inset-0 -z-10"
                                            animate={{
                                                backgroundColor: itemTheme.accent,
                                                boxShadow: `0 0 12px ${itemTheme.glow}, 3px 3px 0px 0px rgba(0,0,0,1)`,
                                            }}
                                            transition={{
                                                layout: springTransition,
                                                backgroundColor: colorTransition,
                                                boxShadow: colorTransition,
                                            }}
                                            style={{
                                                border: '2px solid rgba(255,255,255,0.25)',
                                            }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <motion.div
                                        animate={{
                                            color: isActive
                                                ? itemTheme.accentText
                                                : isHovered
                                                    ? itemTheme.accent
                                                    : 'rgba(160,160,160,0.8)',
                                        }}
                                        transition={colorTransition}
                                    >
                                        <Icon size={18} strokeWidth={2.5} />
                                    </motion.div>

                                    {/* Hover tooltip */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -6, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                exit={{ opacity: 0, x: -6, scale: 0.9 }}
                                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                                className="absolute left-full ml-3 whitespace-nowrap px-3 py-2 text-white z-50 pointer-events-none"
                                                style={{
                                                    fontFamily: "'Press Start 2P', cursive",
                                                    fontSize: '0.55rem',
                                                    letterSpacing: '0.1em',
                                                    backgroundColor: 'rgba(10,10,20,0.92)',
                                                    border: `2px solid ${itemTheme.accent}`,
                                                    boxShadow: `3px 3px 0px 0px rgba(0,0,0,1)`,
                                                    imageRendering: 'pixelated' as const,
                                                }}
                                            >
                                                {link.name.toUpperCase()}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.a>
                            );
                        })}

                        {/* ─── XP / Scroll progress bar ─── */}
                        <div
                            className="w-7 h-[3px] mt-2 overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}
                        >
                            <motion.div
                                className="h-full origin-left"
                                animate={{
                                    scaleX: scrollProgress,
                                    backgroundColor: theme.accent,
                                }}
                                transition={{ duration: 0.15, ease: 'linear' }}
                                style={{ willChange: 'transform' }}
                            />
                        </div>
                    </motion.div>
                </LayoutGroup>
            </motion.nav>

            {/* ── Mobile: bottom hotbar ── */}
            <motion.nav
                aria-label="Main navigation"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
                className="fixed bottom-3 inset-x-0 z-50 flex md:hidden justify-center px-4"
                style={{ willChange: 'transform, opacity' }}
            >
                <motion.div
                    className="flex items-center gap-1 p-2"
                    animate={{
                        borderColor: theme.accent,
                        boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    }}
                    transition={{
                        borderColor: colorTransition,
                        boxShadow: colorTransition,
                    }}
                    style={{
                        border: '3px solid',
                        backgroundColor: 'rgba(10,10,20,0.92)',
                        backdropFilter: 'blur(6px)',
                        imageRendering: 'pixelated' as const,
                    }}
                >
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.name;
                        const itemTheme = sectionThemes[link.name] || sectionThemes.Home;
                        const Icon = link.icon;

                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={(e) => handleNavClick(e, link.href, link.name)}
                                className="relative flex items-center justify-center w-11 h-11 z-10 cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.88 }}
                                transition={springTransition}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-slot-mobile"
                                        className="absolute inset-0 -z-10"
                                        animate={{
                                            backgroundColor: itemTheme.accent,
                                            boxShadow: `0 0 10px ${itemTheme.glow}, 3px 3px 0px 0px rgba(0,0,0,1)`,
                                        }}
                                        transition={{
                                            layout: springTransition,
                                            backgroundColor: colorTransition,
                                            boxShadow: colorTransition,
                                        }}
                                        style={{
                                            border: '2px solid rgba(255,255,255,0.2)',
                                        }}
                                    />
                                )}

                                <motion.div
                                    animate={{
                                        color: isActive
                                            ? itemTheme.accentText
                                            : 'rgba(160,160,160,0.7)',
                                    }}
                                    transition={colorTransition}
                                >
                                    <Icon size={18} strokeWidth={2.5} />
                                </motion.div>
                            </motion.a>
                        );
                    })}

                    {/* Mobile XP bar */}
                    <div
                        className="absolute -top-[5px] left-2 right-2 h-[3px] overflow-hidden"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <motion.div
                            className="h-full origin-left"
                            animate={{
                                scaleX: scrollProgress,
                                backgroundColor: theme.accent,
                            }}
                            transition={{ duration: 0.15, ease: 'linear' }}
                            style={{ willChange: 'transform' }}
                        />
                    </div>
                </motion.div>
            </motion.nav>
        </>
    );
};
