import { create } from 'zustand';

import { mockPatient, type Patient } from '@/constants/mockPatient';

interface AuthStore {
  patient: Patient | null;
  signIn: (email: string, fullName?: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  patient: null,

  signIn: (email, fullName) =>
    set({ patient: { ...mockPatient, email, fullName: fullName ?? mockPatient.fullName } }),

  signOut: () => set({ patient: null }),
}));
