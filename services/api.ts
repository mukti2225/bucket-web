import { ApiResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export class ApiError extends Error {
  code: string;
  fields?: Record<string, string>;

  constructor(message: string, code = "API_ERROR", fields?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.fields = fields;
  }
}

export const api = {
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!res.ok) {
        return {
          success: false,
          data: null as unknown as T,
          error: {
            code: `HTTP_${res.status}`,
            message: `Gagal memuat data (${res.statusText})`,
          },
        };
      }

      return await res.json();
    } catch {
      // In frontend mock / fallback mode, return a structured fallback response
      return {
        success: false,
        data: null as unknown as T,
        error: {
          code: "NETWORK_ERROR",
          message: "Tidak dapat terhubung ke server backend.",
        },
      };
    }
  },

  async post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!res.ok) {
        return {
          success: false,
          data: null as unknown as T,
          error: {
            code: `HTTP_${res.status}`,
            message: `Gagal memproses permintaan (${res.statusText})`,
          },
        };
      }

      return await res.json();
    } catch {
      return {
        success: false,
        data: null as unknown as T,
        error: {
          code: "NETWORK_ERROR",
          message: "Tidak dapat terhubung ke server backend.",
        },
      };
    }
  },
};
