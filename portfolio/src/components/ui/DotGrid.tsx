import { useEffect, useRef } from 'react';

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    className?: string;
}

export default function DotGrid({
    dotSize = 4,
    gap = 32,
    baseColor = '#333333',
    activeColor = '#fbbf24',
    proximity = 150,
    className = '',
}: DotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let dots: { x: number; y: number; baseX: number; baseY: number; vx: number; vy: number }[] = [];
        let mouse = { x: -1000, y: -1000 };

        const hexToRgb = (hex: string) => {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        }
        const baseRgb = hexToRgb(baseColor);
        const activeRgb = hexToRgb(activeColor);

        const resizeCanvas = () => {
            const parent = containerRef.current;
            if (!parent) return;
            const { width, height } = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            initDots(width, height);
        };

        const initDots = (width: number, height: number) => {
            dots = [];
            const cols = Math.floor(width / gap);
            const rows = Math.floor(height / gap);
            const offsetX = (width - cols * gap) / 2 + gap / 2;
            const offsetY = (height - rows * gap) / 2 + gap / 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = offsetX + i * gap;
                    const y = offsetY + j * gap;
                    dots.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
                }
            }
        };

        const update = () => {
            if (!containerRef.current) return;
            const { width, height } = containerRef.current.getBoundingClientRect();
            ctx.clearRect(0, 0, width, height);

            dots.forEach((dot) => {
                const dx = mouse.x - dot.baseX;
                const dy = mouse.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let targetX = dot.baseX;
                let targetY = dot.baseY;

                let ratio = 0;
                if (dist < proximity) {
                    // Push away from mouse
                    const force = (proximity - dist) / proximity;
                    ratio = force;
                    targetX -= dx * force * 0.5;
                    targetY -= dy * force * 0.5;
                }

                dot.x += (targetX - dot.x) * 0.1;
                dot.y += (targetY - dot.y) * 0.1;

                const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * ratio);
                const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * ratio);
                const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * ratio);

                ctx.beginPath();
                // Draw squares for retro feel instead of circles
                ctx.rect(dot.x - dotSize / 2, dot.y - dotSize / 2, dotSize, dotSize);
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(update);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animationFrameId = requestAnimationFrame(update);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [dotSize, gap, baseColor, activeColor, proximity]);

    return (
        <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
            <canvas ref={canvasRef} className="block w-full h-full pointer-events-auto cursor-crosshair" />
        </div>
    );
}
