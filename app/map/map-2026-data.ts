import { MAP_COLORS, type MapAccent } from './map-2026-theme';

export type Building = 'junior' | 'senior' | 'library' | 'other' | 'bazaar';

export type MapRoom = {
  name: string;
  label?: string;
  accent?: MapAccent;
  exhibitions: readonly string[];
};

export type MapFloor = {
  id: string;
  building: Building;
  label: string;
  title: string;
  rooms: readonly MapRoom[];
};

// 展示紹介文提出フォームのうち、展示団体名と教室割当のみを掲載しています。
// 同一団体の複数回答は、最新の回答を採用しています。
export const mapFloors: readonly MapFloor[] = [
  {
    id: 'junior-1',
    building: 'junior',
    label: '1F',
    title: '中学棟 1階',
    rooms: [
      { name: '1A', accent: MAP_COLORS.restArea, exhibitions: ['休憩室'] },
      { name: '1B', exhibitions: ['書道部'] },
      { name: '1C', exhibitions: ['1年学年展示'] },
      { name: '1D', exhibitions: ['1年学年展示'] },
      { name: '1E', exhibitions: ['鉄道研究部'] },
    ],
  },
  {
    id: 'junior-2',
    building: 'junior',
    label: '2F',
    title: '中学棟 2階',
    rooms: [
      { name: '2A', exhibitions: ['東菁会'] },
      { name: '2B', exhibitions: ['文藝同好会', '民族音楽同好会'] },
      { name: '2C', accent: MAP_COLORS.restArea, exhibitions: ['休憩室', '東方研究会'] },
      { name: '2D', exhibitions: ['2年学年展示'] },
      { name: '2E', exhibitions: ['2年学年展示'] },
      { name: '和室', exhibitions: ['お茶席'] },
    ],
  },
  {
    id: 'junior-3',
    building: 'junior',
    label: '3F',
    title: '中学棟 3階',
    rooms: [
      { name: '3A', exhibitions: ['道路研究会', '独楽研究会'] },
      { name: '3B', exhibitions: ['チェス・オセロ研究同好会'] },
      { name: '3C', exhibitions: ['3年学年展示'] },
      { name: '3D', exhibitions: ['3年学年展示'] },
      { name: '3E', exhibitions: ['3年学年展示'] },
    ],
  },
  {
    id: 'senior-1',
    building: 'senior',
    label: '1F',
    title: '高校棟 1階',
    rooms: [{ name: '6F', exhibitions: [] }],
  },
  {
    id: 'senior-2',
    building: 'senior',
    label: '2F',
    title: '高校棟 2階',
    rooms: [
      { name: '6A', exhibitions: ['園芸部'] },
      { name: '6B', exhibitions: ['英語部', '数学研究部'] },
      { name: '6C', exhibitions: ['歴史部菁史会'] },
      { name: '6D', exhibitions: ['電子工作部'] },
      { name: '6E', exhibitions: ['ロケット研究部'] },
    ],
  },
  {
    id: 'senior-3',
    building: 'senior',
    label: '3F',
    title: '高校棟 3階',
    rooms: [
      { name: '5A', exhibitions: ['ポケモン同好会'] },
      { name: '5B', exhibitions: ['紅茶同好会'] },
      { name: '5C', exhibitions: ['囲碁将棋部'] },
      { name: '5D', exhibitions: ['ルービックキューブ同好会', 'Vocaloid&作曲同好会'] },
      { name: '5E', exhibitions: ['折り紙研究部'] },
      { name: '生物室', exhibitions: ['科学部'] },
    ],
  },
  {
    id: 'senior-4',
    building: 'senior',
    label: '4F',
    title: '高校棟 4階',
    rooms: [
      { name: '4A', exhibitions: ['ドラえもん研究会'] },
      { name: '4B', exhibitions: ['MGA（テーブルゲーム）同好会'] },
      { name: '4C', exhibitions: ['自動車研究会'] },
      { name: '4D', exhibitions: ['謎解き同好会', '暗号同好会'] },
      { name: '4E', exhibitions: ['マジック同好会'] },
      { name: '情報教室', exhibitions: ['情報研究部'] },
      { name: '美術室', exhibitions: ['美術部'] },
    ],
  },
  {
    id: 'library-1',
    building: 'library',
    label: '1F',
    title: '図書館棟 1階',
    rooms: [{ name: '演習室B・C', exhibitions: ['お化け屋敷'] }],
  },
  {
    id: 'library-2',
    building: 'library',
    label: '2F',
    title: '図書館棟 2階',
    rooms: [{ name: '図書室', exhibitions: ['書画展'] }],
  },
  {
    id: 'other',
    building: 'other',
    label: '体育館',
    title: '体育館',
    rooms: [
      {
        name: '第2体育館',
        exhibitions: ['新聞部', 'ラーメン研究会', '登山同好会', '旅行同好会', 'クイズ研究部', '写真部'],
      },
    ],
  },
  {
    id: 'bazaar',
    building: 'bazaar',
    label: '会場',
    title: 'バザー',
    rooms: [
      { name: '1', label: '[1]', accent: MAP_COLORS.bazaar, exhibitions: ['フランクフルト'] },
      { name: '2', label: '[2]', accent: MAP_COLORS.bazaar, exhibitions: ['チュロス'] },
      { name: '3', label: '[3]', accent: MAP_COLORS.bazaar, exhibitions: ['ベビーカステラ'] },
      { name: '4', label: '[4]', accent: MAP_COLORS.bazaar, exhibitions: ['わたあめ'] },
      { name: '5', label: '[5]', accent: MAP_COLORS.bazaar, exhibitions: ['ドリンク（現金）'] },
      { name: '6', label: '[6]', accent: MAP_COLORS.bazaar, exhibitions: ['ラムネ・ミルクせんべい'] },
      { name: '7', label: '[7]', accent: '#42b85a', exhibitions: ['射的'] },
      { name: '8', label: '[8]', accent: '#42b85a', exhibitions: ['ストラックアウト'] },
      { name: 'A', label: '[A]', accent: '#2d9f9a', exhibitions: ['キッチンカー'] },
      { name: 'B', label: '[B]', accent: '#2d9f9a', exhibitions: ['キッチンカー'] },
      { name: 'C', label: '[C]', accent: '#2d9f9a', exhibitions: ['キッチンカー'] },
      { name: 'D', label: '[D]', accent: '#2d9f9a', exhibitions: ['キッチンカー'] },
    ],
  },
];
