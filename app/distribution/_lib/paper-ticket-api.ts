import { cache } from 'react';

export const PAPER_TICKET_API_URL =
  'https://api.seiseisai.com/v1/paper-ticket-status';
export const PAPER_TICKET_API_TIMEOUT_MS = 5_000;

export const PAPER_TICKET_SESSION_STATUSES = [
  'NOT_STARTED',
  'DISTRIBUTING',
  'LOW_REMAINING',
  'ENDED',
] as const;

export type PaperTicketSessionStatus =
  (typeof PAPER_TICKET_SESSION_STATUSES)[number];

export interface PaperTicketSession {
  readonly startsAt: string;
  readonly status: PaperTicketSessionStatus;
  readonly updatedAt: string;
}

export interface PaperTicketEvent {
  readonly name: string;
  readonly displayOrder: number;
  readonly sessions: readonly PaperTicketSession[];
}

export interface PaperTicketSnapshot {
  readonly events: readonly PaperTicketEvent[];
  readonly updatedAt: string;
  readonly generatedAt: string;
}

export type PaperTicketApiErrorCode =
  | 'UPSTREAM_UNREACHABLE'
  | 'UPSTREAM_HTTP_ERROR'
  | 'UPSTREAM_INVALID_JSON'
  | 'UPSTREAM_INVALID_PAYLOAD';

export class PaperTicketApiError extends Error {
  readonly code: PaperTicketApiErrorCode;

  constructor(code: PaperTicketApiErrorCode) {
    super('公開整理券情報を取得できませんでした。');
    this.name = 'PaperTicketApiError';
    this.code = code;
  }
}

export interface PaperTicketSnapshotOptions {
  readonly fetcher?: typeof fetch;
  readonly signal?: AbortSignal;
}

interface TimeoutSignal {
  readonly signal: AbortSignal;
  dispose(): void;
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

function isPaperTicketSessionStatus(
  value: unknown,
): value is PaperTicketSessionStatus {
  return (
    typeof value === 'string' &&
    (PAPER_TICKET_SESSION_STATUSES as readonly string[]).includes(value)
  );
}

function isPaperTicketSession(value: unknown): value is PaperTicketSession {
  if (!isRecord(value)) return false;

  return (
    isIsoDateTime(value.startsAt) &&
    isPaperTicketSessionStatus(value.status) &&
    isIsoDateTime(value.updatedAt)
  );
}

function isPaperTicketEvent(value: unknown): value is PaperTicketEvent {
  if (!isRecord(value)) return false;

  return (
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    typeof value.displayOrder === 'number' &&
    Number.isInteger(value.displayOrder) &&
    value.displayOrder >= 0 &&
    Array.isArray(value.sessions) &&
    value.sessions.every(isPaperTicketSession)
  );
}

function isPaperTicketStatus(value: unknown): value is {
  events: readonly PaperTicketEvent[];
  updatedAt: string;
} {
  if (!isRecord(value)) return false;

  return (
    Array.isArray(value.events) &&
    value.events.every(isPaperTicketEvent) &&
    isIsoDateTime(value.updatedAt)
  );
}

/** Validate the flattened response returned by this site's proxy. */
export function isPaperTicketSnapshot(
  value: unknown,
): value is PaperTicketSnapshot {
  if (!isRecord(value)) return false;

  return (
    isPaperTicketStatus(value) &&
    isIsoDateTime((value as Record<string, unknown>).generatedAt)
  );
}

function readPaperTicketEnvelope(value: unknown): PaperTicketSnapshot {
  if (!isRecord(value) || !isRecord(value.data) || !isRecord(value.meta)) {
    throw new PaperTicketApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  if (
    value.meta.apiVersion !== 'v1' ||
    !isIsoDateTime(value.meta.generatedAt) ||
    'stale' in value.meta ||
    !isPaperTicketStatus(value.data)
  ) {
    throw new PaperTicketApiError('UPSTREAM_INVALID_PAYLOAD');
  }

  return {
    events: value.data.events,
    updatedAt: value.data.updatedAt,
    generatedAt: value.meta.generatedAt,
  };
}

function createTimeoutSignal(parentSignal?: AbortSignal): TimeoutSignal {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    PAPER_TICKET_API_TIMEOUT_MS,
  );
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

async function fetchPaperTicketSnapshot(
  options: PaperTicketSnapshotOptions = {},
): Promise<PaperTicketSnapshot> {
  const timeout = createTimeoutSignal(options.signal);
  const fetcher = options.fetcher ?? fetch;
  let response: Response;

  try {
    response = await fetcher(PAPER_TICKET_API_URL, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: timeout.signal,
    });
  } catch {
    timeout.dispose();
    throw new PaperTicketApiError('UPSTREAM_UNREACHABLE');
  }

  try {
    if (!response.ok) {
      throw new PaperTicketApiError('UPSTREAM_HTTP_ERROR');
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new PaperTicketApiError('UPSTREAM_INVALID_JSON');
    }

    return readPaperTicketEnvelope(payload);
  } finally {
    timeout.dispose();
  }
}

/** Fetch today's public paper-ticket projection through the official site's server. */
export const getPaperTicketSnapshot = cache(
  async (
    options: PaperTicketSnapshotOptions = {},
  ): Promise<PaperTicketSnapshot> => fetchPaperTicketSnapshot(options),
);
