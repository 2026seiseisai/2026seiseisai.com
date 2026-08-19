import styles from './page.module.css';
import Image from 'next/image';
import downloadPicture from "./DLPict.svg";
import InfMono from "./Inf-mono.svg";
import InfColor from "./Inf-color.svg";
import LogoMono from "./Logo-mono.svg";
import LogoColor from "./Logo-color.svg";
import doubleMono from "./double-mono.svg";
import doubleColor from "./double-color.svg";
import touch from "./Rectangle 1.svg";

export default function App() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Theme &amp; Logo</h1>
      <p className={styles.introduction}>テーマ･ロゴについての紹介に加え､関連データのダウンロードができるページです｡</p>

      <div className={styles.main}>
        <div className={styles.rectangle1} aria-hidden="true" />
        <div className={styles.rectangle2} aria-hidden="true" />
        <div className={styles.rectangle3} aria-hidden="true" />
        <div className={styles.rectangle4} aria-hidden="true" />
        <div className={styles.rectangle5} aria-hidden="true" />
        <div className={styles.rectangle6} aria-hidden="true" />
        <div className={styles.rectangle7} aria-hidden="true" />
        <h2 className={`${styles.sectionTitle} ${styles.title1}`}>Logotype</h2>
        <Image src={doubleColor} alt="Logo and Inf Color" className={styles.doubleColor} width={770} height={215} />
        <Image src={downloadPicture} alt="Download" className={styles.downloadImage1} width={38} height={38} />
        <Image src={doubleMono} alt="Logo and Inf Mono" className={styles.doubleMono} width={770} height={215} />
        <Image src={downloadPicture} alt="Download" className={styles.downloadImage2} width={38} height={38} />
        <p className={`${styles.sectionText} ${styles.text1}`}>第62回菁々祭のテーマは“Infinity”です。生徒が持つ、無限の可能性を十分に発揮して欲しいという思いが込められています。</p>

        <h2 className={`${styles.sectionTitle} ${styles.title2}`}>Logo</h2>
        <Image src={LogoColor} alt="Logo Color" className={styles.LogoColor} width={332} height={220} />
        <Image src={LogoMono} alt="Logo Mono" className={styles.LogoMono} width={332} height={220} />
        <Image src={downloadPicture} alt="Download" className={styles.downloadImage3} width={38} height={38} />
        <p className={`${styles.sectionText} ${styles.text2}`}>テーマの“∞”を中心に据えながら、東大寺学園が100周年を迎えることにちなみ、100を思わせるシェイプになっています。</p>

        <h2 className={`${styles.sectionTitle} ${styles.title3}`}>Type</h2>
        <Image src={InfColor} alt="Inf Color" className={styles.InfColor} width={334} height={137} />
        <Image src={InfMono} alt="Inf Mono" className={styles.InfMono} width={334} height={137} />
        <Image src={downloadPicture} alt="Download" className={styles.downloadImage4} width={38} height={38} />
        <p className={`${styles.sectionText} ${styles.text3}`}>太さを一定にすることで安定感を持たせ、文字の一部を繋げることで“続く”イメージを可視化しています。</p>

        <h2 className={`${styles.sectionTitle} ${styles.title4}`}>Guideline</h2>
        <Image src={touch} alt="touch" className={styles.touch} width={280} height={46} />
        <p className={styles.textLink}>infinity_guideline.pdf</p>
        <Image src={downloadPicture} alt="Download" className={styles.downloadImage5} width={38} height={38} />
        <p className={`${styles.sectionText} ${styles.text4}`}>ロゴの使用にあたってはこちらのPDFをよく読み、内容を遵守していただくようお願いします。</p>
      </div>
    </div>
  );
}