import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { calculateProjectionSequence } from '../utils/mathUtils';

export interface Projection {
  assetId: string;
  growthRate: number; // e.g. 0.15 = 15%
  projectedValues: { year: number; value: number }[];
  currentValue: number;
  currency: "USD" | "INR";
}

interface ProjectionState {
  projections: Record<string, Projection>;
  calculateProjections: (assetId: string, currentValue: number, growthRate: number, currency: "USD" | "INR") => void;
  updateGrowthRate: (assetId: string, newRate: number) => void;
}

export const useProjectionStore = create<ProjectionState>()(
  persist(
    (set, get) => ({
      projections: {},
      
      calculateProjections: (assetId, currentValue, growthRate, currency) => {
        const projectedValues = calculateProjectionSequence(currentValue, growthRate, 10);
        set((state) => ({
          projections: {
            ...state.projections,
            [assetId]: { assetId, growthRate, projectedValues, currentValue, currency }
          }
        }));
      },
      
      updateGrowthRate: (assetId, newRate) => {
        const proj = get().projections[assetId];
        if (proj) {
          get().calculateProjections(assetId, proj.currentValue, newRate, proj.currency);
        }
      }
    }),
    {
      name: 'transfer_legacy_projections',
    }
  )
);
