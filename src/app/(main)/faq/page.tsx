"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573158411069";

const FAQ_ITEMS = [
  {
    category: "Sobre Duvcore Technology",
    items: [
      {
        q: "¿Qué es Duvcore Technology?",
        a: "Duvcore Technology es una marca personal de tecnología fundada y liderada por Duvan, técnico en sistemas con más de 5 años de experiencia. Nos especializamos en la venta de productos tecnológicos y servicios técnicos en sistemas, atendiendo tanto clientes particulares como empresariales en Colombia.",
      },
      {
        q: "¿Quién está detrás de Duvcore Technology?",
        a: "Duvan, técnico en sistemas con más de 5 años de experiencia en el sector. Anteriormente fundó y dirigió su propio negocio de tecnología, y tras una etapa en el sector formal decidió relanzar su marca como emprendimiento independiente con mayor experiencia y visión digital.",
      },
      {
        q: "¿Cuál es el eslogan de la marca?",
        a: '"Tecnología que resuelve. Servicio que conecta." Refleja nuestra filosofía: no solo vendemos productos, sino que acompañamos a nuestros clientes con soporte técnico real y personalizado.',
      },
    ],
  },
  {
    category: "Productos",
    items: [
      {
        q: "¿Qué productos venden?",
        a: "Vendemos computadores (portátiles y de escritorio), impresoras, iPhone y smartphones, y accesorios tecnológicos en general. Todos nuestros productos son originales y cuentan con garantía.",
      },
      {
        q: "¿Los productos tienen garantía?",
        a: "Sí. Computadores y portátiles tienen garantía mínima de 1 año del fabricante. Periféricos y accesorios 6 meses. Ante cualquier inconveniente contáctanos por WhatsApp con tu número de orden.",
      },
      {
        q: "¿Hacen envíos a todo Colombia?",
        a: "Sí, enviamos a todo el territorio nacional a través de transportadoras aliadas. Los tiempos de entrega varían entre 1 y 5 días hábiles según tu ubicación.",
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: "El costo de envío depende del peso del producto y la ciudad de destino. Se calcula automáticamente al momento del checkout.",
      },
    ],
  },
  {
    category: "Servicios técnicos",
    items: [
      {
        q: "¿Qué servicios técnicos ofrecen?",
        a: "Ofrecemos mantenimiento preventivo y correctivo de computadores, instalación de sistemas operativos y software, configuración de redes domésticas y de oficina, instalación de impresoras, diagnóstico de fallas de hardware y software, y asesoría personalizada para compra de equipos según tu necesidad y presupuesto.",
      },
      {
        q: "¿Cuánto tarda un servicio técnico?",
        a: "Depende del tipo de servicio. Un mantenimiento preventivo puede estar listo el mismo día. Reparaciones más complejas pueden tomar de 2 a 5 días hábiles. Te informamos el tiempo estimado al recibir el equipo.",
      },
      {
        q: "¿Los servicios técnicos tienen garantía?",
        a: "Sí, todos nuestros servicios técnicos tienen garantía de 30 días sobre el trabajo realizado.",
      },
      {
        q: "¿Cómo solicito un servicio técnico?",
        a: "Puedes solicitarlo directamente desde la sección 'Servicios' en nuestra página web, o escríbenos por WhatsApp describiendo el problema con tu equipo. Te responderemos a la brevedad con diagnóstico y presupuesto.",
      },
    ],
  },
  {
    category: "Pagos",
    items: [
      {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas de crédito y débito, PSE, Nequi, Daviplata y efectivo en puntos aliados. Todos los pagos se procesan de forma segura a través de Mercado Pago.",
      },
      {
        q: "¿Es seguro pagar en la tienda?",
        a: "Totalmente seguro. Usamos StockUp como plataforma de e-commerce con integración directa a Mercado Pago, que cuenta con los más altos estándares de seguridad en Colombia.",
      },
    ],
  },
  {
    category: "Asesoría",
    items: [
      {
        q: "¿Me pueden ayudar a elegir un equipo según mi presupuesto?",
        a: "Sí, es uno de nuestros servicios estrella. Duvan te asesora personalmente para elegir el equipo que mejor se adapte a tus necesidades reales y presupuesto, sin sobrevenderte ni complicarte. Escríbenos por WhatsApp.",
      },
      {
        q: "¿Atienden empresas o solo personas naturales?",
        a: "Atendemos tanto clientes particulares como empresariales. Si necesitas equipar tu oficina, hacer mantenimiento a tu flota de equipos o requieres soporte técnico recurrente, podemos ayudarte.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Preguntas frecuentes
        </h1>
        <p className="text-muted-foreground">
          Todo lo que necesitas saber sobre Duvcore Technology, nuestros productos y servicios
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-8">
        {FAQ_ITEMS.map(({ category, items }) => (
          <div key={category}>
            <h2 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              {category}
            </h2>
            <div className="space-y-2">
              {items.map(({ q, a }) => {
                const isOpen = openItem === q;
                return (
                  <div
                    key={q}
                    className="bg-surface border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenItem(isOpen ? null : q)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm font-medium text-foreground pr-4">{q}</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                            {a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA WhatsApp */}
      <div className="mt-14 bg-surface border border-primary/20 rounded-2xl p-8 text-center">
        <h3 className="text-lg font-bold text-foreground mb-2">
          ¿No encontraste tu respuesta?
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          Escríbenos directamente y Duvan te responde personalmente
        </p>
        <a
          href={`https://wa.me/${WA}?text=Hola%20Duvcore%2C%20tengo%20una%20pregunta`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Pregúntanos por WhatsApp
        </a>
      </div>

    </div>
  );
}
