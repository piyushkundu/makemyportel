'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0, // Balanced smooth speed
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out (very smooth)
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1,
            lerp: 0.1, // Smooth interpolation
        });

        // Use gsap-like animation loop
        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Expose lenis to window for debugging
        (window as unknown as { lenis: Lenis }).lenis = lenis;

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
