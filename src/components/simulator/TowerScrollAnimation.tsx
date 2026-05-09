"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { ChevronDown } from "lucide-react";

const TOTAL = 154;
const src = (n: number) =>
  `/pc/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export function TowerScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);
  const imgs         = useRef<HTMLImageElement[]>([]);
  const frameRef     = useRef(0);
  const rafRef       = useRef<number | undefined>(undefined);

  const [loadedCount, setLoadedCount] = useState(0);
  const isReady = loadedCount === TOTAL;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 800,
    damping:   80,
    restDelta: 0.0001,
  });

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img    = imgs.current[idx];
    if (!canvas || !img?.naturalWidth) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const w  = iw * scale;
    const h  = ih * scale;
    const ox = (cw - w) / 2;
    const oy = (ch - h) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, w, h);
  }, []);

  useEffect(() => {
    let done = 0;
    imgs.current = Array.from({ length: TOTAL }, (_, i) => {
      const img = new Image();
      img.src = src(i + 1);
      img.onload = () => {
        done++;
        if (done === 1) draw(0);
        if (done % 10 === 0 || done === TOTAL) setLoadedCount(done);
      };
      return img;
    });
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr    = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctxRef.current = canvas.getContext("2d");
      draw(frameRef.current);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    return () => ro.disconnect();
  }, [draw]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1))));
    if (idx === frameRef.current) return;
    frameRef.current = idx;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => draw(idx));
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const introY       = useTransform(scrollYProgress, [0, 0.08], [0, -30]);
  const hintOpacity  = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const ctaOpacity   = useTransform(scrollYProgress, [0.84, 0.96], [0, 1]);
  const ctaY         = useTransform(scrollYProgress, [0.84, 0.96], [32, 0]);
  const progressPct  = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const pct = Math.round((loadedCount / TOTAL) * 100);

  return (
    <section ref={containerRef} className="relative h-[150vh] -mt-16">
      <div className="sticky top-0 h-screen overflow-hidden bg-black relative">

        {/* Loading */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black gap-4 pointer-events-none">
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-150"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg,#22d3ee,#8b5cf6)",
                }}
              />
            </div>
            <p className="text-white/25 text-[11px] tracking-[0.2em] uppercase">{pct}%</p>
          </div>
        )}

        {/* Canvas full screen */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ willChange: "contents" }}
        />

        {/* Intro text */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4"
        >
          <span className="text-white/40 text-[11px] uppercase tracking-[0.3em] mb-4">
            Simulador de PC
          </span>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-white text-center leading-[1.05] tracking-tight drop-shadow-2xl">
            Tu próxima
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg,#22d3ee 0%,#8b5cf6 100%)" }}
            >
              PC gaming
            </span>
          </h2>
          <p className="mt-5 text-white/40 text-sm sm:text-base max-w-xs text-center">
            Armada pieza a pieza con componentes reales de nuestro inventario
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        >
          <span className="text-white/30 text-[11px] uppercase tracking-[0.25em]">
            Scroll para armar
          </span>
          <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
        </motion.div>

        {/* CTA final */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-20 w-full px-4"
        >
          <p className="text-white text-2xl font-bold mb-1.5 tracking-tight drop-shadow-lg">
            ¡Lista para el combate!
          </p>
          <p className="text-white/45 text-sm mb-6">
            Arma la tuya con piezas reales de nuestro inventario
          </p>
          <button
            onClick={() =>
              document
                .getElementById("simulador-interactivo")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#06b6d4 0%,#7c3aed 100%)",
              boxShadow: "0 0 40px rgba(6,182,212,0.3),0 0 80px rgba(124,58,237,0.15)",
            }}
          >
            Comenzar ahora
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-10">
          <motion.div
            style={{
              width: progressPct,
              background: "linear-gradient(90deg,#22d3ee,#8b5cf6)",
            }}
            className="h-full"
          />
        </div>

      </div>
    </section>
  );
}
