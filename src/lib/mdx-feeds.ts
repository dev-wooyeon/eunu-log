import fs from 'fs';
import path from 'path';
import { FeedData, Feed, FeedFrontmatter } from '@/types';
import { z } from 'zod';

const contentDirectory = path.join(process.cwd(), 'content');

// Cache for folder path lookups by slug
const slugToFolderCache = new Map<string, string>();
let allFoldersCache: string[] | null = null;
let sortedFeedCache: FeedData[] | null = null;
let allSlugsCache: { slug: string }[] | null = null;

// TOC item type
export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

// Zod schema for validation
const FeedFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(), // Required SEO-friendly slug
  description: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  readingTime: z.number().optional(),
  featured: z.boolean().optional(),
  updated: z.string().optional(),
  transliteratedTitle: z.string().optional(),
  series: z.object({
    id: z.string(),
    title: z.string(),
    order: z.number(),
  }).optional(),
});

// Safe file system utilities
function safeReadFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read file: ${filePath}`, error);
    return null;
  }
}

function safeReaddir(dirPath: string): string[] | null {
  try {
    return fs.readdirSync(dirPath);
  } catch (error) {
    console.error(`Failed to read directory: ${dirPath}`, error);
    return null;
  }
}

function safeExists(p: string): boolean {
  try {
    return fs.existsSync(p);
  } catch (error) {
    console.error(`Failed to check existence: ${p}`, error);
    return false;
  }
}

function isDirectory(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

// Recursively find all content folders (folders with index.mdx + meta.json)
function findAllContentFolders(dir: string, relativePath: string = ''): string[] {
  const folders: string[] = [];
  const items = safeReaddir(dir);

  if (!items) return folders;

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (!isDirectory(fullPath)) continue;

    const currentRelPath = relativePath ? `${relativePath}/${item}` : item;
    const hasIndex = safeExists(path.join(fullPath, 'index.mdx'));
    const hasMeta = safeExists(path.join(fullPath, 'meta.json'));

    if (hasIndex && hasMeta) {
      folders.push(currentRelPath);
    }

    // Recursively search subdirectories (for series folders)
    const subFolders = findAllContentFolders(fullPath, currentRelPath);
    folders.push(...subFolders);
  }

  return folders;
}

function getAllContentFoldersCached(): string[] {
  if (allFoldersCache) return allFoldersCache;
  if (!safeExists(contentDirectory)) {
    console.warn('Content directory does not exist');
    allFoldersCache = [];
    return allFoldersCache;
  }

  allFoldersCache = findAllContentFolders(contentDirectory);
  return allFoldersCache;
}

// Validate frontmatter
function validateFeedFrontmatter(
  data: unknown,
  folderPath: string
): FeedFrontmatter | null {
  const result = FeedFrontmatterSchema.safeParse(data);

  if (!result.success) {
    console.error(`Invalid frontmatter for ${folderPath}:`, result.error.format());
    return null;
  }

  return result.data;
}

// Calculate reading time from MDX content
function calculateReadingTime(content: string): number {
  const cleanContent = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image links
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Keep text of links
    .replace(/[#*`]/g, ''); // Remove basic markdown syntax
  const length = cleanContent.length;
  return Math.ceil(length / 500) || 1; // 500 characters per minute, min 1 min
}

// Load metadata from JSON file (folder path relative to content/)
function loadMetadata(folderPath: string): FeedFrontmatter | null {
  const metaPath = path.join(contentDirectory, folderPath, 'meta.json');
  const metaContents = safeReadFile(metaPath);

  if (!metaContents) {
    console.error(`Metadata file not found: ${folderPath}/meta.json`);
    return null;
  }

  try {
    const data = JSON.parse(metaContents);
    const metadata = validateFeedFrontmatter(data, folderPath);

    if (!metadata) {
      return null;
    }

    // Auto-calculate reading time if not present
    if (!metadata.readingTime) {
      const mdxPath = path.join(contentDirectory, folderPath, 'index.mdx');
      const mdxContents = safeReadFile(mdxPath);
      if (mdxContents) {
        metadata.readingTime = calculateReadingTime(mdxContents);
      }
    }

    // Cache the slug -> folder path mapping
    slugToFolderCache.set(metadata.slug, folderPath);

    return metadata;
  } catch (error) {
    console.error(`Failed to parse metadata for ${folderPath}:`, error);
    return null;
  }
}

// Get folder path from slug (using cache or scanning)
export function getFolderSlug(slug: string): string | null {
  // Check cache first
  if (slugToFolderCache.has(slug)) {
    return slugToFolderCache.get(slug)!;
  }

  // If not cached, scan all folders to build cache
  const allFolders = getAllContentFoldersCached();

  for (const folderPath of allFolders) {
    const metadata = loadMetadata(folderPath);
    if (metadata?.slug === slug) {
      return folderPath;
    }
  }

  return null;
}

// Get all feed slugs for static generation
export function getAllFeedSlugs() {
  if (allSlugsCache) return allSlugsCache;

  const allFolders = getAllContentFoldersCached();

  allSlugsCache = allFolders
    .map((folderPath) => {
      const metadata = loadMetadata(folderPath);
      if (!metadata) return null;
      return { slug: metadata.slug };
    })
    .filter((item): item is { slug: string } => item !== null);

  return allSlugsCache;
}

// Get sorted feed data for listing pages
export function getSortedFeedData(): FeedData[] {
  if (sortedFeedCache) return sortedFeedCache;

  const allFolders = getAllContentFoldersCached();

  const allFeedData = allFolders
    .map((folderPath) => {
      const metadata = loadMetadata(folderPath);

      if (!metadata) {
        console.error(`Failed to load metadata for ${folderPath}, skipping`);
        return null;
      }

      return metadata as FeedData; // slug is already included in FeedFrontmatter
    })
    .filter((feed): feed is FeedData => feed !== null);

  // Sort by date (newest first)
  sortedFeedCache = allFeedData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedFeedCache;
}

// Get single feed data with MDX component
export async function getFeedData(slug: string): Promise<Feed | null> {
  const folderPath = getFolderSlug(slug);

  if (!folderPath) {
    console.error(`Could not find folder for slug: ${slug}`);
    return null;
  }

  const metadata = loadMetadata(folderPath);

  if (!metadata) {
    console.error(`Failed to load metadata for ${folderPath}`);
    return null;
  }

  try {
    // Dynamic import of MDX file using folder path
    const mdxModule = await import(`@/../content/${folderPath}/index.mdx`);

    return {
      ...metadata,
      Content: mdxModule.default,
    } as Feed;
  } catch (error) {
    console.error(`Failed to load MDX content for ${folderPath}:`, error);
    return null;
  }
}

// Get all posts in a series, sorted by order
export function getSeriesPosts(seriesId: string): FeedData[] {
  const allPosts = getSortedFeedData();

  return allPosts
    .filter(post => post.series?.id === seriesId)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));
}
