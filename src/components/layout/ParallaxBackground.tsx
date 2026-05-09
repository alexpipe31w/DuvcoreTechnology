"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function ParallaxBackground() {
  const { scrollY } = useScroll();

  // Imagen 1 (morada): visible al inicio, se desvanece al scrollear
  const opacity1 = useTransform(scrollY, [0, 300, 550], [0.12, 0.10, 0]);
  const y1       = useTransform(scrollY, [0, 800],       [0, -120]);

  // Imagen 2 (cyan): aparece después que la primera desaparece
  const opacity2 = useTransform(scrollY, [400, 700, 900], [0, 0.10, 0.10]);
  const y2       = useTransform(scrollY, [400, 2000],     [60, -100]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* ── setup.png (morado) ── */}
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/setup.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* ── setup1.png (cyan) ── */}
      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/setup1.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Gradiente superior e inferior para suavizar bordes */}
      <div className="absolute inset-x-0 top-0    h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
