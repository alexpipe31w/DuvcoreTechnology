"use client";

/* ─────────────────────────────────────────────────────────────────────────
   SVG PC parts — RGB neon gamer style
   Each export receives { active: boolean }
   active=true  → full colour + glow animations
   active=false → dim / monochrome
   ───────────────────────────────────────────────────────────────────────── */

const DIM = "rgba(255,255,255,0.08)";
const n = (v: number) => Math.round(v * 100) / 100;

// ── CPU ──────────────────────────────────────────────────────────────────
export function CpuPart({ active }: { active: boolean }) {
  const glow = active ? "#00d4ff" : "#334155";
  const body = active ? "#0f1a2e" : "#0a0a0a";
  const ihs  = active ? "#1e2d4a" : "#111";
  const pin  = active ? "#94a3b8" : "#2a2a2a";
  const die  = active ? "#8b5cf6" : "#1a1a1a";

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ animation: active ? "slot-glow 3s ease-in-out infinite" : "none" }}>
      <defs>
        <radialGradient id="cpu-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow halo */}
      {active && <ellipse cx="50" cy="50" rx="48" ry="48" fill="url(#cpu-glow)" />}

      {/* Pins — top/bottom */}
      {[15,24,33,42,51,60,69,78].map((x, i) => (
        <g key={i}>
          <rect x={x} y={2}  width={4} height={9} rx={1} fill={pin} />
          <rect x={x} y={89} width={4} height={9} rx={1} fill={pin} />
        </g>
      ))}
      {/* Pins — left/right */}
      {[15,24,33,42,51,60,69,78].map((y, i) => (
        <g key={i}>
          <rect x={2}  y={y} width={9} height={4} rx={1} fill={pin} />
          <rect x={89} y={y} width={9} height={4} rx={1} fill={pin} />
        </g>
      ))}

      {/* Package */}
      <rect x={11} y={11} width={78} height={78} rx={4} fill={body} stroke={glow} strokeWidth={1.5} />

      {/* IHS */}
      <rect x={20} y={20} width={60} height={60} rx={3} fill={ihs} />
      {/* Diagonal grain */}
      <line x1={20} y1={50} x2={50} y2={20} stroke="#ffffff08" strokeWidth={1} />
      <line x1={50} y1={80} x2={80} y2={50} stroke="#ffffff08" strokeWidth={1} />

      {/* Die mark */}
      <rect x={32} y={32} width={36} height={36} rx={2} fill="#07080f" stroke={die} strokeWidth={1} />
      <circle cx={50} cy={50} r={8} fill={die} opacity={0.7} />
      <circle cx={50} cy={50} r={3} fill={glow} opacity={active ? 1 : 0.2} />

      {/* Corner dots */}
      {[[23,23],[77,23],[23,77],[77,77]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2} fill={glow} opacity={active ? 0.8 : 0.15}
          style={{ animation: active ? `led-blink ${2 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` : "none" }} />
      ))}

      {/* Trace lines on border */}
      {active && [
        "M11 40 L20 40", "M11 60 L20 60", "M80 40 L89 40", "M80 60 L89 60",
        "M40 11 L40 20", "M60 11 L60 20", "M40 80 L40 89", "M60 80 L60 89",
      ].map((d, i) => (
        <path key={i} d={d} stroke={glow} strokeWidth={1} opacity={0.6}
          strokeDasharray="8 4"
          style={{ animation: `trace-flow 1.5s linear infinite ${i * 0.15}s` }} />
      ))}
    </svg>
  );
}

// ── RAM ──────────────────────────────────────────────────────────────────
// Two wide horizontal DDR5 sticks (landscape, matching bottom-left overlay)
export function RamPart({ active }: { active: boolean }) {
  const accent = active ? "#8b5cf6" : "#1a1a2e";
  const pcb    = active ? "#0a0f1a" : "#080808";
  const silver = active ? "#556070" : "#1a1e28";

  return (
    <svg viewBox="0 0 110 38" className="w-full h-full">
      <defs>
        <linearGradient id="ram-rgb" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={active ? "#00d4ff" : "#1a1a2e"}>
            {active && <animate attributeName="stop-color" values="#00d4ff;#8b5cf6;#ec4899;#00d4ff" dur="3s" repeatCount="indefinite"/>}
          </stop>
          <stop offset="50%"  stopColor={active ? "#8b5cf6" : "#1a1a2e"}>
            {active && <animate attributeName="stop-color" values="#8b5cf6;#ec4899;#00d4ff;#8b5cf6" dur="3s" repeatCount="indefinite"/>}
          </stop>
          <stop offset="100%" stopColor={active ? "#ec4899" : "#1a1a2e"}>
            {active && <animate attributeName="stop-color" values="#ec4899;#00d4ff;#8b5cf6;#ec4899" dur="3s" repeatCount="indefinite"/>}
          </stop>
        </linearGradient>
      </defs>

      {/* Two horizontal DDR5 sticks stacked */}
      {[1, 21].map((y, idx) => (
        <g key={idx}>
          {/* PCB body */}
          <rect x={1} y={y} width={108} height={15} rx={1} fill={pcb} stroke={accent} strokeWidth={0.8}/>
          {/* Heat spreader angled top */}
          <path d={`M1 ${y+4} L4 ${y} L106 ${y} L109 ${y+4}`} fill={accent} opacity={0.85}/>
          {/* RGB strip */}
          <rect x={1} y={y} width={108} height={3} rx={0.5}
            fill="url(#ram-rgb)" opacity={active ? 1 : 0.08}/>
          {/* IC chips (4 bumps per stick) */}
          {[8, 34, 60, 86].map((x) => (
            <rect key={x} x={x} y={y+5} width={20} height={6} rx={0.8}
              fill={active?"#0d1528":"#111"} stroke={silver} strokeWidth={0.4}/>
          ))}
          {/* Gold contacts — bottom edge */}
          {Array.from({length: 20}).map((_, i) => (
            <rect key={i} x={3 + i*5.2} y={y+12} width={3} height={3} rx={0.3}
              fill={active?"#c9a84c":"#333"}/>
          ))}
          {/* Notch */}
          <rect x={36} y={y+13} width={5} height={2} rx={0.3} fill={pcb}/>
        </g>
      ))}
    </svg>
  );
}

