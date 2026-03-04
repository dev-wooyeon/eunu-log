import { Header } from '@/shared/layout';
import { getSortedFeedData } from '@/features/blog/services/post-repository';
import { getSeriesSummaries } from '@/features/blog/model/series-group';
import HeroSection from '@/features/home/ui/sections/HeroSection';

export default function HomePage() {
  const sortedPosts = getSortedFeedData();
  const seriesSummaries = getSeriesSummaries(sortedPosts);

  return (
    <>
      <Header />
      <main>
        <HeroSection allArticles={sortedPosts} seriesSummaries={seriesSummaries} />
      </main>
    </>
  );
}
