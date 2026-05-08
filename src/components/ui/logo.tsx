import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { icon: 24, text: "text-sm" },
  md: { icon: 32, text: "text-base" },
  lg: { icon: 48, text: "text-xl" },
};

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Hexagon base */}
        <polygon
          points="24,2 44,13 44,35 24,46 4,35 4,13"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2"
        />
        {/* Inner D */}
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="url(#grad)"
        >
          D
        </text>
        {/* Circuit dot accents */}
        <circle cx="4" cy="13" r="2" fill="#00d4ff" />
        <circle cx="44" cy="13" r="2" fill="#00d4ff" />
        <circle cx="24" cy="2" r="2" fill="#7c3aed" />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <div className={cn("font-bold leading-tight", text)}>
          <span className="text-primary">DuvCORE</span>
          <span className="text-foreground-muted font-normal"> Technology</span>
        </div>
      )}
    </div>
  );
}
