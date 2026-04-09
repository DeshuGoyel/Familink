import { create } from 'zustand';
import { mockAssets, mockGuardians, mockHeirs, mockActivity, mockNotifications } from '../data/mockData';

export interface Charity {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Allocation {
  id: string;
  assetId: string;
  recipientId: string;
  type: 'heir' | 'charity';
  percentage: number;
}

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
  charities: Charity[];
  allocations: Allocation[];
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
  markNotificationAsRead: (id: string) => void;
  performCheckIn: (method: string) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  addAllocation: (allocation: Omit<Allocation, 'id'>) => void;
  updateAllocation: (id: string, percentage: number) => void;
  removeAllocation: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: "John Asha",
    email: "john@transferlegacy.com",
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
  charities: [
    { id: 'c1', name: 'GiveWell', description: 'Maximum impact, evidence-based charities.', category: 'Global Health' },
    { id: 'c2', name: 'Electronic Frontier Foundation', description: 'Defending digital privacy and free speech.', category: 'Digital Rights' },
    { id: 'c3', name: 'Internet Archive', description: 'Universal access to all knowledge.', category: 'Education' },
    { id: 'c4', name: 'Red Cross', description: 'Emergency assistance and disaster relief.', category: 'Humanitarian' }
  ],
  allocations: [],
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
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  performCheckIn: (method) => set((state) => ({
    user: {
      ...state.user,
      nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      checkInHistory: [{ date: new Date().toISOString(), method }, ...state.user.checkInHistory]
    }
  })),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  addAllocation: (allocation) => set((state) => ({
    allocations: [...state.allocations, { ...allocation, id: Date.now().toString() }]
  })),
  updateAllocation: (id, percentage) => set((state) => ({
    allocations: state.allocations.map(a => a.id === id ? { ...a, percentage } : a)
  })),
  removeAllocation: (id) => set((state) => ({
    allocations: state.allocations.filter(a => a.id !== id)
  }))
}));
