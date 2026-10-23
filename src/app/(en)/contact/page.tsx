import { pageMetadata } from '@/lib/seo';
import { ContactView } from '@/components/pages/ContactView';

export const metadata = pageMetadata('en', 'contact');

export default function Page() {
  return <ContactView locale="en" />;
}
