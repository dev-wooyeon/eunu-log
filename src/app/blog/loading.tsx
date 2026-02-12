import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

export default function BlogLoading() {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="📰"
          title="글 목록을 불러오는 중입니다"
          description="최신 글을 준비하고 있습니다."
        />
      </main>
    </>
  );
}
