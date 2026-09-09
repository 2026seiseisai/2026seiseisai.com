import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { floorCameras, mapLandmarks, roomCoordinates } from './map-2026-coordinates';
import type { MapRoom } from './map-2026-data';
import { addMapGeometry } from './map-2026-geometry-renderer';
import { addFacilityIcons, addLandmarkMarker, addRoomMarker } from './map-2026-marker-renderer';

export type MapScene = {
  dispose: () => void;
  selectFloor: (floorId: string, rooms: readonly MapRoom[], immediate?: boolean) => void;
};

function disposeMaterial(material: THREE.Material) {
  if (material instanceof THREE.MeshBasicMaterial) material.map?.dispose();
  material.dispose();
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Line)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) disposeMaterial(material);
  });
}

function createMapControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enablePan = false;
  controls.minDistance = 170;
  controls.maxDistance = 1050;
  controls.minPolarAngle = Math.PI / 12;
  controls.maxPolarAngle = Math.PI * 0.48;
  return controls;
}

function addSceneLighting(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa9cf, 2.15));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
  keyLight.position.set(260, 700, 420);
  scene.add(keyLight);
}

function addStaticMapObjects(scene: THREE.Scene, facilityBillboards: THREE.Object3D[]) {
  const grid = new THREE.GridHelper(2200, 44, 0xcbd5ea, 0xdde4f2);
  grid.position.y = -106;
  scene.add(grid);

  addMapGeometry(scene);
  addFacilityIcons(scene, facilityBillboards);
}

export function initializeMapScene(canvas: HTMLCanvasElement): MapScene {
  const scene = new THREE.Scene();
  const facilityBillboards: THREE.Object3D[] = [];
  const roomBillboards: THREE.Object3D[] = [];
  const markerGroup = new THREE.Group();
  const landmarkGroup = new THREE.Group();
  scene.background = new THREE.Color(0xf4f7ff);
  scene.fog = new THREE.Fog(0xf4f7ff, 900, 1900);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const camera = new THREE.PerspectiveCamera(48, 1, 1, 3000);
  const controls = createMapControls(camera, canvas);

  addSceneLighting(scene);
  addStaticMapObjects(scene, facilityBillboards);
  scene.add(markerGroup, landmarkGroup);

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

  const selectFloor = (floorId: string, rooms: readonly MapRoom[], immediate = false) => {
    const cameraPreset = floorCameras[floorId];
    if (!cameraPreset) return;

    disposeObject(markerGroup);
    markerGroup.clear();
    disposeObject(landmarkGroup);
    landmarkGroup.clear();
    roomBillboards.length = 0;

    for (const landmark of mapLandmarks) {
      if (landmark.visibleOnFloorIds && !landmark.visibleOnFloorIds.includes(floorId)) continue;
      if (landmark.hiddenOnFloorIds?.includes(floorId)) continue;

      const usesExhibitionLayer = landmark.markerLayer === 'exhibition';
      const bubble = addLandmarkMarker(
        usesExhibitionLayer ? markerGroup : landmarkGroup,
        landmark.name,
        landmark.position,
        landmark.accent,
        landmark.title,
        landmark.icon,
        usesExhibitionLayer,
      );
      if (bubble) roomBillboards.push(bubble);
    }

    const coordinates = roomCoordinates[floorId] ?? {};
    for (const room of rooms) {
      const position = coordinates[room.name];
      if (!position) continue;
      const bubble = addRoomMarker(markerGroup, room, position, floorId === 'bazaar');
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

