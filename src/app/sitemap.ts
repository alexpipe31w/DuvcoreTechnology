import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/stockup/client";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://duvcoretechnology.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/productos`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/servicios`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/simulador`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/faq`, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const { data: products } = await getProducts({ limit: 100, isActive: true });
    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${SITE}/productos/${p.id}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
