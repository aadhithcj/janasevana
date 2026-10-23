'use client';

import { Icon } from '@/components/ui/Icon';
import { actionClass } from '@/components/ui/Action';

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className={actionClass({ variant: 'outline' })} onClick={() => window.print()} data-print="hide">
      <Icon name="print" />
      <span>{label}</span>
    </button>
  );
}
