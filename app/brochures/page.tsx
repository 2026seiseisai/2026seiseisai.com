'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { exhibitionIcons } from '../map/map-2026-exhibition-icons';
import { clubMagazineLinks } from './brochures-data';

type ClubItem = {
  id: string;
  name: string;
  icon: string; // publicフォルダ内の画像パス（例: '/club-icons/angou.png'）
  href?: string;
  parts?: { label: string; href: string }[];
};

type Category = {
  id: string;
  label: string;
  items: ClubItem[];
};

// TODO: あ行以外の部活データを実際の内容に差し替えてください
// icon には、public/club-icons フォルダに置いた画像ファイルのパスを指定してください
const categories: Category[] = [
  {
    id: 'a',
    label: 'あ行',
    items: [
      {
        id: 'angou',
        name: '暗号同好会',
        icon: exhibitionIcons['暗号同好会'],
        href: clubMagazineLinks['暗号同好会'],
      },
      {
        id: 'igo',
        name: '囲碁将棋部',
        icon: exhibitionIcons['囲碁将棋部'],
        href: clubMagazineLinks['囲碁将棋部'],
      },
      {
        id: 'eigo',
        name: '英語研究部',
        icon: exhibitionIcons['英語部'],
        href: clubMagazineLinks['英語研究部'],
      },
      {
        id: 'engei',
        name: '園芸部',
        icon: exhibitionIcons['園芸部'],
        href: clubMagazineLinks['園芸部'],
      },
      {
        id: 'osero',
        name: 'オセロ同好会',
        icon: exhibitionIcons['オセロ同好会'],
        href: clubMagazineLinks['オセロ研究会'],
      },
      {
        id: 'origami',
        name: '折り紙研究部',
        icon: exhibitionIcons['折り紙研究部'],
        href: '#',
      },
    ],
  },
  {
    id: 'ka',
    label: 'か行',
    items: [
      {
        id: 'kagaku',
        name: '科学部',
        icon: exhibitionIcons['科学部'],
        href: clubMagazineLinks['科学部'],
      },
      {
        id: 'quiz',
        name: 'クイズ研究部',
        icon: exhibitionIcons['クイズ研究部'],
        href: clubMagazineLinks['クイズ研究会'],
      },
      {
        id: 'koutya',
        name: '紅茶同好会',
        icon: exhibitionIcons['紅茶同好会'],
        href: clubMagazineLinks['紅茶同好会'],
      },
      {
        id: 'koma',
        name: '独楽研究会',
        icon: exhibitionIcons['独楽研究会'],
        href: clubMagazineLinks['独楽研究会'],
      },
    ],
  },
  {
    id: 'sa',
    label: 'さ行',
    items: [
      {
        id: 'sinbun',
        name: '新聞部',
        icon: exhibitionIcons['新聞部'],
        href: clubMagazineLinks['新聞部'],
      },
      {
        id: 'jidousya',
        name: '自動車研究会',
        icon: exhibitionIcons['自動車研究会'],
        href: clubMagazineLinks['自動車研究会'],
      },
      {
        id: 'suugaku',
        name: '数学研究部',
        icon: exhibitionIcons['数学研究部'],
        href: clubMagazineLinks['数学研究部'],
      },
    ],
  },
  {
    id: 'ta',
    label: 'た行',
    items: [
      {
        id: 'chesu',
        name: 'チェス研究会',
        icon: exhibitionIcons['チェス研究会'],
        href: clubMagazineLinks['チェス研究会'],
      },
      {
        id: 'tiri',
        name: '地理研究会',
        icon: exhibitionIcons['地理研究会'],
        href: '#',
      },
      {
        id: 'tetudou',
        name: '鉄道研究部',
        icon: exhibitionIcons['鉄道研究部'],
        parts: [
          { label: '東大路快速', href: clubMagazineLinks['鉄道研究部1'] },
          { label: '急行みささぎ', href: clubMagazineLinks['鉄道研究部2'] },
          { label: '準急わかくさ', href: clubMagazineLinks['鉄道研究部3'] },
          { label: '臨時', href: clubMagazineLinks['鉄道研究部4'] },
        ],
      },
      {
        id: 'dennsikousaku',
        name: '電子工作部',
        icon: exhibitionIcons['電子工作部'],
        href: clubMagazineLinks['電子工作部'],
      },
      {
        id: 'touhou',
        name: '東方研究会',
        icon: exhibitionIcons['東方研究会'],
        href: clubMagazineLinks['東方研究部'],
      },
      {
        id: 'tozan',
        name: '登山同好会',
        icon: exhibitionIcons['登山同好会'],
        href: '#',
      },
      {
        id: 'douro',
        name: '道路研究会',
        icon: exhibitionIcons['道路研究会'],
        href: clubMagazineLinks['道路研究会'],
      },
      {
        id: 'doraemon',
        name: 'ドラえもん研究会',
        icon: exhibitionIcons['ドラえもん研究会'],
        href: clubMagazineLinks['ドラえもん研究会'],
      },
    ],
  },
  {
    id: 'na',
    label: 'な行',
    items: [
      {
        id: 'nazo',
        name: '謎解き研究会',
        icon: exhibitionIcons['謎解き研究会'],
        href: clubMagazineLinks['謎解き同好会'],
      },
    ],
  },
  {
    id: 'ha',
    label: 'は行',
    items: [
      {
        id: 'bijyutu',
        name: '美術部',
        icon: exhibitionIcons['美術部'],
        href: clubMagazineLinks['美術部'],
      },
      {
        id: 'bunngei',
        name: '文藝同好会',
        icon: exhibitionIcons['文藝同好会'],
        href: '#',
      },
      {
        id: 'pokemon',
        name: 'ポケモン同好会',
        icon: exhibitionIcons['ポケモン同好会'],
        href: clubMagazineLinks['ポケモン同好会'],
      },
      {
        id: 'majikku',
        name: 'マジック同好会',
        icon: exhibitionIcons['マジック同好会'],
        href: '#',
      },
      {
        id: 'minnzoku',
        name: '民族音楽同好会',
        icon: exhibitionIcons['民族音楽同好会'],
        href: clubMagazineLinks['民族音楽同好会'],
      },
    ],
  },
  {
    id: 'ra',
    label: 'ら行',
    items: [
      {
        id: 'ramen',
        name: 'ラーメン研究会',
        icon: exhibitionIcons['ラーメン研究会'],
        href: clubMagazineLinks['ラーメン研究会'],
      },
      {
        id: 'ryokou',
        name: '旅行同好会',
        icon: exhibitionIcons['旅行同好会'],
        href: '#',
      },
      {
        id: 'rubikku',
        name: 'ルービックキューブ同好会',
        icon: exhibitionIcons['ルービックキューブ同好会'],
        href: '#',
      },
      {
        id: 'rekisi',
        name: '歴史部菁史会',
        icon: exhibitionIcons['歴史部菁史会'],
        href: clubMagazineLinks['歴史部'],
      },
      {
        id: 'roketto',
        name: 'ロケット研究部',
        icon: exhibitionIcons['ロケット研究部'],
        href: clubMagazineLinks['ロケット研究部'],
      },
    ],
  },
  {
    id: 'az',
    label: 'A - Z',
    items: [
      {
        id: 'MGA',
        name: 'MGA同好会',
        icon: exhibitionIcons['MGA同好会'],
        parts: [
          { label: 'MGA', href: clubMagazineLinks.MGA },
          { label: '般若湯', href: clubMagazineLinks.MGA_般若湯 },
        ],
      },
      {
        id: 'vocaloid',
        name: 'VOCALOID＆作曲同好会',
        icon: exhibitionIcons['VOCALOID&作曲同好会'],
        href: clubMagazineLinks['VOCALOID＆作曲同好会'],
      },
    ],
  },
];

