import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

export default function ResumeLoading() {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="📄"
          title="이력서를 불러오는 중입니다"
          description="콘텐츠를 준비하고 있습니다."
        />
      </main>
    </>
  );
}
