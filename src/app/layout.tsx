import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/JsonLd";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://duvcoretechnology.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "DuvCORE Technology — Tecnología al mejor precio en Colombia",
    template: "%s | DuvCORE Technology",
  },
  description:
    "Venta de computadores, portátiles, celulares, partes y periféricos. Servicios técnicos de mantenimiento y reparación en Colombia.",
  keywords: [
    "computadores Colombia",
    "portátiles baratos",
    "servicio técnico computadores",
    "venta de tecnología",
    "periféricos PC",
    "reparación laptops",
    "DuvCORE Technology",
  ],
  authors: [{ name: "DuvCORE Technology" }],
  creator: "DuvCORE Technology",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE,
    siteName: "DuvCORE Technology",
    title: "DuvCORE Technology — Tecnología al mejor precio en Colombia",
    description:
      "Computadores, portátiles, celulares, componentes y periféricos. Servicios técnicos especializados.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DuvCORE Technology",
    description:
      "Computadores, portátiles, celulares, componentes y periféricos. Servicios técnicos especializados.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DuvCORE Technology",
  url: SITE,
  logo: `${SITE}/next.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+57-315-841-1069",
    contactType: "customer service",
    areaServed: "CO",
    availableLanguage: "Spanish",
  },
  sameAs: ["https://www.tiktok.com/@blackcore.07"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CO",
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DuvCORE Technology",
  url: SITE,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE}/productos?search={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full`}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
