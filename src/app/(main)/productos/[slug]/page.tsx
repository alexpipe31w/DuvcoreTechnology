import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductById } from "@/lib/stockup/client";
import { ProductDetail } from "@/components/products/ProductDetail";
import { ProductDetailSkeleton } from "@/components/products/ProductDetailSkeleton";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://duvcoretechnology.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductById(slug);
    const description = product.description
      ? product.description.replace(/<[^>]+>/g, "").slice(0, 160)
      : `Compra ${product.name} al mejor precio en Colombia.`;

    return {
      title: product.name,
      description,
      alternates: { canonical: `${SITE}/productos/${slug}` },
      openGraph: {
        title: `${product.name} | DuvCORE Technology`,
        description,
        url: `${SITE}/productos/${slug}`,
        images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description,
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch {
    return { title: "Producto no encontrado" };
  }
}

async function ProductSchemas({ id }: { id: string }) {
  let product;
  try {
    product = await getProductById(id);
  } catch {
    return null;
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description?.replace(/<[^>]+>/g, "") ?? "",
    image: product.images ?? [],
    sku: product.id,
    brand: { "@type": "Brand", name: "DuvCORE Technology" },
    offers: {
      "@type": "Offer",
      url: `${SITE}/productos/${id}`,
      priceCurrency: "COP",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "DuvCORE Technology" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${SITE}/productos` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE}/productos/${id}` },
    ],
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
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
      <ProductSchemas id={slug} />
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailServer id={slug} />
      </Suspense>
    </div>
  );
}
