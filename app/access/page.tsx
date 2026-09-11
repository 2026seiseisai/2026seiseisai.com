// page.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import headerImage from './header.svg';
import trainMapImage from './train_map.svg';
import styles from './page.module.css';

const busTimetable = [
  { date: '2026-09-12', label: '9月12日（土）', extraDepartures: ['18:15'] },
  {
    date: '2026-09-13',
    label: '9月13日（日）',
    extraDepartures: ['18:20', '18:40', '19:00', '19:20'],
  },
];

const AccessPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>アクセス | 東大寺学園中・高等学校</title>
      </Head>

      <div className={styles.container}>
        {/* 1. ヘッダー画像 */}
        <Image
          src={headerImage}
          alt="東大寺学園キャンパス"
          width={1200}
          height={400}
          className={styles.headerImage}
          priority
        />

        {/* 2. 学校名 */}
        <h1 className={styles.schoolName}>東大寺学園中・高等学校</h1>

        {/* 3. 学校情報表 */}
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>所在地</th>
              <td>〒631-0803 奈良県奈良市山陵町1375</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>0742-47-5511</td>
            </tr>
            <tr>
              <th>FAX</th>
              <td>0742-47-6164</td>
            </tr>
            <tr>
              <th>学校HP</th>
              <td>
                <a
                  href="https://www.tdj.ac.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.schoolLink}
                >
                  https://www.tdj.ac.jp
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 4. アクセス案内（Googleマップ） */}
        <h2 className={styles.sectionHeading}>アクセス</h2>
        <div className={styles.mapSection}>
          {/* ここに Googleマップからコピーした iframe を貼り付けます */}
          {/* クラス名に styles.googleMap を追加して、枠のサイズを合わせます */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13118.723774730854!2d135.77831102660247!3d34.71322650700483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60013c8734fc9973%3A0x55c23a5ae3354ec9!2z5p2x5aSn5a-65a2m5ZyS5Lit5a2m5qCh44O76auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1786944459692!5m2!1sja!2sjp"
            title="東大寺学園へのアクセスマップ"
            width="400"
            height="250"
            style={{ border: 0, flexShrink: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.googleMap} // 以前のCSSスタイルを適用
          />

          <div className={styles.mapDescription}>
            <p>近鉄高の原駅より</p>
            <p>徒歩 約25分</p>
            <p>バス 約7分（料金 250円）</p>
            <br />
            <p>近鉄平城駅より</p>
            <p>徒歩 約25分</p>
          </div>
        </div>

        {/* 5. バス運行表 */}
        <section className={styles.busSection} aria-labelledby="bus-timetable">
          <h2 id="bus-timetable" className={styles.sectionHeading}>バス運行表</h2>
          <p className={styles.busNotice}>
            <strong>保護者・一般来場者の方は、高の原駅8:30発からご乗車いただけます。</strong>
            <span>8:00・8:15発は在校生専用です。</span>
          </p>
          <div className={styles.busDays}>
            {busTimetable.map((day) => (
              <section key={day.date} className={styles.busDay} aria-labelledby={`bus-${day.date}`}>
                <h3 id={`bus-${day.date}`} className={styles.busDate}>
                  <time dateTime={day.date}>{day.label}</time>
                </h3>
                <dl className={styles.busRoutes}>
                  <div className={styles.busRoute}>
                    <dt>高の原駅発 → 東大寺学園行</dt>
                    <dd>
                      <p className={styles.busHours}>8:00〜15:00</p>
                      <p>毎時 00・15・30・45分発</p>
                      <p>最終 15:00発</p>
                    </dd>
                  </div>
                  <div className={styles.busRoute}>
                    <dt>東大寺学園発 → 高の原駅行</dt>
                    <dd>
                      <p className={styles.busHours}>10:00〜18:00</p>
                      <p>毎時 00・15・30・45分発</p>
                      <p className={styles.busExtraLabel}>18:00以降の便</p>
                      <ul className={styles.busExtraTimes} aria-label={`${day.label}の18:00以降の発車時刻`}>
                        {day.extraDepartures.map((departure) => (
                          <li key={departure}>{departure}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </section>
            ))}
          </div>
          <p className={styles.busFootnote}>
            ※混雑状況により、ダイヤが変更になる場合もございます。予めご了承ください。
          </p>
          <a
            href="/access/bus-timetable-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.schoolLink} ${styles.busPdfLink}`}
          >
            バス運行表の原本PDFを開く（新しいタブ）
          </a>
        </section>

        {/* 6. 路線図 */}
        <h2 className={styles.sectionHeading}>路線図</h2>
        <Image
          src={trainMapImage}
          alt="路線図"
          width={1000}
          height={700}
          className={styles.mapImage}
          style={{ objectFit: 'contain' }}
        />

        {/* 7. 高の原駅からの行き方（YouTube動画埋め込み） */}
        <h2 className={styles.sectionHeading}>高の原•平城駅からの行き方</h2>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/Xavpmvhk8ng"
            title="高の原•平城駅からの行き方"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default AccessPage;
