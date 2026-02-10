# Blog Refactor Tasks (Priority)

## Rules
- Odd numbers: Claude
- Even numbers: Codex

## Task List
1. URL/SEO/Feed/Robots/JsonLd domain normalization (Claude)
   - Status: DONE
   - Notes: Centralized `SITE_URL`/`SITE_NAME` in `/Users/noah/workspace/personal/eunu.log/src/lib/site.ts`.

2. TOC heading id alignment with rehype-slug (Codex)
   - Status: DONE
   - Notes: Use `github-slugger` in `/Users/noah/workspace/personal/eunu.log/src/lib/markdown.ts`.

3. Tailwind arbitrary values 제거 + 토큰화 (Claude)
   - Status: DONE
   - Scope: Replace `text-[var(--...)]`, `bg-[var(--...)]`, `rounded-[...]`, etc. with standardized classes via `tailwind.config.js` + `tokens.css`.
   - Notes: Arbitrary class values removed; tokens and Tailwind extensions added for standard classes.

4. 카테고리 필터 데이터 주도화 (Codex)
   - Status: DONE
   - Notes: Categories are derived from post data; hardcoded list removed.

5. `any` 제거 및 타입 강화 (Claude)
   - Status: TODO
   - Scope: `/Users/noah/workspace/personal/eunu.log/src/components/seo/JsonLd.tsx` to `Record<string, unknown>` or typed schema.

6. OG 이미지 폰트 로딩 안정화 (Codex)
   - Status: TODO
   - Scope: Cache or local font for `/Users/noah/workspace/personal/eunu.log/src/app/api/og/route.tsx`.

7. 콘텐츠 스캔 캐시/빌드 최적화 (Claude)
   - Status: DONE
   - Notes: Cached folder scan, slugs, and sorted feed data to reduce repeated FS reads.
