"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSimulatorStore } from "@/store/simulator.store";
import type { ComponentCategory } from "@/types";

interface SlotConfig {
  category: ComponentCategory;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}

const SLOTS: SlotConfig[] = [
  { category: "case", label: "Case", x: 20, y: 20, w: 160, h: 200, color: "#1e293b" },
  { category: "motherboard", label: "Motherboard", x: 35, y: 35, w: 80, h: 70, color: "#0f172a" },
  { category: "cpu", label: "CPU", x: 50, y: 45, w: 20, h: 20, color: "#00d4ff" },
  { category: "ram", label: "RAM", x: 120, y: 40, w: 8, h: 50, color: "#7c3aed" },
  { category: "gpu", label: "GPU", x: 35, y: 115, w: 75, h: 25, color: "#3b82f6" },
  { category: "storage", label: "SSD", x: 125, y: 115, w: 40, h: 25, color: "#10b981" },
  { category: "psu", label: "PSU", x: 35, y: 170, w: 60, h: 35, color: "#f59e0b" },
  { category: "cooler", label: "Cooler", x: 45, y: 40, w: 30, h: 30, color: "#06b6d4" },
];

export function PCVisualization() {
  const { selectedComponents } = useSimulatorStore();

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Previsualización del build
      </h3>
      <div className="relative w-full max-w-xs">
        <svg
          viewBox="0 0 200 240"
          className="w-full h-auto"
          aria-label="PC Build visualization"
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="0.5" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="200" height="240" fill="url(#grid)" />

          {/* Case outline (always visible) */}
          <rect
            x="20" y="20" width="160" height="200"
            rx="4"
            fill="#0a0e17"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Component slots */}
          {SLOTS.map((slot) => {
            const isSelected = !!selectedComponents[slot.category];
            return (
              <g key={slot.category}>
                <rect
                  x={slot.x}
                  y={slot.y}
                  width={slot.w}
                  height={slot.h}
                  rx="2"
                  fill={isSelected ? slot.color : "#111827"}
                  stroke={isSelected ? slot.color : "#1e293b"}
                  strokeWidth="1"
                  opacity={isSelected ? 1 : 0.4}
                  style={{ filter: isSelected ? "url(#glow)" : "none" }}
                />
                <AnimatePresence>
                  {isSelected && (
                    <motion.text
                      key={`label-${slot.category}`}
                      x={slot.x + slot.w / 2}
                      y={slot.y + slot.h / 2 + 3}
                      textAnchor="middle"
                      fontSize="5"
                      fill="white"
                      fontFamily="system-ui"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {slot.label}
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>
            );
          })}

          {/* Power LED */}
          <AnimatePresence>
            {selectedComponents.psu && (
              <motion.circle
                cx="170"
                cy="210"
                r="3"
                fill="#00d4ff"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </AnimatePresence>
        </svg>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {SLOTS.map((slot) => {
            const isSelected = !!selectedComponents[slot.category];
            return (
              <div key={slot.category} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: isSelected ? slot.color : "#1e293b" }}
                />
                <span
                  className={`text-[10px] ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {slot.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
