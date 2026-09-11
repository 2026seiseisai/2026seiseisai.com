'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import {
  isPaperTicketSnapshot,
  type PaperTicketEvent,
  type PaperTicketSession,
  type PaperTicketSessionStatus,
  type PaperTicketSnapshot,
} from '../_lib/paper-ticket-api';
import styles from './paper-ticket-status-live.module.css';

const REQUEST_TIMEOUT_MS = 8_000;

const jstDateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  month: 'numeric',
  day: 'numeric',
  weekday: 'short',
});

const jstDateTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
});

const jstTimeFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  hour: '2-digit',
  minute: '2-digit',
});

type PaperTicketStatusLiveProps = {
  initialSnapshot: PaperTicketSnapshot | null;
  initialError?: boolean;
  variant?: 'preview' | 'full';
};

function statusLabel(status: PaperTicketSessionStatus): string {
  switch (status) {
    case 'NOT_STARTED':
      return '配布前';
    case 'DISTRIBUTING':
      return '配布中';
    case 'LOW_REMAINING':
      return '残りわずか';
    case 'ENDED':
      return '配布終了';
  }
}

function statusClassName(status: PaperTicketSessionStatus): string {
  switch (status) {
    case 'NOT_STARTED':
      return styles['status--notStarted'];
    case 'DISTRIBUTING':
      return styles['status--distributing'];
    case 'LOW_REMAINING':
      return styles['status--lowRemaining'];
    case 'ENDED':
      return styles['status--ended'];
  }
}

function formatJstDate(value: string): string {
  return jstDateFormatter.format(new Date(value));
}

function formatJstDateTime(value: string): string {
  return jstDateTimeFormatter.format(new Date(value));
}

function formatJstTime(value: string): string {
  return `${jstTimeFormatter.format(new Date(value))}開始`;
}

function sortEvents(events: readonly PaperTicketEvent[]): PaperTicketEvent[] {
  return [...events].sort((left, right) => {
    if (left.displayOrder !== right.displayOrder) {
      return left.displayOrder - right.displayOrder;
    }
    return left.name.localeCompare(right.name, 'ja');
  });
}

function SessionRow({ session }: { session: PaperTicketSession }) {
  return (
    <li className={styles.sessionRow}>
      <time className={styles.sessionTime} dateTime={session.startsAt}>
        {formatJstTime(session.startsAt)}
      </time>
      <span className={`${styles.status} ${statusClassName(session.status)}`}>
        {statusLabel(session.status)}
      </span>
    </li>
  );
}

