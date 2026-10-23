import { pageMetadata } from '@/lib/seo';
import { AboutView } from '@/components/pages/AboutView';

export const metadata = pageMetadata('en', 'about');

export default function Page() {
  return <AboutView locale="en" />;
}
