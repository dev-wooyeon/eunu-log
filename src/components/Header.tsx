'use client';

import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          eunu.log
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/posts" className={styles.navLink}>
              Feeds
            </Link>
          </li>
          <li>
            <Link href="/resume" className={styles.navLink}>
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
