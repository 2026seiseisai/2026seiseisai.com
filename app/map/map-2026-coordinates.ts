import { geometryRoomCoordinates } from './map-2026-geometry';
import { MAP_COLORS, type MapAccent } from './map-2026-theme';

export type MapPoint3D = readonly [x: number, y: number, z: number];

type FacilityMarkerName = '自動販売機' | 'トイレ' | '男子トイレ' | '女子トイレ' | '階段';

type FacilityMarker = {
  name: FacilityMarkerName;
  position: MapPoint3D;
};

type FloorCamera = {
  position: MapPoint3D;
  target: MapPoint3D;
};

export type MapLandmark = {
  name: string;
  title?: string;
  icon?: string;
  markerLayer?: 'landmark' | 'exhibition';
  position: MapPoint3D;
  accent: MapAccent;
  visibleOnFloorIds?: readonly string[];
  hiddenOnFloorIds?: readonly string[];
};

export const mapLandmarks: readonly MapLandmark[] = [
  {
    name: '中庭',
    position: [-62.5, 200, -25],
    accent: MAP_COLORS.restArea,
    hiddenOnFloorIds: ['bazaar'],
  },
  {
    name: '体育館',
    position: [-87.5, -100, -712.5],
    accent: MAP_COLORS.gym,
    hiddenOnFloorIds: ['bazaar'],
  },
  {
    name: '第2体育館',
    position: geometryRoomCoordinates.other['第2体育館'],
    accent: MAP_COLORS.gym,
    hiddenOnFloorIds: ['other', 'bazaar'],
  },
  {
    name: '圓融館',
    position: [312.5, 0, -387.5],
    accent: '#c71585',
    hiddenOnFloorIds: ['bazaar'],
  },
  {
    name: '転心殿前インフォメーション',
    title: '転心殿',
    icon: '転心殿前インフォメーション',
    markerLayer: 'exhibition',
    position: [-75, 150, 125],
    accent: MAP_COLORS.information,
  },
  {
    name: '音楽室',
    markerLayer: 'exhibition',
    position: geometryRoomCoordinates['senior-2']['音楽室'],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['senior-2'],
  },
  {
    name: '物理室',
    markerLayer: 'exhibition',
    position: geometryRoomCoordinates['senior-3']['物理室'],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['senior-3'],
  },
  {
    name: '科学部',
    title: '地学室',
    icon: '科学部',
    markerLayer: 'exhibition',
    position: geometryRoomCoordinates['senior-3']['地学室'],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['senior-3'],
  },
  {
    name: '視聴覚室',
    markerLayer: 'exhibition',
    position: geometryRoomCoordinates['senior-4']['視聴覚室'],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['senior-4'],
  },
  {
    name: '小講堂',
    markerLayer: 'exhibition',
    position: [50, 300, 162.5],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['junior-3'],
  },
  {
    name: '雑華ホール',
    icon: '雑華ホール',
    markerLayer: 'exhibition',
    position: geometryRoomCoordinates['junior-1']['雑華ホール'],
    accent: MAP_COLORS.exhibition,
    visibleOnFloorIds: ['junior-1'],
  },
  {
    name: '休憩室',
    title: '演習室A',
    icon: '休憩室',
    position: [-212.5, 200, 437.5],
    accent: MAP_COLORS.restArea,
    visibleOnFloorIds: ['library-1'],
  },
  {
    name: '休憩室',
    title: '演習室D',
    icon: '休憩室',
    position: [-300, 200, 412.5],
    accent: MAP_COLORS.restArea,
    visibleOnFloorIds: ['library-1'],
  },
];

