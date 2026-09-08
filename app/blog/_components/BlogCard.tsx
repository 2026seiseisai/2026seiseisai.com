import Image from 'next/image';
import Link from 'next/link';
import { getPostHref, isNewPost, type BlogPost } from '../_lib/posts';
import styles from './BlogCard.module.css';

export default function BlogCard({ post, priority = false, headingLevel = 2 }: {
  post: BlogPost;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  return (
    <article className={styles.card}>
      <Link href={getPostHref(post)} className={styles.link}>
        <div className={styles.imageFrame}>
          <Image src={post.thumbnail} alt="" fill sizes="(max-width: 559px) calc(100vw - 40px), (max-width: 899px) 45vw, 350px" priority={priority} className={styles.image} />
          {isNewPost(post) ? <span className={styles.newBadge}>NEW</span> : null}
        </div>
        <div className={styles.body}>
          <div className={styles.meta}>
            <time dateTime={post.dateTime}>{post.date}</time>
            <span className={styles.topic}>{post.topic}</span>
          </div>
          <Heading className={styles.title}>{post.title}</Heading>
          <div className={styles.bottom}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
