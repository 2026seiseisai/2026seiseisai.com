'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

type ClubItem = {
  id: string;
  name: string;
  icon: string; // publicフォルダ内の画像パス（例: '/club-icons/angou.png'）
  href: string;
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
      { id: 'angou', name: '暗号同好会', icon: '/club-icons/angou.png', href: '#' },
      { id: 'igo', name: '囲碁将棋部', icon: '/club-icons/igo.png', href: '#' },
      { id: 'eigo', name: '英語部', icon: '/club-icons/eigo.png', href: '#' },
      { id: 'engei', name: '園芸部', icon: '/club-icons/engei.png', href: '#' },
      { id: 'osero', name: 'オセロ同好会', icon: '/club-icons/osero.png', href: '#' },
      { id: 'origami', name: '折り紙研究部', icon: '/club-icons/origami.png', href: '#' },
    ],
  },
  { id: 'ka', 
    label: 'か行', 
    items: [
      { id: 'kagaku', name: '科学部', icon: '/club-icons/kagaku.png', href: '#' },
      { id: 'quiz', name: 'クイズ研究部', icon: '/club-icons/quiz.png', href: '#' },
      { id: 'koutya', name: '紅茶同好会', icon: '/club-icons/koutya.png', href: '#' },
      { id: 'koma', name: '独楽同好会', icon: '/club-icons/koma.png', href: '#' },
    ] },
  { id: 'sa', 
    label: 'さ行', 
    items: [
      { id: 'syasin', name: '写真部', icon: '/club-icons/syasin.png', href: '#' },
      { id: 'syodou', name: '書道部', icon: '/club-icons/書道.png', href: '#' },
      { id: 'sinbun', name: '新聞部', icon: '/club-icons/sinbun.png', href: '#' },
      { id: 'jidousya', name: '自動車研究会', icon: '/club-icons/jidousya.png', href: '#' },
      { id: 'jyouhou', name: '情報研究部', icon: '/club-icons/jyouhou.png', href: '#' },
      { id: 'suugaku', name: '数学研究部', icon: '/club-icons/suugaku.png', href: '#' },
    ] },
  { id: 'ta', 
    label: 'た行', 
    items: [
      { id: 'chesu', name: 'チェス研究会', icon: '/club-icons/chesu.png', href: '#' },
      { id: 'chesuosero', name: 'チェスオセロ研究同好会', icon: '/club-icons/chesuosero.png', href: '#' },
      { id: 'tiri', name: '地理研究会', icon: '/club-icons/tiri.png', href: '#' },
      { id: 'tetudou', name: '鉄道研究部', icon: '/club-icons/tetudou.png', href: '#' },
      { id: 'dennsikousaku', name: '電子工作部', icon: '/club-icons/dennsikousaku.png', href: '#' },
      { id: 'touhou', name: '東方研究会', icon: '/club-icons/touhou.png', href: '#' },
      { id: 'tozan', name: '登山同好会', icon: '/club-icons/tozan.png', href: '#' },
      { id: 'douro', name: '道路研究会', icon: '/club-icons/douro.png', href: '#' },
      { id: 'doraemon', name: 'ドラえもん研究会', icon: '/club-icons/doraemon.png', href: '#' },
    ] },
  { id: 'na', 
    label: 'な行', 
    items: [
      { id: 'nazo', name: '謎解き同好会', icon: '/club-icons/nazo.png', href: '#' },
    ] },
  { id: 'ha', 
    label: 'は行', 
    items: [
      { id: 'bijyutu', name: '美術部', icon: '/club-icons/bijyutu.png', href: '#' },
      { id: 'bunngei', name: '文藝同好会', icon: '/club-icons/bunngei.png', href: '#' },
      { id: 'pokemon', name: 'ポケモン同好会', icon: '/club-icons/pokemon.png', href: '#' },
      { id: 'majikku', name: 'マジック同好会', icon: '/club-icons/majikku.png', href: '#' },
      { id: 'minnzoku', name: '民族音楽同好会', icon: '/club-icons/minnzoku.png', href: '#' },
    ] },
  { id: 'ra', 
    label: 'ら行', 
    items: [
      { id: 'ramen', name: 'ラーメン研究会', icon: '/club-icons/ramen.png', href: '#' },
      { id: 'ryokou', name: '旅行同好会', icon: '/club-icons/ryokou.png', href: '#' },
      { id: 'rubikku', name: 'ルービックキューブ同好会', icon: '/club-icons/rubikku.png', href: '#' },
      { id: 'rekisi', name: '歴史部菁史会', icon: '/club-icons/rekisi.png', href: '#' },
      { id: 'roketto', name: 'ロケット研究部', icon: '/club-icons/roketto.png', href: '#' },
    ] },
  { id: 'az', 
    label: 'A - Z', 
    items: [
      { id: 'MGA', name: 'MGA同好会', icon: '/club-icons/MGA.png', href: '#' },
      { id: 'vocaloid', name: 'ボーカロイド＆作曲同好会', icon: '/club-icons/vocaloid.png', href: '#' },
    ] },
];

// TODO: 実際のPDFファイルのパスに差し替えてください（例: /pamphlets/pamphlet-high.pdf）
const pamphlets = [
  { label: '高画質版', size: '13.8MB', href: '#' },
  { label: '中画質版', size: '7.1MB', href: '#' },
  { label: '低画質版', size: '3.5MB', href: '#' },
];

export default function BrochuresPage() {
  const [openId, setOpenId] = useState<string | null>('a');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const leftColumn = categories.slice(0, 4); // あ・か・さ・た行
  const rightColumn = categories.slice(4); // な・は・ら行・A-Z

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Brochures</h1>
      <p className={styles.lead}>
        ここでは菁々祭パンフレット、ならびに各部活の部誌をご覧いただけます。菁々祭終了後も公開しておりますので、現地で手に入れることのできなかった部誌もお読みいただけます。
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
          用途に合わせ、3段階の画質でご用意しました。東大寺学園は電波の弱い場所が多いため、校内では低画質版のダウンロードをお勧めします。
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
            <li className={styles.clubRow} key={item.id}>
              <span className={styles.clubIcon}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  fill
                  sizes="40px"
                  className={styles.clubIconImage}
                />
              </span>
              <span className={styles.clubName}>{item.name}</span>
              <a className={styles.readButton} href={item.href}>
                読む <span aria-hidden>🔗</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
