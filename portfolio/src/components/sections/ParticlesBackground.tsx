import { motion } from "framer-motion";

export const ParticlesBackground = () => {
    return (
        <div className="fixed inset-0 -z-20 bg-[#0a0a0c] overflow-hidden pointer-events-none">
            {/* Retro Panning Pixel Grid */}
            <motion.div
                className="absolute inset-[-100%] opacity-[0.15]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)',
                    backgroundSize: '64px 64px',
                }}
                animate={{ x: [0, -64], y: [0, -64] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />
            {/* Vignette effect to darken the edges slightly */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] mix-blend-multiply" />
        </div>
    );
};
