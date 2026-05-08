import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "@/components/providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "DuvCORE Technology — Tecnología al mejor precio",
    template: "%s | DuvCORE Technology",
  },
  description:
    "Venta de computadores, portátiles, celulares, partes y periféricos. Servicios técnicos de mantenimiento y reparación en Colombia.",
  keywords: [
    "computadores",
    "portátiles",
    "celulares",
    "tecnología",
    "servicio técnico",
    "Colombia",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "DuvCORE Technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
