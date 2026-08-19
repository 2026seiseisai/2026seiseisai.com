'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { exhibitionIcons } from './map_2025_ver/(exhibition)/exhibition-icons';
import { mapIcons } from './map_2025_ver/(map3d)/map-icons';
import { Boxes, Color, ExhibitionPositions, Polygons, Rects } from './map_2025_ver/(map3d)/mapdata';
import { floorCameras, roomCoordinates, type MapPoint3D } from './map-2026-coordinates';
import type { MapFloor } from './map-2026-data';
import { exhibitionIcons2026 } from './map-2026-icons';
import styles from './Map2026.module.css';

type MapRoom = MapFloor['rooms'][number];

type MapScene = {
  dispose: () => void;
  selectFloor: (floorId: string, rooms: MapRoom[], immediate?: boolean) => void;
};

const exhibitionIconAliases: Record<string, keyof typeof exhibitionIcons> = {
  'MGA（テーブルゲーム）同好会': 'MGA同好会',
  'Vocaloid&作曲同好会': 'VOCALOID&作曲同好会',
  'チェス・オセロ研究同好会': 'チェス研究会',
  謎解き同好会: '謎解き研究会',
};

const MAP_LABEL_RENDER_ORDER = 20;

function addRectFloors(scene: THREE.Scene) {
  for (const { y, x1, z1, x2, z2, color = Color.white } of Rects) {
    const geometry = new THREE.BoxGeometry(Math.abs(x1 - x2), 5, Math.abs(z1 - z2));
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.76, metalness: 0.02 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((x1 + x2) / 2, y - 2.5, (z1 + z2) / 2);
    scene.add(mesh);
  }
}

function addClassroomDividers(scene: THREE.Scene) {
  const classrooms = Rects.filter(({ color }) => color === Color.red || color === Color.blue).map(
    ({ y, x1, z1, x2, z2 }) => ({
      y,
      xMin: Math.min(x1, x2),
      xMax: Math.max(x1, x2),
      zMin: Math.min(z1, z2),
      zMax: Math.max(z1, z2),
    }),
  );
  const dividerMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.96,
  });
  const epsilon = 0.001;

  const addDivider = (begin: THREE.Vector3, end: THREE.Vector3) => {
    const geometry = new THREE.BufferGeometry().setFromPoints([begin, end]);
    scene.add(new THREE.Line(geometry, dividerMaterial.clone()));
  };

  for (let firstIndex = 0; firstIndex < classrooms.length; firstIndex += 1) {
    const first = classrooms[firstIndex];
    for (let secondIndex = firstIndex + 1; secondIndex < classrooms.length; secondIndex += 1) {
      const second = classrooms[secondIndex];
      if (Math.abs(first.y - second.y) > epsilon) continue;
      const lineY = first.y + 0.7;

      if (
        Math.abs(first.xMax - second.xMin) <= epsilon ||
        Math.abs(second.xMax - first.xMin) <= epsilon
      ) {
        const zStart = Math.max(first.zMin, second.zMin);
        const zEnd = Math.min(first.zMax, second.zMax);
        if (zEnd - zStart > epsilon) {
          const x = Math.abs(first.xMax - second.xMin) <= epsilon ? first.xMax : first.xMin;
          addDivider(new THREE.Vector3(x, lineY, zStart), new THREE.Vector3(x, lineY, zEnd));
        }
      }

      if (
        Math.abs(first.zMax - second.zMin) <= epsilon ||
        Math.abs(second.zMax - first.zMin) <= epsilon
      ) {
        const xStart = Math.max(first.xMin, second.xMin);
        const xEnd = Math.min(first.xMax, second.xMax);
        if (xEnd - xStart > epsilon) {
          const z = Math.abs(first.zMax - second.zMin) <= epsilon ? first.zMax : first.zMin;
          addDivider(new THREE.Vector3(xStart, lineY, z), new THREE.Vector3(xEnd, lineY, z));
        }
      }
    }
  }

  dividerMaterial.dispose();
}

