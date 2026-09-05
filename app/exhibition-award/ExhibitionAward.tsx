'use client';

import { useEffect, useState } from 'react';
import { exhibitionData } from '@/app/exhibitions/exhibition-data';
import styles from './page.module.css';

const queueKey = 'seiseisai-exhibition-award-votes';
const voteIdKey = 'seiseisai-exhibition-award-device-id';
const exhibitionNames = Object.keys(exhibitionData);

type PendingVote = { id: string; exhibition: string; createdAt: string };

function getPendingVotes(): PendingVote[] {
  try {
    return JSON.parse(localStorage.getItem(queueKey) ?? '[]') as PendingVote[];
  } catch {
    return [];
  }
}

function getDeviceId() {
  const existingId = localStorage.getItem(voteIdKey);
  if (existingId) return existingId;
  const newId = crypto.randomUUID();
  localStorage.setItem(voteIdKey, newId);
  return newId;
}

export default function ExhibitionAward() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedExhibition, setSelectedExhibition] = useState(
    exhibitionNames[0] ?? '',
  );
  const [pendingCount, setPendingCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [message, setMessage] = useState('');

  const syncVotes = async () => {
    const pendingVotes = getPendingVotes();
    setPendingCount(pendingVotes.length);
    if (!navigator.onLine || pendingVotes.length === 0) return;

    const unsentVotes: PendingVote[] = [];
    for (const vote of pendingVotes) {
      try {
        const response = await fetch('/api/exhibition-award/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vote),
        });
        if (!response.ok) unsentVotes.push(vote);
      } catch {
        unsentVotes.push(vote);
      }
    }

    localStorage.setItem(queueKey, JSON.stringify(unsentVotes));
    setPendingCount(unsentVotes.length);
    if (unsentVotes.length === 0)
      setMessage('投票を集計サーバーへ送信しました。');
  };

  useEffect(() => {
    if ('serviceWorker' in navigator)
      void navigator.serviceWorker.register('/exhibition-award-sw.js');
    const initialSync = window.setTimeout(() => {
      setIsOnline(navigator.onLine);
      setPendingCount(getPendingVotes().length);
      void syncVotes();
    }, 0);

    const handleOnline = () => {
      setIsOnline(true);
      void syncVotes();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const submitVote = () => {
    if (!selectedExhibition) return;
    const vote: PendingVote = {
      id: `${getDeviceId()}-${Date.now()}`,
      exhibition: selectedExhibition,
      createdAt: new Date().toISOString(),
    };
    const pendingVotes = [...getPendingVotes(), vote];
    localStorage.setItem(queueKey, JSON.stringify(pendingVotes));
    setPendingCount(pendingVotes.length);
    setMessage(
      isOnline
        ? '投票を受け付けました。送信しています。'
        : '投票を端末に保存しました。Wi-Fi接続時に送信します。',
    );
    setHasVoted(true);
    setSelectedExhibition(exhibitionNames[0] ?? '');
    if (isOnline) void syncVotes();
  };

  return (
    <main className={styles.page}>
      <div className={styles.noise} aria-hidden="true" />
      <section className={styles.panel} aria-labelledby="award-title">
        <p className={styles.kicker}>SEISEISAI 2026 / EXHIBITION AWARD</p>
        {hasVoted ? (
          <>
            <h1 id="award-title" className={styles.thanksTitle}>
              投票ありがとうございました。
            </h1>
            <button
              type="button"
              className={styles.startButton}
              onClick={() => {
                setHasVoted(false);
                setHasStarted(false);
                setMessage('');
              }}
            >
              投票画面に戻る
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : !hasStarted ? (
          <>
            <h1 id="award-title">興味深い展示だったで賞</h1>
            <p className={styles.lead}>
              投票する方は、ボタンを押して開始してください。
            </p>
            <button
              type="button"
              className={styles.startButton}
              onClick={() => {
                setHasStarted(true);
                setMessage('');
              }}
            >
              投票を開始する
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : (
          <>
            <h1 id="award-title">興味深い展示だったで賞</h1>
            <p className={styles.lead}>
              あなたの心に残った展示を、ひとつ選んでください。
            </p>
            <label className={styles.selectLabel} htmlFor="exhibition-select">
              展示団体
            </label>
            <div className={styles.selectWrap}>
              <select
                id="exhibition-select"
                value={selectedExhibition}
                onChange={(event) => setSelectedExhibition(event.target.value)}
                className={styles.select}
              >
                {exhibitionNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={styles.voteButton}
              onClick={submitVote}
              disabled={!selectedExhibition}
            >
              この団体に投票する
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}

        <div className={styles.status} aria-live="polite">
          <span
            className={`${styles.statusDot} ${isOnline ? styles.online : styles.offline}`}
          />
          {isOnline ? 'Wi-Fi接続中' : 'オフラインで投票を保存中'}
          {pendingCount > 0 && (
            <span className={styles.pending}>未送信 {pendingCount}票</span>
          )}
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </section>
    </main>
  );
}
