'use client';

import { useState } from 'react';
import Map3D2026 from './Map3D2026';
import { mapFloors, type Building, type MapRoom } from './map-2026-data';
import styles from './Map2026.module.css';

const buildingOptions: Record<Building, { label: string; defaultFloorId: string }> = {
  junior: { label: '中学棟', defaultFloorId: 'junior-1' },
  senior: { label: '高校棟', defaultFloorId: 'senior-2' },
  library: { label: '図書館棟', defaultFloorId: 'library-1' },
  other: { label: '体育館', defaultFloorId: 'other' },
  bazaar: { label: 'バザー', defaultFloorId: 'bazaar' },
};

const buildings = Object.keys(buildingOptions) as Building[];
const floorsById = new Map(mapFloors.map((floor) => [floor.id, floor]));
const floorsByBuilding = new Map(
  buildings.map((building) => [building, mapFloors.filter((floor) => floor.building === building)] as const),
);

function VenueCard({ room }: { room: MapRoom }) {
  const hasExhibitions = room.exhibitions.length > 0;

  return (
    <article className={hasExhibitions ? styles.roomActive : styles.room}>
      <h3>{room.label ?? room.name}</h3>
      {hasExhibitions ? (
        <ul>
          {room.exhibitions.map((exhibition) => (
            <li key={exhibition}>{exhibition}</li>
          ))}
        </ul>
      ) : (
        <p>展示なし</p>
      )}
    </article>
  );
}

export default function Map2026() {
  const [activeFloorId, setActiveFloorId] = useState('senior-2');
  const activeFloor = floorsById.get(activeFloorId) ?? mapFloors[0];
  const building = activeFloor.building;
  const floors = floorsByBuilding.get(building) ?? [];

  const selectBuilding = (nextBuilding: Building) => {
    setActiveFloorId(buildingOptions[nextBuilding].defaultFloorId);
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
          {buildings.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={building === item}
              className={building === item ? styles.buildingTabActive : styles.buildingTab}
              onClick={() => selectBuilding(item)}
            >
              {buildingOptions[item].label}
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
            </div>

            <Map3D2026 floor={activeFloor} />

            {activeFloor.rooms.length > 0 && (
              <div className={styles.floorPlan}>
                <div className={styles.roomGrid}>
                  {activeFloor.rooms.map((room) => (
                    <VenueCard key={room.name} room={room} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <p className={styles.note}>
        掲載内容は展示紹介文提出フォームの回答をもとにしています。会場の案内に従ってご利用ください。
      </p>
    </main>
  );
}
