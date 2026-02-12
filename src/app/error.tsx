'use client';

import { EmptyState } from '@/components/ui';

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <main>
      <EmptyState
        icon="⚠️"
        title="페이지를 불러오지 못했습니다"
        description={error.message || '잠시 후 다시 시도해 주세요.'}
        action={{ label: '다시 시도', onClick: reset }}
      />
    </main>
  );
}