// ── MOTHERBOARD ──────────────────────────────────────────────────────────
// Real ATX layout (matches reference image):
//   I/O panel:    left edge, top          x=0..18,  y=2..34
//   CPU socket:   upper center            x=22..60, y=10..50  (38×40)
//   VRM caps:     top + left of CPU
//   RAM slots:    right side, vertical    x=70..90, y=3..46
//   24-pin:       far right               x=91..99, y=3..24
//   Chipset:      center below CPU        x=38..56, y=56..70
//   M.2 slot:     below CPU               x=22..62, y=52..55
//   PCIe x16:     lower band              x=8..93,  y=72..79
//   PCIe x1 ×2:   below GPU slot          x=8..68,  y=82..92
//   SATA:         right edge, lower
export function MotherboardPart({ active }: { active: boolean }) {
  const pcb    = active ? "#030610" : "#020408";
  const trace  = active ? "#1a3050" : "#0a0c14";
  const cyan   = active ? "#00aaff" : "#0a1420";
  const purple = active ? "#7c5cf6" : "#0f0a1e";
  const silver = active ? "#556070" : "#151820";

  return (
    <svg viewBox="0 0 100 115" className="w-full h-full">
      <defs>
        <radialGradient id="mb2-glow" cx="40%" cy="32%" r="55%">
          <stop offset="0%" stopColor={cyan} stopOpacity="0.1" />
          <stop offset="100%" stopColor={cyan} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* PCB */}
      <rect x={0.5} y={0.5} width={99} height={114} rx={2} fill={pcb} stroke={trace} strokeWidth={0.8}/>
      {active && <rect x={0.5} y={0.5} width={99} height={114} rx={2} fill="url(#mb2-glow)"/>}

      {/* Mounting holes — 4 corners */}
      {[[4,4],[96,4],[4,111],[96,111]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={2.5} fill={pcb} stroke={trace} strokeWidth={0.5}/>
      ))}

      {/* ── I/O panel (left edge, top) ── */}
      <rect x={0} y={2} width={18} height={32} rx={1}
        fill={active?"#04060c":"#030408"} stroke={silver} strokeWidth={0.3}/>
      {[4,9,14,19,25].map((y,i) => (
        <rect key={i} x={1} y={y} width={16} height={4} rx={0.3}
          fill={active?"#080c14":"#06080c"} stroke={cyan} strokeWidth={0.2}/>
      ))}

      {/* ── CPU 8-pin power (top, above socket) ── */}
      <rect x={29} y={0} width={10} height={5} rx={0.5}
        fill={active?"#060c14":"#050810"} stroke={silver} strokeWidth={0.4}/>
      {[0,1,2].map(i => (
        <rect key={i} x={30+i*3} y={1} width={2.2} height={3} rx={0.2}
          fill={active?"#c9a84c22":"#111"}/>
      ))}

      {/* ── CPU socket (x=27..53, y=11..39) — smaller, centered ── */}
      <rect x={27} y={11} width={26} height={28} rx={2}
        fill={trace} stroke={cyan} strokeWidth={0.8}/>
      <rect x={30} y={14} width={20} height={22} rx={1}
        fill="#010205" stroke={cyan} strokeWidth={0.4} strokeDasharray="3 2"/>
      {/* Pin grid — 4×4 inside inner border */}
      {Array.from({length:4}).map((_,r) =>
        Array.from({length:4}).map((_,c) => (
          <circle key={`${r}-${c}`} cx={33+c*5} cy={17+r*5} r={0.6}
            fill={active?"#556070":"#111"}/>
        ))
      )}
      <text x={40} y={41} textAnchor="middle" fontSize="3"
        fill={active?silver:"#111"} fontFamily="monospace">AM5</text>
      {active && <rect x={27} y={11} width={26} height={28} rx={2} fill="none" stroke={cyan}
        strokeWidth={0.7} opacity={0.5} style={{animation:"led-blink 2.5s ease-in-out infinite"}}/>}

      {/* ── VRM caps — left of CPU ── */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={21} y={12+i*6} width={4} height={4} rx={0.4}
          fill={active?"#060e1c":"#060810"} stroke={cyan} strokeWidth={0.3}/>
      ))}
      {/* VRM caps — top of CPU */}
      {[0,1,2].map(i => (
        <rect key={i} x={28+i*7} y={5} width={5} height={4} rx={0.4}
          fill={active?"#060e1c":"#060810"} stroke={cyan} strokeWidth={0.3}/>
      ))}

      {/* ── RAM slots — horizontal, bottom-left (x=5..58, y=93..110) ── */}
      {[0, 1].map(i => (
        <g key={i}>
          <rect x={5} y={93+i*9} width={53} height={7} rx={0.8}
            fill={active?"#0a1225":"#060810"}
            stroke={i===0?cyan:silver} strokeWidth={0.7}/>
          {/* Gold contact fingers */}
          {Array.from({length:10}).map((_,j) => (
            <rect key={j} x={6+j*5} y={93+i*9} width={3} height={3} rx={0.2}
              fill={active?"#c9a84c":"#1a1408"}/>
          ))}
          {/* Latch clips at both ends */}
          <rect x={5} y={93+i*9} width={2} height={7} rx={0.3}
            fill={active?"#00aaff33":"#0a0c14"}/>
          <rect x={56} y={93+i*9} width={2} height={7} rx={0.3}
            fill={active?"#00aaff33":"#0a0c14"}/>
        </g>
      ))}

      {/* ── 24-pin power (far right, top) ── */}
      <rect x={91} y={3} width={8} height={22} rx={0.8}
        fill={active?"#060c14":"#050810"} stroke={silver} strokeWidth={0.4}/>
      {Array.from({length:6}).map((_,i) => (
        <rect key={i} x={92} y={4+i*3.2} width={6} height={2.4} rx={0.2}
          fill={active?"#c9a84c22":"#111"}/>
      ))}

      {/* ── Chipset (center, below CPU) ── */}
      <rect x={38} y={56} width={20} height={14} rx={1.5}
        fill={active?"#0a0818":"#050610"} stroke={purple} strokeWidth={0.8}/>
      <text x={48} y={65} textAnchor="middle" fontSize="4"
        fill={active?purple:"#0f0a1e"} fontFamily="monospace">B650</text>
      {active && <rect x={38} y={56} width={20} height={14} rx={1.5} fill="none" stroke={purple}
        strokeWidth={0.6} opacity={0.5} style={{animation:"led-blink 3s ease-in-out infinite 1s"}}/>}

      {/* ── M.2 slot (below CPU, above PCIe) ── */}
      <rect x={22} y={52} width={40} height={3} rx={0.5}
        fill={active?"#06080e":"#040508"} stroke={cyan} strokeWidth={0.4} strokeDasharray="2 2"/>

      {/* ── PCIe x16 / GPU (x=8..93, y=72..79) ── */}
      <rect x={8} y={72} width={85} height={7} rx={1}
        fill={active?"#0a0818":"#060610"} stroke={purple} strokeWidth={0.9}/>
      {active && <rect x={8} y={72} width={85} height={7} rx={1} fill="none" stroke={purple}
        strokeWidth={0.7} opacity={0.4} style={{animation:"slot-glow 2s ease-in-out infinite"}}/>}

      {/* ── PCIe x1 slots ── */}
      <rect x={8} y={82} width={60} height={4} rx={0.5}
        fill={active?"#06080e":"#040508"} stroke={silver} strokeWidth={0.4}/>
      <rect x={8} y={89} width={60} height={4} rx={0.5}
        fill={active?"#06080e":"#040508"} stroke={silver} strokeWidth={0.4}/>

      {/* ── SATA ports (right side, lower) ── */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={88} y={72+i*8} width={7} height={5} rx={0.5}
          fill={active?"#060810":"#040508"} stroke={silver} strokeWidth={0.3}/>
      ))}

      {/* ── Electrolytic caps ── */}
      {[[85,32],[90,32],[85,40],[90,40],[68,50],[73,50],[78,50],[65,88],[70,88],[75,88]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={3}
            fill={active?"#060e1c":"#060810"} stroke={silver} strokeWidth={0.5}/>
          <line x1={cx-1.5} y1={cy} x2={cx+1.5} y2={cy}
            stroke={active?silver:"#111"} strokeWidth={0.4}/>
          <line x1={cx} y1={cy-1.5} x2={cx} y2={cy+1.5}
            stroke={active?cyan:"#111"} strokeWidth={0.4}/>
        </g>
      ))}

      {/* ── Ceramic caps (paired tiny rects) ── */}
      {[[62,34],[62,38],[62,42],[72,56],[77,56],[82,56],
        [20,57],[20,63],[62,58],[62,66],[30,80],[36,80],
        [42,80],[68,80],[73,80],[50,98],[55,98],[62,96],[67,96]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={3} height={2} rx={0.3}
          fill={active?"#060e1c":"#060810"} stroke={silver} strokeWidth={0.3}/>
      ))}

      {/* ── Resistor arrays ── */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={63+i*4} y={46} width={2.5} height={1.5} rx={0.2}
          fill={active?"#0a0e18":"#060810"} stroke={silver} strokeWidth={0.2}/>
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x={68+i*4} y={85} width={2.5} height={1.5} rx={0.2}
          fill={active?"#0a0e18":"#060810"} stroke={silver} strokeWidth={0.2}/>
      ))}

      {/* ── Via pads — at all trace junctions ── */}
      {[[5,27],[5,72],[5,93],[8,50],[8,72],[8,82],[8,89],
        [21,27],[21,39],[27,42],[40,42],[53,25],[53,39],
        [38,56],[38,72],[40,52],[48,56],[48,70],[58,56],
        [60,20],[60,44],[88,65],[88,72],[91,14],[91,25]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={1.4}
            fill={active?"#0a1225":"#060810"} stroke={silver} strokeWidth={0.5}/>
          <circle cx={cx} cy={cy} r={0.5}
            fill={active?silver:"#111"}/>
        </g>
      ))}

      {/* ── Power rails — thick horizontal bands ── */}
      <line x1={1} y1={7} x2={21} y2={7} stroke={active?silver:trace} strokeWidth={1} opacity={active?0.4:0.15}/>
      <line x1={61} y1={7} x2={89} y2={7} stroke={active?silver:trace} strokeWidth={1} opacity={active?0.4:0.15}/>
      <line x1={1} y1={55} x2={21} y2={55} stroke={active?silver:trace} strokeWidth={0.8} opacity={active?0.35:0.1}/>
      <line x1={61} y1={55} x2={87} y2={55} stroke={active?silver:trace} strokeWidth={0.8} opacity={active?0.35:0.1}/>

      {/* ── Component footprints (silkscreen outlines) ── */}
      {[[63,44,12,4],[63,94,12,4],[8,60,6,4],[16,60,6,4],[24,60,6,4]].map(([x,y,w,h],i)=>(
        <rect key={i} x={x} y={y} width={w} height={h} rx={0.2}
          fill="none" stroke={active?silver:trace} strokeWidth={0.3} opacity={active?0.5:0.2}/>
      ))}

      {/* ── Traces — animated cyan (straight / L-shaped only) ── */}
      {active && [
        "M27 25 L5 25 L5 93",
        "M53 30 L60 30 L60 56 L38 56",
        "M40 39 L40 52",
        "M48 56 L48 72",
        "M58 56 L88 56 L88 72",
        "M39 11 L39 5 L91 5 L91 14",
        "M27 35 L8 35 L8 72",
        "M53 20 L85 20 L85 32",
        "M21 25 L5 25",
        "M5 25 L5 72",
        "M38 70 L38 72",
        "M53 25 L91 25",
      ].map((d,i) => (
        <path key={i} d={d} fill="none" stroke={cyan} strokeWidth={0.5} opacity={0.28}
          strokeDasharray="4 3"
          style={{animation:`trace-flow 2.5s linear infinite ${i*0.28}s`}}/>
      ))}

      {/* ── Traces — static silver (all straight) ── */}
      {[
        "M1 20 L21 20",   "M60 20 L91 20",   "M1 35 L21 35",
        "M8 72 L8 89",    "M88 65 L88 72",   "M60 56 L62 56",
        "M21 12 L21 39",  "M40 39 L40 56",   "M38 56 L38 70",
        "M60 44 L60 56",  "M1 55 L5 55",     "M62 70 L88 70",
        "M5 82 L8 82",    "M5 89 L8 89",     "M1 72 L8 72",
        "M62 88 L88 88",  "M1 88 L5 88",     "M53 39 L60 39",
      ].map((d,i) => (
        <path key={`s${i}`} d={d} fill="none" stroke={silver} strokeWidth={0.4} opacity={0.4}/>
      ))}

      {/* RGB edge strips */}
      <rect x={0.5} y={0.5} width={99} height={1.5} rx={0.5}
        fill={active?"#00aaff":"#0a0c14"} opacity={active?0.65:0}
        style={{animation:active?"slot-glow 3s ease-in-out infinite":"none"}}/>
      <rect x={0.5} y={112.5} width={99} height={1.5} rx={0.5}
        fill={active?"#7c5cf6":"#0a0c14"} opacity={active?0.5:0}
        style={{animation:active?"slot-glow 3s ease-in-out infinite 1.5s":"none"}}/>
    </svg>
  );
}

