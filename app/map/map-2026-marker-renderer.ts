import * as THREE from 'three';
import { facilityMarkerGroups, type MapPoint3D } from './map-2026-coordinates';
import type { MapRoom } from './map-2026-data';
import { exhibitionIcons } from './map-2026-exhibition-icons';
import { mapIcons } from './map-2026-facility-icons';
import { MAP_COLORS } from './map-2026-theme';
import { drawSvgIcon, framedSvg, iconBillboard } from './map-2026-svg-renderer';

const exhibitionIconAliases: Record<string, keyof typeof exhibitionIcons> = {
  '1年学年展示': '中1学年展示',
  '2年学年展示': '中2学年展示',
  '3年学年展示': '中3学年展示',
  'MGA（テーブルゲーム）同好会': 'MGA同好会',
  'Vocaloid&作曲同好会': 'VOCALOID&作曲同好会',
  謎解き同好会: '謎解き研究会',
};

const MAP_LABEL_RENDER_ORDER = 20;

type FacilityIconStyle = Readonly<{
  size: number;
  framed: boolean;
}>;

const DEFAULT_FACILITY_ICON_STYLE: FacilityIconStyle = { size: 41, framed: false };
const FACILITY_ICON_STYLES: Partial<Record<keyof typeof mapIcons, FacilityIconStyle>> = {
  自動販売機: { size: 28, framed: true },
  階段: { size: 35, framed: false },
  トイレ: { size: 29, framed: false },
  男子トイレ: { size: 29, framed: false },
  女子トイレ: { size: 29, framed: false },
};

function exhibitionIconSvg(name: string) {
  const iconName = exhibitionIconAliases[name] ?? name;
  if (iconName in exhibitionIcons) return exhibitionIcons[iconName as keyof typeof exhibitionIcons];
  if (iconName in mapIcons) return mapIcons[iconName as keyof typeof mapIcons];
  return exhibitionIcons.fallback;
}

function bubblePath(
  context: CanvasRenderingContext2D,
  bodyWidth: number,
  bodyHeight: number,
  canvasHeight: number,
) {
  const x = 2;
  const y = 2;
  const width = bodyWidth - 4;
  const height = bodyHeight - 4;
  const radius = 14;
  const bottom = y + height;
  const tailCenter = bodyWidth / 2;

  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(tailCenter + 11, bottom);
  context.lineTo(tailCenter, canvasHeight + 2);
  context.lineTo(tailCenter - 11, bottom);
  context.lineTo(x + radius, bottom);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawFittedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  initialSize: number,
) {
  let size = initialSize;
  context.font = `800 ${size}px sans-serif`;
  while (size > 10 && context.measureText(text).width > maxWidth) {
    size -= 0.5;
    context.font = `800 ${size}px sans-serif`;
  }
  context.fillText(text, x, y);
}

type RoomBubble = {
  group: THREE.Group;
  height: number;
};

type TexturedBubble = RoomBubble & {
  texture: THREE.CanvasTexture;
};

type MarkerStyle = Readonly<{
  stemHeight: number;
  stemRadius: number;
  dotRadius: number;
}>;

const BUBBLE_PIXEL_RATIO = 2;
const BUBBLE_WORLD_PER_PIXEL = 0.32;
const BUBBLE_TAIL_HEIGHT = 15;
const ROOM_MARKER_STYLE: MarkerStyle = { stemHeight: 34, stemRadius: 1.3, dotRadius: 4 };
const LANDMARK_MARKER_STYLE: MarkerStyle = { stemHeight: 22, stemRadius: 1.1, dotRadius: 3.5 };

function createBubbleCanvas(
  bodyWidth: number,
  bodyHeight: number,
  stroke: string,
  fill = '#ffffff',
) {
  const canvasHeight = bodyHeight + BUBBLE_TAIL_HEIGHT;
  const canvas = document.createElement('canvas');
  canvas.width = bodyWidth * BUBBLE_PIXEL_RATIO;
  canvas.height = canvasHeight * BUBBLE_PIXEL_RATIO;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.scale(BUBBLE_PIXEL_RATIO, BUBBLE_PIXEL_RATIO);

  bubblePath(context, bodyWidth, bodyHeight, canvasHeight);
  context.fillStyle = fill;
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = stroke;
  context.stroke();

  return { canvas, context, canvasHeight };
}

