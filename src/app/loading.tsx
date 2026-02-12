import { EmptyState } from '@/components/ui';

export default function RootLoading() {
  return (
    <main>
      <EmptyState
        icon="⏳"
        title="페이지를 불러오는 중입니다"
        description="잠시만 기다려 주세요."
      />
    </main>
  );
}
