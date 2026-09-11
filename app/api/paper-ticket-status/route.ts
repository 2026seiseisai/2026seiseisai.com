import { NextResponse } from 'next/server';

import { getPaperTicketSnapshot } from '@/app/distribution/_lib/paper-ticket-api';

export const dynamic = 'force-dynamic';

const noStoreHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
};

export async function GET(request: Request): Promise<Response> {
  try {
    const snapshot = await getPaperTicketSnapshot({ signal: request.signal });
    return NextResponse.json(snapshot, { headers: noStoreHeaders });
  } catch {
    return NextResponse.json(
      { error: '整理券の配布状況を取得できませんでした。' },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
