import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <p className={styles.footerText}>
            API Version: 1.0
          </p>
        </div>
      </div>
    </footer>
  );
}