'use client';

import { useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import MobileTocSheet from '../MobileTocSheet';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  postSlug?: string;
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  const yOffset = -100;
  const yPosition =
    element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: yPosition, behavior: 'smooth' });
  window.history.replaceState(null, '', `#${id}`);
}

export default function TableOfContents({
  items,
  postSlug,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  const headingIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (headingIds.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (leftEntry, rightEntry) =>
              leftEntry.boundingClientRect.top -
              rightEntry.boundingClientRect.top
          );

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-88px 0px -65% 0px',
        threshold: [0, 0.4, 1],
      }
    );

    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headingIds]);

  const handleNavigate = (id: string) => {
    setActiveId(id);
    scrollToHeading(id);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <nav
        className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-64 max-h-[80vh]"
        aria-label="목차"
      >
        <div className="p-4 bg-[var(--color-grey-50)] rounded-[var(--radius-md)] max-h-[80vh] overflow-y-auto">
          <h2 className="text-sm font-semibold text-[var(--color-grey-900)] mb-4 sticky top-0 bg-[var(--color-grey-50)] pb-2">
            목차
          </h2>
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={clsx(
                    'block w-full text-left text-sm py-1.5 px-3 rounded-[6px]',
                    'transition-colors duration-[var(--duration-150)]',
                    item.level > 2 && 'pl-6',
                    activeId === item.id
                      ? 'bg-[var(--color-toss-blue)]/10 text-[var(--color-toss-blue)] font-medium'
                      : 'text-[var(--color-grey-600)] hover:text-[var(--color-grey-900)] hover:bg-[var(--color-grey-100)]'
                  )}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <MobileTocSheet
        items={items}
        activeId={activeId}
        postSlug={postSlug}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export type { TableOfContentsProps, TocItem };
