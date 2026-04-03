import { describe, expect, it } from 'vitest';
import { SITE_URL } from '@/core/config/site';
import sitemap from './sitemap';

describe('sitemap', () => {
  it('exposes only canonical routes for top-level pages', () => {
    const entries = sitemap();

    expect(entries.some((entry) => entry.url === `${SITE_URL}/blog`)).toBe(
      false
    );
    expect(entries.some((entry) => entry.url === `${SITE_URL}/series`)).toBe(
      false
    );
  });

  it('keeps static section routes stable without build-date lastmod', () => {
    const entries = sitemap();
    const home = entries.find((entry) => entry.url === SITE_URL);
    const engineering = entries.find(
      (entry) => entry.url === `${SITE_URL}/engineering`
    );

    expect(home?.lastModified).toBeUndefined();
    expect(engineering?.lastModified).toBeUndefined();
  });

  it('uses post dates for article URLs and latest post date for the feed', () => {
    const entries = sitemap();
    const feedEntry = entries.find(
      (entry) => entry.url === `${SITE_URL}/feed.xml`
    );
    const articleEntry = entries.find((entry) =>
      entry.url.includes('/blog/')
    );

    expect(feedEntry?.lastModified).toBeDefined();
    expect(articleEntry?.lastModified).toBeDefined();
  });
});