// ── GPU ───────────────────────────────────────────────────────────────────
export function GpuPart({ active }: { active: boolean }) {
  const body   = active ? "#080d18" : "#080808";
  const accent = active ? "#00d4ff" : "#0d1520";
  const purple = active ? "#8b5cf6" : "#0d0a1e";
  const fan    = active ? "#0f1928" : "#0a0a0a";

  return (
    <svg viewBox="0 0 220 68" className="w-full h-full">
      <defs>
        <radialGradient id="fan1-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15"/>
          <stop offset="80%" stopColor={accent} stopOpacity="0.05"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="fan2-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={purple} stopOpacity="0.15"/>
          <stop offset="80%" stopColor={purple} stopOpacity="0.05"/>
          <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Card body */}
      <rect x={1} y={8} width={210} height={55} rx={3} fill={body} stroke={accent} strokeWidth={1} />

      {/* Back plate ridge */}
      <rect x={1} y={8} width={210} height={10} rx={3} fill={active?"#0d1525":"#0a0a0a"} />
      {/* RGB top strip */}
      <rect x={1} y={8} width={210} height={3} rx={2} fill={active?"#00d4ff":"#0a1a1e"}
        style={{animation:active?"slot-glow 2s ease-in-out infinite":"none"}} opacity={active?1:0.1}/>

      {/* Shroud */}
      <rect x={5} y={18} width={160} height={42} rx={2} fill={active?"#0a1020":"#090909"} />

      {/* Fan 1 */}
      <circle cx={46} cy={39} r={22} fill={fan} stroke={accent} strokeWidth={0.8} />
      <circle cx={46} cy={39} r={20} fill="url(#fan1-grad)" />
      {/* Fan blades (rotate group) */}
      <g style={{transformOrigin:"46px 39px", animation:active?"fan-spin 2s linear infinite":"none"}}>
        {Array.from({length:7}).map((_,i)=>{
          const a = (i/7)*Math.PI*2;
          const x1=n(46+Math.cos(a)*8), y1=n(39+Math.sin(a)*8);
          const x2=n(46+Math.cos(a+0.5)*19), y2=n(39+Math.sin(a+0.5)*19);
          return <path key={i} d={`M${x1} ${y1} Q${x2} ${y2} ${n(46+Math.cos(a+1)*18)} ${n(39+Math.sin(a+1)*18)} Z`}
            fill={active?"#0d1e32":"#0d0d0d"} stroke={accent} strokeWidth={0.5} opacity={0.9}/>;
        })}
      </g>
      <circle cx={46} cy={39} r={6} fill={active?"#00d4ff":"#0a0a0a"} opacity={active?0.7:1}/>
      <circle cx={46} cy={39} r={3} fill={body} />

      {/* Fan 2 */}
      <circle cx={108} cy={39} r={22} fill={fan} stroke={purple} strokeWidth={0.8} />
      <circle cx={108} cy={39} r={20} fill="url(#fan2-grad)" />
      <g style={{transformOrigin:"108px 39px", animation:active?"fan-spin-r 2s linear infinite":"none"}}>
        {Array.from({length:7}).map((_,i)=>{
          const a = (i/7)*Math.PI*2;
          const x1=n(108+Math.cos(a)*8), y1=n(39+Math.sin(a)*8);
          const x2=n(108+Math.cos(a+0.5)*19), y2=n(39+Math.sin(a+0.5)*19);
          return <path key={i} d={`M${x1} ${y1} Q${x2} ${y2} ${n(108+Math.cos(a+1)*18)} ${n(39+Math.sin(a+1)*18)} Z`}
            fill={active?"#140d28":"#0d0d0d"} stroke={purple} strokeWidth={0.5} opacity={0.9}/>;
        })}
      </g>
      <circle cx={108} cy={39} r={6} fill={active?"#8b5cf6":"#0a0a0a"} opacity={active?0.7:1}/>
      <circle cx={108} cy={39} r={3} fill={body} />

      {/* Heatsink fins between fans */}
      {Array.from({length:8}).map((_,i)=>(
        <rect key={i} x={71+i*4} y={20} width={2} height={36} rx={0.5}
          fill={active?"#0d1a28":"#0a0a0a"} stroke={active?"#1e3a4a":"#111"} strokeWidth={0.3}/>
      ))}

      {/* Power connectors */}
      <rect x={170} y={20} width={16} height={22} rx={1} fill={active?"#0a1020":"#090909"} stroke={accent} strokeWidth={0.7}/>
      {[24,29,34].map((y,i)=>(
        <rect key={i} x={172} y={y} width={12} height={3} rx={0.5} fill={active?"#1a2a3a":"#111"} stroke={accent} strokeWidth={0.3}/>
      ))}

      {/* PCIe bracket */}
      <rect x={193} y={8} width={16} height={56} rx={1} fill={active?"#0a0f1a":"#090909"} stroke={accent} strokeWidth={0.8}/>
      {/* I/O ports on bracket */}
      {[14,22,30,38,46,54].map((y,i)=>(
        <rect key={i} x={195} y={y} width={12} height={5} rx={1}
          fill={active?"#050a10":"#080808"} stroke={i<3?accent:purple} strokeWidth={0.4}/>
      ))}

      {/* GEFORCE label */}
      <text x={140} y={60} textAnchor="middle" fontSize="5" fill={active?"#8b5cf6":"#1a1a2e"} fontFamily="monospace" fontWeight="bold">RTX</text>
    </svg>
  );
}

