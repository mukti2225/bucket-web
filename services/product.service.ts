import { api } from "./api";
import { Product, ApiResponse } from "@/types";
import { PRODUCTS } from "@/data/products";

export interface ProductQuery {
  category?: string;
  occasion?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const productService = {
  async getProducts(params?: ProductQuery): Promise<ApiResponse<Product[]>> {
    const res = await api.get<Product[]>("/products");
    if (res.success && res.data) {
      return res;
    }

    // Local fallback when backend API is offline
    let filtered = [...PRODUCTS];
    if (params?.category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === params.category?.toLowerCase()
      );
    }
    if (params?.occasion) {
      filtered = filtered.filter((p) =>
        p.occasions.some(
          (occ) => occ.toLowerCase() === params.occasion?.toLowerCase()
        )
      );
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.flowerComposition.some((f) => f.toLowerCase().includes(q))
      );
    }

    return {
      success: true,
      data: filtered,
    };
  },

  async getProductBySlug(slug: string): Promise<ApiResponse<Product | null>> {
    const res = await api.get<Product>(`/products/${slug}`);
    if (res.success && res.data) {
      return res;
    }

    const found = PRODUCTS.find((p) => p.slug === slug) || null;
    return {
      success: !!found,
      data: found,
      error: found ? undefined : { code: "NOT_FOUND", message: "Produk tidak ditemukan" },
    };
  },
};
