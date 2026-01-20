'use client';

import Link from 'next/link';
import { PostData } from '@/types';
import styles from './PostCard.module.css';

interface PostCardProps {
    post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.slug}`} className={styles.card}>
            <div className={styles.category}>{post.category}</div>
            <h3 className={styles.title}>{post.title}</h3>
            <p className={styles.description}>{post.description}</p>
            <div className={styles.footer}>
                <span className={styles.date}>{post.date}</span>
                {post.readingTime && (
                    <span className={styles.readingTime}>{post.readingTime} min read</span>
                )}
            </div>
        </Link>
    );
}