// ── PSU ───────────────────────────────────────────────────────────────────
export function PsuPart({ active }: { active: boolean }) {
  const body   = active ? "#080c14" : "#080808";
  const amber  = active ? "#f59e0b" : "#1a1408";
  const cyan   = active ? "#00d4ff" : "#0a1a1e";

  return (
    <svg viewBox="0 0 200 46" className="w-full h-full">
      {/* Body */}
      <rect x={1} y={1} width={198} height={44} rx={3} fill={body} stroke={amber} strokeWidth={1}/>

      {/* Fan grill (honeycomb-ish) */}
      {Array.from({length:4}).map((_,r)=>Array.from({length:7}).map((_,c)=>(
        <circle key={`${r}-${c}`} cx={18+c*13+(r%2)*6.5} cy={9+r*9} r={4}
          fill={active?"#0a0f18":"#0a0a0a"} stroke={amber} strokeWidth={0.5}/>
      )))}
      {/* Fan */}
      <g style={{transformOrigin:"59px 23px", animation:active?"fan-spin 3s linear infinite":"none"}}>
        {Array.from({length:6}).map((_,i)=>{
          const a=(i/6)*Math.PI*2;
          return <path key={i}
            d={`M${n(59+Math.cos(a)*6)} ${n(23+Math.sin(a)*6)} Q${n(59+Math.cos(a+0.4)*16)} ${n(23+Math.sin(a+0.4)*16)} ${n(59+Math.cos(a+0.8)*14)} ${n(23+Math.sin(a+0.8)*14)} Z`}
            fill={active?"#0d1a28":"#0d0d0d"} stroke={amber} strokeWidth={0.5}/>;
        })}
      </g>
      <circle cx={59} cy={23} r={4} fill={active?"#f59e0b":"#1a1408"} opacity={0.6}/>
      <circle cx={59} cy={23} r={2} fill={body}/>

      {/* Vents */}
      {Array.from({length:8}).map((_,i)=>(
        <rect key={i} x={100} y={5+i*4.5} width={30} height={2.5} rx={1}
          fill={active?"#0a0f18":"#080808"} stroke={amber} strokeWidth={0.3}/>
      ))}

      {/* Modular ports */}
      {Array.from({length:6}).map((_,i)=>(
        <rect key={i} x={140+i*8} y={8} width={6} height={28} rx={1}
          fill={active?"#0a0c14":"#090909"} stroke={i<3?cyan:amber} strokeWidth={0.5}/>
      ))}

      {/* Label */}
      <text x={85} y={27} textAnchor="middle" fontSize="6" fill={active?"#f59e0b":"#1a1408"} fontFamily="monospace" fontWeight="bold">1000W</text>

      {/* RGB bottom strip */}
      <rect x={1} y={42} width={198} height={2} rx={1} fill={active?"#00d4ff":"#0a0a0a"}
        style={{animation:active?"slot-glow 2s ease-in-out infinite":"none"}} opacity={active?0.8:0.05}/>
    </svg>
  );
}

