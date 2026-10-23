import { pageMetadata } from '@/lib/seo';
import { HomeView } from '@/components/pages/HomeView';

export const metadata = pageMetadata('en', 'home');

export default function HomePage() {
  return <HomeView locale="en" />;
}
