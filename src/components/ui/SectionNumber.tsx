import React from 'react';

interface SectionNumberProps {
  number: string;
  className?: string;
  inverse?: boolean;
}

export function SectionNumber({ number, className = '', inverse = false }: SectionNumberProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-sans-google), var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        fontVariantNumeric: 'tabular-nums',
        color: inverse ? 'var(--teal-300)' : 'var(--teal-500)',
      }}
    >
      {number} /
    </span>
  );
}