// ── COOLER ────────────────────────────────────────────────────────────────
export function CoolerPart({ active }: { active: boolean }) {
  const body   = active ? "#080c14" : "#080808";
  const cyan   = active ? "#00d4ff" : "#0a1a1e";
  const copper = active ? "#b87333" : "#1a0e08";

  return (
    <svg viewBox="0 0 90 56" className="w-full h-full">
      {/* Heatsink fins (tower) */}
      {Array.from({length:9}).map((_,i)=>(
        <rect key={i} x={5+i*6} y={4} width={4} height={48} rx={1}
          fill={active?"#0a1220":"#090909"} stroke={cyan} strokeWidth={0.6} opacity={0.7+i*0.03}/>
      ))}
      {/* Heat pipes */}
      {[20,35,50,65].map((x,i)=>(
        <path key={i} d={`M${x} 52 Q${x+2} 28 ${x} 4`} fill="none"
          stroke={i<2?copper:cyan} strokeWidth={2} opacity={active?0.7:0.15}/>
      ))}
      {/* Fan frame */}
      <rect x={2} y={6} width={86} height={44} rx={3} fill="none" stroke={cyan} strokeWidth={1}
        strokeDasharray={active?"none":"4 2"} opacity={0.5}/>
      {/* Fan blades */}
      <g style={{transformOrigin:"45px 28px", animation:active?"fan-spin 1.8s linear infinite":"none"}}>
        {Array.from({length:7}).map((_,i)=>{
          const a=(i/7)*Math.PI*2;
          const x1=n(45+Math.cos(a)*8), y1=n(28+Math.sin(a)*8);
          const x2=n(45+Math.cos(a+0.5)*19), y2=n(28+Math.sin(a+0.5)*19);
          return <path key={i} d={`M${x1} ${y1} Q${x2} ${y2} ${n(45+Math.cos(a+1)*18)} ${n(28+Math.sin(a+1)*18)} Z`}
            fill={active?"#0d1e32":"#0d0d0d"} stroke={cyan} strokeWidth={0.5}/>;
        })}
      </g>
      <circle cx={45} cy={28} r={6} fill={active?"#00d4ff":"#0a0a0a"} opacity={active?0.5:0.8}/>
      <circle cx={45} cy={28} r={3} fill={body}/>

      {/* RGB strip on fan frame */}
      <rect x={2} y={6} width={86} height={2} rx={1} fill={active?"#8b5cf6":"#0a0a0a"}
        style={{animation:active?"slot-glow 2.5s ease-in-out infinite":"none"}} opacity={active?0.9:0.05}/>
      <rect x={2} y={48} width={86} height={2} rx={1} fill={active?"#00d4ff":"#0a0a0a"}
        style={{animation:active?"slot-glow 2.5s ease-in-out infinite 1.25s":"none"}} opacity={active?0.9:0.05}/>
    </svg>
  );
}

