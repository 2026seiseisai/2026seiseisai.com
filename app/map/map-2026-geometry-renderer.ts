import * as THREE from 'three';
import { Color, geometryGroups } from './map-2026-geometry';

const TRANSPARENT_STRUCTURE_RENDER_ORDER = 30;

function addRectFloors(scene: THREE.Scene) {
  for (const group of Object.values(geometryGroups)) {
    for (const { y, x1, z1, x2, z2, color = Color.white } of group.rects) {
      const geometry = new THREE.BoxGeometry(Math.abs(x1 - x2), 5, Math.abs(z1 - z2));
      const material = new THREE.MeshStandardMaterial({ color, roughness: 0.76, metalness: 0.02 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((x1 + x2) / 2, y - 2.5, (z1 + z2) / 2);
      scene.add(mesh);
    }
  }
}

function addClassroomDividers(scene: THREE.Scene) {
  const classrooms = geometryGroups.classrooms.rects
    .filter(({ color }) => color === Color.red || color === Color.blue)
    .map(({ y, x1, z1, x2, z2 }) => ({
        y,
        xMin: Math.min(x1, x2),
        xMax: Math.max(x1, x2),
        zMin: Math.min(z1, z2),
        zMax: Math.max(z1, z2),
      }));
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
  for (const group of Object.values(geometryGroups)) {
    for (const { points, color = Color.white } of group.polygons) {
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
}

function addVerticalStructures(scene: THREE.Scene) {
  for (const group of Object.values(geometryGroups)) {
    for (const boxData of group.boxes) {
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
      mesh.renderOrder = TRANSPARENT_STRUCTURE_RENDER_ORDER;
      scene.add(mesh);
    }
  }
}

export function addMapGeometry(scene: THREE.Scene) {
  addRectFloors(scene);
  addClassroomDividers(scene);
  addPolygonFloors(scene);
  addVerticalStructures(scene);
}

