import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...rest
}: ButtonProps) {
  const variantClass = {
    primary: styles.variantPrimary,
    secondary: styles.variantSecondary,
    ghost: styles.variantGhost,
    whatsapp: styles.variantWhatsapp,
    inverse: styles.variantInverse,
  }[variant];

  const sizeClass = {
    sm: styles.sizeSm,
    md: styles.sizeMd,
    lg: styles.sizeLg,
  }[size];

  const combinedClass = [
    styles.button,
    variantClass,
    sizeClass,
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://wa.me')) {
      return (
        <a
          href={href}
          className={combinedClass}
          target={href.startsWith('https://wa.me') || isExternal ? '_blank' : undefined}
          rel={href.startsWith('https://wa.me') || isExternal ? 'noopener noreferrer' : undefined}
          aria-disabled={disabled}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClass} aria-disabled={disabled}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClass} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
