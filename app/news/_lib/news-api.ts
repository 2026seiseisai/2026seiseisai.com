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

// ローカルのapps/api（http://localhost:3002）へ向けられるのは開発時だけに限る。
const allowsLocalApiOrigin = process.env.NODE_ENV !== 'production';

function isLoopbackHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/\.$/u, '');
  const unbracketed = normalized.replace(/^\[|\]$/gu, '');

  return (
    normalized === 'localhost' ||
    normalized.endsWith('.localhost') ||
    /^127(?:\.\d{1,3}){3}$/u.test(normalized) ||
    unbracketed === '::1' ||
    /^::ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}$/u.test(unbracketed)
  );
}

function getApiOrigin(): URL {
  const configuredOrigin = process.env.API_PUBLIC_ORIGIN?.trim();

  if (!configuredOrigin) {
    throw new Error('API_PUBLIC_ORIGIN is required to load News.');
  }

  let url: URL;
  try {
    url = new URL(configuredOrigin);
  } catch {
    throw new Error('API_PUBLIC_ORIGIN must be an absolute URL.');
  }

  const loopback = isLoopbackHost(url.hostname);

  if (loopback && !allowsLocalApiOrigin) {
    throw new Error('API_PUBLIC_ORIGIN must not use a loopback host.');
  }

  if (url.protocol !== 'https:' && !(loopback && url.protocol === 'http:')) {
    throw new Error('API_PUBLIC_ORIGIN must use HTTPS.');
  }

  if (url.username || url.password) {
    throw new Error('API_PUBLIC_ORIGIN must not contain credentials.');
  }

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error('API_PUBLIC_ORIGIN must be a canonical origin without a path.');
  }

  return new URL(url.origin);
}

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
  const origin = getApiOrigin();

  return fetch(new URL(pathname, origin), {
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
