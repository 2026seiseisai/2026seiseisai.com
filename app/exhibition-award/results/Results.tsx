'use client';

import { useEffect, useState } from 'react';
import { exhibitionData } from '@/app/exhibitions/exhibition-data';
import styles from '../page.module.css';

export default function ExhibitionAwardResults() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('集計中...');
  const [resetArmed, setResetArmed] = useState(false);

  const loadResults = async () => {
    try {
      const response = await fetch('/api/exhibition-award/votes', {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('集計データを取得できません');
      const data = (await response.json()) as {
        counts: Record<string, number>;
        total: number;
      };
      setCounts(data.counts);
      setTotal(data.total);
      setStatus('最新の集計結果');
    } catch {
      setStatus('集計データを取得できませんでした');
    }
  };

  const resetResults = async () => {
    if (!resetArmed) {
      setResetArmed(true);
      return;
    }
    setStatus('リセット中...');
    try {
      const response = await fetch('/api/exhibition-award/votes', {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('リセットに失敗しました');
      setResetArmed(false);
      await loadResults();
    } catch {
      setStatus('リセットに失敗しました');
    }
  };

  useEffect(() => {
    const initialLoad = window.setTimeout(() => void loadResults(), 0);
    return () => window.clearTimeout(initialLoad);
  }, []);
  const rows = Object.keys(exhibitionData)
    .map((name) => ({ name, count: counts[name] ?? 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'ja'));
  const maxCount = Math.max(1, ...rows.map((row) => row.count));

  return (
    <main className={styles.resultsPage}>
      <section className={styles.resultsPanel}>
        <p className={styles.kicker}>SEISEISAI 2026 / LIVE TALLY</p>
        <h1>興味深い展示だったで賞</h1>
        <div className={styles.resultsMeta}>
          <span>{status}</span>
          <strong>総投票数 {total}票</strong>
        </div>
        <ol className={styles.resultsList}>
          {rows.map((row, index) => (
            <li key={row.name} className={styles.resultRow}>
              <span className={styles.rank}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.resultBody}>
                <div className={styles.resultName}>{row.name}</div>
                <div className={styles.bar}>
                  <span style={{ width: `${(row.count / maxCount) * 100}%` }} />
                </div>
              </div>
              <strong className={styles.resultCount}>{row.count}</strong>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => void loadResults()}
        >
          結果を更新する
        </button>
        {resetArmed && (
          <p className={styles.resetWarning}>
            すべての投票データを削除します。この操作は元に戻せません。
          </p>
        )}
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => void resetResults()}
        >
          {resetArmed ? '本当に全票をリセットする' : '集計をリセットする'}
        </button>
      </section>
    </main>
  );
}
