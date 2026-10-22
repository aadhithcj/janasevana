'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main
        id="main-content"
        style={{
          padding: 'clamp(4rem, 8vw, 8rem) 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <span
            style={{
              fontFamily: 'var(--font-sans-google), var(--font-sans)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 300,
              color: 'var(--teal-500)',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              display: 'block',
              marginBottom: 'var(--space-2)',
            }}
          >
            404
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif-google), var(--font-serif)',
              fontSize: 'var(--text-h2)',
              color: 'var(--ink-primary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {t.notFound.title}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--ink-secondary)',
              lineHeight: 'var(--lh-body)',
              maxWidth: '50ch',
              margin: '0 auto var(--space-8)',
            }}
          >
            {t.notFound.desc}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button href="/" variant="primary" size="lg">
              {t.notFound.backHome}
            </Button>
            <Button href="/tests" variant="secondary" size="lg">
              {t.notFound.viewTests}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
