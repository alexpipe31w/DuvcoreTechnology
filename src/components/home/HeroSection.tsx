"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Zap } from "lucide-react";

const ROTATING_WORDS = [
  "Lo último en tech",
  "Lo más vendido",
  "Las mejores marcas",
  "Los mejores precios",
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6"
        >
          <Zap className="w-3.5 h-3.5" />
          DuvCORE Technology — Tu tienda tech en Colombia
        </motion.div>

        {/* Rotating headline */}
        <div className="h-16 sm:h-20 flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-glow-cyan text-primary"
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Computadores, portátiles, celulares, componentes y periféricos.
          Arma tu PC ideal con nuestro simulador interactivo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-colors glow-cyan-sm text-base"
          >
            Ver productos
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/simulador"
            className="inline-flex items-center gap-2 bg-surface hover:bg-surface-elevated text-foreground font-semibold px-6 py-3 rounded-xl border border-border hover:border-primary/40 transition-all text-base"
          >
            <Cpu className="w-4 h-4 text-primary" />
            Armar mi PC
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto"
        >
          {[
            { value: "100+", label: "Productos" },
            { value: "24h", label: "Soporte" },
            { value: "100%", label: "Original" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-primary">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
