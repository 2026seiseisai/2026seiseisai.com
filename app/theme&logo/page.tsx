import styles from './page.module.css';

export default function App() {
  return (
    <div className={styles.page}>
      {/* Title: Theme & Logo */}
      <div className={styles.TandL}>
        <h1 className={styles.title}>Theme &amp; Logo</h1>
      </div>

      {/* Introduction */}
      <p className={styles.introduction}>
        テーマ・ロゴについての紹介
      </p>

      {/* Main Content Section */}
      <div className={styles.main}>
        {/* Content will go here */}
        <div style={{ padding: '0 160px' }}>
          {/* You can add sections, images, descriptions here */}
        </div>
      </div>

      {/* Vector / Divider Line */}
      <div className={styles.vector}></div>
    </div>
  );
}