import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function useIsDarkMode() {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setDark(el.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return dark;
}

export default function AstroBackground() {
  const dark = useIsDarkMode();
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();

  const galaxyY = useTransform(scrollY, [0, 1400], [0, 160]);
  const starsLayerY = useTransform(scrollY, [0, 1400], [0, 80]);

  useEffect(() => {
    if (!dark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars = [];
    let raf = 0;
    let t0 = performance.now();

    const drawStatic = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        const fill = s.cool ? "rgba(186, 230, 253, 0.75)" : "rgba(240, 249, 255, 0.85)";
        ctx.fillStyle = fill;
        ctx.fill();
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      stars = Array.from({ length: 240 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.35 + 0.25,
        phase: Math.random() * Math.PI * 2,
        tw: 0.6 + Math.random() * 1.8,
        cool: Math.random() > 0.82,
      }));
      if (reduceMotion) {
        drawStatic();
      }
    };

    const tick = (t) => {
      const time = (t - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = 0.2 + 0.75 * (0.5 + 0.5 * Math.sin(time * s.tw + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.cool
          ? `rgba(165, 243, 252, ${alpha})`
          : `rgba(236, 254, 255, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduceMotion) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [dark, reduceMotion]);

  if (!dark) {
    return null;
  }

  return (
    <div className="astro-background" aria-hidden="true">
      <motion.div
        className="astro-galaxy"
        style={{ y: reduceMotion ? 0 : galaxyY }}
      />
      <motion.div
        className="astro-stars-wrap"
        style={{ y: reduceMotion ? 0 : starsLayerY }}
      >
        <canvas ref={canvasRef} className="astro-stars-canvas" />
      </motion.div>
    </div>
  );
}
