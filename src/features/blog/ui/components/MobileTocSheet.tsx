'use client';

import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { AnalyticsEvents, trackEvent } from '@/shared/analytics/lib/analytics';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface MobileTocSheetProps {
  items: TocItem[];
  activeId: string;
  postSlug?: string;
  onNavigate: (id: string) => void;
}

export default function MobileTocSheet({
  items,
  activeId,
  postSlug,
  onNavigate,
}: MobileTocSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeItemText = useMemo(
    () => items.find((item) => item.id === activeId)?.text,
    [activeId, items]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          trackEvent(AnalyticsEvents.tocOpened, {
            surface: 'mobile_toc_sheet',
            active_heading: activeId || 'none',
            post_slug: postSlug,
          });
        }}
        className="xl:hidden fixed bottom-24 right-4 z-[var(--z-overlay)] flex max-w-xs items-center gap-2 rounded-full border border-[var(--color-grey-200)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-grey-800)] shadow-[var(--shadow-lg)]"
        aria-label="목차 열기"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-toss-blue)]" />
        <span className="truncate">{activeItemText ?? '목차 열기'}</span>
      </button>

      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 z-[var(--z-modal)]"
          aria-hidden={!isOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(0,0,0,0.45)]"
            aria-label="목차 닫기"
            onClick={() => setIsOpen(false)}
          />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-toc-title"
            className="absolute inset-x-0 bottom-0 flex h-3/4 flex-col rounded-t-2xl bg-[var(--color-bg-primary)] p-4 shadow-[var(--shadow-xl)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2
                id="mobile-toc-title"
                className="text-sm font-semibold text-[var(--color-grey-900)]"
              >
                목차
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-[var(--color-grey-600)] hover:bg-[var(--color-grey-100)]"
                aria-label="목차 닫기"
              >
                닫기
              </button>
            </div>

            <p className="mb-3 text-xs text-[var(--color-grey-500)]">
              현재 섹션: {activeItemText ?? '없음'}
            </p>

            <div className="flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }}
                      className={clsx(
                        'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        item.level > 2 && 'pl-6',
                        activeId === item.id
                          ? 'bg-[var(--color-toss-blue)]/10 text-[var(--color-toss-blue)] font-semibold'
                          : 'text-[var(--color-grey-700)] hover:bg-[var(--color-grey-100)]'
                      )}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export type { MobileTocSheetProps };
