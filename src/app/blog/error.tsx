'use client';

import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="⚠️"
          title="글 목록을 불러오지 못했습니다"
          description={error.message || '네트워크 상태를 확인하고 다시 시도해 주세요.'}
          action={{ label: '다시 시도', onClick: reset }}
        />
      </main>
    </>
  );
}
