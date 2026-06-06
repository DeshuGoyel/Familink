import { create } from 'zustand';
import { mockActivity, mockNotifications } from '../data/mockData';
import { api } from '../lib/api';
import { toBase64Url } from '../lib/aeadClient';

export interface Asset {
  id: string;
  name?: string;
  type?: string;
  status?: string;
  value?: number;
  date?: string;
  tags?: string[];
  notes?: string;
  instructions?: string;
  beneficiaryId?: string;
  encryptionLevel?: 'Standard' | 'Military' | 'Quantum-Resistant';
  growthRate?: number;
}

export interface Guardian {
  id: string;
  name?: string;
  email?: string;
  status: string;
  relationship?: string;
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

export interface RawItem {
  id?: string;
  item_id?: string;
  created_at?: string;
  item_meta?: {
    title?: string;
    title_hash?: string;
    type?: string;
  };
}

interface User {
  name: string;
  email: string;
  avatar: string | null;
  score: number; // Used as legacy health score
  plan: string;
  nextCheckInDate: string;
  checkInHistory: { date: string, method: string }[];
  jurisdiction?: string;
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
  
  fetchAssets: () => Promise<void>;
  addAsset: (asset: Omit<Asset, 'id'>) => void | Promise<void>;
  updateAsset: (id: string, data: Partial<Asset>) => void;
  deleteAsset: (id: string) => void | Promise<void>;
  addGuardian: (guardian: Omit<Guardian, 'id' | 'status'>) => void;
  confirmGuardian: (id: string) => void;
  removeGuardian: (id: string) => void;
  addHeir: (heir: Omit<Heir, 'id' | 'status' | 'progress'>) => void;
  updateHeirStatus: (id: string, status: string) => void;
  updateScore: (score: number) => void;
  toggleTheme: () => void;
  toggleNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  performCheckIn: (method: string) => void | Promise<void>;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  addAllocation: (allocation: Omit<Allocation, 'id'>) => void;
  updateAllocation: (id: string, percentage: number) => void;
  removeAllocation: (id: string) => void;
  calculateScore: () => void;
  setJurisdiction: (jurisdiction: string) => void;
  isAuthenticated: boolean;
  checkSession: () => Promise<void>;
  logout: () => void;
}

const calculateNewScore = (state: Pick<AppState, 'guardians' | 'assets' | 'heirs'>) => {
  let score = 0;
  
  // 1. Guardians (40%) - Institutional Threshold is 2 confirmed guardians
  const confirmedGuardians = state.guardians.filter((g: Guardian) => g.status === 'Confirmed').length;
  if (confirmedGuardians >= 2) {
    score += 40;
  } else {
    score += confirmedGuardians * 20;
  }

  // 2. Assets Coverage (40%) - Requires instructions and assigned beneficiaries
  if (state.assets.length > 0) {
    const coveredAssets = state.assets.filter((a: Asset) => 
      (a.instructions && a.instructions.length > 0) && 
      (a.beneficiaryId || a.notes?.includes('assigned'))
    ).length;
    score += Math.round((coveredAssets / state.assets.length) * 40);
  }

  // 3. Heirs (20%) - Registered and validated
  if (state.heirs.length > 0) {
    score += 20;
  }

  return score;
};
const getInitialState = () => {
  const isAuth = !!localStorage.getItem('tl_session_token');
  if (!isAuth) {
    return {
      assets: [] as Asset[],
      guardians: [] as Guardian[],
      heirs: [] as Heir[],
    };
  }

  let guardians: Guardian[] = [];
  try {
    const savedGuardians = localStorage.getItem('tl_guardians');
    if (savedGuardians) {
      guardians = JSON.parse(savedGuardians);
    }
  } catch (e) {
    console.error('Failed to parse tl_guardians from localStorage', e);
  }

  let heirs: Heir[] = [];
  try {
    const savedHeirs = localStorage.getItem('tl_heirs');
    if (savedHeirs) {
      heirs = JSON.parse(savedHeirs);
    }
  } catch (e) {
    console.error('Failed to parse tl_heirs from localStorage', e);
  }

  return {
    assets: [] as Asset[],
    guardians,
    heirs,
  };
};

const getInitialUser = (state: ReturnType<typeof getInitialState>) => {
  const name = localStorage.getItem('tl_user_name') || "Secured User";
  const email = localStorage.getItem('tl_user_email') || "";
  return {
    name,
    email,
    avatar: null,
    score: calculateNewScore(state),
    plan: "Family",
    nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    checkInHistory: [
      { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), method: 'App Tap' }
    ]
  };
};

