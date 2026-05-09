"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator.store";
import {
  CpuPart, RamPart, MotherboardPart, GpuPart,
  PsuPart, CoolerPart, StoragePart,
  MonitorPart, KeyboardPart, MousePart, CasePart,
} from "./PCParts";
import type { ComponentCategory } from "@/types";

/* ── Performance scoring ─────────────────────────────────────────────── */
type UseCase = "gamer" | "render" | "diseno" | "stream";

const WEIGHTS: Record<ComponentCategory, Record<UseCase, number>> = {
  cpu:         { gamer: 18, render: 24, diseno: 16, stream: 13 },
  gpu:         { gamer: 26, render: 22, diseno: 18, stream:  9 },
  motherboard: { gamer:  7, render:  7, diseno:  7, stream:  7 },
  ram:         { gamer: 11, render: 15, diseno: 13, stream: 19 },
  storage:     { gamer:  7, render:  7, diseno:  4, stream:  4 },
  psu:         { gamer:  5, render:  4, diseno:  4, stream:  4 },
  cooler:      { gamer:  7, render:  9, diseno:  4, stream:  7 },
  case:        { gamer:  9, render:  3, diseno:  9, stream:  9 },
  monitor:     { gamer:  4, render:  0, diseno:  4, stream:  4 },
  keyboard:    { gamer:  2, render:  0, diseno:  2, stream:  3 },
  mouse:       { gamer:  3, render:  0, diseno:  2, stream:  2 },
};
const MAX: Record<UseCase, number> = { gamer: 99, render: 91, diseno: 83, stream: 81 };

const USE_CASES: { key: UseCase; label: string; icon: string; from: string; to: string }[] = [
  { key: "gamer",  label: "Gaming",  icon: "🎮", from: "#00d4ff", to: "#3b82f6" },
  { key: "render", label: "Render",  icon: "🎬", from: "#8b5cf6", to: "#ec4899" },
  { key: "diseno", label: "Diseño",  icon: "🎨", from: "#a855f7", to: "#7c3aed" },
  { key: "stream", label: "Stream",  icon: "📡", from: "#14b8a6", to: "#00d4ff" },
];

function calcScores(sel: ReturnType<typeof useSimulatorStore.getState>["selectedComponents"]) {
  const s = { gamer: 0, render: 0, diseno: 0, stream: 0 } as Record<UseCase, number>;
  for (const [cat, p] of Object.entries(sel)) {
    if (!p) continue;
    const w = WEIGHTS[cat as ComponentCategory];
    if (w) for (const k of Object.keys(s) as UseCase[]) s[k] += w[k];
  }
  return {
    gamer:  Math.min(100, Math.round((s.gamer  / MAX.gamer)  * 100)),
    render: Math.min(100, Math.round((s.render / MAX.render) * 100)),
    diseno: Math.min(100, Math.round((s.diseno / MAX.diseno) * 100)),
    stream: Math.min(100, Math.round((s.stream / MAX.stream) * 100)),
  };
}

/* ── Part map ────────────────────────────────────────────────────────── */
const PART_MAP: Record<ComponentCategory, React.ComponentType<{ active: boolean }>> = {
  cpu:         CpuPart,
  ram:         RamPart,
  motherboard: MotherboardPart,
  gpu:         GpuPart,
  psu:         PsuPart,
  cooler:      CoolerPart,
  storage:     StoragePart,
  monitor:     MonitorPart,
  keyboard:    KeyboardPart,
  mouse:       MousePart,
  case:        CasePart,
};

