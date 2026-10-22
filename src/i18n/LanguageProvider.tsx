'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { en } from './en';
import { ml } from './ml';

export type Language = 'en' | 'ml';

type LanguageAction = { type: 'SET_LANGUAGE'; payload: Language };

interface LanguageState {
  lang: Language;
  isReady: boolean;
}

function languageReducer(state: LanguageState, action: LanguageAction): LanguageState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'janasevana_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(languageReducer, {
    lang: 'en',
    isReady: false,
  });

  // Client-side initialization to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === 'en' || stored === 'ml') {
        dispatch({ type: 'SET_LANGUAGE', payload: stored });
        document.documentElement.lang = stored;
      } else {
        document.documentElement.lang = 'en';
      }
    } catch {
      // Storage unavailable or disabled
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLang = (newLang: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: newLang });
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Storage unavailable
    }
  };

  const t = state.lang === 'ml' ? ml : en;

  return (
    <LanguageContext.Provider value={{ lang: state.lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
