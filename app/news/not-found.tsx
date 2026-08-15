import Link from 'next/link';

import styles from './page.module.css';

export default function NewsNotFound() {
  return (
    <main className={styles.page}>
      <div className={`${styles.container} ${styles.emptyState}`}>
        <h1>お知らせが見つかりません</h1>
        <p>公開が終了したか、URLが変更された可能性があります。</p>
        <Link className={styles.backLink} href="/news">
          News一覧へ
        </Link>
      </div>
    </main>
  );
}
