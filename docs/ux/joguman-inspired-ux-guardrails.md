# Joguman-inspired UX Guardrails

## Scope

- Preserve the current home visual direction.
- Prioritize blog reading UX, mobile navigation clarity, and motion accessibility.
- Keep existing token-based design system (`src/styles/tokens.css`) and extend behavior only.

## UX Principles

- Make interaction discoverable before it is delightful.
- Provide motion controls that respect user/system preferences.
- Keep long-form reading context visible (current section, quick jumps).
- Ensure interaction quality on mobile first.

## Motion Policy

- User-selectable mode: `auto | reduced | off`.
- `auto` follows system `prefers-reduced-motion`.
- `reduced` keeps state transitions but removes continuous pulse-style motion.
- `off` disables 3D canvases and serves text guidance instead.

## Visualization Policy

- Every visualization must include:
  - short controls hint,
  - current status,
  - motion mode badge.
- Default canvas setting: `dpr={[1, 1.5]}`.
- Track start/pause transitions via analytics events.

## Blog TOC Policy

- Desktop: fixed right TOC with active heading highlight.
- Mobile: floating TOC trigger + bottom sheet dialog.
- Support keyboard and screen reader operations:
  - open/close buttons with labels,
  - `Esc` closes dialog,
  - active section announced in sheet.

## Measurement Events

- `motion_mode_changed`
  - `from_mode`, `to_mode`, `effective_mode`, `surface`
- `visualization_started`
  - `component_name`, `motion_mode`, `algorithm?`, `surface`
- `visualization_paused`
  - `component_name`, `motion_mode`, `algorithm?`, `surface`
- `toc_opened`
  - `surface`, `active_heading`, `post_slug`

## Quality Gates

- Accessibility
  - reduced-motion behavior is testable and working.
  - mobile TOC dialog works with tap and keyboard close.
- Performance (operational target)
  - LCP <= 2.5s
  - INP <= 200ms
  - CLS <= 0.1

## Regression Checks

- Existing mobile navigation smoke tests stay green.
- Existing theme regression tests stay green.
- Existing safe-area behavior tests stay green.
- New e2e tests:
  - `tests/e2e/accessibility/reduced-motion.spec.ts`
  - `tests/e2e/blog/mobile-toc.spec.ts`
