/**
 * Facts the lab owner has not confirmed yet are typed as TODO_CONFIRM.
 * Components never read `.value` directly: they call `confirmed()`, which
 * returns null until the owner sets `status: 'confirmed'`. A null means the
 * UI hides the element or shows "Call us to confirm".
 */
export const TODO_CONFIRM = 'TODO_CONFIRM' as const;

export type Confirmable<T> =
  | { status: 'confirmed'; value: T }
  | { status: typeof TODO_CONFIRM; note: string };

export function confirmed<T>(fact: Confirmable<T>): T | null {
  return fact.status === 'confirmed' ? fact.value : null;
}

export function todo(note: string): { status: typeof TODO_CONFIRM; note: string } {
  return { status: TODO_CONFIRM, note };
}
