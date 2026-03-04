'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { FeedData } from '@/domains/post/model/types';
import type { SeriesSummary } from '@/features/blog/model/series-group';
import { Container } from '@/shared/layout';
import { trackEvent } from '@/shared/analytics/lib/analytics';

interface HeroSectionProps {
  allArticles: FeedData[];
  seriesSummaries: SeriesSummary[];
}

const ARTICLE_PAGE_SIZE = 4;

function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CategoryPill({ post }: { post: FeedData }) {
  const toneClass =
    post.category === 'Tech'
      ? 'bg-[var(--color-toss-blue)]/10 text-[var(--color-toss-blue)]'
      : 'bg-[var(--color-grey-100)] text-[var(--color-grey-700)]';

  return (
    <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${toneClass}`}>
      {post.category}
    </span>
  );
}

function ArticleThumbnail({ post }: { post: FeedData }) {
  return (
    <div
      className="hidden h-24 w-40 shrink-0 sm:block"
      aria-hidden="true"
    >
      {post.image ? (
        <div className="h-full w-full overflow-hidden rounded-xl">
          <Image
            src={post.image}
            alt=""
            width={320}
            height={192}
            sizes="160px"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function HeroSection({
  allArticles,
  seriesSummaries,
}: HeroSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const articlePosts = useMemo(
    () => allArticles.filter((post) => !post.series),
    [allArticles]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(articlePosts.length / ARTICLE_PAGE_SIZE)
  );

  const displaySeries = useMemo(
    () => seriesSummaries.filter((summary) => summary.firstPostSlug).slice(0, 4),
    [seriesSummaries]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pagedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ARTICLE_PAGE_SIZE;
    return articlePosts.slice(startIndex, startIndex + ARTICLE_PAGE_SIZE);
  }, [articlePosts, currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  return (
    <section className="bg-[var(--color-bg-primary)]">
      <Container size="md" className="pb-8 pt-6 md:pb-10 md:pt-8">
        <div className="mb-5 md:mb-7">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-[var(--color-grey-900)] md:text-6xl">
            안녕하세요, 우연입니다
          </h1>

          <div className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-grey-700)] md:text-lg">
            <p className="font-mono md:font-sans">
              Make Creative, Data, Systems things.
              <br />
              Currently working as a Software Engineer{' '}
              <a href="https://981park.com">@9.81park</a>.
            </p>
          </div>

        </div>

        <section id="home-article-list" className="mt-2 md:mt-3">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-2xl font-bold text-[var(--color-grey-900)]">전체 아티클</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[var(--color-grey-500)]">
                {currentPage} / {totalPages} 페이지
              </span>
              <Link
                href="/engineering"
                className="text-sm font-semibold text-[var(--color-toss-blue)] hover:underline"
              >
                전체 보기
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            {pagedArticles.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={() =>
                  trackEvent('cta_click', {
                    cta_name: 'home_spotlight_post',
                    cta_location: 'home_hero',
                    destination: `/blog/${post.slug}`,
                  })
                }
                className="group flex h-36 items-center justify-between gap-4 rounded-xl border border-[var(--color-grey-100)] bg-[var(--color-bg-primary)] px-5 py-4 transition-colors hover:border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]"
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <CategoryPill post={post} />
                    <span className="text-[11px] text-[var(--color-grey-500)]">
                      {formatPostDate(post.date)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-base font-semibold text-[var(--color-grey-900)] group-hover:text-[var(--color-toss-blue)]">
                    {post.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--color-grey-600)]">
                    {post.description}
                  </p>
                </div>
                <ArticleThumbnail post={post} />
              </Link>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="rounded border border-[var(--color-grey-200)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-[var(--color-grey-700)] transition-colors hover:bg-[var(--color-grey-50)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                이전
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={
                    page === currentPage
                      ? 'rounded border border-[var(--color-toss-blue)] bg-[var(--color-toss-blue)] px-3 py-1.5 text-white'
                      : 'rounded border border-[var(--color-grey-200)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-[var(--color-grey-700)] transition-colors hover:bg-[var(--color-grey-50)]'
                  }
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded border border-[var(--color-grey-200)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-[var(--color-grey-700)] transition-colors hover:bg-[var(--color-grey-50)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                다음
              </button>
            </div>
          ) : null}
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-[var(--color-grey-900)]">
              아티클 시리즈
            </h2>
            <Link
              href="/engineering?type=series"
              className="text-sm font-semibold text-[var(--color-toss-blue)] hover:underline"
            >
              전체 보기
            </Link>
          </div>

          {displaySeries.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-grey-100)] bg-[var(--color-grey-50)] px-5 py-8 text-center text-sm text-[var(--color-grey-600)]">
              연재 글이 준비되면 이곳에서 바로 볼 수 있어요.
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {displaySeries.map((summary) => (
                <Link
                  key={summary.id}
                  href={`/blog/${summary.firstPostSlug}`}
                  className="rounded-2xl border border-[var(--color-grey-100)] bg-[var(--color-bg-primary)] p-4 transition-colors hover:border-[var(--color-grey-200)] hover:bg-[var(--color-grey-50)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-grey-500)]">
                    series
                  </p>
                  <p className="mt-2 line-clamp-2 text-base font-semibold text-[var(--color-grey-900)]">
                    {summary.title}
                  </p>
                  <p className="mt-3 text-xs text-[var(--color-grey-600)]">
                    {summary.postCount}개 글 · 최근 {formatPostDate(summary.latestDate)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </Container>
    </section>
  );
}
