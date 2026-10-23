import type { Metadata } from 'next';
import { NotFoundView } from '@/components/pages/NotFoundView';
import { RootDocument } from '@/components/shell/RootDocument';

export const metadata: Metadata = {
  title: 'Page not found | Janasevana Lab',
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <NotFoundView />
    </RootDocument>
  );
}
