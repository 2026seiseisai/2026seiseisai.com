import type { Metadata } from 'next';
import './globals.css';

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
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
