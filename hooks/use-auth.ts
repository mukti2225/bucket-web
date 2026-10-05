"use client";

import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const { user, isAuthenticated, login, logout, switchRole } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === "ADMIN",
    login,
    logout,
    switchRole,
  };
}
