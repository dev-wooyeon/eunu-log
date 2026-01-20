'use client';

import Link from 'next/link';
import { PostData } from '@/types';
import styles from './PostListItem.module.css';

interface PostListItemProps {
    post: PostData;
}

export default function PostListItem({ post }: PostListItemProps) {
    return (
        <Link href={`/posts/${post.slug}`} className={styles.item}>
            <span className={styles.date}>{post.date}</span>
            <h3 className={styles.title}>{post.title}</h3>
            {post.readingTime && (
                <span className={styles.readingTime}>{post.readingTime} min read</span>
            )}
        </Link>
    );
}