const loadedState = getInitialState();

export const useStore = create<AppState>((set) => ({
  user: getInitialUser(loadedState),
  ...loadedState,
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
  isAuthenticated: !!localStorage.getItem('tl_session_token'),

  checkSession: async () => {
    const token = localStorage.getItem('tl_session_token');
    const userId = localStorage.getItem('tl_user_id');
    if (!token || !userId) {
      set({ isAuthenticated: false });
      return;
    }
    try {
      // Validate session token by attempting a list request
      await api.post('/vault/items/list', { user_id: userId });
      const currentLoadedState = getInitialState();
      set({ 
        isAuthenticated: true,
        ...currentLoadedState,
        user: getInitialUser(currentLoadedState)
      });
    } catch (err) {
      console.warn('Session verification failed, clearing tokens:', err);
      localStorage.removeItem('tl_session_token');
      localStorage.removeItem('tl_user_id');
      localStorage.removeItem('tl_user_name');
      localStorage.removeItem('tl_user_email');
      localStorage.removeItem('tl_guardians');
      localStorage.removeItem('tl_heirs');
      set({ 
        isAuthenticated: false,
        assets: [],
        guardians: [],
        heirs: [],
        user: {
          name: "Secured User",
          email: "",
          avatar: null,
          score: 0,
          plan: "Family",
          nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checkInHistory: []
        }
      });
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (err) {
      console.error('Logout API call failed:', err);
    } finally {
      localStorage.removeItem('tl_session_token');
      localStorage.removeItem('tl_user_id');
      localStorage.removeItem('tl_user_name');
      localStorage.removeItem('tl_user_email');
      localStorage.removeItem('tl_guardians');
      localStorage.removeItem('tl_heirs');
      set({ 
        isAuthenticated: false,
        assets: [],
        guardians: [],
        heirs: [],
        user: {
          name: "Secured User",
          email: "",
          avatar: null,
          score: 0,
          plan: "Family",
          nextCheckInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checkInHistory: []
        }
      });
    }
  },

  fetchAssets: async () => {
    try {
      const userId = localStorage.getItem('tl_user_id');
      if (!userId) return;
      const response = await api.post<{ items: RawItem[] }>('/vault/items/list', { user_id: userId });
      const items = response?.items || [];
      const formattedAssets: Asset[] = items.map((item) => ({
        id: item.item_id || item.id || '',
        name: item.item_meta?.title || item.item_meta?.title_hash || 'Encrypted Asset',
        type: item.item_meta?.type || 'password',
        status: 'Secured',
        value: 120000,
        date: new Date(item.created_at || Date.now()).toLocaleDateString(),
        instructions: 'Client decrypted instructions placeholder',
      }));
      set({ assets: formattedAssets });
    } catch (err) {
      console.error('Failed to fetch assets:', err);
    }
  },
  addAsset: async (asset) => {
    try {
      const userId = localStorage.getItem('tl_user_id');
      if (!userId) return;
      const payload = {
        user_id: userId,
        ciphertext: toBase64Url(new TextEncoder().encode(JSON.stringify(asset))),
        item_meta: { title: asset.name, type: asset.type },
        crypto_version: 'v1'
      };
      await api.post('/vault/items', payload);
      
      // Refresh assets
      const response = await api.post<{ items: RawItem[] }>('/vault/items/list', { user_id: userId });
      const items = response?.items || [];
      const formattedAssets: Asset[] = items.map((item) => ({
        id: item.item_id || item.id || '',
        name: item.item_meta?.title || item.item_meta?.title_hash || 'Encrypted Asset',
        type: item.item_meta?.type || 'password',
        status: 'Secured',
        value: 120000,
        date: new Date(item.created_at || Date.now()).toLocaleDateString(),
        instructions: 'Client decrypted instructions placeholder',
      }));
      
      set((state) => {
        const newState = { ...state, assets: formattedAssets };
        return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
      });
    } catch (err) {
      console.error('Failed to add asset:', err);
    }
  },
  updateAsset: (id, data) => set((state) => {
    const newState = { ...state, assets: state.assets.map(a => a.id === id ? { ...a, ...data } : a) };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  deleteAsset: async (id) => {
    try {
      const userId = localStorage.getItem('tl_user_id');
      if (!userId) return;
      await api.post('/vault/items/delete', { user_id: userId, item_id: id });
      
      // Refresh assets
      const response = await api.post<{ items: RawItem[] }>('/vault/items/list', { user_id: userId });
      const items = response?.items || [];
      const formattedAssets: Asset[] = items.map((item) => ({
        id: item.item_id || item.id || '',
        name: item.item_meta?.title || item.item_meta?.title_hash || 'Encrypted Asset',
        type: item.item_meta?.type || 'password',
        status: 'Secured',
        value: 120000,
        date: new Date(item.created_at || Date.now()).toLocaleDateString(),
        instructions: 'Client decrypted instructions placeholder',
      }));
      
      set((state) => {
        const newState = { ...state, assets: formattedAssets };
        return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
      });
    } catch (err) {
      console.error('Failed to delete asset:', err);
    }
  },
  addGuardian: (guardian) => set((state) => {
    const updated = [...state.guardians, { ...guardian, id: Date.now().toString(), status: 'Pending' }];
    localStorage.setItem('tl_guardians', JSON.stringify(updated));
    const newState = { ...state, guardians: updated };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  confirmGuardian: (id) => set((state) => {
    const updated = state.guardians.map(g => g.id === id ? { ...g, status: 'Confirmed' } : g);
    localStorage.setItem('tl_guardians', JSON.stringify(updated));
    const newState = { ...state, guardians: updated };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  removeGuardian: (id) => set((state) => {
    const updated = state.guardians.filter(g => g.id !== id);
    localStorage.setItem('tl_guardians', JSON.stringify(updated));
    const newState = { ...state, guardians: updated };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  addHeir: (heir) => set((state) => {
    const updated = [...state.heirs, { ...heir, id: Date.now().toString(), status: 'Not Notified', progress: 0 }];
    localStorage.setItem('tl_heirs', JSON.stringify(updated));
    const newState = { ...state, heirs: updated };
    return { ...newState, user: { ...state.user, score: calculateNewScore(newState) } };
  }),
  updateHeirStatus: (id, status) => set((state) => {
    const updated = state.heirs.map(h => h.id === id ? { ...h, status } : h);
    localStorage.setItem('tl_heirs', JSON.stringify(updated));
    return { heirs: updated };
  }),
  updateScore: (score) => set((state) => ({ user: { ...state.user, score } })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleNotifications: () => set((state) => ({ isNotificationOpen: !state.isNotificationOpen })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  performCheckIn: async (method) => {
    try {
      const policy_id = '00000000-0000-0000-0000-000000000000'; // Default policy or dynamic
      const ts = Math.floor(Date.now() / 1000);
      const device_id = localStorage.getItem('tl_device_id') || 'dev-device';
      
      const response = await api.post<{ pending_at?: number }>('/inheritance/heartbeat', {
        policy_id,
        ts,
        device_id,
        device_sig: 'device-signature-placeholder'
      });
      
      set((state) => ({
        user: {
          ...state.user,
          nextCheckInDate: new Date((response.pending_at || ts + 7 * 24 * 60 * 60) * 1000).toISOString(),
          checkInHistory: [{ date: new Date().toISOString(), method }, ...state.user.checkInHistory]
        }
      }));
    } catch (err) {
      console.error('Failed to perform check-in:', err);
    }
  },
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

  calculateScore: () => set((state) => ({ user: { ...state.user, score: calculateNewScore(state) } })),
  setJurisdiction: (jurisdiction) => set((state) => ({ user: { ...state.user, jurisdiction } }))
}));
