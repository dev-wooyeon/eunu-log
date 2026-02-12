# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-29
**Commit:** unknown
**Branch:** main

## MUST PRECHECK (NON-OPTIONAL)

Before running any implementation command, every agent **must** do all of the following:

1. Open and read these files directly (do not rely on links only):
   - `.agent/rules/meta-prompt.md`
   - `.agent/rules/meta-prompt-engineering.md`
   - `.agent/rules/meta-prompt-personal-preferences.md`
   - `.agent/rules/meta-prompt-knowledge-sync.md`
   - `.agent/rules/product-rules.md`
   - `.agent/rules/meta-prompt-toss-inspired.md`
2. In the first progress update, explicitly report:
   - opened file list
   - top 3 rules applied for this task
3. If precheck is not complete, stop immediately and do not implement.

## WORK UNIT FLOW (MANDATORY)

Each work unit must follow this flow in order:

1. Create a branch with prefix `codex/`.
2. Link the work to a GitHub Issue.
3. Complete implementation and verification.
4. Open a PR that includes the issue link.
5. Only after PR creation, move to the next work unit.

## INTEGRATION BRANCH FLOW (MANDATORY)

To prevent late conflicts between `master` and feature branches, every multi-step topic must use this branch hierarchy:

1. Create an integration branch from `master`:
   - `codex/integration/<topic>`
2. Create feature branches from that integration branch:
   - `codex/<feature-task>`
3. Merge order is fixed:
   - `feature -> integration -> master`
4. Validation points:
   - run verification on each feature PR
   - run full verification again on `integration -> master` PR
5. Do not open direct `feature -> master` PRs for multi-step topics.

Minimum naming rule:

- integration: `codex/integration/<topic>`
- feature: `codex/<task>`

Required PR/Issue linkage format:

- PR body must include `Refs #<issue-number>` at minimum.
- If the work fully completes the issue, use `Closes #<issue-number>`.

## BLOCKED POLICY (MANDATORY)

If a work unit is blocked by another issue/PR:

1. Mark the current issue/PR as blocked immediately.
2. Add the exact blocking link(s):
   - blocked by issue: `Blocked by #<issue-number>`
   - blocked by PR: `Blocked by <pr-url>`
3. Prioritize unblocking work so the dependency can be merged first.
4. Do not continue dependent implementation until the blocker is resolved.

## OVERVIEW

Modern tech blog platform with interactive 3D animations built on Next.js 14+ App Router, emphasizing memorable user experiences through particle-based animations and newspaper-inspired design.

## STRUCTURE

```
eunu.log/
├── src/                    # Source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utilities and processing
│   ├── styles/           # Design tokens and global styles
│   └── types/            # TypeScript definitions
├── content/              # Blog posts (MDX + metadata)
├── public/               # Static assets
├── docs/                 # Project documentation
└── .agent/              # AI agent rules
```

## WHERE TO LOOK

| Task               | Location          | Notes                                              |
| ------------------ | ----------------- | -------------------------------------------------- |
| Pages & Routing    | `src/app/`        | Next.js 14+ App Router with SSG                    |
| Components         | `src/components/` | Organized by domain (blog, layout, ui)             |
| Content Processing | `src/lib/`        | MDX feeds, markdown processing                     |
| Styling            | `src/styles/`     | CSS variables, Tailwind integration                |
| Blog Content       | `content/`        | MDX files with separate metadata                   |
| Configuration      | Root              | `next.config.mjs`, `package.json`, `tsconfig.json` |

## CONVENTIONS

**Content Structure:** Each blog post uses folder structure: `content/[slug]/index.mdx + meta.json`
**Component Organization:** Domain-based folders with index.ts exports
**Styling:** CSS variables + Tailwind CSS hybrid approach
**Animation:** All Three.js components in `src/components/animations/` with 'use client' directive

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** use arbitrary Tailwind values like `p-[13px]` - use standard classes only
- **NEVER** use `requestAnimationFrame` - **ALWAYS** use `useFrame` for animations
- **NEVER** place animations outside `src/components/animations/`
- **NEVER** use `any` type - use `unknown` or proper types
- **NEVER** exceed particle counts that break 60fps

## UNIQUE STYLES

- Dual root layout pattern (`#app-root` + `#overlay-root`) for modal management
- Folder-based content organization with separated metadata
- CSS variable-driven design system integrated with Tailwind
- Custom webpack MDX processing instead of Next.js built-in MDX

## COMMANDS

```bash
# Development (uses webpack flag)
npm run dev

# Build (uses webpack flag)
npm run build

# Testing (Vitest, not Jest)
npm test

# Bundle analysis
ANALYZE=true npm run build
```

## NOTES

- Uses Vitest instead of Jest for testing
- Webpack flag suggests Turbopack compatibility issues
- No CI/CD setup - relies on Vercel auto-deployment
- Korean language content support in feeds
- 3D animations require 'use client' directive and careful performance management
- Agent execution rules: `.agent/rules/meta-prompt.md`
- AI engineering guardrails: `.agent/rules/meta-prompt-engineering.md`
- Personal communication rules: `.agent/rules/meta-prompt-personal-preferences.md`
- Multi-model knowledge sync: `.agent/rules/meta-prompt-knowledge-sync.md`
- Unified product rules: `.agent/rules/product-rules.md`
- Toss-inspired engineering rules: `.agent/rules/meta-prompt-toss-inspired.md`
