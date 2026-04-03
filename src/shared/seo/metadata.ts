import type { Metadata } from 'next';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/core/config/site';

interface SitePageMetadataOptions {
  description?: string;
  path: string;
  title?: string;
}

interface OgImageOptions {
  date?: string;
  tags?: string[];
  title?: string;
}

export const DEFAULT_SOCIAL_IMAGE_URL = `${SITE_URL}/api/og`;

export function toAbsoluteUrl(path: string): string {
  if (path === '/') {
    return SITE_URL;
  }

  return new URL(path, SITE_URL).toString();
}

export function buildOgImageUrl({
  title,
  date,
  tags,
}: OgImageOptions = {}): string {
  const imageUrl = new URL('/api/og', SITE_URL);

  if (title) {
    imageUrl.searchParams.set('title', title);
  }

  if (date) {
    imageUrl.searchParams.set('date', date);
  }

  if (tags && tags.length > 0) {
    imageUrl.searchParams.set('tags', tags.join(','));
  }

  return imageUrl.toString();
}

export function createSitePageMetadata({
  path,
  title,
  description = SITE_DESCRIPTION,
}: SitePageMetadataOptions): Metadata {
  const canonicalUrl = toAbsoluteUrl(path);
  const socialTitle = path === '/' ? SITE_NAME : title ?? SITE_NAME;
  const metadata: Metadata = {
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: canonicalUrl,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [DEFAULT_SOCIAL_IMAGE_URL],
    },
  };

  if (path === '/') {
    return {
      title: {
        absolute: SITE_NAME,
      },
      ...metadata,
    };
  }

  if (!title) {
    return metadata;
  }

  return {
    title,
    ...metadata,
  };
}