// ── STORAGE — 2.5" SATA SSD, connectors on the right ─────────────────────
export function StoragePart({ active }: { active: boolean }) {
  const body   = active ? "#141824" : "#0e1018";
  const silver = active ? "#8899bb" : "#1a1e28";
  const cyan   = active ? "#00d4ff" : "#0a1a1e";
  const label  = active ? "#0d1525" : "#0a0d14";

  return (
    <svg viewBox="0 0 110 65" className="w-full h-full">
      {/* ── Casing ── */}
      <rect x={1} y={1} width={88} height={63} rx={3}
        fill={body} stroke={silver} strokeWidth={1}/>
      {/* Top edge highlight (brushed aluminum look) */}
      <rect x={1} y={1} width={88} height={4} rx={3}
        fill={active?"#242e44":"#161820"}/>
      <rect x={1} y={60} width={88} height={4} rx={3}
        fill={active?"#1a2236":"#12141c"}/>

      {/* ── Label sticker ── */}
      <rect x={5} y={8} width={78} height={44} rx={2} fill={label}/>

      {/* ── NAND flash chips (4 chips on label) ── */}
      {[[7,12],[7,30],[29,12],[29,30]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={18} height={13} rx={1}
          fill={active?"#040810":"#060608"} stroke={silver} strokeWidth={0.5}/>
      ))}

      {/* ── Controller chip ── */}
      <rect x={52} y={14} width={26} height={22} rx={1.5}
        fill={active?"#060e1c":"#080808"} stroke={cyan} strokeWidth={0.7}/>
      <text x={65} y={27} textAnchor="middle" fontSize="5"
        fill={active?silver:"#111"} fontFamily="monospace" fontWeight="bold">NVMe</text>
      <text x={65} y={33} textAnchor="middle" fontSize="3.5"
        fill={active?cyan:"#0a1a1e"} fontFamily="monospace">CTRL</text>

      {/* ── Capacitors near controller ── */}
      {[[51,38],[54,38],[57,38]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width={2} height={3} rx={0.3}
          fill={active?"#0a0e1c":"#070808"} stroke={silver} strokeWidth={0.3}/>
      ))}

      {/* ── Model label ── */}
      <text x={44} y={57} textAnchor="middle" fontSize="5"
        fill={active?"#00d4ff":"#0a1220"} fontFamily="monospace" fontWeight="bold">2TB SSD</text>

      {/* ── Screw holes (4 corners) ── */}
      {[[4,4],[85,4],[4,60],[85,60]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={2.2} fill={body} stroke={silver} strokeWidth={0.5}/>
          {/* Phillips screw cross */}
          <line x1={cx-1} y1={cy} x2={cx+1} y2={cy} stroke={silver} strokeWidth={0.4} opacity={0.5}/>
          <line x1={cx} y1={cy-1} x2={cx} y2={cy+1} stroke={silver} strokeWidth={0.4} opacity={0.5}/>
        </g>
      ))}

      {/* ── SATA data connector (right side, upper) ── */}
      <rect x={89} y={10} width={20} height={10} rx={1}
        fill={active?"#080c14":"#070808"} stroke={cyan} strokeWidth={0.8}/>
      <text x={99} y={17} textAnchor="middle" fontSize="3"
        fill={active?cyan:"#0a1a1e"} fontFamily="monospace">DATA</text>
      {/* Data pins */}
      {Array.from({length:7}).map((_,i) => (
        <rect key={i} x={90+i*2.5} y={11} width={1.6} height={7} rx={0.2}
          fill={active?"#c9a84c":"#222"}/>
      ))}

      {/* ── SATA power connector (right side, lower) ── */}
      <rect x={89} y={25} width={20} height={16} rx={1}
        fill={active?"#080c14":"#070808"} stroke={silver} strokeWidth={0.8}/>
      <text x={99} y={35} textAnchor="middle" fontSize="3"
        fill={active?silver:"#1a1e28"} fontFamily="monospace">PWR</text>
      {/* Power pins (wider, colour-coded) */}
      {["#ef4444","#1a1a1a","#1a1a1a","#fbbf24","#1a1a1a"].map((col,i) => (
        <rect key={i} x={90+i*3.6} y={26} width={2.8} height={12} rx={0.3}
          fill={active?col:"#222"}/>
      ))}

      {/* ── RGB strip — left edge ── */}
      <rect x={1} y={1} width={2.5} height={63} rx={1}
        fill={active?"#00d4ff":"#0a0c14"} opacity={active?0.75:0}
        style={{animation:active?"slot-glow 2s ease-in-out infinite":"none"}}/>

      {/* ── Activity LED ── */}
      {active && (
        <circle cx={83} cy={58} r={1.8} fill={cyan} opacity={0.9}
          style={{animation:"led-blink 0.7s ease-in-out infinite"}}/>
      )}
    </svg>
  );
}

