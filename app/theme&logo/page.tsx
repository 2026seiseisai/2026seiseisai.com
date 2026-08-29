import styles from './page.module.css';
import Image from 'next/image';
import downloadPicture from './DLPict.svg';
import InfMono from './Inf-mono.svg';
import InfColor from './Inf-color.svg';
import LogoMono from './Logo-mono.svg';
import LogoColor from './Logo-color.svg';
import doubleMono from './double-mono.svg';
import doubleColor from './double-color.svg';
import infMonoDownload from './inf-mono.png';
import infColorDownload from './inf-color.png';
import logoMonoDownload from './Logo-mono.png';
import logoColorDownload from './Logo-color.png';
import doubleMonoDownload from './double-mono.png';
import doubleColorDownload from './double-color.png';

function DownloadButton({
  file,
  fileName,
  className,
}: {
  file: { src: string };
  fileName: string;
  className: string;
}) {
  const downloadName = fileName.replace(/-D(?=\.[^.]+$)/, '');

  return (
    <a
      href={file.src}
      download={downloadName}
      className={`${styles.downloadButton} ${className}`}
    >
      <Image src={downloadPicture} alt="Download" width={38} height={38} />
    </a>
  );
}

export default function App() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Theme &amp; Logo</h1>
      <p className={styles.introduction}>
        テーマ･ロゴについての紹介に加え､関連データのダウンロードができるページです｡
      </p>

      <div className={styles.main}>
        <div className={styles.rectangle1} aria-hidden="true" />
        <div className={styles.rectangle2} aria-hidden="true" />
        <div className={styles.rectangle3} aria-hidden="true" />
        <div className={styles.rectangle4} aria-hidden="true" />
        <div className={styles.rectangle5} aria-hidden="true" />
        <div className={styles.rectangle6} aria-hidden="true" />
        <h2 className={`${styles.sectionTitle} ${styles.title1}`}>Logotype</h2>
        <Image
          src={doubleColor}
          alt="Logo and Inf Color"
          className={styles.doubleColor}
          width={770}
          height={215}
        />
        <DownloadButton
          file={doubleColorDownload}
          fileName="double-color-D.png"
          className={styles.doubleColor_D}
        />
        <Image
          src={doubleMono}
          alt="Logo and Inf Mono"
          className={styles.doubleMono}
          width={770}
          height={215}
        />
        <DownloadButton
          file={doubleMonoDownload}
          fileName="double-mono-D.png"
          className={styles.doubleMono_D}
        />
        <p className={`${styles.sectionText} ${styles.text1}`}>
          第62回菁々祭のテーマは“Infinity”です。生徒が持つ、無限の可能性を十分に発揮して欲しいという思いが込められています。
        </p>

        <h2 className={`${styles.sectionTitle} ${styles.title2}`}>Logo</h2>
        <Image
          src={LogoColor}
          alt="Logo Color"
          className={styles.LogoColor}
          width={332}
          height={220}
        />
        <DownloadButton
          file={logoColorDownload}
          fileName="Logo-color-D.png"
          className={styles.LogoColor_D}
        />
        <Image
          src={LogoMono}
          alt="Logo Mono"
          className={styles.LogoMono}
          width={332}
          height={220}
        />
        <DownloadButton
          file={logoMonoDownload}
          fileName="Logo-mono-D.png"
          className={styles.LogoMono_D}
        />
        <p className={`${styles.sectionText} ${styles.text2}`}>
          テーマの“∞”を中心に据えながら、東大寺学園が100周年を迎えることにちなみ、100を思わせるシェイプになっています。
        </p>

        <h2 className={`${styles.sectionTitle} ${styles.title3}`}>Typo</h2>
        <Image
          src={InfColor}
          alt="Inf Color"
          className={styles.InfColor}
          width={334}
          height={137}
        />
        <DownloadButton
          file={infColorDownload}
          fileName="Inf-color-D.png"
          className={styles.InfColor_D}
        />
        <Image
          src={InfMono}
          alt="Inf Mono"
          className={styles.InfMono}
          width={334}
          height={137}
        />
        <DownloadButton
          file={infMonoDownload}
          fileName="Inf-mono-D.png"
          className={styles.InfMono_D}
        />
        <p className={`${styles.sectionText} ${styles.text3}`}>
          太さを一定にすることで安定感を持たせ、文字の一部を繋げることで“続く”イメージを可視化しています。
        </p>
      </div>
    </div>
  );
}
