import { redirect } from 'next/navigation';

import { getPost, getPostHref, getPosts } from '../_lib/posts';

type BlogDetailCompatPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeBlogSegment(value: string | undefined) {
  return value && /^\d$/.test(value) ? value.padStart(2, '0') : value;
}

export default async function BlogDetailCompatPage({
  searchParams,
}: BlogDetailCompatPageProps) {
  const query = await searchParams;
  const year = normalizeBlogSegment(firstQueryValue(query.year));
  const slug = normalizeBlogSegment(firstQueryValue(query.slug) ?? firstQueryValue(query.id));
  const post = year && slug ? getPost(year, slug) : getPosts()[0];

  if (!post) {
    redirect('/blog');
  }

  redirect(getPostHref(post));
}
