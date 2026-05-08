import Link from "next/link";
import { ArrowRight, Wrench, Shield, Zap, Monitor } from "lucide-react";

const SERVICES = [
  { icon: Wrench, label: "Mantenimiento preventivo y correctivo" },
  { icon: Monitor, label: "Formateo e instalación de SO" },
  { icon: Zap, label: "Optimización de rendimiento" },
  { icon: Shield, label: "Reparación de impresoras" },
];

export function ServicesBanner() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface via-surface-elevated to-surface border border-primary/20 p-8 sm:p-12">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Wrench className="w-3 h-3" />
                Servicios técnicos
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Reparamos y optimizamos{" "}
                <span className="text-primary">tu equipo</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                Servicio técnico especializado para computadores, portátiles e
                impresoras. Diagnóstico rápido, precios justos, garantía en el
                trabajo.
              </p>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Ver servicios
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-background/50 border border-border rounded-xl p-4 flex flex-col gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground font-medium leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
