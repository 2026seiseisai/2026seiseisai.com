import Image from 'next/image';
import type { ReactNode } from 'react';

import type { BlogPost } from '../_lib/posts';
import styles from './BlogBody.module.css';

type BlogHeading = {
  id: string;
  text: string;
  level: number;
};

type HeadingRegistry = {
  next: (text: string) => string;
};

type ImageMatch = {
  alt: string;
  destination: string;
};

type ParsedHeading = Pick<BlogHeading, 'level' | 'text'>;

const IMAGE_LINE_PATTERN = /^!\[([\s\S]*?)\]\(([^)\r\n]+)\)\s*$/;
const VIDEO_LINK_LINE_PATTERN = /^\[([^\]\r\n]+)\]\(([^)\r\n]+)\)$/;
const HEADING_LINE_PATTERN = /^(#{1,6})[ \t]+(.+?)\s*$/;
const UNORDERED_ITEM_PATTERN = /^ {0,3}[-*+][ \t]+(.+)$/;
const ORDERED_ITEM_PATTERN = /^ {0,3}\d+[.)][ \t]+(.+)$/;
const COLOR_SPAN_PATTERN = /^<span\s+style\s*=\s*\{\{\s*color\s*:\s*(?:(?:["'“”‘’])\s*)?(#[\da-f]{3,8})\s*(?:(?:["'“”‘’])\s*)?\}\}\s*>/i;
const MARKDOWN_IMAGE_PATTERN = /!\[([\s\S]*?)\]\(([^)\r\n]+)\)/g;
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'youtu.be']);
const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const DOCUMENT_HREFS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  '59/03': {
    '%E7%95%AA%E8%8C%B6%E5%85%9A%E7%AC%AC36%E5%8F%B7%EF%BC%882022%E5%B9%B4%E7%99%BA%E8%A1%8C%EF%BC%89.pdf':
      '/blog/59/03/%E7%95%AA%E8%8C%B6%E5%85%9A%E7%AC%AC36%E5%8F%B7%EF%BC%882022%E5%B9%B4%E7%99%BA%E8%A1%8C%EF%BC%89.pdf',
  },
};
const INLINE_COLOR_OVERRIDES: Readonly<Record<string, string>> = {
  '#337ea9': '#2c6e95',
  '#d9730d': '#a35600',
  '#00aabe': '#007a8a',
  '#51bba0': '#2e735d',
  '#9370db': '#6841a5',
  '#db4592': '#9c336a',
  '#ff0000': '#b00000',
  '#ffa500': '#8a4b00',
  '#ffff00': '#7a5f00',
  '#1e90ff': '#146a8f',
  '#ffd770': '#8a6500',
  '#40e0d0': '#00786e',
  '#5f9ea0': '#356d70',
};

function normalizeMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n?/g, '\n')
    .replace(MARKDOWN_IMAGE_PATTERN, (_, alt: string, destination: string) => {
      const compactAlt = alt.replace(/[ \t]*\n[ \t]*/g, ' ');
      return `![${compactAlt}](${destination})`;
    })
    .trim();
}

function cleanCaption(value: string): string {
  return value.trim().replace(/^\$/, '');
}

