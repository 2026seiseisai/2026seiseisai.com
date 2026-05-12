import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '菁々祭 2026',
  description: '菁々祭公式ホームページ',
  openGraph: {
    title: '菁々祭 2026',
    description: '菁々祭公式ホームページ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '菁々祭 2026',
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