// ── MONITOR ───────────────────────────────────────────────────────────────
export function MonitorPart({ active }: { active: boolean }) {
  const teal = active ? "#14b8a6" : "#0a1412";
  const glow = active ? "#00d4ff" : "#0a1a1e";

  return (
    <svg viewBox="0 0 90 56" className="w-full h-full">
      {/* Stand */}
      <rect x={37} y={48} width={16} height={6} rx={1} fill={active?"#0d1a1e":"#090909"} stroke={teal} strokeWidth={0.6}/>
      <path d="M30 54 L60 54" stroke={teal} strokeWidth={1} strokeLinecap="round"/>
      <path d="M45 47 L45 51" stroke={teal} strokeWidth={1.5}/>

      {/* Bezel */}
      <rect x={2} y={2} width={86} height={46} rx={3} fill={active?"#080e14":"#080808"} stroke={glow} strokeWidth={1}/>

      {/* Screen */}
      <rect x={5} y={5} width={80} height={40} rx={1} fill={active?"#030810":"#040404"}/>
      {active && (
        <>
          {/* Screen content glow */}
          <defs>
            <radialGradient id="screen-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05"/>
            </radialGradient>
          </defs>
          <rect x={5} y={5} width={80} height={40} rx={1} fill="url(#screen-glow)"/>
          {/* Scanlines */}
          {Array.from({length:8}).map((_,i)=>(
            <line key={i} x1={5} y1={9+i*5} x2={85} y2={9+i*5} stroke="#00d4ff" strokeWidth={0.3} opacity={0.1}/>
          ))}
          {/* Fake UI */}
          <rect x={10} y={9} width={50} height={3} rx={1} fill="#00d4ff" opacity={0.3}/>
          {[15,21,27,33].map((y,i)=>(
            <rect key={i} x={10} y={y} width={30+i*5} height={2} rx={0.5} fill="#8b5cf6" opacity={0.2}/>
          ))}
        </>
      )}

      {/* Power LED */}
      {active && <circle cx={82} cy={44} r={1.5} fill="#00d4ff" opacity={0.9}
        style={{animation:"led-blink 2s ease-in-out infinite"}}/>}

      {/* RGB strip bottom of bezel */}
      <rect x={2} y={45} width={86} height={2} rx={0} fill={active?"url(#ram-rgb)":"#0a0a0a"} opacity={active?0.8:0.05}/>
    </svg>
  );
}

// ── KEYBOARD ──────────────────────────────────────────────────────────────
export function KeyboardPart({ active }: { active: boolean }) {
  const rose = active ? "#f43f5e" : "#1a0a0e";
  const body = active ? "#070a0e" : "#070707";

  return (
    <svg viewBox="0 0 120 46" className="w-full h-full">
      {/* Body */}
      <rect x={1} y={4} width={118} height={38} rx={4} fill={body} stroke={rose} strokeWidth={1}/>

      {/* Key rows */}
      {[
        { y:8,  keys:14, w:7 },
        { y:17, keys:13, w:7.5 },
        { y:26, keys:12, w:8.5 },
        { y:35, keys: 6, w:7  },
      ].map(({y,keys,w}, row)=>
        Array.from({length:keys}).map((_,i)=>{
          const colors = active
            ? ["#00d4ff","#8b5cf6","#f43f5e","#f59e0b","#10b981"]
            : ["#0a0a12","#0a0a12","#0a0a12","#0a0a12","#0a0a12"];
          const c = colors[(i+row)%colors.length];
          const xStart = row===1?5 : row===2?9 : row===3?25 : 3;
          return (
            <rect key={i} x={xStart+i*(w+1)} y={y} width={w} height={6} rx={1}
              fill={c} opacity={active?0.7:1}
              style={{animation:active?`led-blink ${1.5+((i+row*3)%5)*0.3}s ease-in-out infinite ${((i+row)%7)*0.2}s`:"none"}}/>
          );
        })
      )}

      {/* Spacebar */}
      <rect x={30} y={35} width={60} height={6} rx={1}
        fill={active?"#f43f5e":"#0a0a12"} opacity={active?0.8:1}
        style={{animation:active?"slot-glow 2s ease-in-out infinite":"none"}}/>

      {/* RGB underglow */}
      <rect x={1} y={40} width={118} height={2} rx={1} fill={active?"#f43f5e":"#0a0a0a"} opacity={active?0.6:0.05}/>
    </svg>
  );
}

