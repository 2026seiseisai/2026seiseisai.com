import type { StaticImageData } from 'next/image';

import { blogData } from '../blogs/blog-data';
import StampBookImage from '../blogs/62/5/IMG_3398.jpeg';

export type BlogPost = {
  key: string;
  year: string;
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  author: string;
  topic: string;
  thumbnail: StaticImageData;
  images: Readonly<Record<string, StaticImageData>>;
  description: string;
  content: string;
};

export const BLOG_YEARS: readonly string[] = ['62', '61', '60', '59'];

type RawBlogPost = (typeof blogData)[string];

const BLOG_KEY_PATTERN = /^(\d{2})\/(\d{2})$/;
const BLOG_DATE_PATTERN = /^(\d{4})\.(\d{2})\.(\d{2})$/;
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

const EXTRA_IMAGES: Readonly<
  Record<string, Readonly<Record<string, StaticImageData>>>
> = {
  // This image is referenced by the article but is absent from the generated
  // image map. Keep the generated source untouched and add the static import
  // at the adapter boundary instead.
  '62/05': {
    'IMG_3398.jpeg': StampBookImage,
  },
};

function parseDateTime(date: string): string {
  const match = BLOG_DATE_PATTERN.exec(date.trim());

  if (!match) return '';

  const [, year, month, day] = match;
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));

  if (
    parsed.getUTCFullYear() !== Number(year) ||
    parsed.getUTCMonth() !== Number(month) - 1 ||
    parsed.getUTCDate() !== Number(day)
  ) {
    return '';
  }

  return `${year}-${month}-${day}`;
}

function toBlogPost(key: string, rawPost: RawBlogPost): BlogPost | undefined {
  const match = BLOG_KEY_PATTERN.exec(key);

  if (!match) return undefined;

  const [, year, slug] = match;
  const date = rawPost.date.trim();
  const dateTime = parseDateTime(date);

  // A malformed date cannot be sorted or compared reliably. The generated
  // production data is valid; this guard also keeps development fixtures out
  // of the public year-based collection.
  if (!dateTime) return undefined;

  const thumbnailFilename = rawPost.thumbnailPath.split('/').pop();
  const images: Record<string, StaticImageData> = {
    ...rawPost.images,
    ...(EXTRA_IMAGES[key] ?? {}),
  };

  // Some older generated entries use the thumbnail again in the article body
  // without listing it in `images`. Exposing that static import through the
  // same map lets the renderer resolve it without a filesystem lookup.
  if (thumbnailFilename && !Object.hasOwn(images, thumbnailFilename)) {
    images[thumbnailFilename] = rawPost.thumbnail;
  }

  return {
    key,
    year,
    slug,
    title: rawPost.title,
    date,
    dateTime,
    author: rawPost.author,
    topic: rawPost.topic,
    thumbnail: rawPost.thumbnail,
    images,
    description: rawPost.description.trim(),
    content: rawPost.content.trim(),
  };
}

const POSTS: readonly BlogPost[] = Object.entries(blogData).flatMap(([key, rawPost]) => {
  const post = toBlogPost(key, rawPost);
  return post ? [post] : [];
});

function comparePosts(a: BlogPost, b: BlogPost): number {
  const dateComparison = b.dateTime.localeCompare(a.dateTime);

  if (dateComparison !== 0) return dateComparison;

  const slugComparison = Number(b.slug) - Number(a.slug);

  if (slugComparison !== 0) return slugComparison;

  return b.key.localeCompare(a.key);
}

function isStrictBlogSegment(value: string): boolean {
  return /^\d{2}$/.test(value);
}

export function getPosts(year?: string): BlogPost[] {
  if (year !== undefined && !isStrictBlogSegment(year)) return [];

  return POSTS.filter((post) => year === undefined || post.year === year)
    .slice()
    .sort(comparePosts);
}

export function getPost(year: string, slug: string): BlogPost | undefined {
  if (!isStrictBlogSegment(year) || !isStrictBlogSegment(slug)) return undefined;

  const key = `${year}/${slug}`;

  if (!Object.hasOwn(blogData, key)) return undefined;

  const rawPost = blogData[key];
  return rawPost ? toBlogPost(key, rawPost) : undefined;
}

export function getPostHref(post: Pick<BlogPost, 'year' | 'slug'>): string {
  return `/blog/${post.year}/${post.slug}`;
}

export function formatBlogDate(date: string): string {
  const trimmedDate = date.trim();
  const match = BLOG_DATE_PATTERN.exec(trimmedDate);

  return match ? `${match[1]}.${match[2]}.${match[3]}` : trimmedDate;
}

export function isNewPost(post: Pick<BlogPost, 'dateTime'>): boolean {
  const postDate = Date.parse(`${post.dateTime}T00:00:00.000Z`);

  if (!Number.isFinite(postDate)) return false;

  const today = new Date();
  const todayDate = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const age = todayDate - postDate;

  return age >= 0 && age <= 14 * DAY_IN_MILLISECONDS;
}
