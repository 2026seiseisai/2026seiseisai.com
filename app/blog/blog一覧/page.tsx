import styles from './page.module.css';

export const metadata = {
  title: 'Blog List | 東大寺学園菁々祭「Infinity」公式ホームページ',
};

export default function BlogListPage() {
  return (
    <main className={styles.previewArea}>
      <p className={styles.example}>Blog List</p>
      <section className={styles.samplePanel}>
        <h2 className={styles.sampleTitle}>配色サンプル</h2>
        <p className={styles.sampleText}>
          この文字はテーマ文字色（#0A1B6F）です。
        </p>
        <div className={styles.swatchGrid}>
          <div className={styles.swatchItem}>
            <span className={styles.swatchLabel}>水色</span>
            <span
              className={styles.swatchColor}
              style={{ backgroundColor: '#59C7E8' }}
            />
            <span className={styles.swatchCode}>#59C7E8</span>
          </div>
          <div className={styles.swatchItem}>
            <span className={styles.swatchLabel}>ピンク</span>
            <span
              className={styles.swatchColor}
              style={{ backgroundColor: '#DB5492' }}
            />
            <span className={styles.swatchCode}>#DB5492</span>
          </div>
        </div>
      </section>
    </main>
  );
}
