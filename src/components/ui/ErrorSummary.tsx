import React, { useEffect, useRef } from 'react';

interface ErrorSummaryProps {
  errors: { fieldId: string; message: string }[];
  title?: string;
}

export function ErrorSummary({ errors, title = 'There are errors that need attention' }: ErrorSummaryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0 && containerRef.current) {
      containerRef.current.focus();
    }
  }, [errors]);

  if (errors.length === 0) return null;

  return (
    <div
      ref={containerRef}
      role="alert"
      tabIndex={-1}
      aria-labelledby="error-summary-title"
      style={{
        border: '2px solid #dc2626',
        backgroundColor: '#fef2f2',
        padding: 'var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: 'var(--space-6)',
      }}
    >
      <h3
        id="error-summary-title"
        style={{
          fontFamily: 'var(--font-sans-google), var(--font-sans)',
          fontSize: 'var(--text-body)',
          fontWeight: 700,
          color: '#991b1b',
          marginBottom: 'var(--space-2)',
        }}
      >
        {title}
      </h3>
      <ul style={{ paddingLeft: 'var(--space-5)', margin: 0 }}>
        {errors.map((err, i) => (
          <li key={i} style={{ marginBottom: '4px' }}>
            <a
              href={`#${err.fieldId}`}
              style={{
                color: '#b91c1c',
                textDecoration: 'underline',
                fontWeight: 500,
                fontSize: 'var(--text-sm)',
              }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(err.fieldId);
                if (el) {
                  el.focus();
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              {err.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
