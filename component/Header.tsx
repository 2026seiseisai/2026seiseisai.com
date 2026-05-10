"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { label: "トップ", href: "/" },
  { label: "プログラム", href: "/program" },
  { label: "展示・発表", href: "/exhibits" },
  { label: "飲食", href: "/food" },
  { label: "アクセス", href: "/access" },
];

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#0A1B6F",
        height: "64px",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxSizing: "border-box",
      }}
    >
      {/* ロゴ（SVGのアイコン部分を再現） */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        {/* I字ロゴマーク（SVGから抽出） */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="8" height="0.5" fill="white" />
          <rect x="0" y="0" width="0.5" height="12" fill="white" />
          <rect x="0" y="11.5" width="8" height="0.5" fill="white" />
          <rect x="8" y="0" width="8" height="0.5" fill="white" />
          <rect x="15.5" y="0" width="0.5" height="12" fill="white" />
          <rect x="8" y="11.5" width="8" height="0.5" fill="white" />
        </svg>
        <span
          style={{
            color: "#DB5492",
            fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
          }}
        >
          文化祭 2025
        </span>
      </Link>

      {/* ナビゲーション */}
      <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "13px",
              fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              fontWeight: "400",
              letterSpacing: "0.03em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#00AABE";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "#ffffff";
            }}
          >
            {item.label}
          </Link>
        ))}

        {/* チケット購入ボタン */}
        <Link
          href="/tickets"
          style={{
            backgroundColor: "#00AABE",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "13px",
            fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
            fontWeight: "500",
            padding: "5px 18px",
            borderRadius: "10px",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
          }}
        >
          reservation
        </Link>
      </nav>
    </header>
  );
}