/* ── OverlayPart — positioned on top of motherboard ─────────────────── */
function OverlayPart({
  category, style, initY = 0, initX = 0,
}: {
  category: ComponentCategory;
  style: React.CSSProperties;
  initY?: number; initX?: number;
}) {
  const { selectedComponents } = useSimulatorStore();
  const active = !!selectedComponents[category];
  const Part   = PART_MAP[category];

  return (
    <div className="absolute" style={style}>
      {/* Opacity layer — always present, fades in/out */}
      <motion.div
        className="w-full h-full"
        animate={{ opacity: active ? 1 : 0.1 }}
        transition={{ duration: 0.45 }}
      >
        {/* Fly-in layer — re-mounts on active change, animates entry */}
        <motion.div
          className="w-full h-full"
          key={`${category}-${active}`}
          initial={active
            ? { y: initY, x: initX, scale: 0.8, opacity: 0 }
            : { y: 0, x: 0, scale: 1, opacity: 1 }}
          animate={{ y: 0, x: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 360, damping: 26 }}
        >
          <Part active={active} />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Slot — for peripherals ──────────────────────────────────────────── */
function Slot({
  category, compact = false, initY = -40, initX = 0,
}: {
  category: ComponentCategory;
  compact?: boolean;
  initY?: number; initX?: number;
}) {
  const { selectedComponents } = useSimulatorStore();
  const active = !!selectedComponents[category];
  const Part   = PART_MAP[category];

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${compact ? "h-12" : "h-16"}
        ${active
          ? "border border-white/15 shadow-[0_0_12px_rgba(0,212,255,0.15)]"
          : "border border-white/[0.04]"}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active ? "active" : "idle"}
          initial={{ scale: active ? 0.7 : 1, opacity: active ? 0 : 0.3, y: active ? initY : 0, x: active ? initX : 0 }}
          animate={{ scale: 1, opacity: active ? 1 : 0.22, y: 0, x: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="absolute inset-0 p-1"
        >
          <Part active={active} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main ────────────────────────────────────────────────────────────── */
export function PCVisualization() {
  const { selectedComponents } = useSimulatorStore();
  const controls  = useAnimation();
  const prevCount = useRef(0);

  const selectedCount = Object.values(selectedComponents).filter(Boolean).length;
  const scores        = calcScores(selectedComponents);
  const glowAlpha     = selectedCount / 11;

  useEffect(() => {
    if (selectedCount > prevCount.current) {
      controls.start({
        rotateY:    [0, 18, -12, 6, -2, 0],
        scale:      [1, 1.04, 0.97, 1.02, 1],
        transition: { duration: 0.65, ease: "easeInOut" },
      });
    }
    prevCount.current = selectedCount;
  }, [selectedCount, controls]);

  const towerGlow = glowAlpha > 0
    ? `0 0 ${Math.round(glowAlpha * 50)}px rgba(0,212,255,${(glowAlpha * 0.4).toFixed(2)}),
       0 0 ${Math.round(glowAlpha * 90)}px rgba(139,92,246,${(glowAlpha * 0.18).toFixed(2)})`
    : undefined;

  return (
    <div className="flex flex-col gap-3 select-none">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 text-center">
        Previsualización del build
      </p>

      {/* ── PC Tower ── */}
      <div style={{ perspective: "900px" }}>
        <motion.div
          animate={controls}
          whileHover={{ rotateY: 5, rotateX: -2, scale: 1.01 }}
          style={{ transformStyle: "preserve-3d", boxShadow: towerGlow, transition: "box-shadow 0.9s ease" }}
          className="rounded-xl border border-white/8 bg-[#02040b] p-2.5 space-y-2 cursor-default"
        >
          {/* Label + LED */}
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20">PC Tower</span>
            <AnimatePresence>
              {selectedComponents.psu && (
                <motion.span key="led"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  exit={{ scale: 0 }}
                  transition={{ scale: { repeat: Infinity, duration: 2 }, opacity: { repeat: Infinity, duration: 2 } }}
                  className="block w-2 h-2 rounded-full bg-cyan-400"
                  style={{ boxShadow: "0 0 8px 4px rgba(0,212,255,0.8)" }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ── Main board assembly — all parts stacked ── */}
          {/*
              MB viewBox="0 0 100 115", container 100% × 310px.
              Overlay % = mb_coord / mb_max (100 or 115).

              CPU socket:  x=22..60, y=10..50  → left=22%, top=8.7%, w=38%, h=34.8%
              RAM slots:   x=70..90, y=3..46   → left=70%, top=2.6%, w=20%, h=37.4%
              M.2 slot:    x=22..62, y=52..55  → left=22%, top=45%
              PCIe/GPU:    x=8..93,  y=72..79  → left=8%,  top=62.6%
          */}
          <div
            className="relative rounded-lg overflow-hidden border border-white/[0.05]"
            style={{ height: "310px", background: "#01030a" }}
          >
            {/* Motherboard — absolute base */}
            <div className="absolute inset-0 p-1" style={{ zIndex: 1 }}>
              <MotherboardPart active={!!selectedComponents.motherboard} />
            </div>

            {/* CPU — socket x=27..53, y=11..39 → left=27%, top=9.6%, w=26%, h=24.3% */}
            <OverlayPart category="cpu"
              style={{ top: "9%", left: "26%", width: "28%", height: "25%", zIndex: 5 }}
              initY={-70}
            />

            {/* Cooler — over CPU, slightly larger footprint */}
            <OverlayPart category="cooler"
              style={{ top: "3%", left: "19%", width: "40%", height: "38%", zIndex: 9 }}
              initY={-90}
            />

            {/* RAM — bottom-left horizontal, smaller, shifted right */}
            <OverlayPart category="ram"
              style={{ top: "79%", left: "10%", width: "44%", height: "17%", zIndex: 6 }}
              initY={50}
            />

            {/* Storage SSD — top-right, connectors face right edge */}
            <OverlayPart category="storage"
              style={{ top: "2%", left: "61%", width: "36%", height: "26%", zIndex: 5 }}
              initX={80}
            />

            {/* GPU — PCIe x16 (x=8..93, y=72..79) */}
            <OverlayPart category="gpu"
              style={{ top: "60%", left: "6%", width: "88%", height: "26%", zIndex: 7 }}
              initY={70}
            />
          </div>

          {/* PSU — below the board */}
          <div
            className="relative rounded-lg overflow-hidden border border-white/[0.04]"
            style={{ height: "58px" }}
          >
            <motion.div
              key={selectedComponents.psu ? "psu-on" : "psu-off"}
              className="absolute inset-0 p-1"
              initial={{ opacity: selectedComponents.psu ? 0 : 0.1, y: selectedComponents.psu ? 35 : 0 }}
              animate={{ opacity: selectedComponents.psu ? 1 : 0.1, y: 0 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
            >
              <PsuPart active={!!selectedComponents.psu} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Peripherals ── */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 mb-1.5 text-center">Periféricos</p>
        <div className="grid grid-cols-2 gap-1.5">
          <Slot category="case"     compact initY={-30} />
          <Slot category="monitor"  compact initX={40}  />
          <Slot category="keyboard" compact initY={30}  />
          <Slot category="mouse"    compact initX={-40} />
        </div>
      </div>

      {/* ── Performance bars ── */}
      <div className="rounded-xl border border-white/8 bg-[#06090f] p-3 space-y-2.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
          Rendimiento estimado
        </p>
        {USE_CASES.map(({ key, label, icon, from, to }) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/50 flex items-center gap-1">
                <span>{icon}</span>{label}
              </span>
              <span className="text-[10px] font-bold" style={{ color: from }}>{scores[key]}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                animate={{ width: `${scores[key]}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
