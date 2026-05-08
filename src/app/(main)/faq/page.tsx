"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    category: "Envíos",
    items: [
      {
        q: "¿Hacen envíos a todo Colombia?",
        a: "Sí, enviamos a todo el territorio nacional a través de transportadoras aliadas. Los tiempos de entrega varían entre 1 a 5 días hábiles dependiendo de tu ubicación.",
      },
      {
        q: "¿Cuánto cuesta el envío?",
        a: "El costo de envío depende del peso del producto y la ciudad de destino. Se calcula automáticamente al momento del checkout.",
      },
    ],
  },
  {
    category: "Garantías",
    items: [
      {
        q: "¿Qué garantía tienen los productos?",
        a: "Todos nuestros productos cuentan con garantía del fabricante. Computadores y portátiles tienen garantía de 1 año mínimo. Periféricos y accesorios 6 meses.",
      },
      {
        q: "¿Cómo hago válida una garantía?",
        a: "Comunícate con nosotros por WhatsApp con tu número de orden y describe el problema. Te guiaremos en el proceso de garantía.",
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
        q: "¿Es seguro pagar en su tienda?",
        a: "Sí, totalmente. Usamos StockUp como plataforma de e-commerce con integración directa a Mercado Pago, que cuenta con los más altos estándares de seguridad.",
      },
    ],
  },
  {
    category: "Servicios técnicos",
    items: [
      {
        q: "¿Cuánto tarda un servicio técnico?",
        a: "Depende del tipo de servicio. Un mantenimiento preventivo puede estar listo en el día. Reparaciones más complejas pueden tomar 2 a 5 días hábiles.",
      },
      {
        q: "¿Tienen garantía los servicios técnicos?",
        a: "Sí, todos nuestros servicios técnicos tienen garantía de 30 días sobre el trabajo realizado.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Preguntas frecuentes
        </h1>
        <p className="text-muted-foreground">
          Todo lo que necesitas saber sobre nuestros productos y servicios
        </p>
      </div>

      <div className="space-y-8">
        {FAQ_ITEMS.map(({ category, items }) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
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
    </div>
  );
}
