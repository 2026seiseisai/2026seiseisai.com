import 'server-only';

import { cache } from 'react';

export type PublicNews = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  important: boolean;
  surfaces: Array<'MAIN_SITE' | 'TICKETS'>;
  publishedAt: string;
  updatedAt: string;
};

const NEWS_API_ORIGIN = new URL('https://api.seiseisai.com');

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIsoDateTime(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(
      value,
    ) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isPublicNews(value: unknown): value is PublicNews {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.slug === 'string' &&
    typeof value.title === 'string' &&
    typeof value.summary === 'string' &&
    typeof value.body === 'string' &&
    typeof value.important === 'boolean' &&
    Array.isArray(value.surfaces) &&
    value.surfaces.every(
      (surface) => surface === 'MAIN_SITE' || surface === 'TICKETS',
    ) &&
    value.surfaces.includes('MAIN_SITE') &&
    isIsoDateTime(value.publishedAt) &&
    isIsoDateTime(value.updatedAt)
  );
}

function readEnvelope(value: unknown): unknown {
  if (!isRecord(value) || !('data' in value) || !isRecord(value.meta)) {
    throw new Error('The public News API returned an invalid response.');
  }

  if (value.meta.apiVersion !== 'v1' || !isIsoDateTime(value.meta.generatedAt)) {
    throw new Error('The public News API returned unsupported metadata.');
  }

  return value.data;
}

/**
 * リクエストのたびに取得する。
 * 公開APIは`s-maxage=60, stale-while-revalidate=300`を返すため、
 * 実際の配信元への到達はCDNに依存
 */
async function fetchApi(pathname: string): Promise<Response> {
  return fetch(new URL(pathname, NEWS_API_ORIGIN), {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
}

export const getNewsList = cache(async (): Promise<PublicNews[]> => {
  const response = await fetchApi('/v1/news');
  if (!response.ok) {
    throw new Error(`The public News API returned HTTP ${response.status}.`);
  }

  const data = readEnvelope(await response.json());
  if (!Array.isArray(data) || !data.every(isPublicNews)) {
    throw new Error('The public News API returned invalid News data.');
  }

  return data;
});

export const getNewsBySlug = cache(async (slug: string): Promise<PublicNews | null> => {
  const response = await fetchApi(`/v1/news/${encodeURIComponent(slug)}`);
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`The public News API returned HTTP ${response.status}.`);
  }

  const data = readEnvelope(await response.json());
  if (!isPublicNews(data)) {
    throw new Error('The public News API returned invalid News data.');
  }

  return data;
});
