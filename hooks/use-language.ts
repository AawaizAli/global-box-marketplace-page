import { create } from 'zustand';
import type { Language } from '@/lib/translations';

interface LanguageState {
  language: Language;
  toggleLanguage: () => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'EN',
  toggleLanguage: () => 
    set((state) => ({ 
      language: state.language === 'EN' ? 'UR' : 'EN' 
    })),
}));