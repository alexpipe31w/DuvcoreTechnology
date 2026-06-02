"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Eye, Share2, Play, ExternalLink } from "lucide-react";

interface TikTokVideo {
  id: string;
  url: string;
  title: string;
  thumb: string;
  likes: number;
  views: number;
  comments: number;
  date: string;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function BlogPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/tiktok-auto")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.videos)) setVideos(data.videos);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-7 h-7 text-primary flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Blog / TikTok</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Contenido técnico de{" "}
          <a
            href="https://www.tiktok.com/@blackcore.07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            @blackcore.07
          </a>{" "}
          — tips, reparaciones y noticias tech. Actualizado cada domingo.
        </p>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[9/16] rounded-xl bg-surface-elevated animate-pulse" />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="mb-3">No se pudieron cargar los videos.</p>
          <a
            href="https://www.tiktok.com/@blackcore.07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
          >
            Ver canal en TikTok <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Videos */}
      {!loading && !error && videos.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {videos.map((v) => (
            <motion.a
              key={v.id}
              variants={card}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-surface-elevated border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {v.url ? (
                <Image
                  src={`/api/tiktok-thumb?url=${encodeURIComponent(v.url)}`}
                  alt={v.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-surface flex items-center justify-center">
                  <Play className="w-10 h-10 text-primary opacity-40" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

              {/* Play hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-medium line-clamp-2 leading-snug mb-2">
                  {v.title}
                </p>
                <div className="flex items-center gap-2.5 text-white/80 text-[10px]">
                  <span className="flex items-center gap-0.5">
                    <Heart className="w-2.5 h-2.5" />
                    {fmt(v.likes)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-2.5 h-2.5" />
                    {fmt(v.views)}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MessageCircle className="w-2.5 h-2.5" />
                    {fmt(v.comments)}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      )}

      {/* CTA */}
      {!loading && (
        <div className="mt-12 text-center">
          <a
            href="https://www.tiktok.com/@blackcore.07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-colors glow-cyan-sm"
          >
            <Share2 className="w-4 h-4" />
            Ver más en TikTok
          </a>
        </div>
      )}
    </div>
  );
}
