import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser } from "../api";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password ) => {
        try {
          const data = await loginUser(email, password);
          if (data.token) {
            set({ user: data.user, token: data.token, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error en login:", error);
          return false;
        }
      },
      logout: async () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
