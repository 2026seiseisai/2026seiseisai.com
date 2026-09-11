import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Frame303Icon from './Frame303.svg';
import TwitterIcon from './Twitter.svg';
import InstagramIcon from './Instagram.svg';
import ArrowCircleIcon from './arrow-circle.svg';
import Frame447Icon from './Frame447.svg';
import { exhibitionData } from '../exhibition-data';
import { blogDataRaw } from '../../blog/blogs/blog-data';
import { clubMagazineLinks } from '../../brochures/brochures-data';
import styles from './page.module.css';

const brochureClubTargets: Record<string, { linkKey: string; clubId: string }> =
  {
    暗号同好会: { linkKey: '暗号同好会', clubId: 'angou' },
    囲碁将棋部: { linkKey: '囲碁将棋部', clubId: 'igo' },
    英語部: { linkKey: '英語研究部', clubId: 'eigo' },
    園芸部: { linkKey: '園芸部', clubId: 'engei' },
    'チェス・オセロ研究同好会': {
      linkKey: 'チェス研究会',
      clubId: 'chesu',
    },
    科学部: { linkKey: '科学部', clubId: 'kagaku' },
    クイズ研究部: { linkKey: 'クイズ研究会', clubId: 'quiz' },
    紅茶同好会: { linkKey: '紅茶同好会', clubId: 'koutya' },
    新聞部: { linkKey: '新聞部', clubId: 'sinbun' },
    自動車研究会: { linkKey: '自動車研究会', clubId: 'jidousya' },
    数学研究部: { linkKey: '数学研究部', clubId: 'suugaku' },
    鉄道研究部: { linkKey: '鉄道研究部1', clubId: 'tetudou' },
    電子工作部: { linkKey: '電子工作部', clubId: 'dennsikousaku' },
    東方研究会: { linkKey: '東方研究部', clubId: 'touhou' },
    道路研究会: { linkKey: '道路研究会', clubId: 'douro' },
    ドラえもん研究会: { linkKey: 'ドラえもん研究会', clubId: 'doraemon' },
    謎解き同好会: { linkKey: '謎解き同好会', clubId: 'nazo' },
    美術部: { linkKey: '美術部', clubId: 'bijyutu' },
    ポケモン同好会: { linkKey: 'ポケモン同好会', clubId: 'pokemon' },
    ラーメン研究会: { linkKey: 'ラーメン研究会', clubId: 'ramen' },
    歴史部菁史会: { linkKey: '歴史部', clubId: 'rekisi' },
    ロケット研究部: { linkKey: 'ロケット研究部', clubId: 'roketto' },
    民族音楽同好会: { linkKey: '民族音楽同好会', clubId: 'minnzoku' },
    独楽研究会: { linkKey: '独楽研究会', clubId: 'koma' },
    'Vocaloid&作曲同好会': {
      linkKey: 'VOCALOID＆作曲同好会',
      clubId: 'vocaloid',
    },
    'MGA（テーブルゲーム）同好会': { linkKey: 'MGA', clubId: 'MGA' },
  };

interface ExhibitionDetailProps {
  slug: string;
}

