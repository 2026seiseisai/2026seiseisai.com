import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';

import styles from '../page.module.css';

type NewsBodyProps = {
  body: string;
};

const inlineToken = /(\[[^\]\n]{1,240}\]\([^\s)\n]{1,2048}\)|\*\*[^*\n]+\*\*|__[^_\n]+__|`[^`\n]+`|\*[^*\n]+\*|_[^_\n]+_)/gu;
const unsafeUrl = /[\\\u0000-\u001f\u007f]|%(?:25)*(?:2f|5c|00|0[1-9a-f]|1[0-9a-f]|7f)/iu;
const officialHosts = new Set(['seiseisai.com', 'www.seiseisai.com']);

function safeLink(value: string): string | null {
  const candidate = value.trim();
  if (!candidate || candidate.length > 2048 || unsafeUrl.test(candidate)) return null;

  if (candidate.startsWith('/')) {
    if (candidate.startsWith('//')) return null;
    try {
      const parsed = new URL(candidate, 'https://www.seiseisai.com');
      if (parsed.origin !== 'https://www.seiseisai.com' || parsed.pathname.includes('//')) {
        return null;
      }
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      return null;
    }
  }

  try {
    const parsed = new URL(candidate);
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.port ||
      !officialHosts.has(parsed.hostname.toLowerCase())
    ) {
      return null;
    }
    return parsed.href;
  } catch {
    return null;
  }
}

function inlineMarkdown(value: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let index = 0;

  for (const match of value.matchAll(inlineToken)) {
    const start = match.index;
    if (start > cursor) nodes.push(value.slice(cursor, start));
    const token = match[0];
    const key = `${keyPrefix}-${index++}`;

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/u.exec(token);
    if (link) {
      const href = safeLink(link[2]);
      nodes.push(
        href ? (
          href.startsWith('/') ? (
            <Link href={href} key={key}>
              {link[1]}
            </Link>
          ) : (
            <a href={href} key={key} rel="noreferrer">
              {link[1]}
            </a>
          )
        ) : (
          <Fragment key={key}>{link[1]}</Fragment>
        ),
      );
    } else if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    cursor = start + token.length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

function renderBlocks(body: string): ReactNode[] {
  const lines = body.replace(/\r\n?/gu, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = /^```(?:\w+)?\s*$/u.exec(line.trim());
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/u.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push(
        <pre key={`code-${index}`}>
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/u.exec(line);
    if (heading) {
      const content = inlineMarkdown(heading[2], `heading-${index}`);
      blocks.push(
        heading[1].length === 1 ? (
          <h2 key={`heading-${index}`}>{content}</h2>
        ) : heading[1].length === 2 ? (
          <h3 key={`heading-${index}`}>{content}</h3>
        ) : (
          <h4 key={`heading-${index}`}>{content}</h4>
        ),
      );
      index += 1;
      continue;
    }

    const unordered = /^\s*[-*]\s+(.+)$/u.exec(line);
    if (unordered) {
      const items: ReactNode[] = [];
      while (index < lines.length) {
        const item = /^\s*[-*]\s+(.+)$/u.exec(lines[index]);
        if (!item) break;
        items.push(<li key={`ul-${index}`}>{inlineMarkdown(item[1], `ul-${index}`)}</li>);
        index += 1;
      }
      blocks.push(<ul key={`ul-block-${index}`}>{items}</ul>);
      continue;
    }

    const ordered = /^\s*\d+\.\s+(.+)$/u.exec(line);
    if (ordered) {
      const items: ReactNode[] = [];
      while (index < lines.length) {
        const item = /^\s*\d+\.\s+(.+)$/u.exec(lines[index]);
        if (!item) break;
        items.push(<li key={`ol-${index}`}>{inlineMarkdown(item[1], `ol-${index}`)}</li>);
        index += 1;
      }
      blocks.push(<ol key={`ol-block-${index}`}>{items}</ol>);
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(?:#{1,3}\s+|\s*[-*]\s+|\s*\d+\.\s+|```)/u.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    if (paragraph.length === 0) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`}>
        {inlineMarkdown(paragraph.join(' '), `paragraph-${index}`)}
      </p>,
    );
  }

  return blocks;
}

export default function NewsBody({ body }: NewsBodyProps) {
  return <div className={styles.newsBody}>{renderBlocks(body)}</div>;
}
