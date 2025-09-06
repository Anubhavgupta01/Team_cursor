import { useEffect, useMemo } from "react";

export default function BackgroundFX() {
  // Update a CSS var for parallax on scroll with rAF
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        document.documentElement.style.setProperty("--scroll-y", String(y));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Pre-generate particles positions (stable)
  const particles = useMemo(() =>
    Array.from({ length: 18 }).map((_, i) => ({
      left: Math.round((i * 53) % 100),
      top: Math.round(((i * 29) % 100)),
      size: 6 + ((i * 7) % 10),
      delay: (i % 7) * 0.8,
      duration: 12 + (i % 5) * 2,
    })), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Aurora gradients */}
      <div className="aurora absolute -inset-[10%] opacity-80 dark:opacity-70 will-change-transform" />
      <div className="aurora-2 absolute -inset-[20%] opacity-50 dark:opacity-40 will-change-transform" />

      {/* AI network lines (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30 mix-blend-soft-light will-change-transform"
        aria-hidden
      >
        <defs>
          <filter id="blur10" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--brand-1)/0.6)" />
            <stop offset="100%" stopColor="hsl(var(--brand-2)/0.6)" />
          </linearGradient>
        </defs>
        <g filter="url(#blur10)" stroke="url(#grad)" strokeWidth="0.8" fill="none">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M ${-100 + i * 120} ${80 + (i % 3) * 120} C ${200 + i * 60} ${-40 + i * 10}, ${400 + i * 60} ${220 + i * 8}, ${800 + i * 80} ${120 + i * 12}`} opacity="0.25" />
          ))}
        </g>
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Soft vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,_#000000_0%,_transparent_70%)] opacity-[0.04] dark:opacity-[0.12]" />
    </div>
  );
}
