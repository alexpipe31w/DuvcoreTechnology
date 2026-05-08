"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ComponentCategory, Product } from "@/types";

interface SimulatorStore {
  selectedComponents: Partial<Record<ComponentCategory, Product>>;
  totalPrice: number;
  isOpen: boolean;

  addComponent: (category: ComponentCategory, product: Product) => void;
  removeComponent: (category: ComponentCategory) => void;
  clearAll: () => void;
  setOpen: (open: boolean) => void;
  getShareableUrl: () => string;
}

function computeTotal(components: Partial<Record<ComponentCategory, Product>>): number {
  return Object.values(components).reduce(
    (sum, product) => sum + (product?.price ?? 0),
    0
  );
}

export const useSimulatorStore = create<SimulatorStore>()(
  persist(
    (set, get) => ({
      selectedComponents: {},
      totalPrice: 0,
      isOpen: false,

      addComponent: (category, product) => {
        const updated = { ...get().selectedComponents, [category]: product };
        set({ selectedComponents: updated, totalPrice: computeTotal(updated) });
      },

      removeComponent: (category) => {
        const updated = { ...get().selectedComponents };
        delete updated[category];
        set({ selectedComponents: updated, totalPrice: computeTotal(updated) });
      },

      clearAll: () => set({ selectedComponents: {}, totalPrice: 0 }),

      setOpen: (open) => set({ isOpen: open }),

      getShareableUrl: () => {
        const { selectedComponents } = get();
        const params = Object.entries(selectedComponents)
          .filter(([, product]) => product != null)
          .map(([cat, product]) => `${cat}:${product!.id}`)
          .join(",");
        const base =
          typeof window !== "undefined" ? window.location.origin : "";
        return params ? `${base}/simulador?sim=${encodeURIComponent(params)}` : `${base}/simulador`;
      },
    }),
    {
      name: "duvcore-simulator",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
