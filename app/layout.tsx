import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import SiteChrome from './SiteChrome';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: '東大寺学園菁々祭「Infinity」公式ホームページ',
  description: '菁々祭公式ホームページ',
  openGraph: {
    title: '東大寺学園菁々祭「Infinity」公式ホームページ',
    description: '菁々祭公式ホームページ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '東大寺学園菁々祭「Infinity」公式ホームページ',
    description: '菁々祭公式ホームページ',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${notoSansJP.className} ${notoSansJP.variable}`}
        style={{ margin: 0, padding: '72px 0 0 0' }}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
