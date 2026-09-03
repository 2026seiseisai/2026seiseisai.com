'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { exhibitionIcons } from '../map/map-2026-exhibition-icons';

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
      { id: 'angou', name: '暗号同好会', icon: exhibitionIcons['暗号同好会'], href: '#' },
      { id: 'igo', name: '囲碁将棋部', icon: exhibitionIcons['囲碁将棋部'], href: '#' },
      { id: 'eigo', name: '英語部', icon: exhibitionIcons['英語部'], href: '#' },
      { id: 'engei', name: '園芸部', icon: exhibitionIcons['園芸部'], href: '#' },
      { id: 'osero', name: 'オセロ同好会', icon: exhibitionIcons['オセロ同好会'], href: '#' },
      { id: 'origami', name: '折り紙研究部', icon: exhibitionIcons['折り紙研究部'], href: '#' },
    ],
  },
  { id: 'ka', 
    label: 'か行', 
    items: [
      { id: 'kagaku', name: '科学部', icon: exhibitionIcons['科学部'], href: '#' },
      { id: 'quiz', name: 'クイズ研究部', icon: exhibitionIcons['クイズ研究部'], href: '#' },
      { id: 'koutya', name: '紅茶同好会', icon: exhibitionIcons['紅茶同好会'], href: '#' },
      { id: 'koma', name: '独楽研究会', icon: exhibitionIcons['独楽研究会'], href: '#' },
    ] },
  { id: 'sa', 
    label: 'さ行', 
    items: [
      { id: 'syasin', name: '写真部', icon: exhibitionIcons['写真部'], href: '#' },
      { id: 'syodou', name: '書道部', icon: exhibitionIcons['書道部'], href: '#' },
      { id: 'sinbun', name: '新聞部', icon: exhibitionIcons['新聞部'], href: '#' },
      { id: 'jidousya', name: '自動車研究会', icon: exhibitionIcons['自動車研究会'], href: '#' },
      { id: 'jyouhou', name: '情報研究部', icon: exhibitionIcons['情報研究部'], href: '#' },
      { id: 'suugaku', name: '数学研究部', icon: exhibitionIcons['数学研究部'], href: '#' },
    ] },
  { id: 'ta', 
    label: 'た行', 
    items: [
      { id: 'chesu', name: 'チェス研究会', icon: exhibitionIcons['チェス研究会'], href: '#' },
      { id: 'chesuosero', name: 'チェス・オセロ研究同好会', icon: exhibitionIcons['チェス・オセロ研究同好会'], href: '#' },
      { id: 'tiri', name: '地理研究会', icon: exhibitionIcons['地理研究会'], href: '#' },
      { id: 'tetudou', name: '鉄道研究部', icon: exhibitionIcons['鉄道研究部'], href: '#' },
      { id: 'dennsikousaku', name: '電子工作部', icon: exhibitionIcons['電子工作部'], href: '#' },
      { id: 'touhou', name: '東方研究会', icon: exhibitionIcons['東方研究会'], href: '#' },
      { id: 'tozan', name: '登山同好会', icon: exhibitionIcons['登山同好会'], href: '#' },
      { id: 'douro', name: '道路研究会', icon: exhibitionIcons['道路研究会'], href: '#' },
      { id: 'doraemon', name: 'ドラえもん研究会', icon: exhibitionIcons['ドラえもん研究会'], href: '#' },
    ] },
  { id: 'na', 
    label: 'な行', 
    items: [
      { id: 'nazo', name: '謎解き研究会', icon: exhibitionIcons['謎解き研究会'], href: '#' },
    ] },
  { id: 'ha', 
    label: 'は行', 
    items: [
      { id: 'bijyutu', name: '美術部', icon: exhibitionIcons['美術部'], href: '#' },
      { id: 'bunngei', name: '文藝同好会', icon: exhibitionIcons['文藝同好会'], href: '#' },
      { id: 'pokemon', name: 'ポケモン同好会', icon: exhibitionIcons['ポケモン同好会'], href: '#' },
      { id: 'majikku', name: 'マジック同好会', icon: exhibitionIcons['マジック同好会'], href: '#' },
      { id: 'minnzoku', name: '民族音楽同好会', icon: exhibitionIcons['民族音楽同好会'], href: '#' },
    ] },
  { id: 'ra', 
    label: 'ら行', 
    items: [
      { id: 'ramen', name: 'ラーメン研究会', icon: exhibitionIcons['ラーメン研究会'], href: '#' },
      { id: 'ryokou', name: '旅行同好会', icon: exhibitionIcons['旅行同好会'], href: '#' },
      { id: 'rubikku', name: 'ルービックキューブ同好会', icon: exhibitionIcons['ルービックキューブ同好会'], href: '#' },
      { id: 'rekisi', name: '歴史部菁史会', icon: exhibitionIcons['歴史部菁史会'], href: '#' },
      { id: 'roketto', name: 'ロケット研究部', icon: exhibitionIcons['ロケット研究部'], href: '#' },
    ] },
  { id: 'az', 
    label: 'A - Z', 
    items: [
      { id: 'MGA', name: 'MGA同好会', icon: exhibitionIcons['MGA同好会'], href: '#' },
      { id: 'vocaloid', name: 'ボーカロイド＆作曲同好会', icon: exhibitionIcons['VOCALOID&作曲同好会'], href: '#' },
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
