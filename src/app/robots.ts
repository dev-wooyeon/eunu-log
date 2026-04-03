import { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '@/shared/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: toAbsoluteUrl('/sitemap.xml'),
  };
}
