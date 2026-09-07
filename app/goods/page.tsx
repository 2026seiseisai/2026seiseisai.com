import type { Metadata } from 'next';

import GoodsLive from './_components/goods-live';
import { getGoodsSnapshot } from './_lib/goods-api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Goods | 東大寺学園菁々祭「Infinity」',
  description: '第62回菁々祭「Infinity」の公式グッズと在庫情報。',
};

export default async function GoodsPage() {
  let initialSnapshot: Awaited<ReturnType<typeof getGoodsSnapshot>> | null = null;
  let initialError = false;

  try {
    initialSnapshot = await getGoodsSnapshot();
  } catch {
    initialError = true;
  }

  return <GoodsLive initialSnapshot={initialSnapshot} initialError={initialError} />;
}
