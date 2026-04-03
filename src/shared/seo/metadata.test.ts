import { describe, expect, it } from 'vitest';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/core/config/site';
import {
  buildOgImageUrl,
  createSitePageMetadata,
  DEFAULT_SOCIAL_IMAGE_URL,
  toAbsoluteUrl,
} from './metadata';

describe('metadata helpers', () => {
  it('builds absolute URLs from the site origin', () => {
    expect(toAbsoluteUrl('/')).toBe(SITE_URL);
    expect(toAbsoluteUrl('/engineering')).toBe(
      `${SITE_URL}/engineering`
    );
  });

  it('creates home metadata with canonical and fallback social image', () => {
    const metadata = createSitePageMetadata({ path: '/' });

    expect(metadata.title).toEqual({ absolute: SITE_NAME });
    expect(metadata.description).toBe(SITE_DESCRIPTION);
    expect(metadata.alternates?.canonical).toBe(SITE_URL);
    expect(metadata.openGraph).toMatchObject({
      url: SITE_URL,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    });
    expect(metadata.twitter).toMatchObject({
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_SOCIAL_IMAGE_URL],
    });
  });

  it('creates section metadata with page-specific social signals', () => {
    const metadata = createSitePageMetadata({
      path: '/engineering',
      title: 'Engineering',
      description: '기술 글과 시리즈를 같은 흐름에서 살펴볼 수 있어요',
    });

    expect(metadata.title).toBe('Engineering');
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/engineering`
    );
    expect(metadata.openGraph).toMatchObject({
      url: `${SITE_URL}/engineering`,
      title: 'Engineering',
    });
    expect(metadata.twitter).toMatchObject({
      title: 'Engineering',
      images: [DEFAULT_SOCIAL_IMAGE_URL],
    });
  });

  it('builds article OG image URLs with encoded query params', () => {
    const imageUrl = new URL(
      buildOgImageUrl({
        title: 'SEO 개선',
        date: '2026-03-30',
        tags: ['Next.js', 'SEO'],
      })
    );

    expect(`${imageUrl.origin}${imageUrl.pathname}`).toBe(
      DEFAULT_SOCIAL_IMAGE_URL
    );
    expect(imageUrl.searchParams.get('title')).toBe('SEO 개선');
    expect(imageUrl.searchParams.get('date')).toBe('2026-03-30');
    expect(imageUrl.searchParams.get('tags')).toBe('Next.js,SEO');
  });
});