function EventCard({ event }: { event: PaperTicketEvent }) {
  return (
    <li className={styles.eventCard}>
      <h3 className={styles.eventName}>{event.name}</h3>
      {event.sessions.length > 0 ? (
        <ul className={styles.sessionList} aria-label={`${event.name}の開催回`}>
          {event.sessions.map((session) => (
            <SessionRow
              key={`${event.name}-${session.startsAt}`}
              session={session}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.sessionEmpty}>本日の開催回情報はありません。</p>
      )}
    </li>
  );
}

export default function PaperTicketStatusLive({
  initialSnapshot,
  initialError = false,
  variant = 'preview',
}: PaperTicketStatusLiveProps) {
  const [snapshot, setSnapshot] = useState<PaperTicketSnapshot | null>(
    initialSnapshot,
  );
  const [isRequesting, setIsRequesting] = useState(false);
  const [refreshError, setRefreshError] = useState(initialError);
  const [initialRequestError, setInitialRequestError] = useState(initialError);
  const snapshotRef = useRef<PaperTicketSnapshot | null>(initialSnapshot);
  const inFlightRef = useRef(false);
  const activeControllerRef = useRef<AbortController | null>(null);
  const disposedRef = useRef(false);
  const requestSnapshotRef = useRef<() => Promise<void>>(async () => undefined);

  const requestSnapshot = useCallback(async () => {
    if (inFlightRef.current || disposedRef.current) return;

    inFlightRef.current = true;
    setIsRequesting(true);
    const controller = new AbortController();
    activeControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/paper-ticket-status', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`paper ticket request failed: ${response.status}`);
      }

      const nextSnapshot: unknown = await response.json();
      if (!isPaperTicketSnapshot(nextSnapshot)) {
        throw new Error('invalid paper ticket response');
      }
      if (disposedRef.current) return;

      snapshotRef.current = nextSnapshot;
      setSnapshot(nextSnapshot);
      setRefreshError(false);
      setInitialRequestError(false);
    } catch {
      if (disposedRef.current) return;
      setRefreshError(true);
      if (snapshotRef.current === null) setInitialRequestError(true);
    } finally {
      clearTimeout(timeoutId);
      if (activeControllerRef.current === controller) {
        activeControllerRef.current = null;
      }
      inFlightRef.current = false;
      if (!disposedRef.current) {
        setIsRequesting(false);
      }
    }
  }, []);

  useEffect(() => {
    requestSnapshotRef.current = requestSnapshot;
  }, [requestSnapshot]);

  useEffect(() => {
    disposedRef.current = false;

    return () => {
      disposedRef.current = true;
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
    };
  }, []);

  const events = useMemo(() => {
    const sorted = sortEvents(snapshot?.events ?? []);
    return variant === 'preview' ? sorted.slice(0, 3) : sorted;
  }, [snapshot?.events, variant]);
  const hasMoreEvents = variant === 'preview' && (snapshot?.events.length ?? 0) > 3;
  const hasStaleData = snapshot !== null && refreshError;
  const showInitialError = snapshot === null && initialRequestError;
  const showLoading = snapshot === null && !initialRequestError;
  const todayLabel = snapshot
    ? formatJstDate(
        snapshot.events[0]?.sessions[0]?.startsAt ?? snapshot.generatedAt,
      )
    : '本日';
  const headingId = variant === 'full' ? 'paper-ticket-status-title' : undefined;

  return (
    <div className={styles.live}>
      <div className={styles.liveHeader}>
        <div>
          {variant === 'full' ? (
            <h2 id={headingId} className={styles.dateHeading}>
              {todayLabel}の配布状況
            </h2>
          ) : (
            <>
              <p className={styles.eyebrow}>{todayLabel}の紙整理券</p>
              <h2 id={headingId} className={styles.title}>
                配布状況
              </h2>
            </>
          )}
        </div>
        <button
          className={styles.refreshButton}
          type="button"
          onClick={() => void requestSnapshotRef.current()}
          disabled={isRequesting}
        >
          {isRequesting ? '確認中…' : '最新の状況を確認'}
        </button>
      </div>

      {hasStaleData ? (
        <p className={styles.alert} role="status">
          配布状況を更新できませんでした。前回取得した情報を表示しています。
        </p>
      ) : null}

      {showLoading ? (
        <p className={styles.loadingState} role="status">
          配布状況を読み込み中…
        </p>
      ) : showInitialError ? (
        <div className={styles.errorState} role="alert">
          <p>現在、配布状況を取得できません。</p>
          <button
            className={styles.retryButton}
            type="button"
            onClick={() => void requestSnapshotRef.current()}
            disabled={isRequesting}
          >
            {isRequesting ? '確認中…' : '再読み込み'}
          </button>
        </div>
      ) : events.length === 0 ? (
        <p className={styles.emptyState} role="status">
          本日の配布情報はまだ公開されていません。
        </p>
      ) : (
        <ul className={styles.eventGrid} aria-label="紙整理券の企画別配布状況">
          {events.map((event, index) => (
            <EventCard
              key={`${event.displayOrder}-${event.name}-${index}`}
              event={event}
            />
          ))}
        </ul>
      )}

      {variant === 'preview' ? (
        <div
          className={`${styles.metaRow} ${
            snapshot ? '' : styles.metaRowOnlyLink
          }`}
        >
          {snapshot ? (
            <p className={styles.lastUpdated}>
              最終確認{' '}
              <time dateTime={snapshot.generatedAt}>
                {formatJstDateTime(snapshot.generatedAt)}
              </time>
            </p>
          ) : null}
          <Link className={styles.moreLink} href="/distribution">
            すべての企画を見る <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : snapshot ? (
        <div className={styles.metaRow}>
          <p className={styles.lastUpdated}>
            最終確認{' '}
            <time dateTime={snapshot.generatedAt}>
              {formatJstDateTime(snapshot.generatedAt)}
            </time>
          </p>
        </div>
      ) : null}

      {hasMoreEvents ? (
        <p className={styles.previewNote}>ほかの企画の状況は詳細ページで確認できます。</p>
      ) : null}

      {variant === 'full' ? (
        <Link className={styles.topLink} href="/">
          公式サイトトップへ <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}
