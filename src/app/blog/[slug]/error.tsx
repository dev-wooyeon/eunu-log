'use client';

import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

interface BlogPostErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogPostError({ error, reset }: BlogPostErrorProps) {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="⚠️"
          title="글을 불러오지 못했습니다"
          description={error.message || '잠시 후 다시 시도해 주세요.'}
          action={{ label: '다시 시도', onClick: reset }}
        />
      </main>
    </>
  );
}
