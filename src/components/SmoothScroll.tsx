'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8, // Faster scrolling (was 1.5)
            easing: (t) => 1 - Math.pow(1 - t, 2), // Quadratic ease-out (faster)
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1.2, // Faster wheel response
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
