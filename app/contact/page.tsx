import styles from './page.module.css';

const CONTACT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeT-mOt49Q2VdqB5HNrAzSu8FVF14atYLZ8mWHflMst_gRlqw/viewform';
const CONTACT_FORM_EMBED_URL = `${CONTACT_FORM_URL}?embedded=true`;

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrowIcon}
      viewBox="0 0 24 24"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>Contact</h1>
            <p className={styles.lead}>
              何かご不明な点などございましたら、
              <br className={styles.desktopBreak} />
              いつでもお気軽にご相談ください。
            </p>
            <p className={styles.description}>
              下記のフォームに必要事項をご入力の上、「送信」ボタンを押してください。
              <br />
              担当者より回答・返信させていただきます。
            </p>
          </div>
          <div className={styles.infinityMark} aria-hidden="true">
            ∞
          </div>
        </header>

        <section className={styles.channels} aria-labelledby="contact-channels">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>CONTACT CHANNELS</p>
            <div>
              <h2 id="contact-channels">SNS・メール</h2>
              <p>X、Instagram、メールでもお問い合わせいただけます。</p>
            </div>
          </div>

          <div className={styles.channelGrid}>
            <a
              className={`${styles.channelCard} ${styles.xCard}`}
              href="https://x.com/seiseisai_tdj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="菁々祭公式Xを新しいタブで開く"
            >
              <span className={styles.channelIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </span>
              <span className={styles.channelCopy}>
                <span className={styles.channelName}>X</span>
                <span className={styles.channelDetail}>@seiseisai_tdj</span>
              </span>
              <ExternalArrow />
            </a>

            <a
              className={`${styles.channelCard} ${styles.instagramCard}`}
              href="https://www.instagram.com/seiseisai_tdj/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="菁々祭公式Instagramを新しいタブで開く"
            >
              <span className={styles.channelIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </span>
              <span className={styles.channelCopy}>
                <span className={styles.channelName}>Instagram</span>
                <span className={styles.channelDetail}>@seiseisai_tdj</span>
              </span>
              <ExternalArrow />
            </a>

            <a
              className={`${styles.channelCard} ${styles.emailCard}`}
              href="mailto:support@seiseisai.com"
              aria-label="support@seiseisai.com宛てにメールを作成する"
            >
              <span className={styles.channelIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M3.75 5.75h16.5v12.5H3.75z" />
                  <path d="m4.5 6.5 7.5 6 7.5-6" />
                </svg>
              </span>
              <span className={styles.channelCopy}>
                <span className={styles.channelName}>Email</span>
                <span className={styles.channelDetail}>support@seiseisai.com</span>
              </span>
              <ExternalArrow />
            </a>
          </div>
        </section>

        <section className={styles.formSection} aria-labelledby="contact-form">
          <div className={styles.formHeading}>
            <div>
              <p className={styles.sectionLabel}>FORM</p>
              <h2 id="contact-form">お問い合わせフォーム</h2>
            </div>
            <a
              className={styles.openFormLink}
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              別タブで開く
              <ExternalArrow />
            </a>
          </div>

          <div className={styles.formFrame}>
            <iframe
              src={CONTACT_FORM_EMBED_URL}
              title="第62回菁々祭 お問い合わせフォーム"
              loading="lazy"
            >
              読み込んでいます…
            </iframe>
          </div>
        </section>
      </div>
    </main>
  );
}
