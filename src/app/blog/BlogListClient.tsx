'use client';

import { useEffect, useMemo, useState } from 'react';
import { CategoryFilter, PostList } from '@/components/blog';
import type { FeedData } from '@/types';

interface BlogListClientProps {
  posts: FeedData[];
}

const ALL_CATEGORY = 'All';

export default function BlogListClient({ posts }: BlogListClientProps) {
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      posts.map((post) => post.category).filter(Boolean)
    );
    return [ALL_CATEGORY, ...Array.from(uniqueCategories).sort()];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(ALL_CATEGORY);
    }
  }, [categories, activeCategory]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
}
