import { NextResponse } from 'next/server';

import { getGoodsSnapshot } from '@/app/goods/_lib/goods-api';

export const dynamic = 'force-dynamic';

const noStoreHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

export async function GET(request: Request): Promise<Response> {
  try {
    const snapshot = await getGoodsSnapshot({ signal: request.signal });
    return NextResponse.json(snapshot, { headers: noStoreHeaders });
  } catch {
    return NextResponse.json(
      { error: '商品情報を取得できませんでした。' },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
