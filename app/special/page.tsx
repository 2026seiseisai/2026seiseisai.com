import styles from "./page.module.css";

export default function SpecialPage() {
  return (
    <main className={styles.container}>
      <h1>SPECIAL</h1>
      <p>
        第62回菁々祭のテーマ &quot;Infinity&quot; をイメージして作られた壁紙やアイコン・ヘッダーなどに使える
        画像をダウンロードすることができます。菁々祭に向け、SNS上でも &quot;Infinity&quot; を感じて
        盛り上がっていきましょう！使用にあたっては、下記の禁止事項を遵守していただくよう
        お願いいたします。
      </p>

      <section>
        <h2>禁止事項</h2>
        <ul>
          <li>データの改変および再編集</li>
          <li>データの二次配布</li>
          <li>データの著作権者を名乗るなどの著作権を侵害する行為</li>
          <li>データを無断で商用利用すること</li>
        </ul>
      </section>

      <section>
        <h2>Wallpaper</h2>
        <p>壁紙にどうぞ！</p>
        <div className={styles.wallpaperGrid}>
          {/* 画像を並べる */}
        </div>
      </section>

      <section>
        <h2>Icon</h2>
        <p>アカウントなどのアイコンにどうぞ！</p>
        <div className={styles.iconGrid}>
          {/* 画像を並べる */}
        </div>
      </section>

      <section>
        <h2>Header</h2>
        <p>アカウントなどのヘッダーにどうぞ！</p>
        <div className={styles.headerGrid}>
          {/* 画像を並べる */}
        </div>
      </section>
    </main>
  );
}