function addPolygonFloors(scene: THREE.Scene) {
  for (const { points, color = Color.white } of Polygons) {
    if (points.length < 3) continue;

    const indices = Array.from({ length: points.length - 2 }, (_, index) => [0, index + 1, index + 2]).flat();
    const topGeometry = new THREE.BufferGeometry();
    topGeometry.setIndex(indices);
    topGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(points.flat()), 3),
    );
    topGeometry.computeVertexNormals();
    scene.add(
      new THREE.Mesh(
        topGeometry,
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.8,
          metalness: 0,
          side: THREE.DoubleSide,
        }),
      ),
    );

    const useSurfaceColor = color === Color.green || color === Color.ylgreen || color === Color.brown;
    const edgeColor = useSurfaceColor ? color : 0xaaaaaa;
    const bottomPoints = points.map(([x, y, z]) => [x, y - 5, z] as const).reverse();
    const bottomGeometry = new THREE.BufferGeometry();
    bottomGeometry.setIndex(indices);
    bottomGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(bottomPoints.flat()), 3),
    );
    bottomGeometry.computeVertexNormals();
    scene.add(
      new THREE.Mesh(
        bottomGeometry,
        new THREE.MeshStandardMaterial({ color: edgeColor, roughness: 0.8, side: THREE.DoubleSide }),
      ),
    );

    for (let index = 0; index < points.length; index += 1) {
      const [x1, y1, z1] = points[index];
      const [x2, y2, z2] = points[(index + 1) % points.length];
      const sideGeometry = new THREE.BufferGeometry();
      sideGeometry.setIndex([0, 1, 2, 0, 2, 3]);
      sideGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
          new Float32Array([x1, y1, z1, x1, y1 - 5, z1, x2, y2 - 5, z2, x2, y2, z2]),
          3,
        ),
      );
      sideGeometry.computeVertexNormals();
      scene.add(
        new THREE.Mesh(
          sideGeometry,
          new THREE.MeshStandardMaterial({ color: edgeColor, roughness: 0.8, side: THREE.DoubleSide }),
        ),
      );
    }
  }
}

function addVerticalStructures(scene: THREE.Scene) {
  for (const boxData of Boxes) {
    const [x1, y1, z1] = boxData.begin;
    const [x2, y2, z2] = boxData.end;
    const geometry = new THREE.BoxGeometry(Math.abs(x1 - x2), Math.abs(y1 - y2), Math.abs(z1 - z2));
    const material = new THREE.MeshStandardMaterial({
      color: boxData.color ?? Color.gray,
      transparent: true,
      opacity: 0.48,
      roughness: 0.74,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2);
    scene.add(mesh);
  }
}

function svgDimensions(svg: string) {
  const viewBox = svg.match(/viewBox=["']([^"']+)["']/i)?.[1];
  const values = viewBox?.trim().split(/[\s,]+/).map(Number);
  if (!values || values.length !== 4 || values.some((value) => !Number.isFinite(value))) {
    return { width: 1, height: 1 };
  }
  return { width: Math.abs(values[2]) || 1, height: Math.abs(values[3]) || 1 };
}

function svgDataUrl(svg: string) {
  const { width, height } = svgDimensions(svg);
  const withSize = svg.replace(
    /<svg\b/i,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`,
  );
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(withSize)}`;
}

function drawSvgIcon(
  context: CanvasRenderingContext2D,
  texture: THREE.CanvasTexture,
  svg: string,
  centerX: number,
  centerY: number,
  size: number,
) {
  const { width, height } = svgDimensions(svg);
  const scale = size / Math.max(width, height);
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => {
    context.drawImage(
      image,
      centerX - (width * scale) / 2,
      centerY - (height * scale) / 2,
      width * scale,
      height * scale,
    );
    texture.needsUpdate = true;
  };
  image.src = svgDataUrl(svg);
}

function iconBillboard(svg: string, size: number) {
  const { width, height } = svgDimensions(svg);
  const scale = size / Math.max(width, height);
  const texture = new THREE.TextureLoader().load(svgDataUrl(svg));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  return new THREE.Mesh(
    new THREE.PlaneGeometry(width * scale, height * scale),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.02,
      depthTest: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    }),
  );
}

function exhibitionIconSvg(name: string) {
  if (name in exhibitionIcons2026) {
    return exhibitionIcons2026[name as keyof typeof exhibitionIcons2026];
  }
  const iconName = exhibitionIconAliases[name] ?? name;
  return iconName in exhibitionIcons
    ? exhibitionIcons[iconName as keyof typeof exhibitionIcons]
    : exhibitionIcons.fallback;
}

function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
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

