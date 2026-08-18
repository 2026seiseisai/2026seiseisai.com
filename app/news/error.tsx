'use client';

import styles from './page.module.css';

type NewsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function NewsError({ reset }: NewsErrorProps) {
  return (
    <main className={styles.page}>
      <div className={`${styles.container} ${styles.emptyState}`}>
        <h1>お知らせを表示できません</h1>
        <p>時間をおいて、もう一度お試しください。</p>
        <button className={styles.retryButton} type="button" onClick={reset}>
          もう一度読み込む
        </button>
      </div>
    </main>
  );
}
