import HomeClient, { type HomeNewsArticle } from './HomeClient';
import { getNewsList } from '../news/_lib/news-api';

// News API を毎回取得し、サイトを再デプロイせずにトップページの新着お知らせへ反映する。
export const dynamic = 'force-dynamic';

export default async function Page() {
  let newsArticles: HomeNewsArticle[] = [];

  try {
    const articles = await getNewsList();
    newsArticles = articles
      .slice(0, 3)
      .map(({ id, slug, title, important, publishedAt }) => ({
        id,
        slug,
        title,
        important,
        publishedAt,
      }));
  } catch {
    newsArticles = [];
  }

  return <HomeClient newsArticles={newsArticles} />;
}
