import { MetadataRoute } from 'next';
import { SITE_URL } from '@/core/config/site';
import { getSortedFeedData } from '@/features/blog/services/post-repository';
import { toAbsoluteUrl } from '@/shared/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const feeds = getSortedFeedData();
  const latestFeedDate = feeds[0]?.date;

  const feedEntries = feeds.map((feed) => ({
    url: toAbsoluteUrl(`/blog/${feed.slug}`),
    lastModified: feed.date,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/engineering'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/life'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/resume'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: toAbsoluteUrl('/feed.xml'),
      lastModified: latestFeedDate,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  return [...routes, ...feedEntries];
}