function createRoomBubble(room: MapRoom): RoomBubble | null {
  const hasExhibitions = room.exhibitions.length > 0;
  const columns = room.exhibitions.length > 3 ? 2 : 1;
  const rows = hasExhibitions ? Math.ceil(room.exhibitions.length / columns) : 1;
  const columnWidth = 300;
  const headerHeight = 42;
  const rowHeight = 40;
  const bodyPadding = 10;
  const tailHeight = 15;
  const bodyWidth = columnWidth * columns;
  const bodyHeight = headerHeight + rows * rowHeight + bodyPadding;
  const canvasHeight = bodyHeight + tailHeight;
  const pixelRatio = 2;
  const worldPerPixel = 0.32;
  const canvas = document.createElement('canvas');
  canvas.width = bodyWidth * pixelRatio;
  canvas.height = canvasHeight * pixelRatio;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.scale(pixelRatio, pixelRatio);

  const fill = hasExhibitions ? '#ffffff' : '#f2f4f8';
  const stroke = hasExhibitions ? '#db5492' : '#aab3c5';
  roundedRectPath(context, 2, 2, bodyWidth - 4, bodyHeight - 4, 14);
  context.fillStyle = fill;
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = stroke;
  context.stroke();

  const tailCenter = bodyWidth / 2;
  context.beginPath();
  context.moveTo(tailCenter - 11, bodyHeight - 3);
  context.lineTo(tailCenter, canvasHeight - 2);
  context.lineTo(tailCenter + 11, bodyHeight - 3);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
  context.beginPath();
  context.moveTo(tailCenter - 11, bodyHeight - 3);
  context.lineTo(tailCenter, canvasHeight - 2);
  context.lineTo(tailCenter + 11, bodyHeight - 3);
  context.lineWidth = 4;
  context.strokeStyle = stroke;
  context.stroke();

  context.textBaseline = 'middle';
  context.fillStyle = '#0a1b6f';
  context.textAlign = 'center';
  drawFittedText(context, room.name, bodyWidth / 2, headerHeight / 2 + 1, bodyWidth - 32, 18);

  if (hasExhibitions) {
    context.textAlign = 'left';
    context.fillStyle = '#222b43';
    room.exhibitions.forEach((name, index) => {
      const column = Math.floor(index / rows);
      const row = index % rows;
      const rowCenter = headerHeight + row * rowHeight + rowHeight / 2;
      const columnStart = column * columnWidth;
      drawFittedText(context, name, columnStart + 52, rowCenter, columnWidth - 66, 14);
    });
  } else {
    context.textAlign = 'center';
    context.fillStyle = '#7e889d';
    context.font = '700 13px sans-serif';
    context.fillText('展示情報なし', bodyWidth / 2, headerHeight + rowHeight / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  const worldWidth = bodyWidth * worldPerPixel;
  const worldHeight = canvasHeight * worldPerPixel;
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(worldWidth, worldHeight),
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

  room.exhibitions.forEach((name, index) => {
    const column = Math.floor(index / rows);
    const row = index % rows;
    const iconCenterX = column * columnWidth + 28;
    const iconCenterY = headerHeight + row * rowHeight + rowHeight / 2;
    drawSvgIcon(context, texture, exhibitionIconSvg(name), iconCenterX, iconCenterY, 25);
  });

  return { group, height: worldHeight };
}

function addRoomMarker(group: THREE.Group, room: MapRoom, [x, y, z]: MapPoint3D) {
  const markerColor = room.exhibitions.length > 0 ? 0xdb5492 : 0x98a3b8;
  const stemHeight = 28;
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.3, stemHeight, 12),
    new THREE.MeshBasicMaterial({ color: markerColor }),
  );
  stem.position.set(x, y + stemHeight / 2 + 3, z);
  group.add(stem);

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(4, 16, 12),
    new THREE.MeshBasicMaterial({ color: markerColor }),
  );
  dot.position.set(x, y + 3, z);
  group.add(dot);

  const bubble = createRoomBubble(room);
  if (!bubble) return null;
  bubble.group.position.set(x, y + 31 + bubble.height / 2, z);
  group.add(bubble.group);
  return bubble.group;
}

function addFacilityIcons(scene: THREE.Scene, billboards: THREE.Object3D[]) {
  for (const [name, x, y, z] of ExhibitionPositions) {
    if (!(name in mapIcons)) continue;
    const size = name.includes('トイレ') ? 24 : name === '階段' ? 29 : 34;
    const icon = iconBillboard(mapIcons[name as keyof typeof mapIcons], size);
    icon.position.set(x, y + 20, z);
    icon.renderOrder = MAP_LABEL_RENDER_ORDER;
    scene.add(icon);
    billboards.push(icon);
  }
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        if (material instanceof THREE.MeshBasicMaterial) material.map?.dispose();
        material.dispose();
      }
    }
    if (child instanceof THREE.Line) {
      child.geometry.dispose();
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) material.dispose();
    }
  });
}