function plainInlineText(value: string): string {
  return value
    .replace(/<span\b[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/!\[([\s\S]*?)\]\([^)]*\)/g, '$1')
    .replace(/\[([\s\S]*?)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|~~|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeForComparison(value: string): string {
  return plainInlineText(value)
    .normalize('NFKC')
    .replace(/[\s。、，．,.]/gu, '')
    .replace(/^\$/, '')
    .trim();
}

function contentWithoutTitleHeading(markdown: string, post: BlogPost): string {
  const normalized = normalizeMarkdown(markdown);
  if (!normalized) return '';

  const lines = normalized.split('\n');
  const firstHeading = headingFromLine(lines[0]);

  if (
    firstHeading &&
    normalizeForComparison(firstHeading.text) === normalizeForComparison(post.title)
  ) {
    return lines.slice(1).join('\n').trim();
  }

  return normalized;
}

function createHeadingRegistry(): HeadingRegistry {
  const usedIds = new Set<string>();

  return {
    next(text) {
      const base = plainInlineText(text)
        .normalize('NFKC')
        .toLocaleLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80) || `section-${usedIds.size + 1}`;

      let id = base;
      let suffix = 2;

      while (usedIds.has(id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }

      usedIds.add(id);
      return id;
    },
  };
}

function headingFromLine(line: string): { level: number; text: string } | undefined {
  const match = HEADING_LINE_PATTERN.exec(line);

  if (!match) return undefined;

  return {
    level: match[1].length,
    text: match[2].replace(/[ \t]+#+[ \t]*$/, '').trim(),
  };
}

function normalizeHeadingLevels(headings: readonly ParsedHeading[]): number[] {
  if (headings.length === 0) return [];

  const firstSourceLevel = headings[0].level;
  let previousLevel = 1;

  return headings.map((heading, index) => {
    if (index === 0) return 1;

    const sourceRelativeLevel = Math.max(1, heading.level - firstSourceLevel + 1);
    const normalizedLevel = Math.min(sourceRelativeLevel, previousLevel + 1);
    previousLevel = normalizedLevel;
    return normalizedLevel;
  });
}

function imageFromLine(line: string): ImageMatch | undefined {
  const match = IMAGE_LINE_PATTERN.exec(line);

  if (!match) return undefined;

  return {
    alt: cleanCaption(match[1]),
    destination: match[2].trim(),
  };
}

function isHorizontalRule(line: string): boolean {
  return /^ {0,3}(?:\*\s*){3,}$/.test(line) || /^ {0,3}(?:-\s*){3,}$/.test(line);
}

type VideoLinkMatch = {
  label: string;
  videoId: string;
};

function youtubeVideoId(value: string): string | undefined {
  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      !YOUTUBE_HOSTS.has(url.hostname.toLowerCase())
    ) {
      return undefined;
    }

    if (url.hostname.toLowerCase() === 'youtu.be') {
      const pathSegments = url.pathname.split('/').filter(Boolean);
      const videoId = pathSegments.length === 1 ? pathSegments[0] : undefined;

      return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : undefined;
    }

    if (url.pathname !== '/watch' && url.pathname !== '/watch/') return undefined;

    const videoIds = url.searchParams.getAll('v');
    const videoId = videoIds.length === 1 ? videoIds[0] : undefined;

    return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : undefined;
  } catch {
    return undefined;
  }
}

function videoFromLine(line: string): VideoLinkMatch | undefined {
  const match = VIDEO_LINK_LINE_PATTERN.exec(line.trim());

  if (!match) return undefined;

  const videoId = youtubeVideoId(match[2]);

  if (!videoId) return undefined;

  return {
    label: match[1].trim(),
    videoId,
  };
}

function isBlockStart(line: string): boolean {
  return Boolean(
    headingFromLine(line) ||
      imageFromLine(line) ||
      videoFromLine(line) ||
      /^ {0,3}```/.test(line) ||
      UNORDERED_ITEM_PATTERN.test(line) ||
      ORDERED_ITEM_PATTERN.test(line) ||
      /^ {0,3}>/.test(line) ||
      isHorizontalRule(line),
  );
}

function safeHref(value: string, post: BlogPost): string | undefined {
  const href = value.trim();

  if (!href || /[\u0000-\u001f\u007f]/.test(href)) return undefined;

  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (href.startsWith('#')) return href;

  const documents = Object.hasOwn(DOCUMENT_HREFS, post.key) ? DOCUMENT_HREFS[post.key] : undefined;
  const documentHref = documents && Object.hasOwn(documents, href) ? documents[href] : undefined;
  if (documentHref) return documentHref;

  try {
    const url = new URL(href, 'https://seiseisai.com');

    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') {
      return href;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function isExternalHref(href: string): boolean {
  return /^https?:/i.test(href);
}

function getReadableInlineColor(value: string): string {
  return INLINE_COLOR_OVERRIDES[value.toLowerCase()] ?? value;
}

function decodeImageKey(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function resolveImage(
  images: Readonly<Record<string, BlogPost['thumbnail']>>,
  destination: string,
): BlogPost['thumbnail'] | undefined {
  const imagePath = destination.split(/[?#]/, 1)[0].trim();
  const decodedPath = decodeImageKey(imagePath);

  for (const [key, image] of Object.entries(images)) {
    if (key === imagePath || decodeImageKey(key) === decodedPath) return image;
  }

  return undefined;
}

function findClosingDelimiter(value: string, openingIndex: number, delimiter: string): number {
  return value.indexOf(delimiter, openingIndex + delimiter.length);
}

function findClosingLink(value: string, openingIndex: number): number {
  let depth = 0;

  for (let index = openingIndex; index < value.length; index += 1) {
    const character = value[index];

    if (character === '(') {
      depth += 1;
    } else if (character === ')') {
      if (depth === 0) return index;
      depth -= 1;
    }
  }

  return -1;
}

function renderInline(value: string, post: BlogPost, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let textBuffer = '';
  let index = 0;

  const flushText = () => {
    if (textBuffer) {
      nodes.push(textBuffer);
      textBuffer = '';
    }
  };

  const nextKey = () => `${keyPrefix}-${nodes.length}`;

  while (index < value.length) {
    const imageMatch = value.slice(index).match(/^!\[([\s\S]*?)\]\(([^)\r\n]+)\)/);

    if (imageMatch) {
      flushText();
      const image = resolveImage(post.images, imageMatch[2]);
      const alt = cleanCaption(imageMatch[1]);

      if (image) {
        nodes.push(
          <Image
            key={nextKey()}
            src={image}
            alt={alt || '記事内画像'}
            sizes="(max-width: 760px) 100vw, 760px"
          />,
        );
      } else {
        nodes.push(alt || '記事内画像');
      }

      index += imageMatch[0].length;
      continue;
    }

    const colorMatch = value.slice(index).match(COLOR_SPAN_PATTERN);

    if (colorMatch) {
      const openingLength = colorMatch[0].length;
      const closingTag = '</span>';
      const closingIndex = value.toLowerCase().indexOf(closingTag, index + openingLength);

      if (closingIndex !== -1) {
        flushText();
        const inner = value.slice(index + openingLength, closingIndex);

        nodes.push(
          <span key={nextKey()} style={{ color: getReadableInlineColor(colorMatch[1]) }}>
            {renderInline(inner, post, `${keyPrefix}-color-${nodes.length}`)}
          </span>,
        );
        index = closingIndex + closingTag.length;
        continue;
      }
    }

    let handledDelimiter = false;

    for (const delimiter of ['**', '__', '~~']) {
      if (!value.startsWith(delimiter, index)) continue;

      const closingIndex = findClosingDelimiter(value, index, delimiter);

      if (closingIndex === -1 || closingIndex === index + delimiter.length) continue;

      flushText();
      const inner = value.slice(index + delimiter.length, closingIndex);
      const tag = delimiter === '~~' ? 'del' : 'strong';

      if (tag === 'del') {
        nodes.push(
          <del key={nextKey()}>{renderInline(inner, post, `${keyPrefix}-del-${nodes.length}`)}</del>,
        );
      } else {
        nodes.push(
          <strong key={nextKey()}>{renderInline(inner, post, `${keyPrefix}-strong-${nodes.length}`)}</strong>,
        );
      }

      index = closingIndex + delimiter.length;
      handledDelimiter = true;
      break;
    }

    if (handledDelimiter) continue;

    if (value[index] === '`') {
      const closingIndex = value.indexOf('`', index + 1);

      if (closingIndex !== -1) {
        flushText();
        nodes.push(
          <code key={nextKey()} className={styles.inlineCode}>
            {value.slice(index + 1, closingIndex)}
          </code>,
        );
        index = closingIndex + 1;
        continue;
      }
    }

    if (value[index] === '[' && !value.startsWith('![', index)) {
      const labelEnd = value.indexOf('](', index + 1);

      if (labelEnd !== -1) {
        const linkEnd = findClosingLink(value, labelEnd + 2);

        if (linkEnd !== -1) {
          const label = value.slice(index + 1, labelEnd);
          const destination = value.slice(labelEnd + 2, linkEnd).trim();
          const href = safeHref(destination, post);

          flushText();

          if (href) {
            nodes.push(
              <a
                key={nextKey()}
                href={href}
                target={isExternalHref(href) ? '_blank' : undefined}
                rel={isExternalHref(href) ? 'noopener noreferrer' : undefined}
              >
                {renderInline(label, post, `${keyPrefix}-link-${nodes.length}`)}
              </a>,
            );
          } else {
            nodes.push(...renderInline(label, post, `${keyPrefix}-plain-link-${nodes.length}`));
          }

          index = linkEnd + 1;
          continue;
        }
      }
    }

    if (value[index] === '\n') {
      textBuffer += ' ';
    } else {
      textBuffer += value[index];
    }
    index += 1;
  }

  flushText();
  return nodes;
}

function renderFigure(post: BlogPost, imageMatch: ImageMatch, key: string): ReactNode {
  const image = resolveImage(post.images, imageMatch.destination);
  const caption = cleanCaption(imageMatch.alt);

  return (
    <figure className={styles.figure} key={key}>
      {image ? (
        <div className={styles.media}>
          <Image
            src={image}
            alt={caption || '記事内画像'}
            sizes="(max-width: 760px) 100vw, 760px"
          />
        </div>
      ) : (
        <div className={styles.missingMedia} role="img" aria-label={caption || '記事内画像'}>
          画像を読み込めませんでした
        </div>
      )}
      {caption ? (
        <figcaption className={styles.caption}>
          {renderInline(caption, post, `${key}-caption`)}
        </figcaption>
      ) : null}
    </figure>
  );
}

function renderVideoEmbed(video: VideoLinkMatch, key: string): ReactNode {
  const title = plainInlineText(video.label) || 'YouTube動画';

  return (
    <div className={styles.videoEmbed} key={key}>
      <iframe
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function renderMarkdown(markdown: string, post: BlogPost): ReactNode[] {
  const normalized = contentWithoutTitleHeading(markdown, post);

  if (!normalized) return [];

  const lines = normalized.split('\n');
  const nodes: ReactNode[] = [];
  const headingRegistry = createHeadingRegistry();
  const rawHeadings: ParsedHeading[] = [];

  for (const line of lines) {
    const heading = headingFromLine(line);
    if (heading) rawHeadings.push(heading);
  }

  const normalizedHeadingLevels = normalizeHeadingLevels(rawHeadings);
  let lineIndex = 0;
  let blockIndex = 0;
  let headingIndex = 0;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];

    if (!line.trim()) {
      lineIndex += 1;
      continue;
    }

    const heading = headingFromLine(line);

    if (heading) {
      const id = headingRegistry.next(heading.text);
      const semanticHeadingLevel = normalizedHeadingLevels[headingIndex] ?? 1;
      const renderedHeadingLevel = Math.min(semanticHeadingLevel + 1, 6);
      const HeadingTag = `h${renderedHeadingLevel}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      headingIndex += 1;

      nodes.push(
        <HeadingTag key={`heading-${blockIndex}`} id={id}>
          {renderInline(heading.text, post, `heading-${blockIndex}`)}
        </HeadingTag>,
      );
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    const video = videoFromLine(line);

    if (video) {
      nodes.push(renderVideoEmbed(video, `video-${blockIndex}`));
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    const image = imageFromLine(line);

    if (image) {
      let nextLineIndex = lineIndex + 1;

      if (lines[nextLineIndex]?.trim() === '') nextLineIndex += 1;

      const possibleCaption = lines[nextLineIndex]?.trim();

      if (
        possibleCaption &&
        normalizeForComparison(possibleCaption) === normalizeForComparison(image.alt) &&
        !isBlockStart(possibleCaption)
      ) {
        nextLineIndex += 1;
      }

      nodes.push(renderFigure(post, image, `figure-${blockIndex}`));
      lineIndex = nextLineIndex;
      blockIndex += 1;
      continue;
    }

    if (isHorizontalRule(line)) {
      nodes.push(<hr key={`rule-${blockIndex}`} />);
      lineIndex += 1;
      blockIndex += 1;
      continue;
    }

    const codeFence = /^ {0,3}```(?:[^\s]*)?\s*$/.exec(line);

    if (codeFence) {
      const codeLines: string[] = [];
      lineIndex += 1;

      while (lineIndex < lines.length && !/^ {0,3}```\s*$/.test(lines[lineIndex])) {
        codeLines.push(lines[lineIndex]);
        lineIndex += 1;
      }

      if (lineIndex < lines.length) lineIndex += 1;

      nodes.push(
        <pre key={`code-${blockIndex}`} className={styles.codeBlock}>
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      blockIndex += 1;
      continue;
    }

    const unordered = UNORDERED_ITEM_PATTERN.exec(line);
    const ordered = ORDERED_ITEM_PATTERN.exec(line);

    if (unordered || ordered) {
      const items: string[] = [];
      const isOrdered = Boolean(ordered);

      while (lineIndex < lines.length) {
        const current = lines[lineIndex];
        const match = (isOrdered ? ORDERED_ITEM_PATTERN : UNORDERED_ITEM_PATTERN).exec(current);

        if (!match) break;

        items.push(match[1]);
        lineIndex += 1;
      }

      const ListTag = isOrdered ? 'ol' : 'ul';

      nodes.push(
        <ListTag key={`list-${blockIndex}`} className={styles.list}>
          {items.map((item, itemIndex) => (
            <li key={`list-${blockIndex}-${itemIndex}`}>
              {renderInline(item, post, `list-${blockIndex}-${itemIndex}`)}
            </li>
          ))}
        </ListTag>,
      );
      blockIndex += 1;
      continue;
    }

    if (/^ {0,3}>/.test(line)) {
      const quoteLines: string[] = [];

      while (lineIndex < lines.length && /^ {0,3}>/.test(lines[lineIndex])) {
        quoteLines.push(lines[lineIndex].replace(/^ {0,3}>[ \t]?/, ''));
        lineIndex += 1;
      }

      nodes.push(
        <blockquote key={`quote-${blockIndex}`} className={styles.blockquote}>
          <p>{renderInline(quoteLines.join('\n'), post, `quote-${blockIndex}`)}</p>
        </blockquote>,
      );
      blockIndex += 1;
      continue;
    }

    const paragraphLines: string[] = [];

    while (lineIndex < lines.length) {
      const paragraphLine = lines[lineIndex];

      if (!paragraphLine.trim() || (paragraphLines.length > 0 && isBlockStart(paragraphLine))) {
        break;
      }

      paragraphLines.push(paragraphLine.trim());
      lineIndex += 1;
    }

    if (paragraphLines.length > 0) {
      nodes.push(
        <p key={`paragraph-${blockIndex}`}>
          {renderInline(paragraphLines.join('\n'), post, `paragraph-${blockIndex}`)}
        </p>,
      );
      blockIndex += 1;
      continue;
    }

    lineIndex += 1;
  }

  return nodes;
}

function collectHeadingText(post: BlogPost): BlogHeading[] {
  const normalized = contentWithoutTitleHeading(post.content, post);

  if (!normalized) return [];

  const lines = normalized.split('\n');
  const headingRegistry = createHeadingRegistry();
  const rawHeadings: ParsedHeading[] = [];

  for (const line of lines) {
    const heading = headingFromLine(line);

    if (!heading) continue;

    rawHeadings.push({
      level: heading.level,
      text: heading.text,
    });
  }

  const normalizedHeadingLevels = normalizeHeadingLevels(rawHeadings);

  return rawHeadings.map((heading, index) => ({
    id: headingRegistry.next(heading.text),
    text: plainInlineText(heading.text),
    level: normalizedHeadingLevels[index] ?? 1,
  }));
}

function descriptionIsDuplicate(post: BlogPost): boolean {
  const description = normalizeForComparison(post.description);

  if (!description) return true;

  const contentWithoutLeadingHeadings = post.content
    .trim()
    .replace(/^(?:#{1,6}[ \t]+[^\n]*(?:\n|$)\s*)+/, '');
  const content = normalizeForComparison(contentWithoutLeadingHeadings);

  return content === description || content.startsWith(description);
}

export function getBlogHeadings(post: BlogPost): BlogHeading[] {
  return collectHeadingText(post);
}

export default function BlogBody({ post }: { post: BlogPost }) {
  const descriptionIsRedundant = descriptionIsDuplicate(post);

  return (
    <div className={styles.body}>
      {!descriptionIsRedundant && post.description ? (
        <p className={styles.description}>
          {renderInline(post.description, post, 'description')}
        </p>
      ) : null}
      <div className={styles.content}>{renderMarkdown(post.content, post)}</div>
    </div>
  );
}
