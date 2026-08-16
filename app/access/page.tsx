import React from 'react';
import styles from './page.module.css';

export default function AccessPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>アクセス</h1>
      <p className={styles.subtitle}>ご来場に関するご案内です。</p>

      {/* 所在地・マップ情報 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>所在地</h2>
        <div className={styles.infoBox}>
          <p className={styles.address}>〒600-8813 京都府京都市下京区中堂寺南町 134</p>
        </div>
      </section>

      {/* YouTube動画埋め込み */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>アクセス動画</h2>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/ZDUpFBZTVwQ"
            title="Access Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
}