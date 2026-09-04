import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | 東大寺学園菁々祭「Infinity」公式ホームページ',
  description:
    '東大寺学園菁々祭公式ホームページにおける個人情報の取り扱いについてご案内します。',
};

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className={styles.externalLink}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <article className={styles.sheet}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>62ND SEISEISAI / PRIVACY</p>
            <h1 className={styles.title}>
              <span>P</span>rivacy Policy
            </h1>
            <p className={styles.subtitle}>プライバシーポリシー</p>
          </div>
          <span className={styles.watermark} aria-hidden="true">
            PRIVACY POLICY
          </span>
        </header>

        <div className={styles.content}>
          <section className={styles.policySection}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>PRIVACY</p>
              <h2>個人情報の取り扱いについて</h2>
            </div>
            <div className={styles.sectionBody}>
              <p>
                東大寺学園菁々祭公式ホームページ（以下「本サイト」）では、お問い合わせへの回答や運営上必要なご連絡のため、
                Googleフォームまたはメールを通じて、お名前、メールアドレス、電話番号（任意）、都道府県、お問い合わせ内容などを取得することがあります。
                取得した情報は必要な範囲で適切に管理し、法令に基づく場合を除いて、ご本人の同意なく第三者へ提供しません。
              </p>
              <p>
                本サイトではGoogleフォーム、Googleマップ、YouTubeを利用しています。
                利用時に各サービスがCookieなどを使用する場合がありますが、本サイト自体はGoogle Analyticsなどのアクセス解析Cookieを設置していません。
                詳細は
                <ExternalLink href="https://policies.google.com/privacy?hl=ja">
                  Google プライバシーポリシー
                </ExternalLink>
                および
                <ExternalLink href="https://policies.google.com/terms?hl=ja">
                  Google 利用規約
                </ExternalLink>
                をご確認ください。
              </p>
              <p>
                本方針に関するお問い合わせは、
                <a className={styles.textLink} href="mailto:support@seiseisai.com">
                  support@seiseisai.com
                </a>
                または
                <Link className={styles.textLink} href="/contact">
                  お問い合わせページ
                </Link>
                からご連絡ください。
                内容は必要に応じて改定し、本ページ上でお知らせします。
              </p>
            </div>
          </section>

          <p className={styles.updatedAt}>制定日：2026年9月4日</p>
        </div>
      </article>
    </main>
  );
}
