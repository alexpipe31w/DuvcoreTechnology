"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-surface-elevated text-muted-foreground",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill && width ? { width, height } : undefined}
      >
        <Zap className="w-8 h-8 opacity-20" />
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        className={className}
        sizes={sizes}
        priority={priority}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 64}
      height={height ?? 64}
      unoptimized
      className={className}
      onError={() => setError(true)}
    />
  );
}
