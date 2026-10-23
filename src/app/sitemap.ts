import type { MetadataRoute } from 'next';
import { href, pageIds } from '@/lib/paths';
import { siteOrigin } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return pageIds.map((id) => ({
    url: `${origin}${href('en', id)}`,
    changeFrequency: 'monthly',
    priority: id === 'home' ? 1 : 0.7,
    alternates: {
      languages: {
        en: `${origin}${href('en', id)}`,
        ml: `${origin}${href('ml', id)}`,
      },
    },
  }));
}
