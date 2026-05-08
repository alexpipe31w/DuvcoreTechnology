import type { Metadata } from "next";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a DuvCORE Technology, tu tienda de tecnología en Colombia.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

export default function NosotrosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Somos{" "}
          <span className="text-primary">DuvCORE Technology</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Tu tienda de tecnología en Colombia. Productos originales, precios
          competitivos y el mejor servicio técnico especializado.
        </p>
      </div>

      {/* Mission */}
      <div className="grid sm:grid-cols-2 gap-8 mb-16">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">Nuestra misión</h2>
          <p className="text-muted-foreground leading-relaxed">
            Democratizar el acceso a la tecnología de calidad en Colombia,
            ofreciendo productos originales a precios justos respaldados por
            servicio técnico especializado de confianza.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-3">¿Por qué elegirnos?</h2>
          <ul className="space-y-2 text-muted-foreground text-sm">
            {[
              "Productos 100% originales con garantía",
              "Servicio técnico especializado",
              "Atención personalizada por WhatsApp",
              "Envíos a todo Colombia",
              "Pagos seguros con Mercado Pago",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TikTok placeholder */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Síguenos en TikTok
        </h2>
        <div className="bg-surface border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Mira nuestros videos de reparaciones, tips tech y novedades
          </p>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface-elevated hover:bg-border text-foreground text-sm font-medium px-5 py-2.5 rounded-lg border border-border transition-colors"
          >
            Ver en TikTok →
          </a>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-surface border border-primary/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Contáctanos
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Teléfono</p>
              <p className="text-sm text-muted-foreground">+{WA}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Ubicación</p>
              <p className="text-sm text-muted-foreground">Colombia</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Horario</p>
              <p className="text-sm text-muted-foreground">Lun–Sáb 8am–6pm</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a
            href={`https://wa.me/${WA}?text=Hola%2C%20tengo%20una%20consulta`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
