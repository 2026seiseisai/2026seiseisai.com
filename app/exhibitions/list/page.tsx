import Image from 'next/image';
import Link from 'next/link';
import { exhibitionData, ExhibitionFloor, locations } from '../exhibition-data';
import TwitterIcon from '../[slug]/Twitter.svg';
import InstagramIcon from '../[slug]/Instagram.svg';
import ExhibitionBuildingTabs from './ExhibitionBuildingTabs';
import styles from './page.module.css';

const buildings = [
  {
    id: 'junior',
    label: '中学棟',
    floors: [ExhibitionFloor.中学棟1階, ExhibitionFloor.中学棟2階, ExhibitionFloor.中学棟3階],
  },
  {
    id: 'senior',
    label: '高校棟',
    floors: [ExhibitionFloor.高校棟1階, ExhibitionFloor.高校棟2階, ExhibitionFloor.高校棟3階, ExhibitionFloor.高校棟4階],
  },
  { id: 'gym', label: '第二体育館', floors: [ExhibitionFloor.第二体育館] },
];

type Exhibition = (typeof exhibitionData)[string];

function SocialLinks({ name, exhibition }: { name: string; exhibition: Exhibition }) {
  const links = [
    { href: exhibition.twitter_link, label: 'X（旧Twitter）', icon: TwitterIcon },
    { href: exhibition.instagram_link, label: 'Instagram', icon: InstagramIcon },
    { href: exhibition.facebook_link, label: 'Facebook', icon: null },
    { href: exhibition.website_link, label: 'ウェブサイト', icon: null },
  ].filter((link) => link.href);

  if (links.length === 0) {
    return (
      <span className={styles.noSocial}>
        <span aria-hidden="true">—</span>
        <span className="visually-hidden">SNSの登録はありません</span>
      </span>
    );
  }

  return (
    <ul className={styles.socialLinks}>
      {links.map(({ href, label, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={`${name}の${label}（新しいタブで開きます）`}
            title={`${name}の${label}`}
          >
            {icon ? <Image src={icon} alt="" width={18} height={18} className={styles.socialIcon} /> : null}
            <span className={icon ? styles.socialLabel : undefined}>{label}</span>
            <span className={styles.externalMark} aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ExhibitionsListPage() {
  const entries = Object.entries(exhibitionData);
  const panels = buildings.map((building) => {
    const exhibitions = entries.filter(([, exhibition]) =>
      building.floors.includes(locations[exhibition.location]),
    );

    return {
      id: building.id,
      label: building.label,
      count: exhibitions.length,
      content: (
        <table className={styles.table}>
          <caption className="visually-hidden">{building.label}の展示団体一覧</caption>
          <colgroup>
            <col className={styles.logoColumn} />
            <col className={styles.nameColumn} />
            <col className={styles.locationColumn} />
            <col className={styles.socialColumn} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col"><span className={styles.columnEnglish}>Logo</span></th>
              <th scope="col"><span className={styles.columnEnglish} aria-hidden="true">Name</span><span className={styles.columnJapanese}>団体名</span></th>
              <th scope="col"><span className={styles.columnEnglish} aria-hidden="true">Location</span><span className={styles.columnJapanese}>展示場所</span></th>
              <th scope="col"><span className={styles.columnEnglish} aria-hidden="true">SNS</span><span className={styles.columnJapanese}>SNS一覧</span></th>
            </tr>
          </thead>
          <tbody>
            {exhibitions.map(([name, exhibition]) => (
              <tr key={name}>
                <td className={styles.logoCell}>
                  {exhibition.icon.startsWith('<svg') ? (
                    // SVG comes only from the checked-in exhibition icon catalog.
                    <span className={styles.logo} aria-hidden="true" dangerouslySetInnerHTML={{ __html: exhibition.icon }} />
                  ) : (
                    <Image src={exhibition.icon} alt="" width={44} height={44} className={styles.logo} />
                  )}
                </td>
                <th scope="row">
                  <Link href={`/exhibitions/${encodeURIComponent(name)}`} prefetch={false} className={styles.nameLink}>
                    {name}
                  </Link>
                </th>
                <td className={styles.location}>{exhibition.location}</td>
                <td><SocialLinks name={name} exhibition={exhibition} /></td>
              </tr>
            ))}
            {exhibitions.length === 0 ? (
              <tr><td colSpan={4} className={styles.empty}>展示情報は準備中です。</td></tr>
            ) : null}
          </tbody>
        </table>
      ),
    };
  });

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Exhibition一覧</h1>
        <ExhibitionBuildingTabs panels={panels} />
      </div>
    </main>
  );
}
