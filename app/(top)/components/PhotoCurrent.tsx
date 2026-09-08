'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import sunsetFlags from '../photos/sunset-flags.webp';
import performance from '../photos/performance.webp';
import paperFlight from '../photos/paper-flight.webp';
import campus from '../photos/campus.webp';
import preparation from '../photos/preparation.webp';
import penlights from '../photos/penlights.webp';
import sunsetCampus from '../photos/sunset-campus.webp';
import styles from './PhotoCurrent.module.css';

const photos = [
  { src: sunsetFlags, alt: '夕暮れの校内に掲げられた菁々祭の旗' },
  { src: performance, alt: '青空の下で行われる屋外ステージのパフォーマンス' },
  { src: paperFlight, alt: '空へ飛び立つ紙飛行機' },
  { src: campus, alt: '東大寺学園の校舎と中庭' },
  { src: preparation, alt: '菁々祭の準備が進む校内' },
  { src: penlights, alt: 'ペンライトの光に包まれたステージ' },
  { src: sunsetCampus, alt: '夕日に照らされた校舎' },
];

export default function PhotoCurrent() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '100px' },
    );
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={galleryRef}
      className={styles.gallery}
      role="group"
      aria-label="これまでの菁々祭の写真"
      data-paused={!isInView}
    >
      <div className={styles.viewport} role="group" tabIndex={0} aria-label="菁々祭の写真一覧">
        <div className={styles.track}>
          {[false, true].map((isCopy) => (
            <div
              className={styles.group}
              key={String(isCopy)}
              aria-hidden={isCopy || undefined}
            >
              {photos.map(({ src, alt }) => (
                <div className={styles.photo} key={src.src}>
                  <Image
                    src={src}
                    alt={isCopy ? '' : alt}
                    className={styles.image}
                    sizes="(max-width: 764px) 260px, (max-width: 1647px) 34vw, 560px"
                    placeholder="blur"
                    loading={isInView ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
