import { pageMetadata } from '@/lib/seo';
import { AboutView } from '@/components/pages/AboutView';

export const metadata = pageMetadata('ml', 'about');

export default function Page() {
  return <AboutView locale="ml" />;
}
