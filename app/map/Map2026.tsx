'use client';

import { useMemo, useState } from 'react';
import Map3D2026 from './Map3D2026';
import { mapFloors, type Building } from './map-2026-data';
import styles from './Map2026.module.css';

const buildingLabels: Record<Building, string> = {
  junior: '中学棟',
  senior: '高校棟',
  other: 'その他',
};

export default function Map2026() {
  const [building, setBuilding] = useState<Building>('senior');
  const floors = useMemo(() => mapFloors.filter((floor) => floor.building === building), [building]);
  const [activeFloorId, setActiveFloorId] = useState('senior-2');
  const activeFloor = floors.find((floor) => floor.id === activeFloorId) ?? floors[0];

  const selectBuilding = (nextBuilding: Building) => {
    setBuilding(nextBuilding);
    setActiveFloorId(mapFloors.find((floor) => floor.building === nextBuilding)?.id ?? 'other');
  };

  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>62ND SEISEISAI</p>
        <h1>会場マップ</h1>
        <p>見たい展示の教室・会場を選んでください。</p>
      </div>

      <section className={styles.map} aria-label="会場マップ">
        <div className={styles.buildingTabs} role="tablist" aria-label="棟を選択">
          {(Object.keys(buildingLabels) as Building[]).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={building === item}
              className={building === item ? styles.buildingTabActive : styles.buildingTab}
              onClick={() => selectBuilding(item)}
            >
              {buildingLabels[item]}
            </button>
          ))}
        </div>

        <div className={styles.mapBody}>
          <div className={styles.floorTabs} aria-label="階を選択">
            {floors.map((floor) => (
              <button
                key={floor.id}
                type="button"
                aria-pressed={activeFloor.id === floor.id}
                className={activeFloor.id === floor.id ? styles.floorTabActive : styles.floorTab}
                onClick={() => setActiveFloorId(floor.id)}
              >
                {floor.label}
              </button>
            ))}
          </div>

          <div className={styles.floorContent}>
            <div className={styles.floorTitleWrap}>
              <h2>{activeFloor.title}</h2>
              <span>{activeFloor.rooms.filter((room) => room.exhibitions.length > 0).length} 会場</span>
            </div>

            <Map3D2026 floor={activeFloor} />

            <div className={styles.floorPlan}>
              <div className={styles.roomGrid}>
                {activeFloor.rooms.map((room) => (
                  <article key={room.name} className={room.exhibitions.length > 0 ? styles.roomActive : styles.room}>
                    <h3>{room.name}</h3>
                    {room.exhibitions.length > 0 ? (
                      <ul>
                        {room.exhibitions.map((exhibition) => (
                          <li key={exhibition}>{exhibition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>展示情報なし</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <p className={styles.note}>
        掲載内容は展示紹介文提出フォームの回答をもとにしています。会場の案内に従ってご利用ください。
      </p>
    </main>
  );
}
