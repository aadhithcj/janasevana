'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './MobileBottomBar.module.css';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';

export function MobileBottomBar() {
  const { t } = useLanguage();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // WCAG 2.2 (Focus Not Obscured): hide bar when inputs are focused on mobile
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setIsKeyboardVisible(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardVisible(false);
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <nav
      id="mobile-bottom-bar"
      aria-label="Quick Mobile Actions"
      className={`${styles.bottomBar} ${isKeyboardVisible ? styles.hiddenOnFocus : ''}`}
    >
      <a
        href={`tel:${siteConfig.phones.primaryCallRaw}`}
        className={`${styles.barAction} ${styles.callAction}`}
        aria-label={`${t.mobileBar.call}: ${siteConfig.phones.primaryCall}`}
      >
        <span className={styles.actionIcon} aria-hidden="true">
          📞
        </span>
        <span>{t.mobileBar.call}</span>
      </a>

      <a
        href={siteConfig.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.barAction} ${styles.whatsappAction}`}
        aria-label={`${t.mobileBar.whatsapp}: ${siteConfig.whatsapp.display}`}
      >
        <span className={styles.actionIcon} aria-hidden="true">
          💬
        </span>
        <span>{t.mobileBar.whatsapp}</span>
      </a>

      <Link
        href="/tests"
        className={styles.barAction}
        aria-label={t.mobileBar.tests}
      >
        <span className={styles.actionIcon} aria-hidden="true">
          📋
        </span>
        <span>{t.mobileBar.tests}</span>
      </Link>
    </nav>
  );
}
