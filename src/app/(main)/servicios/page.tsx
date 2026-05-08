import type { Metadata } from "next";
import { Wrench, Monitor, Zap, Shield, Printer, Cpu } from "lucide-react";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios Técnicos",
  description:
    "Mantenimiento preventivo y correctivo, formateo, instalación de SO, reparación de impresoras y más.",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Mantenimiento preventivo",
    desc: "Limpieza interna, cambio de pasta térmica, revisión general del equipo para prevenir fallas.",
    price: "Desde $50.000",
  },
  {
    icon: Shield,
    title: "Mantenimiento correctivo",
    desc: "Diagnóstico y reparación de fallas en hardware y software. Garantía en el trabajo realizado.",
    price: "Desde $80.000",
  },
  {
    icon: Monitor,
    title: "Formateo e instalación de SO",
    desc: "Instalación limpia de Windows, drivers, programas básicos y configuración inicial.",
    price: "Desde $60.000",
  },
  {
    icon: Zap,
    title: "Optimización de rendimiento",
    desc: "Limpieza de software, eliminación de virus, optimización del sistema para mayor velocidad.",
    price: "Desde $40.000",
  },
  {
    icon: Printer,
    title: "Reparación de impresoras",
    desc: "Mantenimiento y reparación de impresoras de tinta y láser. Recarga de cartuchos.",
    price: "Cotizar",
  },
  {
    icon: Cpu,
    title: "Upgrades de hardware",
    desc: "Instalación de RAM, SSD, tarjetas de video y otros componentes para mejorar tu equipo.",
    price: "Cotizar",
  },
];

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

export default function ServiciosPage() {
  const waLink = `https://wa.me/${WA_NUMBER}?text=Hola%2C%20necesito%20un%20servicio%20t%C3%A9cnico`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <Wrench className="w-3.5 h-3.5" />
          Servicio técnico especializado
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Reparamos y optimizamos tu equipo
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Técnicos especializados con años de experiencia. Diagnóstico rápido,
          precios justos y garantía en todos nuestros trabajos.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {SERVICES.map(({ icon: Icon, title, desc, price }) => (
          <div
            key={title}
            className="bg-surface border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
            <span className="text-sm font-semibold text-primary">{price}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-surface border border-primary/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          ¿Necesitas un servicio técnico?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Escríbenos por WhatsApp y te ayudamos a diagnosticar y solucionar el problema de tu equipo.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Solicitar servicio por WhatsApp
        </a>
      </div>
    </div>
  );
}
