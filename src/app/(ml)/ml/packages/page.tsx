import { pageMetadata } from '@/lib/seo';
import { PackagesView } from '@/components/pages/PackagesView';

export const metadata = pageMetadata('ml', 'packages');

export default function Page() {
  return <PackagesView locale="ml" />;
}
