import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import PostList from '@/components/PostList';
import styles from './posts.module.css';

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← Home</Link>
        <h1 className={styles.title}>Posts</h1>
      </header>

      <PostList posts={allPostsData} />
    </div>
  );
}
