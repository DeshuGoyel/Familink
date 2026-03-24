import { create } from 'zustand';
import { mockAssets, mockGuardians, mockHeirs, mockActivity, mockNotifications } from '../data/mockData';

interface User {
  name: string;
  email: string;
  avatar: string | null;
  score: number;
  plan: string;
}

interface AppState {
  user: User;
  assets: any[];
  guardians: any[];
  heirs: any[];
  activity: any[];
  notifications: any[];
  theme: string;
  accentColor: string;
  isNotificationOpen: boolean;
  
  addAsset: (asset: any) => void;
  updateAsset: (id: string, data: any) => void;
  deleteAsset: (id: string) => void;
  addGuardian: (guardian: any) => void;
  confirmGuardian: (id: string) => void;
  removeGuardian: (id: string) => void;
  addHeir: (heir: any) => void;
  updateHeirStatus: (id: string, status: string) => void;
  updateScore: (score: number) => void;
  toggleTheme: () => void;
  toggleNotifications: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: "John Asha",
    email: "john@linkkey.com",
    avatar: null,
    score: 72,
    plan: "Family"
  },
  assets: [...mockAssets],
  guardians: [...mockGuardians],
  heirs: [...mockHeirs],
  activity: [...mockActivity],
  notifications: [...mockNotifications],
  theme: "dark",
  accentColor: "#4F5CFF",
  isNotificationOpen: false,

  addAsset: (asset) => set((state) => ({ assets: [...state.assets, { ...asset, id: Date.now().toString() }] })),
  updateAsset: (id, data) => set((state) => ({
    assets: state.assets.map(a => a.id === id ? { ...a, ...data } : a)
  })),
  deleteAsset: (id) => set((state) => ({
    assets: state.assets.filter(a => a.id !== id)
  })),
  addGuardian: (guardian) => set((state) => ({
    guardians: [...state.guardians, { ...guardian, id: Date.now().toString(), status: 'Pending' }]
  })),
  confirmGuardian: (id) => set((state) => ({
    guardians: state.guardians.map(g => g.id === id ? { ...g, status: 'Confirmed' } : g)
  })),
  removeGuardian: (id) => set((state) => ({
    guardians: state.guardians.filter(g => g.id !== id)
  })),
  addHeir: (heir) => set((state) => ({
    heirs: [...state.heirs, { ...heir, id: Date.now().toString(), status: 'Not Notified', progress: 0 }]
  })),
  updateHeirStatus: (id, status) => set((state) => ({
    heirs: state.heirs.map(h => h.id === id ? { ...h, status } : h)
  })),
  updateScore: (score) => set((state) => ({ user: { ...state.user, score } })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleNotifications: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen }))
}));
