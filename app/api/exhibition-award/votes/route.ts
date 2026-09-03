import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';
import { exhibitionData } from '@/app/exhibitions/exhibition-data';

type Vote = { id: string; exhibition: string; createdAt: string };
type VotesStore = NonNullable<CloudflareEnv['EXHIBITION_AWARD_VOTES']>;

function getVotesStore() {
  return getCloudflareContext().env.EXHIBITION_AWARD_VOTES;
}

async function getVoteKeys(store: VotesStore) {
  const keys: { name: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await store.list(
      cursor ? { prefix: 'vote:', cursor } : { prefix: 'vote:' },
    );
    keys.push(
      ...page.keys.map((key: { name: string }) => ({ name: key.name })),
    );
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  return keys;
}

export async function POST(request: Request) {
  const vote = (await request.json()) as Partial<Vote>;
  if (
    !vote.id ||
    !vote.exhibition ||
    !vote.createdAt ||
    !(vote.exhibition in exhibitionData)
  )
    return NextResponse.json({ error: 'invalid vote' }, { status: 400 });
  const store = getVotesStore();
  if (!store)
    return NextResponse.json(
      { error: 'vote storage is not configured' },
      { status: 503 },
    );
  await store.put(
    `vote:${vote.id}`,
    JSON.stringify({ exhibition: vote.exhibition, createdAt: vote.createdAt }),
  );
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const store = getVotesStore();
  if (!store)
    return NextResponse.json(
      { error: 'vote storage is not configured' },
      { status: 503 },
    );
  const keys = await getVoteKeys(store);
  const values = await Promise.all(
    keys.map(
      (key) =>
        store.get(key.name, 'json') as Promise<{ exhibition?: string } | null>,
    ),
  );
  const counts: Record<string, number> = {};
  for (const value of values)
    if (value?.exhibition)
      counts[value.exhibition] = (counts[value.exhibition] ?? 0) + 1;
  return NextResponse.json({
    counts,
    total: Object.values(counts).reduce((sum, count) => sum + count, 0),
  });
}

export async function DELETE() {
  const store = getVotesStore();
  if (!store)
    return NextResponse.json(
      { error: 'vote storage is not configured' },
      { status: 503 },
    );
  const keys = await getVoteKeys(store);
  await Promise.all(keys.map((key) => store.delete(key.name)));
  return NextResponse.json({ ok: true, deleted: keys.length });
}
