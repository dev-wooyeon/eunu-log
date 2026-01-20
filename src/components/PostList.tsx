'use client';

import { useState } from 'react';
import { PostData } from '@/types';
import PostListItem from './PostListItem';
import styles from './PostList.module.css';

interface PostListProps {
    posts: PostData[];
}

type FilterType = 'All' | 'Dev' | 'Life';

export default function PostList({ posts }: PostListProps) {
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');

    const filteredPosts = posts.filter((post) => {
        if (activeFilter === 'All') return true;
        // Check if the post has tags and if one of them matches the active filter (case-insensitive)
        return post.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'All' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('All')}
                >
                    All
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'Dev' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('Dev')}
                >
                    Dev
                </button>
                <button
                    className={`${styles.filterButton} ${activeFilter === 'Life' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('Life')}
                >
                    Life
                </button>
            </div>

            <div className={styles.list}>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostListItem key={post.slug} post={post} />
                    ))
                ) : (
                    <div className={styles.empty}>No posts found.</div>
                )}
            </div>
        </div>
    );
}
