import { pageMetadata } from '@/lib/seo';
import { HomeCollectionView } from '@/components/pages/HomeCollectionView';

export const metadata = pageMetadata('ml', 'homeCollection');

export default function Page() {
  return <HomeCollectionView locale="ml" />;
}
