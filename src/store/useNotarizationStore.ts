import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateHash } from '../utils/cryptoUtils';

export interface VaultHash {
  id: string;
  hash: string;
  blockchainRef: string;
  chain: "ethereum" | "polygon";
  createdAt: string;
  action: "vault_updated" | "guardian_added" | "asset_added" | "manual_notarization";
}

interface NotarizationState {
  vaultHashes: VaultHash[];
  notarizeVault: (action: VaultHash["action"], vaultStateData: object) => Promise<void>;
  getLatestHash: () => VaultHash | undefined;
}

export const useNotarizationStore = create<NotarizationState>()(
  persist(
    (set, get) => ({
      vaultHashes: [],
      
      notarizeVault: async (action, vaultStateData) => {
        const hash = await generateHash(vaultStateData);
        // Simulate blockchain tx reference
        const mockTxHash = "0x" + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
        
        const newHash: VaultHash = {
          id: Date.now().toString(),
          hash,
          blockchainRef: mockTxHash,
          chain: "polygon",
          createdAt: new Date().toISOString(),
          action
        };
        
        set((state) => ({ vaultHashes: [newHash, ...state.vaultHashes] }));
      },
      
      getLatestHash: () => {
        const hashes = get().vaultHashes;
        return hashes.length > 0 ? hashes[0] : undefined;
      }
    }),
    {
      name: 'linkkey_vault_hashes',
    }
  )
);