function createBubbleBillboard(
  canvas: HTMLCanvasElement,
  bodyWidth: number,
  canvasHeight: number,
): TexturedBubble {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const worldHeight = canvasHeight * BUBBLE_WORLD_PER_PIXEL;
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(bodyWidth * BUBBLE_WORLD_PER_PIXEL, worldHeight),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      depthTest: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    }),
  );
  plane.renderOrder = MAP_LABEL_RENDER_ORDER;

  const group = new THREE.Group();
  group.add(plane);
  return { group, height: worldHeight, texture };
}

function createRoomBubble(room: MapRoom, isBazaar = false): RoomBubble | null {
  const hasExhibitions = room.exhibitions.length > 0;
  const columns = room.exhibitions.length > 3 ? 2 : 1;
  const rows = hasExhibitions ? Math.ceil(room.exhibitions.length / columns) : 1;
  const columnWidth = 300;
  const headerHeight = 48;
  const rowHeight = 48;
  const bodyPadding = 12;
  const bodyWidth = columnWidth * columns;
  const bodyHeight = headerHeight + rows * rowHeight + bodyPadding;
  const fill = hasExhibitions ? '#ffffff' : '#f2f4f8';
  const stroke = room.accent ?? (
    isBazaar ? MAP_COLORS.bazaar : hasExhibitions ? MAP_COLORS.exhibition : MAP_COLORS.inactiveBubble
  );
  const bubbleCanvas = createBubbleCanvas(bodyWidth, bodyHeight, stroke, fill);
  if (!bubbleCanvas) return null;
  const { canvas, context, canvasHeight } = bubbleCanvas;

  context.textBaseline = 'middle';
  context.fillStyle = MAP_COLORS.primaryText;
  context.textAlign = 'center';
  drawFittedText(
    context,
    room.label ?? (isBazaar ? `バザー ${room.name}` : room.name),
    bodyWidth / 2,
    headerHeight / 2 + 1,
    bodyWidth - 32,
    22,
  );

  if (hasExhibitions) {
    context.textAlign = 'left';
    context.fillStyle = '#222b43';
    room.exhibitions.forEach((name, index) => {
      const column = Math.floor(index / rows);
      const row = index % rows;
      const rowCenter = headerHeight + row * rowHeight + rowHeight / 2;
      const columnStart = column * columnWidth;
      drawFittedText(
        context,
        name,
        columnStart + (isBazaar ? 20 : 64),
        rowCenter,
        columnWidth - (isBazaar ? 40 : 80),
        isBazaar ? 20 : 17,
      );
    });
  } else {
    context.textAlign = 'center';
    context.fillStyle = '#7e889d';
    context.font = '700 16px sans-serif';
    context.fillText('展示なし', bodyWidth / 2, headerHeight + rowHeight / 2);
  }

  const bubble = createBubbleBillboard(canvas, bodyWidth, canvasHeight);

  if (!isBazaar) {
    room.exhibitions.forEach((name, index) => {
      const column = Math.floor(index / rows);
      const row = index % rows;
      const iconCenterX = column * columnWidth + 34;
      const iconCenterY = headerHeight + row * rowHeight + rowHeight / 2;
      drawSvgIcon(context, bubble.texture, exhibitionIconSvg(name), iconCenterX, iconCenterY, 31);
    });
  }

  return bubble;
}

