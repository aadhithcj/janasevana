import React from 'react';

interface RuleProps {
  className?: string;
  inverse?: boolean;
  withTicks?: boolean;
}

export function Rule({ className = '', inverse = false, withTicks = false }: RuleProps) {
  if (withTicks) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          height: '1px',
          backgroundColor: inverse ? 'var(--ink-inv-hairline)' : 'var(--ink-hairline)',
          margin: 'var(--space-6) 0',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '0',
            top: '-3px',
            width: '1px',
            height: '7px',
            backgroundColor: inverse ? 'var(--teal-300)' : 'var(--teal-500)',
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '0',
            top: '-3px',
            width: '1px',
            height: '7px',
            backgroundColor: inverse ? 'var(--teal-300)' : 'var(--teal-500)',
          }}
        />
      </div>
    );
  }

  return (
    <hr
      className={className}
      style={{
        border: 'none',
        height: '1px',
        backgroundColor: inverse ? 'var(--ink-inv-hairline)' : 'var(--ink-hairline)',
        margin: 'var(--space-6) 0',
      }}
    />
  );
}
