import { cache } from 'react';

export const GOODS_API_URL = 'https://api.seiseisai.com/v1/goods';
export const GOODS_API_TIMEOUT_MS = 5_000;

export const GOODS_STATUSES = [
  'COMING_SOON',
  'AVAILABLE',
  'LOW_STOCK',
  'SOLD_OUT',
  'SALES_ENDED',
] as const;

export type GoodsStatus = (typeof GOODS_STATUSES)[number];

export interface PublicGoodsVariant {
  readonly id: string;
  readonly name: string;
  readonly priceYen: number;
  readonly status: GoodsStatus;
}

export interface PublicGoods {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string | null;
  readonly status: GoodsStatus;
  readonly variants: readonly PublicGoodsVariant[];
  readonly updatedAt: string;
}

export interface GoodsSnapshot {
  readonly goods: readonly PublicGoods[];
  readonly generatedAt: string;
}

export type GoodsApiErrorCode =
  | 'UPSTREAM_UNREACHABLE'
  | 'UPSTREAM_HTTP_ERROR'
  | 'UPSTREAM_INVALID_JSON'
  | 'UPSTREAM_INVALID_PAYLOAD';

export class GoodsApiError extends Error {
  readonly code: GoodsApiErrorCode;

  constructor(code: GoodsApiErrorCode) {
    super('公開商品情報を取得できませんでした。');
    this.name = 'GoodsApiError';
    this.code = code;
  }
}

export interface GoodsSnapshotOptions {
  readonly fetcher?: typeof fetch;
  readonly signal?: AbortSignal;
}

interface TimeoutSignal {
  readonly signal: AbortSignal;
  dispose(): void;
}

const PUBLIC_URL_MAX_LENGTH = 2_048;
const THUMBNAIL_EXTENSION = /\.(?:avif|jpe?g|png|webp)$/iu;
const CONTROL_OR_BACKSLASH = /[\\\u0000-\u001f\u007f]/u;
const ENCODED_SEPARATOR_OR_CONTROL = /%(?:25)*(?:2f|5c|00|0[1-9a-f]|1[0-9a-f]|7f)/iu;
const OFFICIAL_HOSTNAMES = new Set(['seiseisai.com', 'www.seiseisai.com']);
const INTERNAL_URL_BASE = 'https://official-site.invalid';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isIsoDateTime(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function isGoodsStatus(value: unknown): value is GoodsStatus {
  return typeof value === 'string' && (GOODS_STATUSES as readonly string[]).includes(value);
}

/**
 * Keep image URLs aligned with the platform's publicThumbnailUrlSchema.
 * Internal paths are allowed for assets served by this site; external URLs
 * are limited to the official hostnames and known raster image extensions.
 */
function isSafeImageUrl(value: unknown): value is string | null {
  if (value === null) return true;
  if (typeof value !== 'string') return false;

  const normalized = value.trim();
  if (
    normalized.length === 0 ||
    normalized.length > PUBLIC_URL_MAX_LENGTH ||
    CONTROL_OR_BACKSLASH.test(normalized) ||
    ENCODED_SEPARATOR_OR_CONTROL.test(normalized)
  ) {
    return false;
  }

  if (normalized.startsWith('/')) {
    if (normalized.startsWith('//')) return false;
    try {
      const parsed = new URL(normalized, INTERNAL_URL_BASE);
      return (
        parsed.origin === INTERNAL_URL_BASE &&
        !parsed.pathname.includes('//') &&
        THUMBNAIL_EXTENSION.test(parsed.pathname)
      );
    } catch {
      return false;
    }
  }

  try {
    const parsed = new URL(normalized);
    return (
      parsed.protocol === 'https:' &&
      parsed.username === '' &&
      parsed.password === '' &&
      parsed.port === '' &&
      OFFICIAL_HOSTNAMES.has(parsed.hostname.toLowerCase()) &&
      THUMBNAIL_EXTENSION.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

function isPublicGoodsVariant(value: unknown): value is PublicGoodsVariant {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.priceYen === 'number' &&
    Number.isInteger(value.priceYen) &&
    value.priceYen >= 0 &&
    isGoodsStatus(value.status)
  );
}

function isPublicGoods(value: unknown): value is PublicGoods {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'string' &&
    typeof value.slug === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    isSafeImageUrl(value.imageUrl) &&
    isGoodsStatus(value.status) &&
    Array.isArray(value.variants) &&
    value.variants.every(isPublicGoodsVariant) &&
    isIsoDateTime(value.updatedAt)
  );
}

function readGoodsEnvelope(value: unknown): GoodsSnapshot {
  if (!isRecord(value) || !Array.isArray(value.data) || !isRecord(value.meta)) {
    throw new GoodsApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  if (value.meta.apiVersion !== 'v1' || !isIsoDateTime(value.meta.generatedAt)) {
    throw new GoodsApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  // Do not present a stale upstream projection as current inventory. Returning
  // a neutral 503 lets the client retain its last catalog with unknown stock.
  if ('stale' in value.meta) {
    throw new GoodsApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  if (!value.data.every(isPublicGoods)) {
    throw new GoodsApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  return {
    goods: value.data,
    generatedAt: value.meta.generatedAt,
  };
}

function createTimeoutSignal(parentSignal?: AbortSignal): TimeoutSignal {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GOODS_API_TIMEOUT_MS);
  const abort = () => controller.abort();

  if (parentSignal) {
    if (parentSignal.aborted) {
      abort();
    } else {
      parentSignal.addEventListener('abort', abort, { once: true });
    }
  }

  return {
    signal: controller.signal,
    dispose() {
      clearTimeout(timeoutId);
      parentSignal?.removeEventListener('abort', abort);
    },
  };
}

async function fetchGoodsSnapshot(options: GoodsSnapshotOptions = {}): Promise<GoodsSnapshot> {
  const timeout = createTimeoutSignal(options.signal);
  const fetcher = options.fetcher ?? fetch;
  let response: Response;

  try {
    response = await fetcher(GOODS_API_URL, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: timeout.signal,
    });
  } catch {
    timeout.dispose();
    throw new GoodsApiError('UPSTREAM_UNREACHABLE');
  }

  try {
    if (!response.ok) throw new GoodsApiError('UPSTREAM_HTTP_ERROR');

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new GoodsApiError('UPSTREAM_INVALID_JSON');
    }

    return readGoodsEnvelope(payload);
  } finally {
    timeout.dispose();
  }
}

/** Fetch the platform's public goods projection for the current request. */
export const getGoodsSnapshot = cache(
  async (options: GoodsSnapshotOptions = {}): Promise<GoodsSnapshot> =>
    fetchGoodsSnapshot(options),
);

export const isSafeGoodsImageUrl = isSafeImageUrl;
