import { pageMetadata } from '@/lib/seo';
import { HomeCollectionView } from '@/components/pages/HomeCollectionView';

export const metadata = pageMetadata('en', 'homeCollection');

export default function Page() {
  return <HomeCollectionView locale="en" />;
}
