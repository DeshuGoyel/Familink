import { create } from 'zustand';
import { mockAssets, mockGuardians, mockHeirs, mockActivity, mockNotifications } from '../data/mockData';

export interface Asset {
  id: string;
  name?: string;
  type?: string;
  status?: string;
  value?: number;
  date?: string;
  tags?: string[];
  notes?: string;
}

export interface Guardian {
  id: string;
  name?: string;
  email?: string;
  status: string;
}

export interface Heir {
  id: string;
  name?: string;
  email?: string;
  relation?: string;
  status: string;
  progress?: number;
}

export interface Activity {
  id: string;
  message?: string;
  time?: string;
  icon?: string;
}

export interface Notification {
  id: string;
  message?: string;
  icon?: string;
  read: boolean;
}

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
  assets: Asset[];
  guardians: Guardian[];
  heirs: Heir[];
  charities: Charity[];
  allocations: Allocation[];
  activity: Activity[];
  notifications: Notification[];
  theme: string;
  accentColor: string;
  isNotificationOpen: boolean;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, data: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  addGuardian: (guardian: Omit<Guardian, 'id' | 'status'>) => void;
  confirmGuardian: (id: string) => void;
  removeGuardian: (id: string) => void;
  addHeir: (heir: Omit<Heir, 'id' | 'status' | 'progress'>) => void;
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
  calculateScore: () => void;
}

const calculateNewScore = (state: Pick<AppState, 'guardians' | 'assets' | 'heirs'>) => {
  let score = 0;
  
  // 1. Guardians (40%)
  const confirmedGuardians = state.guardians.filter((g: Guardian) => g.status === 'Confirmed').length;
  score += Math.min(confirmedGuardians * 20, 40);

  // 2. Assets Coverage (40%)
  if (state.assets.length > 0) {
    const coveredAssets = state.assets.filter((a: Asset) => (a.notes && a.notes.length > 0) || a.status === 'Protected').length;
    score += Math.round((coveredAssets / state.assets.length) * 40);
  }

  // 3. Heirs (20%)
  if (state.heirs.length > 0) {
    score += 20;
  }

  return score;
};

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
  guardians: mockGuardians.map(g => ({ ...g, status: g.status === 'confirmed' ? 'Confirmed' : 'Pending' })),
  heirs: mockHeirs.map(h => ({ ...h, status: h.status === 'active' ? 'Record Secured' : h.status })),
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

  addAsset: (asset) => set((state) => {
    const newState = { ...state, assets: [...state.assets, { ...asset, id: Date.now().toString() }] };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  updateAsset: (id, data) => set((state) => {
    const newState = { ...state, assets: state.assets.map(a => a.id === id ? { ...a, ...data } : a) };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  deleteAsset: (id) => set((state) => {
    const newState = { ...state, assets: state.assets.filter(a => a.id !== id) };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  addGuardian: (guardian) => set((state) => {
    const newState = { ...state, guardians: [...state.guardians, { ...guardian, id: Date.now().toString(), status: 'Pending' }] };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  confirmGuardian: (id) => set((state) => {
    const newState = { ...state, guardians: state.guardians.map(g => g.id === id ? { ...g, status: 'Confirmed' } : g) };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  removeGuardian: (id) => set((state) => {
    const newState = { ...state, guardians: state.guardians.filter(g => g.id !== id) };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  addHeir: (heir) => set((state) => {
    const newState = { ...state, heirs: [...state.heirs, { ...heir, id: Date.now().toString(), status: 'Not Notified', progress: 0 }] };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
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
  })),

  calculateScore: () => set((state) => ({ user: { ...state.user, score: calculateNewScore(state) } }))
}));
