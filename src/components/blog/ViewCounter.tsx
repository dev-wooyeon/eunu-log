
'use client';

import { useEffect, useState } from 'react';
import { incrementView, getViewCount } from '@/app/actions/view';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      await incrementView(slug);
      const count = await getViewCount(slug);
      setViews(count);
    };

    init();
  }, [slug]);

  if (views === null) {
    return (
      <span className="text-xs text-[var(--color-grey-500)] bg-[var(--color-grey-100)] px-2 py-1 rounded">
        ... 조회수
      </span>
    );
  }

  return (
    <span className="text-xs text-[var(--color-grey-500)] bg-[var(--color-grey-100)] px-2 py-1 rounded">
      {views.toLocaleString()} 조회수
    </span>
  );
}