function initializeScene(canvas: HTMLCanvasElement): MapScene {
  const scene = new THREE.Scene();
  const facilityBillboards: THREE.Object3D[] = [];
  const roomBillboards: THREE.Object3D[] = [];
  const markerGroup = new THREE.Group();
  scene.background = new THREE.Color(0xf4f7ff);
  scene.fog = new THREE.Fog(0xf4f7ff, 900, 1900);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const camera = new THREE.PerspectiveCamera(48, 1, 1, 3000);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enablePan = false;
  controls.minDistance = 170;
  controls.maxDistance = 1050;
  controls.minPolarAngle = Math.PI / 12;
  controls.maxPolarAngle = Math.PI * 0.48;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa9cf, 2.15));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(260, 700, 420);
  scene.add(keyLight);

  const grid = new THREE.GridHelper(2200, 44, 0xcbd5ea, 0xdde4f2);
  grid.position.y = -106;
  scene.add(grid);

  addRectFloors(scene);
  addClassroomDividers(scene);
  addPolygonFloors(scene);
  addVerticalStructures(scene);
  addFacilityIcons(scene, facilityBillboards);
  scene.add(markerGroup);

  let animationFrame = 0;
  let tweenStartedAt = 0;
  let tweenDuration = 0;
  const startPosition = new THREE.Vector3();
  const endPosition = new THREE.Vector3();
  const startTarget = new THREE.Vector3();
  const endTarget = new THREE.Vector3();

  const resize = () => {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const render = (time: number) => {
    animationFrame = requestAnimationFrame(render);
    if (tweenDuration > 0) {
      const progress = Math.min(1, (time - tweenStartedAt) / tweenDuration);
      const eased = 1 - Math.pow(1 - progress, 3);
      camera.position.lerpVectors(startPosition, endPosition, eased);
      controls.target.lerpVectors(startTarget, endTarget, eased);
      if (progress === 1) tweenDuration = 0;
    }

    controls.update();
    const direction = Math.atan2(camera.position.x - controls.target.x, camera.position.z - controls.target.z);
    for (const billboard of facilityBillboards) billboard.rotation.y = direction;
    for (const billboard of roomBillboards) billboard.rotation.y = direction;
    renderer.render(scene, camera);
  };
  animationFrame = requestAnimationFrame(render);

  const selectFloor = (floorId: string, rooms: MapRoom[], immediate = false) => {
    const cameraPreset = floorCameras[floorId];
    if (!cameraPreset) return;

    disposeObject(markerGroup);
    markerGroup.clear();
    roomBillboards.length = 0;
    const coordinates = roomCoordinates[floorId] ?? {};
    for (const room of rooms) {
      const position = coordinates[room.name];
      if (!position) continue;
      const bubble = addRoomMarker(markerGroup, room, position);
      if (bubble) roomBillboards.push(bubble);
    }

    startPosition.copy(camera.position);
    startTarget.copy(controls.target);
    endPosition.fromArray(cameraPreset.position);
    endTarget.fromArray(cameraPreset.target);
    tweenStartedAt = performance.now();
    tweenDuration = immediate ? 1 : 650;
  };

  return {
    selectFloor,
    dispose: () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      roomBillboards.length = 0;
      facilityBillboards.length = 0;
      disposeObject(scene);
      scene.clear();
      renderer.dispose();
    },
  };
}

export default function Map3D2026({ floor }: { floor: MapFloor }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<MapScene | null>(null);
  const firstFloorRef = useRef(floor);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    try {
      const mapScene = initializeScene(canvas);
      sceneRef.current = mapScene;
      mapScene.selectFloor(firstFloorRef.current.id, firstFloorRef.current.rooms, true);
    } catch (error) {
      console.error('3Dマップを初期化できませんでした。', error);
      fallbackTimer = setTimeout(() => setUnavailable(true), 0);
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.selectFloor(floor.id, floor.rooms);
  }, [floor]);

  if (unavailable) {
    return <p className={styles.map3dFallback}>この端末では3Dマップを表示できません。下の教室一覧をご利用ください。</p>;
  }

  return (
    <div className={styles.map3dViewport}>
      <canvas ref={canvasRef} className={styles.map3dCanvas} aria-label={`${floor.title}の3Dマップ`} />
      <p className={styles.map3dHelp}>ドラッグで回転 ・ ピンチ／ホイールで拡大縮小</p>
    </div>
  );
}