// ── MOUSE ─────────────────────────────────────────────────────────────────
export function MousePart({ active }: { active: boolean }) {
  const orange = active ? "#f97316" : "#1a0e08";
  const body   = active ? "#070a0e" : "#070707";

  return (
    <svg viewBox="0 0 56 90" className="w-full h-full">
      {/* Body shape */}
      <path d="M8 30 Q6 10 28 5 Q50 10 48 30 L50 70 Q50 85 28 85 Q6 85 6 70 Z"
        fill={body} stroke={orange} strokeWidth={1.2}/>

      {/* Left/right click split */}
      <path d="M28 10 L28 35" stroke={orange} strokeWidth={0.7} opacity={0.5}/>

      {/* Left click zone */}
      <path d="M7 30 Q7 15 28 10 L28 35 L8 35 Z" fill={active?"#0a0e16":"#090909"} opacity={0.7}/>
      {/* Right click zone */}
      <path d="M49 30 Q49 15 28 10 L28 35 L48 35 Z" fill={active?"#0a0e16":"#090909"} opacity={0.7}/>

      {/* Scroll wheel */}
      <rect x={23} y={14} width={10} height={16} rx={5} fill={active?"#0d1a2e":"#0a0a0a"} stroke={orange} strokeWidth={0.8}/>
      {/* Scroll texture */}
      {[17,20,23,26].map((y,i)=>(
        <line key={i} x1={23} y1={y} x2={33} y2={y} stroke={active?"#f97316":"#1a0e08"} strokeWidth={0.6} opacity={0.6}/>
      ))}

      {/* Side buttons */}
      <rect x={6} y={42} width={5} height={8} rx={1} fill={active?"#0d1a2e":"#090909"} stroke={orange} strokeWidth={0.5}/>
      <rect x={6} y={52} width={5} height={8} rx={1} fill={active?"#0d1a2e":"#090909"} stroke={orange} strokeWidth={0.5}/>

      {/* DPI indicator LEDs */}
      {active && [0,1,2,3].map((i)=>(
        <circle key={i} cx={24+i*3} cy={38} r={1} fill={i<2?"#f97316":"#f97316"} opacity={i<2?0.9:0.3}
          style={{animation:`led-blink ${1.5+i*0.3}s ease-in-out infinite ${i*0.2}s`}}/>
      ))}

      {/* RGB side strip */}
      <path d="M48 35 Q52 50 50 65" fill="none" stroke={active?"#f97316":"#1a0e08"}
        strokeWidth={2} strokeLinecap="round" opacity={active?0.7:0.1}
        style={{animation:active?"slot-glow 2s ease-in-out infinite":"none"}}/>
    </svg>
  );
}

// ── CASE (outer container decoration) ─────────────────────────────────────
export function CasePart({ active }: { active: boolean }) {
  const cyan = active ? "#00d4ff" : "#0a1a1e";
  const body = active ? "#070a0e" : "#070707";

  return (
    <svg viewBox="0 0 90 56" className="w-full h-full">
      {/* Case outline */}
      <rect x={1} y={1} width={88} height={54} rx={3} fill={body} stroke={cyan} strokeWidth={1.2}/>

      {/* Glass panel */}
      <rect x={5} y={5} width={55} height={46} rx={2} fill={active?"#030810":"#040404"} stroke={cyan} strokeWidth={0.5} opacity={0.8}/>
      {active && <rect x={5} y={5} width={55} height={46} rx={2} fill="#00d4ff" fillOpacity={0.03}/>}

      {/* Case fans visible through glass */}
      {[[17,28],[42,28]].map(([cx,cy],fi)=>(
        <g key={fi}>
          <circle cx={cx} cy={cy} r={13} fill={active?"#050a14":"#050505"} stroke={cyan} strokeWidth={0.6}/>
          <g style={{transformOrigin:`${cx}px ${cy}px`, animation:active?"fan-spin 2s linear infinite":"none"}}>
            {Array.from({length:5}).map((_,i)=>{
              const a=(i/5)*Math.PI*2;
              return <path key={i}
                d={`M${n(cx+Math.cos(a)*4)} ${n(cy+Math.sin(a)*4)} Q${n(cx+Math.cos(a+0.5)*11)} ${n(cy+Math.sin(a+0.5)*11)} ${n(cx+Math.cos(a+1)*10)} ${n(cy+Math.sin(a+1)*10)} Z`}
                fill={active?"#0d1e32":"#0a0a0a"} stroke={cyan} strokeWidth={0.4}/>;
            })}
          </g>
          <circle cx={cx} cy={cy} r={3} fill={active?"#00d4ff":"#0a0a0a"} opacity={active?0.5:1}/>
          <circle cx={cx} cy={cy} r={1.5} fill={body}/>
        </g>
      ))}

      {/* Right panel (HDD bay, etc.) */}
      <rect x={64} y={5} width={22} height={46} rx={1} fill={active?"#060a10":"#050505"} stroke={cyan} strokeWidth={0.4}/>
      {[8,16,24,32,40].map((y,i)=>(
        <rect key={i} x={66} y={y} width={18} height={5} rx={0.5}
          fill={active?"#040810":"#040404"} stroke={cyan} strokeWidth={0.3}/>
      ))}

      {/* Power button */}
      <circle cx={76} cy={5} r={3} fill={active?"#00d4ff":"#0a0a0a"} stroke={cyan} strokeWidth={0.8}
        style={{animation:active?"led-blink 2s ease-in-out infinite":"none"}} opacity={active?0.9:0.5}/>

      {/* RGB strip top and bottom */}
      <rect x={5} y={5} width={55} height={2} rx={1} fill={active?"#8b5cf6":"#0a0a0a"}
        style={{animation:active?"slot-glow 3s ease-in-out infinite":"none"}} opacity={active?0.8:0.05}/>
      <rect x={5} y={49} width={55} height={2} rx={1} fill={active?"#00d4ff":"#0a0a0a"}
        style={{animation:active?"slot-glow 3s ease-in-out infinite 1.5s":"none"}} opacity={active?0.8:0.05}/>
    </svg>
  );
}
