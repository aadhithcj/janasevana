'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import s from './Slip.module.css';

type Status = 'idle' | 'copied' | 'failed';

/** Copies the message text. A fallback when WhatsApp does not open. */
export function CopyButton({
  text,
  label,
  copied,
  failed,
  className,
}: {
  text: string;
  label: string;
  copied: string;
  failed: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        if (!ok) throw new Error('copy failed');
      }
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  }

  return (
    <div className={s.copyWrap}>
      <button type="button" className={className ?? s.copy} onClick={copy}>
        <Icon name={status === 'copied' ? 'check' : 'copy'} />
        <span>{label}</span>
      </button>
      <p className={status === 'failed' ? s.copyFailed : s.copyStatus} role="status" aria-live="polite">
        {status === 'copied' ? copied : status === 'failed' ? failed : ''}
      </p>
    </div>
  );
}