export const roomCoordinates: Readonly<Record<string, Readonly<Record<string, MapPoint3D>>>> = {
  ...geometryRoomCoordinates,
  // bazaar_position.jpg の番号付き食品売り場に対応しています。
  bazaar: {
    '1': [-120, 150, 300],
    '2': [-120, 150, 430],
    '3': [-120, 110, 560],
    '4': [-30, 140, 325],
    '5': [-30, 80, 500],
    '6': [-175, 20, 800],
    '7': [300, 0, 400],
    '8': [300, 0, 500],
    A: [75, 0, 700],
    B: [75, 0, 790],
    C: [-275, 200, 575],
    D: [-30, 0, 850],
  },
};

const amenityMarkers = [
  { name: '自動販売機', position: [55, 0, 15] }, // 雑華ホール内・1A側
  { name: '自動販売機', position: [112.5, 0, 200] }, // 書道室前
  { name: '自動販売機', position: [120, 0, -270] }, // 1D横
  { name: '自動販売機', position: [-145, 200, -55] }, // 中庭の最高面・高校棟側
] as const satisfies readonly FacilityMarker[];

const restroomMarkers = [
  { name: 'トイレ', position: [75, 150, 310] }, // 和室横
  { name: 'トイレ', position: [150, 300, 150] }, // 職員室横
  { name: '男子トイレ', position: [-275, 200, 262.5] },
  { name: 'トイレ', position: [-287.5, 350, 262.5] },
  { name: '女子トイレ', position: [50, 55, -100] },
  { name: '男子トイレ', position: [50, 205, -100] },
  { name: '女子トイレ', position: [-275, 205, -200] },
  { name: '男子トイレ', position: [-275, 355, -200] },
] as const satisfies readonly FacilityMarker[];

const stairMarkers = [
  // 中学棟・昇降口
  { name: '階段', position: [150, 55, 100] },
  { name: '階段', position: [150, 205, 100] },
  // 中学棟・CD間
  { name: '階段', position: [50, 5, -100] },
  { name: '階段', position: [50, 130, -100] },
  { name: '階段', position: [50, 255, -100] },
  // 高校棟・昇降口
  { name: '階段', position: [-275, 205, 50] },
  { name: '階段', position: [-275, 355, 50] },
  // 高校棟・CD間
  { name: '階段', position: [-275, 155, -200] },
  { name: '階段', position: [-275, 280, -200] },
  { name: '階段', position: [-275, 405, -200] },
  // 高校棟・体育館側
  { name: '階段', position: [-270, 55, -400] },
  { name: '階段', position: [-270, 205, -400] },
  // 図書館棟
  { name: '階段', position: [-200, 250, 287.5] },
] as const satisfies readonly FacilityMarker[];

/** 設備アイコンの座標を用途別に管理します。 */
export const facilityMarkerGroups = {
  amenities: amenityMarkers,
  restrooms: restroomMarkers,
  stairs: stairMarkers,
} as const;

// 2025年版で調整されていた階別の視点を引き継いでいます。
export const floorCameras: Readonly<Record<string, FloorCamera>> = {
  'senior-1': {
    position: [-400, 120, -370],
    target: [-100, 0, -570],
  },
  'senior-2': {
    position: [-450, 270, -550],
    target: [-100, 150, -100],
  },
  'senior-3': {
    position: [-400, 400, -520],
    target: [-100, 300, -50],
  },
  'senior-4': {
    position: [-550, 550, 140],
    target: [-100, 450, -70],
  },
  'junior-1': {
    position: [350, 170, 40],
    target: [100, 0, -60],
  },
  'junior-2': {
    position: [550, 270, -130],
    target: [100, 150, -50],
  },
  'junior-3': {
    position: [500, 420, -140],
    target: [100, 300, -70],
  },
  'library-1': {
    position: [-575, 410, 650],
    target: [-250, 200, 365],
  },
  'library-2': {
    position: [-575, 560, 650],
    target: [-250, 350, 365],
  },
  other: {
    position: [47.5, 260, -511],
    target: [0, -80, -894],
  },
  bazaar: {
    position: [140, 430, 1100],
    target: [10, 50, 500],
  },
};
