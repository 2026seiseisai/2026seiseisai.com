import styles from './page.module.css';
import { Odibee_Sans } from 'next/font/google';
import downloadPicture from '../theme&logo/DLPict.svg';
import {
  DOWNLOADS_BASE_PATH,
  headerItems,
  iconItems,
  wallpaperItems,
} from './downloads-data';
const odibee = Odibee_Sans({
  weight: '400',
  subsets: ['latin'],
});

export default function SpecialPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>SPECIAL</h1>
      <p className={`${styles.description} ${styles.pcOnly}`}>
        第62回菁々祭のテーマ &quot;Infinity&quot;
        をイメージして作られた壁紙やアイコン・ヘッダーなどに使える
        <br />
        画像をダウンロードすることができます。菁々祭に向け、SNS上でも
        &quot;Infinity&quot; を感じて
        <br />
        盛り上がっていきましょう！使用にあたっては、下記の禁止事項を遵守していただくよう
        <br />
        お願いいたします。
      </p>
      <p className={`${styles.description} ${styles.spOnly}`}>
        {`第62回菁々祭のテーマ "Infinity" をイメージして
       作られた壁紙やアイコン・ヘッダーなどに
       使える画像をダウンロードすることができます。
       菁々祭に向け、SNS上でも "Infinity" を感じて
       盛り上がっていきましょう！使用にあたっては、
       下記の禁止事項を遵守していただくよう
       お願いいたします。`}
      </p>

      <section className={styles.rules}>
        <h2 className={styles.ruleTitle}>禁止事項</h2>
        <ul className={styles.ruleList}>
          <li className={styles.ruleItem}>データの改変および再編集</li>
          <li className={styles.ruleItem}>データの二次配布</li>
          <li className={styles.ruleItem}>
            データの著作権者を名乗るなどの著作権を侵害する行為
          </li>
          <li className={styles.ruleItem}>データを無断で商用利用すること</li>
        </ul>
      </section>

      <section className={styles.wallpaperSection}>
        <div className={styles.wallpaperHeader}>
          <h2 className={styles.sectionTitlewallpaper}>Wallpaper</h2>
          <p className={styles.sectionDescriptionWallpaper}>壁紙にどうぞ！</p>
        </div>
        <div className={styles.wallpaperGrid}>
          {wallpaperItems.map((item) => (
            <div key={item.svg} className={styles.wallpaperItem}>
              <img
                src={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                alt={item.alt}
                className={styles.iconImage}
              />
              <a
                href={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                download
                aria-label={`${item.alt}をダウンロード`}
                title={`${item.alt}をダウンロード`}
                className={styles.wallpaperDownloadButton}
              >
                <img src={downloadPicture.src} alt="" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.iconSection}>
        <div className={styles.iconHeader}>
          <h2 className={styles.sectionTitleicon}>Icon</h2>
          <p className={styles.sectionDescriptionIcon}>
            アカウントなどのアイコンにどうぞ！
          </p>
        </div>
        <div className={styles.iconGrid}>
          {iconItems.map((item) => (
            <div key={item.svg} className={styles.iconItem}>
              <img
                src={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                alt={item.alt}
                className={styles.iconImage}
              />
              <a
                href={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                download
                aria-label={`${item.alt}をダウンロード`}
                title={`${item.alt}をダウンロード`}
                className={styles.downloadButton}
              >
                <img src={downloadPicture.src} alt="" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.headerSection}>
        <div className={styles.headerHeader}>
          <h2 className={styles.sectionTitleheader}>Header</h2>
          <p className={styles.sectionDescriptionHeader}>
            アカウントなどのヘッダーにどうぞ！
          </p>
        </div>
        <div className={styles.headerGrid}>
          {headerItems.map((item) => (
            <div key={item.svg} className={styles.headerItem}>
              <img
                src={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                alt={item.alt}
                className={styles.headerImage}
              />
              <a
                href={`${DOWNLOADS_BASE_PATH}/${item.raster}`}
                download
                aria-label={`${item.alt}をダウンロード`}
                title={`${item.alt}をダウンロード`}
                className={styles.headerDownloadButton}
              >
                <img src={downloadPicture.src} alt="" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
