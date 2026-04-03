import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'vitest';

const repoRoot = process.cwd();
const scanRoots = [
  path.join(repoRoot, 'posts'),
  path.join(repoRoot, 'src/features/home'),
  path.join(repoRoot, 'src/features/resume'),
];
const allowedExtensions = new Set(['.json', '.mdx', '.ts', '.tsx']);
const unsafeQuotedEmphasisPattern =
  /\*\*["'“”‘’][^*\n]*["'“”‘’]\*\*[A-Za-z가-힣]/;
const bannedTerms = [
  { label: 'ioT', pattern: /\bioT\b/ },
  { label: 'AI workflow', pattern: /\bAI workflow\b/ },
  { label: 'Core AI stack', pattern: /\bCore AI stack\b/ },
  { label: 'Internet of Thing', pattern: /Internet of Thing\b/ },
];

function collectFiles(root: string): string[] {
  const entries = fs.readdirSync(root, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      return collectFiles(fullPath);
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      return [fullPath];
    }

    return [];
  });
}

function describeOffenses(
  label: string,
  matcher: RegExp
): string[] {
  return scanRoots.flatMap((root) =>
    collectFiles(root).flatMap((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(repoRoot, filePath);

      return source
        .split('\n')
        .flatMap((line, index) =>
          matcher.test(line)
            ? [`${label}: ${relativePath}:${index + 1}: ${line.trim()}`]
            : []
        );
    })
  );
}

describe('content quality', () => {
  it('does not include quoted emphasis that MDX fails to parse', () => {
    const offenses = describeOffenses(
      'unsafe quoted emphasis',
      unsafeQuotedEmphasisPattern
    );

    if (offenses.length > 0) {
      throw new Error(offenses.join('\n'));
    }
  });

  it('does not include banned terminology variants', () => {
    const offenses = bannedTerms.flatMap(({ label, pattern }) =>
      describeOffenses(label, pattern)
    );

    if (offenses.length > 0) {
      throw new Error(offenses.join('\n'));
    }
  });
});
