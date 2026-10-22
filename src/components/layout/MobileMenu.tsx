'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MobileMenu.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

export function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Focus management and keyboard accessibility
  useEffect(() => {
    if (isOpen) {
      // Focus the close button when menu opens
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          triggerRef.current?.focus();
        }

        // Focus trap
        if (e.key === 'Tab' && drawerRef.current) {
          const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose, triggerRef]);

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.tests, href: '/tests' },
    { label: t.nav.homeCollection, href: '/home-collection' },
    { label: t.nav.reports, href: '/reports' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.faq, href: '/faq' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={() => {
          onClose();
          triggerRef.current?.focus();
        }}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.common.menu}
      >
        <div className={styles.drawerHeader}>
          <LanguageToggle />
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeButton}
            onClick={() => {
              onClose();
              triggerRef.current?.focus();
            }}
            aria-label={t.common.close}
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile Navigation">
          <ul className={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${styles.navLinkItem} ${isActive ? styles.navLinkActive : ''}`}
                    onClick={() => {
                      onClose();
                      triggerRef.current?.focus();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.drawerFooter}>
          <div className={styles.contactSummary}>
            <strong>{siteConfig.name}</strong>
            <br />
            {siteConfig.address.full}
          </div>
          <Button
            href={`tel:${siteConfig.phones.primaryCallRaw}`}
            variant="primary"
            fullWidth
          >
            {t.common.callUs}: {siteConfig.phones.primaryCall}
          </Button>
          <Button
            href={siteConfig.whatsapp.link}
            variant="whatsapp"
            fullWidth
            isExternal
          >
            {t.common.whatsappUs}
          </Button>
        </div>
      </div>
    </>
  );
}
