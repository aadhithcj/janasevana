'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DiagnosticTest } from '@/config/tests';

type BasketAction =
  | { type: 'ADD_TEST'; payload: DiagnosticTest }
  | { type: 'REMOVE_TEST'; payload: string }
  | { type: 'TOGGLE_TEST'; payload: DiagnosticTest }
  | { type: 'CLEAR_BASKET' }
  | { type: 'HYDRATE_BASKET'; payload: DiagnosticTest[] };

interface BasketState {
  items: DiagnosticTest[];
  isDrawerOpen: boolean;
}

function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case 'ADD_TEST':
      if (state.items.some((t) => t.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_TEST':
      return { ...state, items: state.items.filter((t) => t.id !== action.payload) };

    case 'TOGGLE_TEST': {
      const exists = state.items.some((t) => t.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.filter((t) => t.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'CLEAR_BASKET':
      return { ...state, items: [] };

    case 'HYDRATE_BASKET':
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

interface BasketContextType {
  items: DiagnosticTest[];
  count: number;
  addTest: (test: DiagnosticTest) => void;
  removeTest: (testId: string) => void;
  toggleTest: (test: DiagnosticTest) => void;
  clearBasket: () => void;
  hasTest: (testId: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BASKET_STORAGE_KEY = 'janasevana_test_basket';

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(basketReducer, {
    items: [],
    isDrawerOpen: false,
  });

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Safe client hydration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BASKET_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE_BASKET', payload: parsed });
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Storage unavailable
    }
  }, [state.items]);

  const addTest = (test: DiagnosticTest) => dispatch({ type: 'ADD_TEST', payload: test });
  const removeTest = (testId: string) => dispatch({ type: 'REMOVE_TEST', payload: testId });
  const toggleTest = (test: DiagnosticTest) => dispatch({ type: 'TOGGLE_TEST', payload: test });
  const clearBasket = () => dispatch({ type: 'CLEAR_BASKET' });
  const hasTest = (testId: string) => state.items.some((t) => t.id === testId);

  return (
    <BasketContext.Provider
      value={{
        items: state.items,
        count: state.items.length,
        addTest,
        removeTest,
        toggleTest,
        clearBasket,
        hasTest,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket(): BasketContextType {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}
