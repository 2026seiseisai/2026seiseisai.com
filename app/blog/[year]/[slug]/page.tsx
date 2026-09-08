import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import BlogBody, { getBlogHeadings } from '../../_components/BlogBody';
import BlogCard from '../../_components/BlogCard';
import BackToTop from '../../../_components/BackToTop';
import {
  formatBlogDate,
  getPost,
  getPostHref,
  getPosts,
  isNewPost,
  type BlogPost,
} from '../../_lib/posts';
import styles from './page.module.css';

const siteTitle = '東大寺学園菁々祭「Infinity」公式ホームページ';

type BlogDetailPageProps = {
  params: Promise<{ year: string; slug: string }>;
};

export function generateStaticParams() {
  return getPosts().map((post) => ({
    year: String(post.year),
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { year, slug } = await params;
  const post = getPost(normalizeBlogSegment(year), normalizeBlogSegment(slug));

  if (!post) {
    return { title: `Blog | ${siteTitle}` };
  }

  return {
    title: `${post.title} | Blog | ${siteTitle}`,
    description: post.description,
  };
}

function normalizeBlogSegment(value: string) {
  return /^\d$/.test(value) ? value.padStart(2, '0') : value;
}

function getYearPosts(post: BlogPost) {
  return getPosts(String(post.year));
}

function getAdjacentPosts(post: BlogPost) {
  const yearPosts = getYearPosts(post);
  const index = yearPosts.findIndex((candidate) => candidate.key === post.key);

  return {
    // getPosts is newest-first: the previous article is the next older entry.
    previous: index >= 0 ? yearPosts[index + 1] : undefined,
    next: index > 0 ? yearPosts[index - 1] : undefined,
    related: yearPosts.filter((candidate) => candidate.key !== post.key).slice(0, 2),
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { year, slug } = await params;
  const post = getPost(normalizeBlogSegment(year), normalizeBlogSegment(slug));

  if (!post) {
    notFound();
  }

  const headings = getBlogHeadings(post);
  const { previous, next, related } = getAdjacentPosts(post);
  const listHref = `/blog?year=${encodeURIComponent(String(post.year))}`;

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <p className={styles.eyebrow}>Blog記事</p>

        <div className={styles.hero}>
          <Image
            src={post.thumbnail}
            alt=""
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 1140px"
            className={styles.heroImage}
            priority
          />
          {isNewPost(post) ? <span className={styles.newBadge}>NEW</span> : null}
        </div>

        <header className={styles.articleHeader}>
          <p className={styles.yearLabel}>第{post.year}回菁々祭</p>
          <h1 className={styles.title}>{post.title}</h1>
          <span className={styles.titleRule} aria-hidden="true" />
          <div className={styles.meta}>
            <time dateTime={post.dateTime}>{formatBlogDate(post.date)}</time>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>{post.topic}</span>
            <span className={styles.metaDivider} aria-hidden="true" />
            <span>{post.author}</span>
          </div>
        </header>

        <div className={`${styles.contentGrid} ${headings.length === 0 ? styles.contentGridWithoutToc : ''}`}>
          {headings.length > 0 ? (
            <aside className={styles.sidebar}>
              <nav className={styles.toc} aria-labelledby="blog-toc-title">
                <h2 id="blog-toc-title">目次</h2>
                <ol>
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={heading.level > 1 ? styles.tocNested : undefined}
                    >
                      <a href={`#${heading.id}`}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : null}

          <section className={styles.bodyColumn} aria-label="記事本文">
            <BlogBody post={post} />
          </section>
        </div>

        <nav className={styles.postNav} aria-label="記事ナビゲーション">
          {previous ? (
            <Link className={styles.postNavLink} href={getPostHref(previous)}>
              <span className={styles.postNavLabel}>← 前の記事</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <span className={`${styles.postNavLink} ${styles.postNavPlaceholder}`} aria-hidden="true" />
          )}
          {next ? (
            <Link className={`${styles.postNavLink} ${styles.postNavNext}`} href={getPostHref(next)}>
              <span className={styles.postNavLabel}>次の記事 →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span className={`${styles.postNavLink} ${styles.postNavPlaceholder}`} aria-hidden="true" />
          )}
        </nav>

        <div className={styles.returnRow}>
          <Link className={styles.returnLink} href={listHref}>
            <span aria-hidden="true">←</span> Blog一覧へ
          </Link>
        </div>

        {related.length > 0 ? (
          <section className={styles.related} aria-labelledby="related-title">
            <div className={styles.relatedHeadingRow}>
              <h2 id="related-title">関連記事</h2>
              <span aria-hidden="true">同じ回の記事</span>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((relatedPost) => (
                <BlogCard key={relatedPost.key} post={relatedPost} headingLevel={3} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <BackToTop />
    </main>
  );
}
