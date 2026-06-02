import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '東大寺学園菁々祭「Infinity」公式ホームページ',
  description: '菁々祭公式ホームページ',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
