import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface B2BApiKey {
  id: string;
  name: string;
  key: string;
  tier: "developer" | "scale" | "enterprise";
  status: "active" | "revoked";
  createdAt: string;
  lastUsedAt: string | null;
}

interface B2BUsageData {
  date: string;
  calls: number;
}

export interface B2BNode {
  id: string;
  name: string;
  type: string;
  status: string;
  permissions: string[];
}

interface B2BState {
  apiKeys: B2BApiKey[];
  usageData: B2BUsageData[];
  webhooks: { url: string; events: string[] }[];
  connectedNodes: B2BNode[];
  lastPing: Record<string, string>;
  createKey: (name: string, tier: B2BApiKey["tier"]) => void;
  revokeKey: (id: string) => void;
  simulateCall: () => void;
  addWebhook: (url: string, events: string[]) => void;
  registerNode: (node: Omit<B2BNode, 'id'>) => void;
  pingNode: (id: string) => void;
}

const mockInitialUsage = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: d.toISOString().split('T')[0],
    calls: Math.floor(Math.random() * 50) + (i * 10) // simulated growth
  };
});

export const useB2BStore = create<B2BState>()(
  persist(
    (set) => ({
      apiKeys: [],
      usageData: mockInitialUsage,
      webhooks: [],
      connectedNodes: [],
      lastPing: {},
      
      createKey: (name, tier) => {
        const randomKey = Array.from({length: 12}, () => Math.floor(Math.random()*36).toString(36)).join('').toUpperCase();
        const fullKey = `lk_live_${randomKey}`;
        const newKey: B2BApiKey = {
          id: Date.now().toString(),
          name,
          key: fullKey,
          tier,
          status: "active",
          createdAt: new Date().toISOString(),
          lastUsedAt: null
        };
        set((state) => ({ apiKeys: [...state.apiKeys, newKey] }));
      },
      
      revokeKey: (id) => set((state) => ({
        apiKeys: state.apiKeys.map(k => k.id === id ? { ...k, status: "revoked" } : k)
      })),
      
      simulateCall: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const lastData = state.usageData[state.usageData.length - 1];
        
        let newUsage = [...state.usageData];
        if (lastData.date === today) {
          lastData.calls += 1;
        } else {
          newUsage.push({ date: today, calls: 1 });
          if (newUsage.length > 30) newUsage.shift();
        }
        
        return {
          usageData: newUsage,
          apiKeys: state.apiKeys.map(k => k.status === 'active' ? { ...k, lastUsedAt: new Date().toISOString() } : k)
        };
      }),
      
      addWebhook: (url, events) => set((state) => ({
        webhooks: [...state.webhooks, { url, events }]
      })),

      registerNode: (node) => set(state => ({
        connectedNodes: [...state.connectedNodes, { ...node, id: Date.now().toString() }]
      })),

      pingNode: (id) => set(state => ({
        lastPing: { ...state.lastPing, [id]: new Date().toISOString() }
      }))
    }),
    {
      name: 'transfer_legacy_b2b_api_keys',
    }
  )
);
