export type Building = 'junior' | 'senior' | 'other';

export type MapFloor = {
  id: string;
  building: Building;
  label: string;
  title: string;
  rooms: Array<{
    name: string;
    exhibitions: string[];
  }>;
};

// 展示紹介文提出フォームのうち、展示団体名と教室割当のみを掲載しています。
// 同一団体の複数回答は、最新の回答を採用しています。
export const mapFloors: MapFloor[] = [
  {
    id: 'junior-1',
    building: 'junior',
    label: '1F',
    title: '中学棟 1階',
    rooms: [
      { name: '1A', exhibitions: [] },
      { name: '1B', exhibitions: ['書道部'] },
      { name: '1C', exhibitions: [] },
      { name: '1D', exhibitions: [] },
      { name: '1E', exhibitions: ['鉄道研究部'] },
    ],
  },
  {
    id: 'junior-2',
    building: 'junior',
    label: '2F',
    title: '中学棟 2階',
    rooms: [
      { name: '2A', exhibitions: [] },
      { name: '2B', exhibitions: ['文藝同好会', '民族音楽同好会'] },
      { name: '2C', exhibitions: ['東方研究会'] },
      { name: '2D', exhibitions: [] },
      { name: '2E', exhibitions: [] },
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
      { name: '3C', exhibitions: [] },
      { name: '3D', exhibitions: [] },
      { name: '3E', exhibitions: [] },
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
      { name: '生物室・地学室', exhibitions: ['科学部'] },
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
    id: 'other',
    building: 'other',
    label: 'その他',
    title: 'その他の会場',
    rooms: [
      {
        name: '第2体育館',
        exhibitions: ['新聞部', 'ラーメン研究会', '登山同好会', '旅行同好会', 'クイズ研究部', '写真部'],
      },
    ],
  },
];
