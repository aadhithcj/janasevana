import { pageMetadata } from '@/lib/seo';
import { TestsView } from '@/components/pages/TestsView';

export const metadata = pageMetadata('ml', 'tests');

export default function Page() {
  return <TestsView locale="ml" />;
}
