import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelAvatarProps {
    src: string;
    alt?: string;
    className?: string;
}

export const PixelAvatar = ({ src, className }: PixelAvatarProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Pixelation state
    const pixelSize = useMotionValue(1);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const smoothRotateX = useTransform(y, [0, 1], [20, -20]);
    const smoothRotateY = useTransform(x, [0, 1], [-20, 20]);

    // Stepped rotation for 8-bit chunky feel (snaps to multiples of 10 degrees)
    const rotateX = useTransform(smoothRotateX, (v) => Math.round(v / 10) * 10);
    const rotateY = useTransform(smoothRotateY, (v) => Math.round(v / 10) * 10);

    // Initialize Image for Canvas
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            imageRef.current = img;
            renderCanvas(1); // Render normal initially
        };
    }, [src]);

    // The actual pixelation rendering engine
    const renderCanvas = (size: number) => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        // Ensure canvas matches its display size
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }

        const w = canvas.width;
        const h = canvas.height;

        // Calculate aspect ratios to replicate object-fit: cover
        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        let drawWidth = w;
        let drawHeight = h;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
            drawWidth = h * imgRatio;
            offsetX = (w - drawWidth) / 2;
        } else {
            drawHeight = w / imgRatio;
            offsetY = (h - drawHeight) / 2;
        }

        ctx.imageSmoothingEnabled = false; // CRITICAL for retro look
        ctx.clearRect(0, 0, w, h);

        if (size <= 1) {
            // Normal resolution
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Downscale
            const scaledW = Math.max(1, w / size);
            const scaledH = Math.max(1, h / size);

            // Draw mini version
            const offscreenCanvas = document.createElement('canvas');
            offscreenCanvas.width = scaledW;
            offscreenCanvas.height = scaledH;
            const offCtx = offscreenCanvas.getContext('2d');
            if (offCtx) {
                offCtx.imageSmoothingEnabled = false;
                // We need to scale the offset calculations for the mini drawing
                const scaleFactor = scaledW / w;
                offCtx.drawImage(img, offsetX * scaleFactor, offsetY * scaleFactor, drawWidth * scaleFactor, drawHeight * scaleFactor);

                // Upscale nearest-neighbor back to main canvas
                ctx.drawImage(offscreenCanvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
            }
        }
    };

    // Listen to animated value changes
    useEffect(() => {
        return pixelSize.on("change", (latest) => {
            renderCanvas(latest);
        });
    }, [pixelSize]);


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width);
        y.set(mouseY / rect.height);

        setCursorPos({ x: mouseX, y: mouseY });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Animate to heavy pixelation
        animate(pixelSize, 6, { duration: 0.3, ease: "easeOut" });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
        // Animate back to normal
        animate(pixelSize, 1, { duration: 0.3, ease: "easeIn" });
    };

    // Handle resize to continually fix canvas
    useEffect(() => {
        const handleResize = () => renderCanvas(pixelSize.get());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full aspect-square perspective-[1000px]">
            <motion.div
                className={cn(
                    "relative flex justify-center items-center w-full h-full bg-[#0a0a0c] pixel-border border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 cursor-none overflow-hidden",
                    className
                )}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Custom Retro Crosshair */}
                {isHovered && (
                    <div
                        className="absolute w-12 h-12 pointer-events-none z-50 transition-none"
                        style={{
                            left: cursorPos.x - 24,
                            top: cursorPos.y - 24
                        }}
                    >
                        {/* Target Reticle */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-primary" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-primary" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-primary" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-primary" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-none animate-pulse" />
                    </div>
                )}

                {/* Inner frame */}
                <div className="relative w-full h-full pixel-border border-2 border-foreground bg-black overflow-hidden shadow-[inset_0px_0px_20px_rgba(0,0,0,1)]"
                    style={{ transform: "translateZ(20px)" }} // Pop out slightly
                >

                    {/* The Canvas responsible for the smooth authentic pixelation */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ imageRendering: 'pixelated' }}
                    />

                    {/* Blue scanning overlay */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute inset-0 pointer-events-none bg-primary/20 mix-blend-color z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Scanline overlay for the avatar itself */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,155,0.06))] bg-[length:100%_4px,3px_100%] opacity-40 mix-blend-overlay z-20"></div>

                    {/* Retro Status HUD overlaid on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute bottom-0 inset-x-0 bg-black/95 p-2 border-t-2 border-primary z-30 flex flex-col items-center justify-center gap-1"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <span className="text-[10px] text-primary font-['Press_Start_2P',_cursive] tracking-widest uppercase animate-pulse">
                                    TARGET SCANNED
                                </span>
                                <div className="flex gap-4 text-white text-sm font-['VT323',_monospace]">
                                    <span>X: {Math.round(cursorPos.x)}</span>
                                    <span>Y: {Math.round(cursorPos.y)}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Corner retro accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-foreground" style={{ transform: "translateZ(30px)" }} />
                <div className="absolute top-0 right-0 w-2 h-2 bg-foreground" style={{ transform: "translateZ(30px)" }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-foreground" style={{ transform: "translateZ(30px)" }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground" style={{ transform: "translateZ(30px)" }} />
            </motion.div>
        </div>
    );
};
