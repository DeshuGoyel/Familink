import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IdentityPassport {
  fullName: string;
  dateOfBirth: string;
  country: string;
  emergencyContact: { name: string; phone: string; relation: string };
  bloodGroup: string;
  vaultSummary: string;
  qrCodeData: string;
  lastUpdated: string;
  shareableWithAttorney: boolean;
  shareableWithAdvisor: boolean;
  shareableWithFamily: boolean;
}

interface PassportState {
  passport: IdentityPassport;
  updatePassport: (updates: Partial<IdentityPassport>) => void;
  generateQRData: () => void;
  generateSummary: (summary: string) => void;
}

const defaultPassport: IdentityPassport = {
  fullName: "John Asha",
  dateOfBirth: "1985-06-15",
  country: "United States",
  emergencyContact: { name: "Sarah Asha", phone: "+1 555-0198", relation: "Spouse" },
  bloodGroup: "O+",
  vaultSummary: "This user has 4 protected digital assets worth approximately $120,000, 2 confirmed guardians, and 3 designated heirs.",
  qrCodeData: "lk.id/u_12345_mock",
  lastUpdated: new Date().toISOString(),
  shareableWithAttorney: false,
  shareableWithAdvisor: false,
  shareableWithFamily: true,
};

export const usePassportStore = create<PassportState>()(
  persist(
    (set) => ({
      passport: defaultPassport,
      
      updatePassport: (updates) => set((state) => ({
        passport: { ...state.passport, ...updates, lastUpdated: new Date().toISOString() }
      })),
      
      generateQRData: () => set((state) => {
        const publicData = {
          name: state.passport.fullName,
          dob: state.passport.dateOfBirth,
          blood: state.passport.bloodGroup,
          emergency: state.passport.emergencyContact
        };
        const qrString = `transfer_legacy:passport:${btoa(JSON.stringify(publicData))}`;
        return { passport: { ...state.passport, qrCodeData: qrString, lastUpdated: new Date().toISOString() } };
      }),
      
      generateSummary: (summary) => set((state) => ({
        passport: { ...state.passport, vaultSummary: summary, lastUpdated: new Date().toISOString() }
      }))
    }),
    {
      name: 'transfer_legacy_identity_passport',
    }
  )
);
