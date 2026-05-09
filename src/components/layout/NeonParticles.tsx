"use client";

import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  // 0 = cyan, 1 = purple, 2 = blue-violet
  type: number;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  { node: "rgba(0,212,255,",   line: "0,212,255"   }, // cyan
  { node: "rgba(139,92,246,",  line: "139,92,246"  }, // purple
  { node: "rgba(168,85,247,",  line: "168,85,247"  }, // violet
];

const NODE_COUNT   = 55;
const MAX_DIST     = 160;
const SPEED        = 0.35;

function makeNeurons(w: number, h: number): Neuron[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x:          Math.random() * w,
    y:          Math.random() * h,
    vx:         (Math.random() - 0.5) * SPEED,
    vy:         (Math.random() - 0.5) * SPEED,
    radius:     Math.random() * 1.8 + 1.2,
    type:       Math.floor(Math.random() * 3),
    pulse:      Math.random() * Math.PI * 2,
    pulseSpeed: 0.012 + Math.random() * 0.018,
  }));
}

export function NeonParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const neurons   = useRef<Neuron[]>([]);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      if (neurons.current.length === 0) {
        neurons.current = makeNeurons(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const ns = neurons.current;

      // Move
      for (const n of ns) {
        n.x     += n.vx;
        n.y     += n.vy;
        n.pulse += n.pulseSpeed;
        if (n.x < 0)  { n.x = 0;  n.vx *= -1; }
        if (n.x > w)  { n.x = w;  n.vx *= -1; }
        if (n.y < 0)  { n.y = 0;  n.vy *= -1; }
        if (n.y > h)  { n.y = h;  n.vy *= -1; }
      }

      // Connections (synapses)
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx   = ns[i].x - ns[j].x;
          const dy   = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const proximity = 1 - dist / MAX_DIST;
          // Use the color of the closer (stronger) node
          const col   = COLORS[ns[i].type];
          const alpha = proximity * proximity * 0.45;

          // Gradient line from node-i color to node-j color
          const grad = ctx.createLinearGradient(ns[i].x, ns[i].y, ns[j].x, ns[j].y);
          grad.addColorStop(0, `rgba(${COLORS[ns[i].type].line},${alpha})`);
          grad.addColorStop(1, `rgba(${COLORS[ns[j].type].line},${alpha})`);

          ctx.beginPath();
          ctx.moveTo(ns[i].x, ns[i].y);
          ctx.lineTo(ns[j].x, ns[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth   = proximity * 0.9;
          ctx.stroke();

          // Small "impulse" dot travelling along the connection occasionally
          if (proximity > 0.7 && (i * j) % 7 === 0) {
            const t   = (Date.now() / 1200 + i * 0.3) % 1;
            const ix  = ns[i].x + (ns[j].x - ns[i].x) * t;
            const iy  = ns[i].y + (ns[j].y - ns[i].y) * t;
            ctx.beginPath();
            ctx.arc(ix, iy, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${col.line},0.8)`;
            ctx.fill();
          }
        }
      }

      // Nodes (soma)
      for (const n of ns) {
        const glow  = 0.55 + Math.sin(n.pulse) * 0.45; // 0.1 → 1.0
        const col   = COLORS[n.type];
        const r     = n.radius * (0.9 + Math.sin(n.pulse) * 0.25);

        // Outer glow halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        halo.addColorStop(0,   `rgba(${col.line},${glow * 0.35})`);
        halo.addColorStop(1,   `rgba(${col.line},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${col.node}${glow})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-[5] pointer-events-none"
    />
  );
}
