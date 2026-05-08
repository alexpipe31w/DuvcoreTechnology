"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSimulatorStore } from "@/store/simulator.store";
import { useCart } from "./useCart";
import { useCartStore } from "@/store/cart.store";
import type { ComponentCategory } from "@/types";

export function useSimulator() {
  const store = useSimulatorStore();
  const { addToCart } = useCart();
  const { openCart } = useCartStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Restore from URL params
  useEffect(() => {
    const sim = searchParams.get("sim");
    if (!sim) return;

    // Format: "cpu:uuid,gpu:uuid,..."
    const entries = sim.split(",").flatMap((entry) => {
      const [cat, id] = entry.split(":");
      if (!cat || !id) return [];
      return [{ cat: cat as ComponentCategory, id }];
    });

    if (entries.length > 0) {
      // We don't have product data here, just ids — this would need
      // a fetch. For now just update URL as canonical source of truth.
      // The ComponentSelector will pre-select based on stored state.
    }
  }, [searchParams]);

  const buyAll = async () => {
    const components = Object.values(store.selectedComponents).filter(Boolean);
    if (components.length === 0) return;

    for (const product of components) {
      if (!product) continue;
      await addToCart(product.id, 1);
    }

    openCart();

    // Update URL to reflect the build
    const shareUrl = store.getShareableUrl();
    router.replace(shareUrl, { scroll: false });
  };

  const selectedCount = Object.values(store.selectedComponents).filter(
    Boolean
  ).length;

  return {
    ...store,
    selectedCount,
    buyAll,
  };
}
