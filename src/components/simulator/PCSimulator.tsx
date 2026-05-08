"use client";

import { PCVisualization } from "./PCVisualization";
import { ComponentSelector } from "./ComponentSelector";
import { BuildSummary } from "./BuildSummary";
import { COMPONENT_CATEGORIES } from "@/types";

export function PCSimulator() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Visualization */}
      <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
        <div className="bg-surface rounded-xl border border-border p-6">
          <PCVisualization />
        </div>
        <div className="mt-4">
          <BuildSummary />
        </div>
      </div>

      {/* Right: Component selectors */}
      <div className="lg:col-span-2 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            Selecciona los componentes de tu PC ideal
          </p>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Los marcados con <span className="font-bold">*</span> son requeridos
          </span>
        </div>

        {COMPONENT_CATEGORIES.map((cat) => (
          <ComponentSelector key={cat.key} categoryConfig={cat} />
        ))}
      </div>
    </div>
  );
}
