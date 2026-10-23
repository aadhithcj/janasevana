import { pageMetadata } from '@/lib/seo';
import { HomeView } from '@/components/pages/HomeView';

export const metadata = pageMetadata('ml', 'home');

export default function HomePageMl() {
  return <HomeView locale="ml" />;
}
