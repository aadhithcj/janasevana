import React from 'react';
import styles from './Field.module.css';

interface BaseFieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  as?: 'input';
}

interface TextareaFieldProps extends BaseFieldProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  as: 'textarea';
}

interface SelectFieldProps extends BaseFieldProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  as: 'select';
  children: React.ReactNode;
}

export type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export function Field(props: FieldProps) {
  const { id, label, error, hint, required, optional, className = '', as = 'input' } = props;

  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`${styles.fieldGroup} ${className}`}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.requiredMark} aria-hidden="true">*</span>}
        </label>
        {optional && <span className={styles.optionalTag}>(optional)</span>}
      </div>

      <div className={styles.inputWrapper}>
        {as === 'textarea' ? (
          <textarea
            id={id}
            aria-required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`${styles.textarea} ${error ? styles.inputError : ''}`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : as === 'select' ? (
          <select
            id={id}
            aria-required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`${styles.select} ${error ? styles.inputError : ''}`}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {(props as SelectFieldProps).children}
          </select>
        ) : (
          <input
            id={id}
            aria-required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>

      {hint && (
        <p id={hintId} className={styles.hintMessage}>
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className={styles.errorMessage} role="alert">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}
