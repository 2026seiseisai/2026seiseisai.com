import type { Metadata } from 'next';

import PaperTicketStatusLive from './_components/paper-ticket-status-live';
import { getPaperTicketSnapshot } from './_lib/paper-ticket-api';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '整理券配布状況 | 東大寺学園菁々祭「Infinity」',
  description: '第62回菁々祭「Infinity」の本日の紙整理券配布状況。',
};

export default async function DistributionPage() {
  let initialSnapshot: Awaited<ReturnType<typeof getPaperTicketSnapshot>> | null = null;
  let initialError = false;

  try {
    initialSnapshot = await getPaperTicketSnapshot();
  } catch {
    initialError = true;
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>整理券配布状況</h1>
        <p className={styles.intro}>
          本日の紙整理券の配布状況を、企画ごとにお知らせします。
        </p>
        <PaperTicketStatusLive
          initialSnapshot={initialSnapshot}
          initialError={initialError}
          variant="full"
        />
      </div>
    </main>
  );
}
