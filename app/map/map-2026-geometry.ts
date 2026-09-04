import { boxes } from './map-2026-boxes';
import { Color, type Box, type Polygon, type Rect } from './map-2026-geometry-types';
import { polygons } from './map-2026-polygons';
import { rects } from './map-2026-rects';

export { Color } from './map-2026-geometry-types';

type RoomCoordinate = readonly [x: number, y: number, z: number];

type RoomBounds = {
    xMin: number;
    xMax: number;
    y: number;
    zMin: number;
    zMax: number;
};

function calculateRoomCoordinates(rects: readonly Rect[]) {
    const roomBounds: Record<string, Record<string, RoomBounds>> = {};
    const coordinates: Record<string, Record<string, RoomCoordinate>> = {};

    for (const rect of rects) {
        if (!rect.room) continue;

        const [floorId, roomName] = rect.room;
        const floorBounds = roomBounds[floorId] ?? {};
        const currentBounds = floorBounds[roomName];
        const xMin = Math.min(rect.x1, rect.x2);
        const xMax = Math.max(rect.x1, rect.x2);
        const zMin = Math.min(rect.z1, rect.z2);
        const zMax = Math.max(rect.z1, rect.z2);

        floorBounds[roomName] = currentBounds
            ? {
                xMin: Math.min(currentBounds.xMin, xMin),
                xMax: Math.max(currentBounds.xMax, xMax),
                y: currentBounds.y,
                zMin: Math.min(currentBounds.zMin, zMin),
                zMax: Math.max(currentBounds.zMax, zMax),
            }
            : { xMin, xMax, y: rect.y, zMin, zMax };
        roomBounds[floorId] = floorBounds;
    }

    for (const [floorId, floorBounds] of Object.entries(roomBounds)) {
        coordinates[floorId] = Object.fromEntries(
            Object.entries(floorBounds).map(([roomName, bounds]) => [
                roomName,
                [(bounds.xMin + bounds.xMax) / 2, bounds.y, (bounds.zMin + bounds.zMax) / 2],
            ]),
        );
    }

    return coordinates;
}

/** `room` が指定された長方形群の中心座標。教室ラベルの配置に使用します。 */
export const geometryRoomCoordinates = calculateRoomCoordinates(rects);

type GeometryCategory = 'classrooms' | 'passages' | 'restrooms' | 'stairs' | 'facilities' | 'outdoor';

type MutableGeometryGroup = {
    rects: Rect[];
    polygons: Polygon[];
    boxes: Box[];
};

type GeometryGroup = Readonly<{
    rects: readonly Rect[];
    polygons: readonly Polygon[];
    boxes: readonly Box[];
}>;

function surfaceCategory(color: Color | undefined, isRoom = false): GeometryCategory {
    if (isRoom || color === Color.red || color === Color.blue) return 'classrooms';
    if (color === Color.yellow) return 'restrooms';
    if (color === Color.gray) return 'stairs';
    if (color === Color.green || color === Color.ltblue || color === Color.magenta) return 'facilities';
    if (color === Color.ylgreen || color === Color.brown) return 'outdoor';
    return 'passages';
}

function createGeometryGroups(): Readonly<Record<GeometryCategory, GeometryGroup>> {
    const groups: Record<GeometryCategory, MutableGeometryGroup> = {
        classrooms: { rects: [], polygons: [], boxes: [] },
        passages: { rects: [], polygons: [], boxes: [] },
        restrooms: { rects: [], polygons: [], boxes: [] },
        stairs: { rects: [], polygons: [], boxes: [] },
        facilities: { rects: [], polygons: [], boxes: [] },
        outdoor: { rects: [], polygons: [], boxes: [] },
    };

    for (const rect of rects) {
        groups[surfaceCategory(rect.color, Boolean(rect.room))].rects.push(rect);
    }
    for (const polygon of polygons) {
        groups[surfaceCategory(polygon.color)].polygons.push(polygon);
    }
    for (const box of boxes) {
        groups[box.color === Color.yellow ? 'restrooms' : 'stairs'].boxes.push(box);
    }

    return groups;
}

/** 描画形状を用途別にまとめたデータ。各用途の中で形状別に保持します。 */
export const geometryGroups = createGeometryGroups();