function createLandmarkBubble(
  name: string,
  accent: string,
  title?: string,
  icon?: string,
): RoomBubble | null {
  const bodyWidth = name.length > 8 ? 320 : 220;
  const headerHeight = title ? 42 : 0;
  const bodyHeight = title ? 96 : 64;
  const bubbleCanvas = createBubbleCanvas(bodyWidth, bodyHeight, accent);
  if (!bubbleCanvas) return null;
  const { canvas, context, canvasHeight } = bubbleCanvas;

  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.fillStyle = MAP_COLORS.primaryText;
  if (title) {
    drawFittedText(context, title, bodyWidth / 2, headerHeight / 2 + 1, bodyWidth - 32, 21);
  }

  const contentCenterY = title ? headerHeight + (bodyHeight - headerHeight) / 2 : bodyHeight / 2;
  context.fillStyle = title ? MAP_COLORS.secondaryText : MAP_COLORS.primaryText;
  context.textAlign = icon ? 'left' : 'center';
  drawFittedText(
    context,
    name,
    icon ? 64 : bodyWidth / 2,
    contentCenterY,
    icon ? bodyWidth - 80 : bodyWidth - 32,
    title ? 20 : 24,
  );

  const bubble = createBubbleBillboard(canvas, bodyWidth, canvasHeight);
  if (icon) drawSvgIcon(context, bubble.texture, exhibitionIconSvg(icon), 34, contentCenterY, 31);
  return bubble;
}

function addMarkerAnchor(
  group: THREE.Group,
  [x, y, z]: MapPoint3D,
  color: THREE.ColorRepresentation,
  { stemHeight, stemRadius, dotRadius }: MarkerStyle,
) {
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(stemRadius, stemRadius, stemHeight, 12),
    new THREE.MeshBasicMaterial({ color }),
  );
  stem.position.set(x, y + stemHeight / 2 + 3, z);
  group.add(stem);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(dotRadius, 16, 12),
    new THREE.MeshBasicMaterial({ color }),
  );
  dot.position.set(x, y + 3, z);
  group.add(dot);

  return y + stemHeight + 3;
}

export function addLandmarkMarker(
  group: THREE.Group,
  name: string,
  [x, y, z]: MapPoint3D,
  accent: string,
  title?: string,
  icon?: string,
  matchRoomMarker = false,
) {
  const bubbleBaseY = addMarkerAnchor(
    group,
    [x, y, z],
    accent,
    matchRoomMarker ? ROOM_MARKER_STYLE : LANDMARK_MARKER_STYLE,
  );

  const bubble = createLandmarkBubble(name, accent, title, icon);
  if (!bubble) return null;
  bubble.group.position.set(x, bubbleBaseY + bubble.height / 2, z);
  group.add(bubble.group);
  return bubble.group;
}

function roomMarkerColor(room: MapRoom, isBazaar: boolean): THREE.ColorRepresentation {
  if (room.accent) return room.accent;
  if (isBazaar) return MAP_COLORS.bazaar;
  return room.exhibitions.length > 0 ? MAP_COLORS.exhibition : MAP_COLORS.inactiveMarker;
}

export function addRoomMarker(
  group: THREE.Group,
  room: MapRoom,
  [x, y, z]: MapPoint3D,
  isBazaar = false,
) {
  const markerColor = roomMarkerColor(room, isBazaar);
  const bubbleBaseY = addMarkerAnchor(group, [x, y, z], markerColor, ROOM_MARKER_STYLE);

  const bubble = createRoomBubble(room, isBazaar);
  if (!bubble) return null;
  bubble.group.position.set(x, bubbleBaseY + bubble.height / 2, z);
  group.add(bubble.group);
  return bubble.group;
}

export function addFacilityIcons(scene: THREE.Scene, billboards: THREE.Object3D[]) {
  for (const markers of Object.values(facilityMarkerGroups)) {
    for (const { name, position: [x, y, z] } of markers) {
      const iconStyle = FACILITY_ICON_STYLES[name] ?? DEFAULT_FACILITY_ICON_STYLE;
      const sourceSvg = mapIcons[name];
      const icon = iconBillboard(iconStyle.framed ? framedSvg(sourceSvg) : sourceSvg, iconStyle.size);
      icon.position.set(x, y + 20, z);
      icon.renderOrder = MAP_LABEL_RENDER_ORDER;
      scene.add(icon);
      billboards.push(icon);
    }
  }
}

