import React from 'react';
import { cn } from '@/lib/utils';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    darkBg?: boolean;
}

export const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
    ({ className, children, darkBg = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "pixel-border bg-card p-6 relative transition-transform duration-200",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
GlassContainer.displayName = 'GlassContainer';
