'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

export type BasketItem = {
  id: string;
  /** Name as it should appear in the WhatsApp message. */
  name: string;
  kind: 'package' | 'test';
};

type State = { items: BasketItem[]; loaded: boolean };

type Action =
  | { type: 'load'; items: BasketItem[] }
  | { type: 'add'; item: BasketItem }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'load':
      return { items: mergeUnique(action.items, state.items), loaded: true };
    case 'add':
      if (state.items.some((i) => i.id === action.item.id)) return state;
      return { ...state, items: [...state.items, action.item] };
    case 'remove':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'clear':
      return { ...state, items: [] };
  }
}

function mergeUnique(a: BasketItem[], b: BasketItem[]): BasketItem[] {
  const seen = new Set<string>();
  return [...a, ...b].filter((i) => (seen.has(i.id) ? false : (seen.add(i.id), true)));
}

type BasketApi = {
  items: BasketItem[];
  loaded: boolean;
  has: (id: string) => boolean;
  add: (item: BasketItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Latest change, for the polite live region. */
  announcement: string;
  announce: (text: string) => void;
};

const BasketCtx = createContext<BasketApi | null>(null);
const KEY = 'jsl-basket';

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], loaded: false });
  const [announcement, setAnnouncement] = useState('');

  // Restore after mount so server and client render the same first frame.
  useEffect(() => {
    let saved: BasketItem[] = [];
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) saved = (JSON.parse(raw) as BasketItem[]).filter((i) => i && typeof i.id === 'string');
    } catch {
      saved = [];
    }
    dispatch({ type: 'load', items: saved });
  }, []);

  useEffect(() => {
    if (!state.loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.items));
    } catch {
      /* storage unavailable: the basket still works for this page */
    }
  }, [state.items, state.loaded]);

  const has = useCallback((id: string) => state.items.some((i) => i.id === id), [state.items]);
  const add = useCallback((item: BasketItem) => dispatch({ type: 'add', item }), []);
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);

  const api = useMemo<BasketApi>(
    () => ({ items: state.items, loaded: state.loaded, has, add, remove, clear, announcement, announce: setAnnouncement }),
    [state.items, state.loaded, has, add, remove, clear, announcement],
  );

  return (
    <BasketCtx.Provider value={api}>
      {children}
      <div className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </div>
    </BasketCtx.Provider>
  );
}

export function useBasket(): BasketApi {
  const ctx = useContext(BasketCtx);
  if (!ctx) throw new Error('useBasket must be used inside BasketProvider');
  return ctx;
}
