import { EmptyState } from '@/components/ui';
import { Header } from '@/components/layout';

export default function BlogPostLoading() {
  return (
    <>
      <Header />
      <main>
        <EmptyState
          icon="✍️"
          title="글을 불러오는 중입니다"
          description="콘텐츠를 준비하고 있습니다."
        />
      </main>
    </>
  );
}
