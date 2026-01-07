import type { HTMLAttributes } from 'react';
import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

import { cn } from '@/lib/utils';

export interface CometCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Glow size in px (radial highlight that follows the pointer)
   * @default 320
   */
  glowSize?: number;
  /**
   * Max 3D tilt in degrees.
   * @default 6
   */
  tilt?: number;
}

export function CometCard({
  className,
  children,
  glowSize = 320,
  tilt = 8,
  onMouseMove,
  onMouseLeave,
  ...props
}: CometCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const rotateXSpring = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const transform = useMotionTemplate`perspective(900px) rotateX(${rotateXSpring}deg) rotateY(${rotateYSpring}deg)`;
  const glow = useMotionTemplate`radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, rgba(100, 162, 7, 0.72), transparent 50%)`;

  return (
    <motion.div
      ref={ref}
      className={cn('group relative isolate', className)}
      style={{
        transform: shouldReduceMotion ? undefined : transform,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (shouldReduceMotion) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set(x);
        mouseY.set(y);

        const px = (x - rect.width / 2) / (rect.width / 2);
        const py = (y - rect.height / 2) / (rect.height / 2);

        rotateY.set(px * tilt);
        rotateX.set(-py * tilt);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (shouldReduceMotion) return;
        rotateX.set(0);
        rotateY.set(0);
      }}
      {...props}
    >
      {children}

      {/* Pointer-following "comet" highlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: glow,
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  );
}


