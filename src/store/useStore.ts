import { create } from 'zustand';
import { mockAssets, mockGuardians, mockHeirs, mockActivity, mockNotifications } from '../data/mockData';

interface User {
  name: string;
  email: string;
  avatar: string | null;
  score: number; // Used as legacy health score
  plan: string;
  nextCheckInDate: string;
  checkInHistory: { date: string, method: string }[];
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
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  
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
  performCheckIn: (method: string) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: "John Asha",
    email: "john@linkkey.com",
    avatar: null,
    score: 72,
    plan: "Family",
    nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    checkInHistory: [
      { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), method: 'App Tap' }
    ]
  },
  assets: [...mockAssets],
  guardians: [...mockGuardians],
  heirs: [...mockHeirs],
  activity: [...mockActivity],
  notifications: [...mockNotifications],
  theme: "dark",
  accentColor: "#4F5CFF",
  isNotificationOpen: false,
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,

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
  toggleNotifications: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen })),
  performCheckIn: (method) => set((state) => ({
    user: {
      ...state.user,
      nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      checkInHistory: [{ date: new Date().toISOString(), method }, ...state.user.checkInHistory]
    }
  })),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen }))
}));
