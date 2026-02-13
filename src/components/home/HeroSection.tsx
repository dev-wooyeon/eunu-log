'use client';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui';
import { AnalyticsEvents, trackEvent } from '@/lib/analytics';

export default function HeroSection() {
  const trackCtaClick = (target: 'home_blog_cta' | 'home_resume_cta') => {
    trackEvent(AnalyticsEvents.click, { target });
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--color-bg-primary)] py-20 md:py-28">
      <Container
        size="md"
        className="flex flex-grow flex-col items-center justify-center text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-toss-blue)]">
          Software Engineer
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-[var(--color-grey-900)] md:text-6xl">
          데이터를 통해
          <br />
          제품 문제를 푸는 개발자
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--color-grey-700)]">
          시스템 안정성과 사용자 가치를 함께 개선하는 작업을 기록합니다.
          <br className="hidden md:block" />
          최근 글과 이력서를 통해 주요 프로젝트와 학습 흐름을 바로 확인할 수
          있습니다.
        </p>

        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button
            as="a"
            href="/blog"
            size="lg"
            onClick={() => trackCtaClick('home_blog_cta')}
          >
            최근 글 보기
          </Button>
          <Button
            as="a"
            href="/resume"
            variant="secondary"
            size="lg"
            onClick={() => trackCtaClick('home_resume_cta')}
          >
            이력서 보기
          </Button>
        </div>

        <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <p className="text-xs text-[var(--color-grey-500)]">주요 분야</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-grey-900)]">
              Data / Backend
            </p>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <p className="text-xs text-[var(--color-grey-500)]">현재 역할</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-grey-900)]">
              Software Engineer
            </p>
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <p className="text-xs text-[var(--color-grey-500)]">핵심 기술</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-grey-900)]">
              Kafka · Flink · AWS
            </p>
          </div>
        </div>
      </Container>

      {/* Scroll Hint */}
      <button
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }
        className="absolute bottom-10 left-0 right-0 mx-auto flex h-12 w-12 cursor-pointer items-center justify-center pb-safe opacity-80 transition-opacity hover:opacity-100"
        aria-label="Scroll to next section"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce text-[var(--color-grey-600)]"
        >
          <path
            d="M36 18L24 30L12 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
