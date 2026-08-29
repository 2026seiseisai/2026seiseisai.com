import type { Metadata } from 'next';
import Map2026 from './Map2026';

export const metadata: Metadata = {
  title: '会場マップ | 東大寺学園菁々祭「Infinity」',
  description: '第62回菁々祭の会場マップです。',
};

export default function MapPage() {
  return <Map2026 />;
}
