import { getFolderSlug, TocItem } from '@/lib/mdx-feeds';
import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';

// MDX 소스에서 헤딩 파싱 (렌더링된 HTML이 아닌 원본 MDX에서)
export function parseHeadingsFromMdx(mdxContent: string): TocItem[] {
  try {
    if (!mdxContent || typeof mdxContent !== 'string') {
      console.warn('Invalid MDX content for TOC parsing');
      return [];
    }

    // Regex to match markdown headings (## Heading, ### Heading, etc.)
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const tocItems: TocItem[] = [];
    const slugger = new GithubSlugger();

    let match;
    while ((match = headingRegex.exec(mdxContent)) !== null) {
      const level = match[1].length; // Number of # symbols
      const text = match[2].trim();

      if (!text) continue;

      // Match rehype-slug / GitHub heading id rules
      const id = slugger.slug(text, false);

      // Flat structure - just push all headings
      tocItems.push({
        id,
        text,
        level,
      });
    }

    return tocItems;
  } catch (error) {
    console.error('Error parsing MDX for TOC:', error);
    return [];
  }
}

// MDX 소스 파일 로드 (TOC 생성용)
export function getMdxSource(slug: string): string | null {
  try {
    const folderSlug = getFolderSlug(slug) || slug;
    const contentDirectory = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDirectory, folderSlug, 'index.mdx');
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read MDX source for ${slug}:`, error);
    return null;
  }
}
