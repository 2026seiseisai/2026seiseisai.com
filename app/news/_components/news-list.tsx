'use client';

import { useState } from 'react';
import Link from 'next/link';

import { getPaginationItems } from '../_lib/pagination';
import styles from '../page.module.css';

type NewsListArticle = {
  id: string;
  slug: string;
  title: string;
  important: boolean;
  publishedAt: string;
};

type NewsListProps = {
  articles: NewsListArticle[];
};

const pageSize = 6;
const dateFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function formattedDate(value: string): string {
  return dateFormatter.format(new Date(value)).replaceAll('/', '.');
}

export default function NewsList({ articles }: NewsListProps) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(articles.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleArticles = articles.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const paginationItems = getPaginationItems(currentPage, pageCount);

  return (
    <>
      <ul className={styles.list}>
        {visibleArticles.map((article) => (
          <li
            className={`${styles.row} ${article.important ? styles.important : ''}`}
            key={article.id}
          >
            <Link className={styles.rowLink} href={`/news/${encodeURIComponent(article.slug)}`}>
              <time className={styles.date} dateTime={article.publishedAt}>
                {formattedDate(article.publishedAt)}
              </time>
              <span className={styles.title}>
                {article.important ? (
                  <span className={styles.visuallyHidden}>重要なお知らせ: </span>
                ) : null}
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {pageCount > 1 ? (
        <nav className={styles.pagination} aria-label="Newsのページ">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
            aria-label="前のページ"
          >
            ←
          </button>
          {paginationItems.map((item) =>
            typeof item === 'number' ? (
              <button
                type="button"
                onClick={() => setPage(item)}
                aria-current={currentPage === item ? 'page' : undefined}
                aria-label={`ページ ${item}`}
                key={item}
              >
                {item}
              </button>
            ) : (
              <span className={styles.paginationEllipsis} aria-hidden="true" key={item}>
                …
              </span>
            ),
          )}
          <button
            type="button"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={currentPage === pageCount}
            aria-label="次のページ"
          >
            →
          </button>
        </nav>
      ) : null}
    </>
  );
}
