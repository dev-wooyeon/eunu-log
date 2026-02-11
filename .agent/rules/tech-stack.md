---
trigger: always_on
---

# Tech Stack & Implementation Rules

## 현재 기준 스택

- Framework: `Next.js 16` + App Router
- Language: `TypeScript`
- UI: `React 19`, `Tailwind CSS 4`, CSS Variables
- Content: `MDX` (커스텀 webpack 로더)
- Animation: `@react-three/fiber`, `@react-three/drei`, `framer-motion`
- Test: `Vitest` + Testing Library

## 필수 구현 규칙

- 기본은 Server Component, 상호작용이 필요할 때만 Client Component(`'use client'`).
- Tailwind 임의값(`p-[13px]`) 금지.
- 색상/간격/반경은 토큰 우선 사용:
  - `src/styles/tokens.css`
- 애니메이션은 프로젝트 규칙 준수:
  - 위치: `src/components/animations/`
  - 루프: `requestAnimationFrame` 대신 `useFrame`
- 타입 안전성:
  - `any` 금지
  - 필요한 경우 `unknown` + 타입 좁히기 사용

## 데이터/상태 규칙

- 현재 프로젝트는 React Query를 표준으로 쓰지 않는다.
- 페이지/서버 데이터는 Next.js App Router 방식으로 처리한다.
- 로컬 상태는 최소 범위에서 관리한다.

## 품질 기준

- 접근성:
  - 이미지 `alt` 필수
  - 의미 있는 시맨틱 태그 우선
  - 키보드 포커스 이동 가능해야 함
- SEO:
  - 페이지 메타데이터는 Next Metadata API로 관리
- 검증:
  - 코드 변경 후 `npm run build` 기본 수행
  - 로직 변경 시 `npm test` 추가 수행
