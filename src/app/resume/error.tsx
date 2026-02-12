'use client';

import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

interface ResumeErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ResumeError({ error, reset }: ResumeErrorProps) {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="⚠️"
          title="이력서를 불러오지 못했습니다"
          description={error.message || '잠시 후 다시 시도해 주세요.'}
          action={{ label: '다시 시도', onClick: reset }}
        />
      </main>
    </>
  );
}
