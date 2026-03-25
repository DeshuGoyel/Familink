import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MemoryCapsule {
  id: string;
  assetId: string | null;
  title: string;
  type: "text" | "voice_note" | "video_note" | "letter";
  content: string;
  recipientHeirId: string | "all";
  unlockCondition: "on_recovery" | "on_date";
  unlockDate: string | null;
  isLocked: boolean;
  createdAt: string;
}

interface CapsuleState {
  capsules: MemoryCapsule[];
  createCapsule: (capsule: Omit<MemoryCapsule, 'id' | 'createdAt'>) => void;
  sealCapsule: (id: string) => void;
  deleteCapsule: (id: string) => void;
}

export const useCapsuleStore = create<CapsuleState>()(
  persist(
    (set) => ({
      capsules: [],
      
      createCapsule: (capsuleData) => {
        const newCapsule: MemoryCapsule = {
          ...capsuleData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        set((state) => ({ capsules: [...state.capsules, newCapsule] }));
      },
      
      sealCapsule: (id) => set((state) => ({
        capsules: state.capsules.map(c => c.id === id ? { ...c, isLocked: true } : c)
      })),
      
      deleteCapsule: (id) => set((state) => ({
        capsules: state.capsules.filter(c => c.id !== id)
      }))
    }),
    {
      name: 'linkkey_capsules',
    }
  )
);
