import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ObituaryEntry {
  id: string;
  type: "video" | "voice" | "letter";
  title: string;
  content: string;
  recipientHeirId: string | "all";
  isLocked: boolean;
  createdAt: string;
}

interface ObituaryState {
  entries: ObituaryEntry[];
  createEntry: (entry: Omit<ObituaryEntry, 'id' | 'createdAt'>) => void;
  sealEntry: (id: string) => void;
  updateEntry: (id: string, updates: Partial<ObituaryEntry>) => void;
  deleteEntry: (id: string) => void;
}

export const useObituaryStore = create<ObituaryState>()(
  persist(
    (set) => ({
      entries: [],
      
      createEntry: (entryData) => {
        const newEntry: ObituaryEntry = {
          ...entryData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        set((state) => ({ entries: [...state.entries, newEntry] }));
      },
      
      sealEntry: (id) => set((state) => ({
        entries: state.entries.map(e => e.id === id ? { ...e, isLocked: true } : e)
      })),
      
      updateEntry: (id, updates) => set((state) => ({
        entries: state.entries.map(e => e.id === id ? { ...e, ...updates } : e)
      })),
      
      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      }))
    }),
    {
      name: 'linkkey_obituary',
    }
  )
);
