import type { Metadata } from 'next';
import Link from 'next/link';
import BlogCard from '../_components/BlogCard';
import BackToTop from '../_components/BackToTop';
import { BLOG_YEARS, getPosts } from '../_lib/posts';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog | 第62回菁々祭「Infinity」',
  description: '菁々祭の準備や部活動・同好会の展示を紹介する、東大寺学園菁々祭公式ブログ。',
};

const ordinalSuffix: Record<string, string> = { '62': 'nd', '61': 'st', '60': 'th', '59': 'th' };

export default async function BlogListPage({ searchParams }: {
  searchParams: Promise<{ year?: string | string[] }>;
}) {
  const query = await searchParams;
  const selectedYear = typeof query.year === 'string' && BLOG_YEARS.includes(query.year)
    ? query.year : BLOG_YEARS[0];
  const posts = getPosts(selectedYear);

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.heading}>
          <h1>Blog</h1><span className={styles.headingCaption}>菁々祭ブログ</span>
        </header>
        <nav className={styles.years} aria-label="開催回でブログを選ぶ">
          {BLOG_YEARS.map((year) => (
            <Link href={year === BLOG_YEARS[0] ? '/blog' : `/blog?year=${year}`} key={year}
              aria-current={year === selectedYear ? 'page' : undefined}
              aria-label={`第${year}回菁々祭のブログ`} className={styles.year} scroll={false}>
              <span className={styles.edition}>{year}<span>{ordinalSuffix[year] ?? 'th'}</span></span>
              <span className={styles.calendarYear}>{Number(year) + 1964}</span>
            </Link>
          ))}
        </nav>
        <section aria-label={`第${selectedYear}回菁々祭の記事`} className={styles.articles}>
          {posts.length ? (
            <div className={styles.grid}>
              {posts.map((post, index) => <BlogCard key={post.key} post={post} priority={index === 0} />)}
            </div>
          ) : <p className={styles.empty}>記事は準備中です。</p>}
        </section>
      </div>
      <BackToTop />
    </main>
  );
}
