import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OpsAdmin {
  id: string;
  email: string;
  role_name: string;
  is_active: boolean;
  last_login: string | null;
}

interface OpsState {
  token: string | null;
  admin: OpsAdmin | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuth: (token: string, admin: OpsAdmin) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useOpsStore = create<OpsState>()(
  persist(
    (set) => ({
      token: null,
      admin: null,
      isAuthenticated: false,
      isHydrated: false,
      setAuth: (token, admin) => set({ token, admin, isAuthenticated: true }),
      logout: () => set({ token: null, admin: null, isAuthenticated: false }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'tl_ops_storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
