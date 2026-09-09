import * as THREE from 'three';

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

export function drawSvgIcon(
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

export function iconBillboard(svg: string, size: number) {
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

export function framedSvg(svg: string) {
  const { width, height } = svgDimensions(svg);
  const shortSide = Math.min(width, height);
  const inset = shortSide * 0.025;
  const strokeWidth = shortSide * 0.03;
  const radius = shortSide * 0.07;
  const frame = `<rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${radius}" fill="#fff" stroke="#010000" stroke-width="${strokeWidth}"/>`;
  return svg.replace(/(<svg\b[^>]*>)/i, `$1${frame}`);
}

