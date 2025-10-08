'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoSection}>
          <Image 
            src="/assets/logo.svg" 
            alt="League Logo" 
            width={32}
            height={32}
            className={styles.logoImage} 
          />
          <span className={styles.logoText}>League Web UI</span>
        </Link>
        
        <nav className={styles.navigation}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            📅 Schedule
          </Link>
          <Link 
            href="/leaderboard" 
            className={`${styles.navLink} ${pathname === '/leaderboard' ? styles.active : ''}`}
          >
            🏆 Leaderboard
          </Link>
        </nav>
      </div>
    </header>
  );
}