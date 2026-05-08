"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Cart, CartItem } from "@/types";

interface CartStore {
  sessionId: string | null;
  items: CartItem[];
  totalValue: number;
  itemCount: number;
  isOpen: boolean;
  isLoading: boolean;

  setCart: (cart: Cart) => void;
  setSessionId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  reset: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      sessionId: null,
      items: [],
      totalValue: 0,
      itemCount: 0,
      isOpen: false,
      isLoading: false,

      setCart: (cart) =>
        set({
          items: cart.items,
          totalValue: cart.totalValue,
          itemCount: cart.itemCount,
        }),

      setSessionId: (id) => set({ sessionId: id }),

      setLoading: (loading) => set({ isLoading: loading }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      reset: () =>
        set({ items: [], totalValue: 0, itemCount: 0, sessionId: null }),
    }),
    {
      name: "duvcore-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ sessionId: s.sessionId }),
    }
  )
);
