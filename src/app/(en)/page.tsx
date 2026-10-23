import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('en', 'home');

export default function HomePage() {
  return <div className="wrap" style={{ paddingBlock: '4rem' }}><h1>Janasevana Lab</h1></div>;
}
