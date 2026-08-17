// page.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import headerImage from './header.svg';
import trainMapImage from './train_map.svg';
import styles from './page.module.css';

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
              <td>0742-47-6364</td>
            </tr>
            <tr>
              <th>学校HP</th>
              <td>
                <a href="https://www.todaiji.ac.jp" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee', textDecoration: 'underline' }}>
                  https://www.todaiji.ac.jp
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
    width="400" 
    height="250" 
    style={{ border: 0, flexShrink: 0 }} 
    allowFullScreen={true} 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    className={styles.googleMap} // 以前のCSSスタイルを適用
  />
  
  <div className={styles.mapDescription}>
    <p>近鉄奈良線「大和西大寺駅」下車</p>
    <p>北口より 徒歩 約25分</p>
    <p>タクシー 約10分（料金 約1500円）</p>
    <br />
    <p>近鉄「平城駅」下車</p>
    <p>徒歩 約15分</p>
  </div>
</div>

        {/* 5. バス運行表 */}
        <h2 className={styles.sectionHeading}>バス運行表</h2>
        <div className={styles.placeholderBox}>
          {/* バス運行表の画像があればここに配置 */}
        </div>

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

        {/* 7. 登下校経路からの行き方（YouTube動画埋め込み） */}
        <h2 className={styles.sectionHeading}>登下校経路からの行き方</h2>
        <div className={styles.videoWrapper}>
          <iframe 
            src="https://www.youtube.com/embed/ZDUpFBZTVwQ" 
            title="登下校経路からの行き方"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </>
  );
};

export default AccessPage;
