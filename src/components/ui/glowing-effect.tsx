"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate, useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface GlowingEffectProps {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
    glow?: boolean;
    className?: string;
    disabled?: boolean;
    movementDuration?: number;
    borderWidth?: number;
}

export const GlowingEffect = memo(
    ({
        spread = 20,
        variant = "default",
        className,
        disabled = false,
    }: GlowingEffectProps) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const handleMouseMove = useCallback(
            (e: MouseEvent) => {
                if (!containerRef.current || disabled) return;
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Animate the values for smoother movement
                animate(mouseX, x, {
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    mass: 0.5,
                });
                animate(mouseY, y, {
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                    mass: 0.5,
                });
            },
            [mouseX, mouseY, disabled]
        );

        useEffect(() => {
            if (disabled) return;
            // Global event listener to track mouse even outside the exact bounds for "proximity" effect if needed
            // But for this specific effect, we usually want it scoped or global depending on "proximity" prop behavior.
            // The Aceternity usage usually tracks within the list/grid.
            // For simplicity and performance, let's attach to document but check bounds logic via proximity if we were implementing full proximity.
            // However, standard "glowing card border" usually just tracks mouse relative to the card when near or over it.

            // Let's attach to the container's parent or document if we want global tracking.
            // The user snippet suggests a grid item. 
            // We will attach to window to ensure we catch it, but optimize.
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, [handleMouseMove, disabled]);


        const maskImage = useMotionTemplate`radial-gradient(${spread}px circle at ${mouseX}px ${mouseY}px, white, transparent)`;
        const style = {
            maskImage,
            WebkitMaskImage: maskImage,
        };

        if (disabled) return null;

        return (
            <div
                ref={containerRef}
                className={cn(
                    "pointer-events-none absolute inset-0 rounded-[inherit]",
                    className
                )}
            >
                <motion.div
                    className={cn(
                        "absolute inset-0 rounded-[inherit]",
                        variant === "white" ? "bg-white" : "bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500" // Customized for Posters Ready brand
                    )}
                    style={style}
                />
            </div>
        );
    }
);

GlowingEffect.displayName = "GlowingEffect";
