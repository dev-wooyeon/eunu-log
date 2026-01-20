# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Eunu.log** is a modern tech blog platform with interactive 3D animations built using Next.js 14+ App Router. The project emphasizes memorable user experiences through brain science-based interactive animations while maintaining 60fps performance.

Core objectives:
- Deliver technical content with high memorability and return rates
- Provide premium visual experience with deep green + white color system
- Maintain 60fps across all animations
- Support all devices with responsive design and touch optimization

## Development Commands

### Essential Commands
```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint
```

## Architecture Overview

### Technology Stack

**Framework & Core:**
- Next.js 14+ (App Router with SSG/SSR)
- React 18+ (with TypeScript)
- TypeScript in strict mode

**Animation Libraries:**
- Three.js + @react-three/fiber + @react-three/drei (3D interactions)
- Framer Motion (React animations, not yet implemented)

**Content Management:**
- Markdown posts in `/posts` directory
- gray-matter for frontmatter parsing
- raw-loader webpack configuration for .md files

**Styling:**
- CSS Modules for component-scoped styles
- CSS Variables for design tokens (defined in `src/styles/variables.css`)
- Deep green + white color palette

**Utilities:**
- date-fns for date formatting
- clsx for conditional classes

### Project Structure

```
eunu.log/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── layout.tsx    # Root layout with metadata
│   │   └── page.tsx      # Home page (client component)
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── animations/   # Animation components
│   │       └── HeroScene.tsx  # Three.js hero animation
│   ├── styles/          # Global styles
│   │   ├── globals.css  # Global CSS imports
│   │   └── variables.css # CSS custom properties (design tokens)
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Post, Project, NavItem types
│   └── hooks/           # Custom React hooks (planned)
├── posts/               # Markdown blog posts
│   └── *.md            # Individual post files
├── public/              # Static assets
└── docs/                # Project documentation
    └── PRD.md          # Detailed product requirements
```

### Key Design Patterns

**Client-Side 3D Rendering:**
- Three.js components are dynamically imported with `next/dynamic` and `ssr: false`
- This prevents SSR issues with WebGL and reduces initial bundle size
- Example: `HeroScene` in `src/app/page.tsx`

**Color System:**
All colors are defined as CSS variables in `src/styles/variables.css`:
- Primary: Deep green (#1B4D3E) for text, warm white (#F5F6F7) for background
- Accent: Green (#2D7A6F) for interactive elements
- Code theme: Deep green background with light green text
- Dark mode support via `prefers-color-scheme` media query

**TypeScript Types:**
Core types are centralized in `src/types/index.ts`:
- `Post` and `PostMetadata` for blog content
- `Project` for portfolio items
- `NavItem` and `SocialLink` for navigation

**Path Aliases:**
The project uses `@/*` alias for `./src/*` imports (configured in `tsconfig.json`)

## Animation Architecture

### Three.js Integration

The hero section features a 3D animated sphere using Three.js:

**Component:** `src/components/animations/HeroScene.tsx`

**Key Implementation Details:**
- Uses `@react-three/fiber` Canvas for React integration
- `@react-three/drei` for MeshDistortMaterial and Sphere geometry
- Mouse tracking: Sphere rotates based on normalized mouse coordinates (-1 to 1)
- Auto-rotation: Continuous slow rotation on Z-axis when idle
- Smooth interpolation: Uses `THREE.MathUtils.lerp` for smooth transitions
- Colors match design system: Primary accent green (#2D7A6F)

**Performance Considerations:**
- Component is client-only (dynamic import with ssr: false)
- Uses `useFrame` hook for animation loop
- Event listener for mouse position is added only on client side

### Planned Animation Libraries

Per the PRD, these are planned but not yet implemented:
- GSAP + ScrollTrigger for scroll-based animations
- Framer Motion for page transitions and card effects
- Typed.js for typing animations

## Content Management

### Blog Post Structure

Posts are stored as Markdown files in `/posts/` directory with YAML frontmatter:

```yaml
---
title: "Post Title"
description: "Short description"
date: "2025-01-20"
updated: "2025-01-20"  # Optional
category: "Dev"         # Dev or Life
tags: ["Tag1", "Tag2"]
image: "/images/post.jpg"  # Optional
readingTime: 8
featured: true
---
```

### Webpack Configuration

The `next.config.js` includes a custom webpack rule for loading `.md` files:
- Uses `raw-loader` to import markdown as strings
- Required for reading post content in the application

## Performance Targets

Based on PRD requirements:
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Animation FPS:** 60fps consistently

## Development Guidelines

### When Adding New Features

**For New Pages:**
- Create in `src/app/[pagename]/page.tsx`
- Use Server Components by default, only add 'use client' when needed
- Add route metadata for SEO in layout or page files

**For New Components:**
- Use CSS Modules for styling (*.module.css)
- Reference design tokens from `src/styles/variables.css`
- Follow naming convention: PascalCase for components

**For Animations:**
- Keep 60fps as priority - test on lower-end devices
- Use `requestAnimationFrame` or animation library frame hooks
- Implement `prefers-reduced-motion` for accessibility
- Place animation components in `src/components/animations/`

**For Blog Features:**
- Add new post types to `src/types/index.ts`
- Update Post interface if adding metadata fields
- Consider creating utility functions in `src/lib/` for post processing

### Styling Conventions

**CSS Variables Usage:**
Always use design tokens instead of hardcoded values:
- Colors: `var(--text-primary)`, `var(--accent-primary)`
- Typography: `var(--text-lg)`, `var(--font-semibold)`
- Spacing: `var(--space-4)`, `var(--space-8)`
- Shadows: `var(--shadow-md)`
- Borders: `var(--radius-md)`

**Responsive Design:**
The project targets mobile-first responsive design. Test across:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Important Files

- `docs/PRD.md` - Comprehensive product requirements document with detailed specifications for all planned features
- `src/styles/variables.css` - Complete design system tokens
- `src/types/index.ts` - TypeScript type definitions
- `next.config.js` - Next.js and webpack configuration
- `tsconfig.json` - TypeScript configuration with path aliases
