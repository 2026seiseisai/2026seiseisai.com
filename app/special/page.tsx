'use client';

import { useEffect } from 'react';
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
useEffect(() => {
  const sections = [
    {
      grid: `.${styles.wallpaperGrid}`,
      items: `.${styles.wallpaperItem}`,
      dots: `.${styles.wallpaperDot}`,
    },
    {
      grid: `.${styles.iconGrid}`,
      items: `.${styles.iconItem}`,
      dots: `.${styles.dot}`,
    },
    {
      grid: `.${styles.headerGrid}`,
      items: `.${styles.headerItem}`,
      dots: `.${styles.headerDot}`,
    },
  ];

  sections.forEach(({ grid, items, dots }) => {
    const gridEl = document.querySelector(grid);
    const itemEls = document.querySelectorAll(items);
    const dotEls = document.querySelectorAll(dots);

    if (!gridEl || itemEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Array.from(itemEls).indexOf(entry.target);
          if (index !== -1) {
            dotEls[index].classList.toggle(styles.active, entry.isIntersecting);
          }
        });
      },
      {
        root: gridEl,      // 横スクロール領域を監視
        threshold: 0.5,    // 50% 見えたら反応
      }
    );

    itemEls.forEach((item) => observer.observe(item));
  });
}, []);


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>SPECIAL</h1>

      {/* 説明文 */}
      <p className={`${styles.description} ${styles.pcOnly}`}>
       {`第62回菁々祭のテーマ"Infinity"をイメージして作られた壁紙やアイコン・ヘッダーなどに使える
       画像をダウンロードすることができます。菁々祭に向け、SNS上でも"Infinity"を感じて
       盛り上がっていきましょう！使用にあたっては、下記の禁止事項を遵守していただくよう
       お願いいたします。`}
      </p>
      <p className={`${styles.description} ${styles.spOnly}`}>
        {`第62回菁々祭のテーマ"Infinity"をイメージして
       作られた壁紙やアイコン・ヘッダーなどに
       使える画像をダウンロードすることができます。
       菁々祭に向け、SNS上でも"Infinity"を感じて
       盛り上がっていきましょう！使用にあたっては、
       下記の禁止事項を遵守していただくよう
       お願いいたします。`}
      </p>

      {/* 禁止事項 */}
      <section className={styles.rules}>
        <h2 className={styles.ruleTitle}>禁止事項</h2>
        <ul className={styles.ruleList}>
          <li className={styles.ruleItem}>データの改変および再編集</li>
          <li className={styles.ruleItem}>データの二次配布</li>
          <li className={styles.ruleItem}>データの著作権者を名乗るなどの著作権を侵害する行為</li>
          <li className={styles.ruleItem}>データを無断で商用利用すること</li>
        </ul>
      </section>

      {/* Wallpaper */}
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

  {/* ★ Wallpaper 用ドットインジケーター */}
  <div className={styles.wallpaperIndicator}>
    {wallpaperItems.map((_, index) => (
      <div key={index} className={styles.wallpaperDot}></div>
    ))}
  </div>
</section>


      {/* Icon */}
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

        {/* Icon ドット */}
        <div className={styles.iconIndicator}>
          {iconItems.map((_, index) => (
            <div key={index} className={styles.dot}></div>
          ))}
        </div>
      </section>

      {/* Header */}
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

        {/* Header ドット */}
        <div className={styles.headerIndicator}>
          {headerItems.map((_, index) => (
            <div key={index} className={styles.headerDot}></div>
          ))}
        </div>
      </section>
    </main>
  );
}