export default function ExhibitionDetail({ slug }: ExhibitionDetailProps) {
  let decodedSlug = slug;

  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    notFound();
  }

  if (!Object.hasOwn(exhibitionData, decodedSlug)) {
    notFound();
  }

  const exhibition = exhibitionData[decodedSlug];

  const hasEvents = exhibition.events && exhibition.events.length > 0;
  const brochureTarget = brochureClubTargets[decodedSlug];
  const hasClubMagazine = Boolean(
    brochureTarget && clubMagazineLinks[brochureTarget.linkKey],
  );

  return (
    <div className={styles.container}>
      {/* ヘッダーセクション */}
      <div className={styles.headerSection}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper}>
            {exhibition.icon && exhibition.icon.startsWith('<svg') ? (
              <div
                className={styles.iconImage}
                dangerouslySetInnerHTML={{ __html: exhibition.icon }}
              />
            ) : exhibition.icon ? (
              <Image
                src={exhibition.icon}
                alt={decodedSlug}
                width={48}
                height={48}
                className={styles.iconImage}
              />
            ) : null}
          </div>
          <div className={styles.titleArea}>
            <span className={styles.locationText}>{exhibition.location}</span>
            <h1 className={styles.exhibitionTitle}>{decodedSlug}</h1>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className={styles.backButtonWrapper}>
          <Link href="/exhibitions" className={styles.circleButton}>
            <Image
              src={Frame447Icon}
              alt="戻る"
              width={44}
              height={44}
              className={styles.backButtonIcon}
            />
          </Link>
        </div>
      </div>

      {/* 説明文 */}
      <p className={styles.descriptionText}>{exhibition.description}</p>

      {/* SNSリンク */}
      <div className={styles.snsLinks}>
        {exhibition.twitter_link && (
          <a
            href={exhibition.twitter_link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.snsButton}
          >
            <Image
              src={TwitterIcon}
              alt=""
              width={16}
              height={16}
              className={styles.snsIcon}
            />
            X (旧Twitter)
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.externalIcon}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
        {exhibition.instagram_link && (
          <a
            href={exhibition.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.snsButton}
          >
            <Image
              src={InstagramIcon}
              alt=""
              width={16}
              height={16}
              className={styles.snsIcon}
            />
            Instagram
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.externalIcon}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
        {exhibition.website_link && (
          <a
            href={exhibition.website_link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.snsButton}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.snsIcon}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
            ウェブサイト
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.externalIcon}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
      </div>

      {/* 2カラム枠（イベント開催情報 & 部誌） */}
      <div className={styles.gridSection2Col}>
        {/* イベント開催情報 */}
        <section className={styles.subSection}>
          <h2 className={styles.sectionHeading}>イベント開催情報</h2>
          <div className={styles.itemList}>
            {hasEvents ? (
              exhibition.events?.map((eventName, index) => (
                <Link
                  key={index}
                  href={`/events#event-${encodeURIComponent(eventName)}`}
                  className={styles.itemRow}
                >
                  <div className={styles.itemRowLeft}>
                    <Image
                      src={Frame303Icon}
                      alt=""
                      width={16}
                      height={16}
                      className={styles.itemIcon}
                    />
                    <span>{eventName}</span>
                  </div>
                  <Image
                    src={ArrowCircleIcon}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.arrowIcon}
                  />
                </Link>
              ))
            ) : (
              <div className={styles.emptyMessage}>
                イベント開催情報はありません。
              </div>
            )}
          </div>
        </section>

        {/* 部誌 */}
        <section className={styles.subSection}>
          <h2 className={styles.sectionHeading}>部誌</h2>
          <div className={styles.itemList}>
            {hasClubMagazine && brochureTarget ? (
              <Link
                href={`/brochures#club-${brochureTarget.clubId}`}
                className={styles.itemRow}
              >
                <div className={styles.itemRowLeft}>
                  <Image
                    src={Frame303Icon}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.itemIcon}
                  />
                  <span>{decodedSlug}の部誌を読む</span>
                </div>
                <Image
                  src={ArrowCircleIcon}
                  alt=""
                  width={16}
                  height={16}
                  className={styles.arrowIcon}
                />
              </Link>
            ) : (
              <div className={styles.emptyMessage}>部誌はありません。</div>
            )}
          </div>
        </section>
      </div>

      {/* 関連コンテンツ（ブログ） */}
      <section className={styles.blogsSectionContainer}>
        <h2 className={styles.sectionHeading}>関連コンテンツ</h2>
        {exhibition.blogs && exhibition.blogs.length > 0 ? (
          <div className={styles.blogsGrid}>
            {exhibition.blogs?.map((blogKey) => {
              const blog = blogDataRaw[blogKey as keyof typeof blogDataRaw];
              if (!blog) return null;

              return (
                <a
                  key={blogKey}
                  href={`/blog/${blogKey}`}
                  className={styles.blogCard}
                >
                  <div className={styles.blogThumbnailWrapper}>
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className={styles.noThumbnail}>画像エリア</div>
                    )}
                    {blog.date && blog.date.startsWith('2026') && (
                      <span className={styles.newBadge}>NEW!</span>
                    )}
                  </div>
                  <div className={styles.blogContentArea}>
                    <div className={styles.blogMetaTop}>
                      <span className={styles.blogDate}>{blog.date}</span>
                      <span className={styles.blogTag}>#{blog.topic}</span>
                    </div>
                    <p className={styles.blogTitle}>{blog.title}</p>
                    <div className={styles.blogFooter}>
                      <span className={styles.blogAuthor}>{blog.author}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyMessage}>
            関連コンテンツはありません。
          </div>
        )}
      </section>
    </div>
  );
}
