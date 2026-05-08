import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductById } from "@/lib/stockup/client";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductDetailSkeleton } from "@/components/products/ProductDetailSkeleton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductById(slug);
    return {
      title: product.name,
      description: product.description?.slice(0, 160),
      openGraph: {
        title: product.name,
        description: product.description?.slice(0, 160),
        images: product.images?.[0]?.url ? [{ url: product.images[0].url }] : [],
      },
    };
  } catch {
    return { title: "Producto no encontrado" };
  }
}

async function ProductDetailServer({ id }: { id: string }) {
  const product = await getProductById(id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailServer id={slug} />
      </Suspense>
    </div>
  );
}
