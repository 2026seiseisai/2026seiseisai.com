import type { Metadata } from 'next';

import NewsList from './_components/news-list';
import { getNewsList } from './_lib/news-api';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'News | 東大寺学園菁々祭「Infinity」公式ホームページ',
  description: '菁々祭からのお知らせ',
};

// 管理画面で公開したお知らせを、サイトを再デプロイせずに反映する。
export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const articles = await getNewsList();

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          <span className={styles.headingInitial}>N</span>ews
        </h1>

        {articles.length === 0 ? (
          <p className={styles.empty}>現在公開中のお知らせはありません。</p>
        ) : (
          <NewsList
            articles={articles.map(({ id, slug, title, important, publishedAt }) => ({
              id,
              slug,
              title,
              important,
              publishedAt,
            }))}
          />
        )}
      </div>
    </main>
  );
}
