export type DownloadItem = {
  /** SVG file name shown as the preview image */
  svg: string;
  /** PNG/JPG file name downloaded when the button is pressed */
  raster: string;
  alt: string;
};

// Assets live in public/special/downloads/. Add or remove entries here to
// automatically add/remove the corresponding preview + download frame.
export const DOWNLOADS_BASE_PATH = '/special/downloads';

export const wallpaperItems: DownloadItem[] = [
  { svg: 'wallpaper1.svg', raster: 'wallpaper1.png', alt: 'Wallpaper 1' },
  { svg: 'wallpaper2.svg', raster: 'wallpaper2.png', alt: 'Wallpaper 2' },
  { svg: 'wallpaper3.svg', raster: 'wallpaper3.png', alt: 'Wallpaper 3' },
  { svg: 'wallpaper4.svg', raster: 'wallpaper4.png', alt: 'Wallpaper 4' },
  { svg: 'wallpaper5.svg', raster: 'wallpaper5.png', alt: 'Wallpaper 5' },
];

export const iconItems: DownloadItem[] = [
  { svg: 'icon1.svg', raster: 'icon1.png', alt: 'Icon 1' },
];

export const headerItems: DownloadItem[] = [
  { svg: 'header1.svg', raster: 'header1.png', alt: 'Header 1' },
  { svg: 'header2.svg', raster: 'header2.png', alt: 'Header 2' },
];
