import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: "CUSTOMER" | "ADMIN") => void;
  logout: () => void;
  switchRole: (role: "CUSTOMER" | "ADMIN") => void;
}

const DEFAULT_USER: User = {
  id: "usr-01",
  name: "Budi Santoso",
  email: "budi.santoso@example.com",
  phone: "0812-3456-7890",
  role: "CUSTOMER",
};

export const useAuthStore = create<AuthState>((set) => ({
  user: DEFAULT_USER,
  isAuthenticated: true,
  login: (email: string, role = "CUSTOMER") =>
    set({
      user: {
        id: `usr-${Date.now()}`,
        name: email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        phone: "0812-9876-5432",
        role,
      },
      isAuthenticated: true,
    }),
  logout: () => set({ user: null, isAuthenticated: false }),
  switchRole: (role: "CUSTOMER" | "ADMIN") =>
    set((state) => ({
      user: state.user ? { ...state.user, role } : null,
    })),
}));
