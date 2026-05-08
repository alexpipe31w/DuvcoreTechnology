import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { MessageCircle, MapPin, Clock, Phone } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

export function Footer() {
  const waLink = `https://wa.me/${WHATSAPP}?text=Hola%2C%20me%20interesa%20un%20servicio%20t%C3%A9cnico`;

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tu tienda de tecnología en Colombia. Productos originales, precios
              competitivos y servicio técnico especializado.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Tienda</h3>
            <ul className="space-y-2">
              {[
                { href: "/productos", label: "Todos los productos" },
                { href: "/simulador", label: "Simulador de PC" },
                { href: "/servicios", label: "Servicios técnicos" },
                { href: "/blog", label: "Blog tech" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-2">
              {[
                { href: "/nosotros", label: "Nosotros" },
                { href: "/faq", label: "FAQ" },
                { href: "/servicios", label: "Garantías" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <a href={`tel:+${WHATSAPP}`} className="hover:text-primary transition-colors">
                  +{WHATSAPP}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Colombia</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Lun–Sáb 8am–6pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 DuvCORE Technology. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by{" "}
            <span className="text-primary font-medium">StockUp</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
