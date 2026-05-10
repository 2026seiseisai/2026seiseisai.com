import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "文化祭 2025",
  description: "文化祭公式ホームページ",
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
