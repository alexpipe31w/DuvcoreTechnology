"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import type { GetProductsParams } from "@/lib/stockup/client";
import type { PaginatedResponse, Product } from "@/types";

async function fetchProducts(
  params: GetProductsParams
): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.categoryId) query.set("categoryId", params.categoryId);
  if (params.search) query.set("search", params.search);
  if (params.isActive !== undefined)
    query.set("isActive", String(params.isActive));

  const qs = query.toString();
  const res = await fetch(`/api/products${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

export function useProducts(params: GetProductsParams = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useInfiniteProducts(params: Omit<GetProductsParams, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: ["products-infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ ...params, page: pageParam as number, limit: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.page < lastPage.meta.totalPages
        ? lastPage.meta.page + 1
        : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}
