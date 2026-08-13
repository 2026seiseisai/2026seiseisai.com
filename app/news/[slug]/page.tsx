import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import NewsBody from '../_components/news-body';
import { getNewsBySlug } from '../_lib/news-api';
import styles from '../page.module.css';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// ビルド後に公開されたお知らせも、そのURLで開ける
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (article === null) {
    return { title: 'News | 東大寺学園菁々祭「Infinity」公式ホームページ' };
  }

  return {
    title: `${article.title} | News | 東大寺学園菁々祭「Infinity」公式ホームページ`,
    description: article.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (article === null) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <article className={`${styles.container} ${styles.detail}`}>
        <Link className={styles.backLink} href="/news">
          ← News一覧へ
        </Link>
        <div className={styles.detailMeta}>
          <time dateTime={article.publishedAt}>
            {dateFormatter.format(new Date(article.publishedAt)).replaceAll('/', '.')}
          </time>
          {article.important ? <span className={styles.badge}>重要</span> : null}
        </div>
        <h1 className={styles.detailTitle}>{article.title}</h1>
        <NewsBody body={article.body} />
      </article>
    </main>
  );
}
