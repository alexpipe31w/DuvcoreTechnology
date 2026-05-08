import type { Metadata } from "next";
import { Suspense } from "react";
import { Cpu } from "lucide-react";
import { PCSimulator } from "@/components/simulator/PCSimulator";

export const metadata: Metadata = {
  title: "Simulador de PC",
  description:
    "Arma tu PC ideal con componentes reales de nuestro inventario. Selecciona pieza a pieza y compra todo en un clic.",
};

export default function SimuladorPage() {
  return (
    <div className="min-h-screen bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Cpu className="w-4 h-4" />
            Feature estrella
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Simulador de PC
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Arma tu PC ideal con componentes reales de nuestro inventario.
            Selecciona cada pieza y agrega todo al carrito con un solo clic.
          </p>
        </div>

        <Suspense>
          <PCSimulator />
        </Suspense>
      </div>
    </div>
  );
}
