"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCartStore } from "@/store/cart.store";
import type { Cart } from "@/types";

async function fetchCart(sessionId: string): Promise<Cart> {
  const res = await fetch(`/api/cart?sessionId=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error("Error al obtener el carrito");
  return res.json();
}

async function postAddToCart(payload: {
  sessionId: string;
  productId: string;
  variantId?: string;
  quantity: number;
}): Promise<Cart> {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Error al agregar al carrito");
  }
  return res.json();
}

async function patchCartItem(payload: {
  cartItemId: string;
  quantity: number;
}): Promise<Cart> {
  const res = await fetch("/api/cart", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Error al actualizar carrito");
  }
  return res.json();
}

export function useCart() {
  const queryClient = useQueryClient();
  const { sessionId, setSessionId, setCart } = useCartStore();

  // Ensure sessionId exists
  useEffect(() => {
    if (!sessionId) {
      setSessionId(uuidv4());
    }
  }, [sessionId, setSessionId]);

  const cartQuery = useQuery({
    queryKey: ["cart", sessionId],
    queryFn: () => fetchCart(sessionId!),
    enabled: !!sessionId,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (cartQuery.data) {
      setCart(cartQuery.data);
    }
  }, [cartQuery.data, setCart]);

  const addMutation = useMutation({
    mutationFn: postAddToCart,
    onSuccess: (cart) => {
      setCart(cart);
      queryClient.setQueryData(["cart", sessionId], cart);
    },
  });

  const updateMutation = useMutation({
    mutationFn: patchCartItem,
    onSuccess: (cart) => {
      setCart(cart);
      queryClient.setQueryData(["cart", sessionId], cart);
    },
  });

  return {
    sessionId,
    cart: cartQuery.data,
    isLoading: cartQuery.isLoading,
    isError: cartQuery.isError,
    addToCart: (productId: string, quantity = 1, variantId?: string) =>
      addMutation.mutateAsync({
        sessionId: sessionId!,
        productId,
        variantId,
        quantity,
      }),
    updateItem: (cartItemId: string, quantity: number) =>
      updateMutation.mutateAsync({ cartItemId, quantity }),
    removeItem: (cartItemId: string) =>
      updateMutation.mutateAsync({ cartItemId, quantity: 0 }),
    isAddingToCart: addMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
