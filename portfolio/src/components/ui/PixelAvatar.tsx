import { useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelAvatarProps {
    src: string;
    alt?: string;
    className?: string;
}

export const PixelAvatar = ({ src, className }: PixelAvatarProps) => {
    const isHoveredRef = useRef(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const coordXRef = useRef<HTMLSpanElement>(null);
    const coordYRef = useRef<HTMLSpanElement>(null);
    const hudRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const rafIdRef = useRef<number>(0);
    const pendingPixelRef = useRef<number>(1);
    const canvasDimsRef = useRef({ w: 0, h: 0 });

    // Pixelation state
    const pixelSize = useMotionValue(1);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    // Slightly reduced max tilt (±15°) for smoother edge behavior
    const smoothRotateX = useTransform(y, [0, 1], [15, -15]);
    const smoothRotateY = useTransform(x, [0, 1], [-15, 15]);

    // Stepped rotation for 8-bit chunky feel (snaps to multiples of 5 degrees for smoother steps)
    const rotateX = useTransform(smoothRotateX, (v) => Math.round(v / 5) * 5);
    const rotateY = useTransform(smoothRotateY, (v) => Math.round(v / 5) * 5);

    // Initialize Image for Canvas
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            imageRef.current = img;
            renderCanvasImmediate(1); // Render normal initially
        };
    }, [src]);

    // Cache canvas dimensions on resize
    const syncCanvasDims = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
        canvasDimsRef.current = { w: canvas.width, h: canvas.height };
    }, []);

    // The actual pixelation rendering engine (no getBoundingClientRect per frame)
    const renderCanvasImmediate = useCallback((size: number) => {
        const canvas = canvasRef.current;
        const img = imageRef.current;
        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        syncCanvasDims();
        const { w, h } = canvasDimsRef.current;
        if (w === 0 || h === 0) return;

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
            // Downscale using reusable offscreen canvas
            const scaledW = Math.max(1, Math.floor(w / size));
            const scaledH = Math.max(1, Math.floor(h / size));

            const offscreen = offscreenCanvasRef.current;
            offscreen.width = scaledW;
            offscreen.height = scaledH;
            const offCtx = offscreen.getContext('2d');
            if (offCtx) {
                offCtx.imageSmoothingEnabled = false;
                const scaleFactor = scaledW / w;
                offCtx.drawImage(img, offsetX * scaleFactor, offsetY * scaleFactor, drawWidth * scaleFactor, drawHeight * scaleFactor);

                // Upscale nearest-neighbor back to main canvas
                ctx.drawImage(offscreen, 0, 0, scaledW, scaledH, 0, 0, w, h);
            }
        }
    }, [syncCanvasDims]);

    // RAF-throttled canvas rendering 
    const scheduleRender = useCallback((size: number) => {
        pendingPixelRef.current = size;
        if (rafIdRef.current) return; // already scheduled
        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = 0;
            renderCanvasImmediate(pendingPixelRef.current);
        });
    }, [renderCanvasImmediate]);

    // Listen to animated value changes — throttled through rAF
    useEffect(() => {
        return pixelSize.on("change", (latest) => {
            scheduleRender(latest);
        });
    }, [pixelSize, scheduleRender]);

    // Mouse move handler — uses the WRAPPER rect (stable, not 3D-transformed)
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const rect = wrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Clamp to [0, 1] to prevent wild values at edges
        x.set(Math.max(0, Math.min(1, mouseX / rect.width)));
        y.set(Math.max(0, Math.min(1, mouseY / rect.height)));

        // Direct DOM updates — zero re-renders
        if (cursorRef.current) {
            cursorRef.current.style.left = `${mouseX - 24}px`;
            cursorRef.current.style.top = `${mouseY - 24}px`;
        }
        if (coordXRef.current) coordXRef.current.textContent = `X: ${Math.round(mouseX)}`;
        if (coordYRef.current) coordYRef.current.textContent = `Y: ${Math.round(mouseY)}`;
    }, [x, y]);

    const handleMouseEnter = useCallback(() => {
        if (isHoveredRef.current) return; // Prevent duplicate triggers
        isHoveredRef.current = true;
        // Show cursor and HUD via DOM
        if (cursorRef.current) cursorRef.current.style.display = 'block';
        if (hudRef.current) hudRef.current.style.display = 'flex';
        // Animate to heavy pixelation
        animate(pixelSize, 6, { duration: 0.3, ease: "easeOut" });
    }, [pixelSize]);

    const handleMouseLeave = useCallback(() => {
        if (!isHoveredRef.current) return; // Prevent duplicate triggers
        isHoveredRef.current = false;
        x.set(0.5);
        y.set(0.5);
        // Hide cursor and HUD via DOM
        if (cursorRef.current) cursorRef.current.style.display = 'none';
        if (hudRef.current) hudRef.current.style.display = 'none';
        // Animate back to normal
        animate(pixelSize, 1, { duration: 0.3, ease: "easeIn" });
    }, [pixelSize, x, y]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            syncCanvasDims();
            renderCanvasImmediate(pixelSize.get());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [syncCanvasDims, renderCanvasImmediate, pixelSize]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, []);

    return (
        // OUTER WRAPPER: This is the STABLE hit-test zone. It never transforms,
        // so mouseEnter/Leave fire consistently even when the inner card tilts.
        <div
            ref={wrapperRef}
            className="relative w-full aspect-square perspective-[1000px] cursor-none"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Custom Retro Crosshair — on the wrapper layer so it's above everything */}
            <div
                ref={cursorRef}
                className="absolute w-12 h-12 pointer-events-none z-50"
                style={{ display: 'none', willChange: 'left, top' }}
            >
                {/* Target Reticle */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-primary" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-primary" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-primary" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-primary" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-none animate-pulse" />
            </div>

            {/* INNER CARD: This tilts freely without affecting mouse events */}
            <motion.div
                className={cn(
                    "relative flex justify-center items-center w-full h-full bg-[#0a0a0c] pixel-border border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 overflow-hidden pointer-events-none",
                    className
                )}
                style={{
                    rotateX, rotateY,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                {/* Inner frame */}
                <div className="relative w-full h-full pixel-border border-2 border-foreground bg-black overflow-hidden shadow-[inset_0px_0px_20px_rgba(0,0,0,1)]"
                    style={{ transform: "translateZ(20px)" }}
                >

                    {/* The Canvas responsible for the smooth authentic pixelation */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ imageRendering: 'pixelated' }}
                    />

                    {/* Scanline overlay for the avatar itself */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,155,0.06))] bg-[length:100%_4px,3px_100%] opacity-40 mix-blend-overlay z-20"></div>

                    {/* Retro Status HUD — always mounted, toggled via display */}
                    <div
                        ref={hudRef}
                        className="absolute bottom-0 inset-x-0 bg-black/95 p-2 border-t-2 border-primary z-30 flex-col items-center justify-center gap-1"
                        style={{ display: 'none' }}
                    >
                        <span className="text-[10px] text-primary font-['Press_Start_2P',_cursive] tracking-widest uppercase animate-pulse">
                            TARGET SCANNED
                        </span>
                        <div className="flex gap-4 text-white text-sm font-['VT323',_monospace]">
                            <span ref={coordXRef}>X: 0</span>
                            <span ref={coordYRef}>Y: 0</span>
                        </div>
                    </div>

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
