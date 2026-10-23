import type { Metadata } from 'next';
import { Specimen } from '@/components/specimen/Specimen';

export const metadata: Metadata = {
  title: 'Type and colour specimen | Janasevana Lab',
  robots: { index: false, follow: false },
};

export default function SpecimenPage() {
  return <Specimen />;
}
