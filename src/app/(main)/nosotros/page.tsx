import type { Metadata } from "next";
import {
  MapPin, Phone, Clock, MessageCircle,
  ShieldCheck, Wrench, Users, TrendingUp,
  Laptop, Printer, Smartphone, Headphones,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a Duvcore Technology — más de 5 años de experiencia en tecnología, servicio técnico y venta de productos en Colombia.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

const VALORES = [
  { icon: ShieldCheck, label: "Honestidad ante todo" },
  { icon: Wrench,      label: "Conocimiento técnico real y comprobado" },
  { icon: Users,       label: "Compromiso con el cliente" },
  { icon: TrendingUp,  label: "Soluciones prácticas, sin complicaciones" },
];

const PRODUCTOS = [
  { icon: Laptop,      label: "Computadores",          desc: "Portátiles y de escritorio" },
  { icon: Printer,     label: "Impresoras",             desc: "Equipos e insumos" },
  { icon: Smartphone,  label: "iPhone y Smartphones",   desc: "Equipos originales" },
  { icon: Headphones,  label: "Accesorios tecnológicos", desc: "Periféricos y más" },
];

const SERVICIOS = [
  "Mantenimiento preventivo y correctivo de computadores",
  "Instalación de sistemas operativos y software",
  "Configuración de redes domésticas y de oficina",
  "Configuración e instalación de impresoras",
  "Diagnóstico de fallas de hardware y software",
  "Asesoría personalizada para compra de equipos según necesidad y presupuesto",
];

const TRAYECTORIA = [
  "Más de 5 años como técnico en sistemas",
  "Fundador y ex-propietario de negocio propio de tecnología",
  "Experiencia en venta, soporte técnico, diagnóstico y asesoría",
  "Atención a clientes particulares y empresas",
  "Relanzamiento de la marca con visión de crecimiento digital",
];

export default function NosotrosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="text-center">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">
          Tecnología que resuelve. Servicio que conecta.
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-5 leading-tight">
          Somos{" "}
          <span className="text-primary">Duvcore Technology</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Marca personal de tecnología especializada en venta de productos
          tecnológicos y servicios técnicos en sistemas, con más de 5 años
          de experiencia sirviendo a clientes particulares y empresariales
          en Colombia.
        </p>
      </div>

      {/* ── Fundador ───────────────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-primary">
            D
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
              Fundador
            </p>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Duvan — Técnico en Sistemas
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Duvcore Technology es liderada por Duvan, técnico en sistemas con más de{" "}
              <strong className="text-foreground">5 años de experiencia</strong> en el sector
              tecnológico. Durante ese tiempo fundó y dirigió su propio negocio donde vendía
              computadores, impresoras, celulares y accesorios, atendiendo tanto clientes
              particulares como empresariales. Tras una etapa como empleado formal, decidió
              retomar su camino como emprendedor independiente, relanzando su marca con más
              experiencia, más criterio y más compromiso que nunca.
            </p>

            {/* Trayectoria */}
            <ul className="mt-5 space-y-2">
              {TRAYECTORIA.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Misión y Visión ────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">M</span>
            Misión
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Brindar soluciones tecnológicas accesibles, confiables y de calidad a personas y
            empresas, combinando la venta de productos tecnológicos con un servicio técnico
            profesional y personalizado, que genere confianza, valor real y relaciones duraderas
            con cada cliente.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">V</span>
            Visión
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ser reconocidos como la marca tecnológica personal de referencia en nuestra región,
            destacándonos por la honestidad, el conocimiento técnico y la cercanía con el cliente.
          </p>
        </div>
      </div>

      {/* ── Valores ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Nuestros valores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {VALORES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-surface border border-border rounded-xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Productos ──────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
          Productos que vendemos
        </h2>
        <p className="text-muted-foreground text-center text-sm mb-8">
          Equipos originales con garantía y respaldo técnico
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PRODUCTOS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-surface border border-border rounded-xl p-5 flex flex-col items-center text-center gap-2"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Servicios técnicos ─────────────────────────────────────── */}
      <div className="bg-surface border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Servicios técnicos
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICIOS.map((s) => (
            <div key={s} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Wrench className="w-3 h-3 text-primary" />
              </span>
              <p className="text-sm text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TikTok ─────────────────────────────────────────────────── */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">Síguenos en TikTok</h2>
        <p className="text-muted-foreground text-sm mb-5">
          Mira nuestros videos de reparaciones, tips tech y novedades en{" "}
          <strong className="text-foreground">@blackcore.07</strong>
        </p>
        <a
          href="https://tiktok.com/@blackcore.07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-surface-elevated hover:bg-border text-foreground text-sm font-medium px-5 py-2.5 rounded-lg border border-border transition-colors"
        >
          Ver en TikTok →
        </a>
      </div>

      {/* ── Contacto ───────────────────────────────────────────────── */}
      <div className="bg-surface border border-primary/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Contáctanos</h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Teléfono / WhatsApp</p>
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
            href={`https://wa.me/${WA}?text=Hola%20Duvcore%20Technology%2C%20tengo%20una%20consulta`}
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
