'use client';

import { useEffect, useRef, useState } from 'react';
import type { MapFloor } from './map-2026-data';
import { initializeMapScene, type MapScene } from './map-2026-scene';
import styles from './Map2026.module.css';

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
      const mapScene = initializeMapScene(canvas);
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

