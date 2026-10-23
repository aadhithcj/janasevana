'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useBasket, type BasketItem } from '@/components/booking/BasketContext';

export type RequestFields = {
  patientName: string;
  bookerName: string;
  where: 'home' | 'lab';
  area: string;
  time: string;
};

type RequestApi = {
  fields: RequestFields;
  setField: <K extends keyof RequestFields>(key: K, value: RequestFields[K]) => void;
  isOpen: boolean;
  open: (opener?: HTMLElement | null) => void;
  close: () => void;
  /** Adds to the basket, announces it, shows the toast; `reveal` also opens the drawer. */
  addItem: (item: BasketItem, message: string, reveal?: boolean) => void;
  toast: { text: string; key: number } | null;
  /** Element to return focus to when the drawer closes. */
  openerRef: React.MutableRefObject<HTMLElement | null>;
};

const RequestCtx = createContext<RequestApi | null>(null);

const EMPTY: RequestFields = { patientName: '', bookerName: '', where: 'home', area: '', time: '' };

/**
 * UI state around the basket: the request drawer, the shared form fields
 * (so the drawer and the inline panel show the same request), and the
 * short confirmation after an add. The basket reducer itself is untouched.
 */
export function RequestProvider({ children }: { children: React.ReactNode }) {
  const basket = useBasket();
  const [fields, setFields] = useState<RequestFields>(EMPTY);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<{ text: string; key: number } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const setField = useCallback(<K extends keyof RequestFields>(key: K, value: RequestFields[K]) => {
    setFields((f) => ({ ...f, [key]: value }));
  }, []);

  const open = useCallback((opener?: HTMLElement | null) => {
    openerRef.current = opener ?? (document.activeElement as HTMLElement | null);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const { add, announce } = basket;
  const addItem = useCallback(
    (item: BasketItem, message: string, reveal = false) => {
      add(item);
      announce(message);
      if (reveal) {
        open();
        return;
      }
      setToast({ text: message, key: Date.now() });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setToast(null), 2600);
    },
    [add, announce, open],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const api = useMemo<RequestApi>(
    () => ({ fields, setField, isOpen, open, close, addItem, toast, openerRef }),
    [fields, setField, isOpen, open, close, addItem, toast],
  );
  return <RequestCtx.Provider value={api}>{children}</RequestCtx.Provider>;
}

export function useRequest(): RequestApi {
  const ctx = useContext(RequestCtx);
  if (!ctx) throw new Error('useRequest must be used inside RequestProvider');
  return ctx;
}
