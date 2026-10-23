'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { NavLinks } from './NavLinks';
import type { Locale, PageId } from '@/lib/paths';
import s from './Menu.module.css';

const MENU_ID = 'site-menu';

/**
 * Opens the site menu. Without JS it is a plain link to the footer
 * navigation, so every page stays reachable.
 */
export function MenuTrigger({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href="#footer-nav"
      className={className}
      aria-haspopup="dialog"
      aria-controls={MENU_ID}
      onClick={(e) => {
        const dialog = document.getElementById(MENU_ID) as HTMLDialogElement | null;
        if (!dialog || typeof dialog.showModal !== 'function') return;
        e.preventDefault();
        (dialog as HTMLDialogElement & { opener?: HTMLElement }).opener = e.currentTarget;
        dialog.showModal();
      }}
    >
      <Icon name="menu" />
      <span>{label}</span>
    </a>
  );
}

/**
 * Native modal <dialog>: the rest of the page is inert while it is open
 * (the focus trap), Escape closes it, and focus returns to the opener.
 */
export function MenuDialog({
  locale,
  labels,
  title,
  closeLabel,
  children,
}: {
  locale: Locale;
  labels: Record<PageId, string>;
  title: string;
  closeLabel: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      const opener = (dialog as HTMLDialogElement & { opener?: HTMLElement }).opener;
      opener?.focus();
    };
    // Tapping the dimmed backdrop closes the menu.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener('close', onClose);
    dialog.addEventListener('click', onClick);
    return () => {
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('click', onClick);
    };
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog id={MENU_ID} ref={ref} className={s.dialog} aria-labelledby={`${MENU_ID}-title`}>
      <div className={s.sheet}>
        <div className={s.top}>
          <h2 id={`${MENU_ID}-title`} className={s.title}>
            {title}
          </h2>
          <button type="button" className={s.close} onClick={close} autoFocus>
            <Icon name="close" />
            <span>{closeLabel}</span>
          </button>
        </div>
        <nav aria-labelledby={`${MENU_ID}-title`}>
          <NavLinks locale={locale} labels={labels} includeHome className={s.list} linkClassName={s.link} onNavigate={close} />
        </nav>
        {children && <div className={s.extra}>{children}</div>}
      </div>
    </dialog>
  );
}
