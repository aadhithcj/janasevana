'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useLanguage } from '@/i18n/LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export function Header() {
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsCondensed(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
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
      <header className={`${styles.header} ${isCondensed ? styles.condensed : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo & Wordmark */}
          <Link href="/" className={styles.brandLink} aria-label={siteConfig.name}>
            <Image
              src="/images/brand-logo.png"
              alt="Janasevana Lab Logo"
              width={180}
              height={50}
              className={styles.logoImage}
              priority
            />
            <div className={styles.wordmarkBlock}>
              <span className={styles.wordmarkTitle}>
                {lang === 'ml' ? siteConfig.name : siteConfig.name}
              </span>
              <span className={styles.wordmarkSubtitle}>
                {lang === 'ml' ? 'കൈചൂണ്ടി, ആലപ്പുഴ' : 'Kaichoondy, Alappuzha'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation">
            <ul className={styles.desktopNav}>
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Header Actions */}
          <div className={styles.headerActions}>
            <LanguageToggle />

            <div className={styles.primaryCtaDesktop}>
              <Button
                href={`tel:${siteConfig.phones.primaryCallRaw}`}
                variant="primary"
                size="sm"
              >
                {t.common.callUs}: {siteConfig.phones.landline}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={triggerRef}
              type="button"
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label={t.common.menu}
            >
              <span className={styles.hamburgerIcon} aria-hidden="true">
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