const highQualityPamphletFile = '第62回菁々祭パンフレット高画質版.pdf';
const highQualityPamphletHref = `https://raw.githubusercontent.com/2026seiseisai/2026seiseisai.com/main/brochure-assets/${encodeURIComponent(highQualityPamphletFile)}?v=b43c8a3c2ca8`;

const pamphlets = [
  {
    label: '高画質版',
    size: '98.5MB',
    href: highQualityPamphletHref,
  },
  {
    label: '中画質版',
    size: '19.7MB',
    href: '/brochures-data/第62回菁々祭パンフレット中画質版.pdf?v=0650f4e621c7',
  },
  {
    label: '低画質版',
    size: '13.6MB',
    href: '/brochures-data/第62回菁々祭パンフレット低画質版.pdf?v=8f710ffe074e',
  },
];

export default function BrochuresPage() {
  const [openId, setOpenId] = useState<string | null>('a');

  useEffect(() => {
    const clubId = window.location.hash.replace(/^#club-/, '');
    const category = categories.find((cat) =>
      cat.items.some((item) => item.id === clubId),
    );
    if (!category) return;

    window.setTimeout(() => setOpenId(category.id), 0);
  }, []);

  useEffect(() => {
    const clubId = window.location.hash.replace(/^#club-/, '');
    if (!clubId) return;

    const clubRow = document.getElementById(`club-${clubId}`);
    if (!clubRow) return;

    window.requestAnimationFrame(() => {
      const clubRow = document.getElementById(`club-${clubId}`);
      clubRow?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      clubRow?.focus({ preventScroll: true });
    });
  }, [openId]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const leftColumn = categories.slice(0, 4); // あ・か・さ・た行
  const rightColumn = categories.slice(4); // な・は・ら行・A-Z

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Brochures</h1>
      <p className={styles.lead}>
        ここでは菁々祭パンフレット、ならびに各部活の部誌をご覧いただけます。菁々祭終了後も公開しておりますので、現地で手に入れることのできなかった部誌もお読みいただけます。なお、部誌は9/12までは閲覧することができません。
      </p>

      {/* Pamphlet セクション */}
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.rule} />
          <div className={styles.headingText}>
            <h2>Pamphlet</h2>
            <span className={styles.subtitle}>パンフレット</span>
          </div>
          <span className={styles.rule} />
        </div>

        <p className={styles.body}>
          校内図、展示のタイムテーブルなど、菁々祭の情報全般が掲載されていますので、菁々祭へお越しの際はぜひ参考にしてください！
          <br />
          校門でもパンフレットを配布いたしますが、事前にダウンロードしていただくと大変便利です。
          <br />
          用途に合わせ、三段階の画質でご用意しました。東大寺学園は電波の弱い場所が多いため、校内では低画質版のダウンロードをお勧めします。
        </p>

        <div className={styles.downloads}>
          {pamphlets.map((p) => (
            <div className={styles.downloadItem} key={p.label}>
              <span className={styles.downloadLabel}>
                {p.label}（{p.size}）
              </span>
              <a className={styles.downloadButton} href={p.href} download>
                ダウンロード <span aria-hidden>⬇</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Club magazine セクション */}
      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span className={styles.rule} />
          <div className={styles.headingText}>
            <h2>Club magazine</h2>
            <span className={styles.subtitle}>各部活の部誌</span>
          </div>
          <span className={styles.rule} />
        </div>

        <div className={styles.accordionGrid}>
          <div className={styles.column}>
            {leftColumn.map((cat) => (
              <AccordionCategory
                key={cat.id}
                category={cat}
                isOpen={openId === cat.id}
                onToggle={() => toggle(cat.id)}
              />
            ))}
          </div>
          <div className={styles.column}>
            {rightColumn.map((cat) => (
              <AccordionCategory
                key={cat.id}
                category={cat}
                isOpen={openId === cat.id}
                onToggle={() => toggle(cat.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
// 複数のPDFを、少し間隔を空けながら順番にダウンロードします
function handleBulkView(hrefs: string[]) {
  hrefs.forEach((url, index) => {
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
    }, index * 400);
  });
}
function AccordionCategory({
  category,
  isOpen,
  onToggle,
}: {
  category: Category;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={`${styles.accordionHeader} ${
          isOpen ? styles.accordionHeaderOpen : ''
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{category.label}</span>
        <span className={styles.accordionIcon}>{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <ul className={styles.clubList}>
          {category.items.length === 0 && (
            <li className={styles.clubEmpty}>準備中です</li>
          )}
          {category.items.map((item) => (
            <li
              className={styles.clubRow}
              id={`club-${item.id}`}
              key={item.id}
              tabIndex={-1}
            >
              <span className={styles.clubIcon}>
                <span
                  className={styles.clubIconImage}
                  role="img"
                  aria-label={item.name}
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                />
              </span>
              <span className={styles.clubName}>{item.name}</span>

              {item.parts ? (
                <div className={styles.multiDownloads}>
                  <button
                    type="button"
                    className={styles.bulkDownloadButton}
                    onClick={() =>
                      handleBulkView(item.parts!.map((p) => p.href))
                    }
                  >
                    まとめて見る <span aria-hidden>↗</span>
                  </button>
                  {item.parts!.map((part) => (
                    <a
                      key={part.label}
                      className={styles.partDownloadButton}
                      href={part.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {part.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  className={styles.readButton}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  読む <span aria-hidden>🔗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
