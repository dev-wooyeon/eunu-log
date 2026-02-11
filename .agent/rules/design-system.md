---
trigger: always_on
---

# TDS Design Tokens & UI Rules

## 원칙

- 값 하드코딩보다 토큰 재사용을 우선한다.
- 컴포넌트 단위 최적화보다 전역 일관성을 우선한다.
- 새 스타일 추가 전 기존 토큰으로 해결 가능한지 먼저 확인한다.

## 토큰 소스

- 단일 기준 파일:
  - `src/styles/tokens.css`
- 색상/타이포/간격/반경/그림자/전환은 여기서 관리한다.

## Typography

- 기본 폰트: `Pretendard` 계열
- 권장 계층:
  - Headline: `24 / 32 / 40`, `700`
  - Body: `15` 또는 `16`, `400`, line-height `1.5~1.6`
- 긴 본문은 가독성을 위해 한 단계 작은 크기 + 넉넉한 줄간격 사용

## Color

- 의미 기반 토큰 사용:
  - 텍스트: `--color-text-*`
  - 배경: `--color-bg-*`
  - 경계선: `--color-border*`
- 다크모드는 컴포넌트 하드코딩 대신 `.dark` 토큰 오버라이드로 처리한다.

## Spacing & Radius

- 8pt 그리드 사용: `4, 8, 12, 16, 24, 32, 48...`
- 반경 기준:
  - 소형 요소: `--radius-sm`
  - 카드/컨테이너: `--radius-md`
  - 큰 섹션: `--radius-lg` 이상

## Motion & Interaction

- 기본 전환: `--ease-default`, `--duration-150~300`
- Hover/Active는 과한 변형보다 명확한 피드백에 집중
- 스타일 피드백은 배경/경계선/opacity 위주로 일관 적용

## 금지 규칙

- Tailwind 임의값 사용 금지 (`p-[13px]` 등)
- 같은 의미의 색상을 컴포넌트마다 다른 값으로 중복 정의 금지
- 단일 페이지 편의를 위한 전역 토큰 오염 금지
