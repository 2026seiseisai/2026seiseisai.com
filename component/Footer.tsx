"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  "展示・発表": [
    { label: "展示一覧", href: "/exhibits" },
    { label: "ステージ", href: "/stage" },
    { label: "体験コーナー", href: "/experience" },
  ],
  "飲食": [
    { label: "フード", href: "/food" },
    { label: "ドリンク", href: "/drinks" },
    { label: "スイーツ", href: "/sweets" },
  ],
  "案内": [
    { label: "アクセス", href: "/access" },
    { label: "タイムテーブル", href: "/timetable" },
    { label: "FAQ", href: "/faq" },
    { label: "お問い合わせ", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "transparent", width: "100%" }}>
      {/* ウェーブ区切り */}
      <div
        style={{
          height: "137px",
          background: "linear-gradient(to bottom right, #ffffff 50%, #0A1B6F 50%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 1440 137"
          preserveAspectRatio="none"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 137 L1440 137 L1440 0 Q720 137 0 0 Z" fill="#0A1B6F" />
        </svg>
      </div>

      {/* メインフッターエリア */}
      <div
        style={{
          backgroundColor: "#0A1B6F",
          padding: "60px 80px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* 左: ロゴ・説明 */}
          <div style={{ minWidth: "200px" }}>
            <div
              style={{
                color: "#00AABE",
                fontSize: "28px",
                fontWeight: "700",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                letterSpacing: "0.05em",
                lineHeight: "1.2",
                marginBottom: "8px",
              }}
            >
              文化祭
            </div>
            <div
              style={{
                color: "#DB5492",
                fontSize: "13px",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                marginBottom: "20px",
                letterSpacing: "0.05em",
              }}
            >
              Cultural Festival 2025
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "12px",
                lineHeight: "1.8",
                maxWidth: "240px",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              }}
            >
              今年も開催します！
              <br />
              みなさんのご来場をお待ちしています。
            </p>
          </div>

          {/* 中: リンク群 */}
          <div
            style={{
              display: "flex",
              gap: "60px",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <div
                  style={{
                    color: "#DB5492",
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                    marginBottom: "16px",
                    letterSpacing: "0.08em",
                  }}
                >
                  {category}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = "#00AABE";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 右: SNSリンク */}
          <div>
            <div
              style={{
                color: "#DB5492",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                marginBottom: "16px",
                letterSpacing: "0.08em",
              }}
            >
              SNS
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {/* X (Twitter) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="10" height="10" fill="#0A1B6F" />
                  <path d="M14.31 2.631H16.14L11.95 7.408L16.86 14.362H13.03L10.07 10.515L6.69 14.362H4.86L9.34 9.248L4.63 2.638H8.55L11.24 6.148L14.31 2.631ZM13.69 13.27H14.69L7.86 3.698H6.78L13.69 13.27Z" fill="white" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.56 2.17C19.31 1.27 18.73 0.69 17.83 0.44C16.8 0.16 10 0 10 0C10 0 3.2 0.16 2.17 0.44C1.27 0.69 0.69 1.27 0.44 2.17C0.16 3.2 0 7 0 7C0 7 0.16 10.8 0.44 11.83C0.69 12.73 1.27 13.31 2.17 13.56C3.2 13.84 10 14 10 14C10 14 16.8 13.84 17.83 13.56C18.73 13.31 19.31 12.73 19.56 11.83C19.84 10.8 20 7 20 7C20 7 19.84 3.2 19.56 2.17ZM8 10V4L13.19 7L8 10Z" fill="#DB5492" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2 2C16.3 2 18 3.7 18 5.8V14.2C18 16.3 16.3 18 14.2 18H5.8C3.7 18 2 16.3 2 14.2V5.8C2 3.7 3.7 2 5.8 2H14.2ZM10 5C7.24 5 5 7.24 5 10C5 12.76 7.24 15 10 15C12.76 15 15 12.76 15 10C15 7.24 12.76 5 10 5ZM10 7C11.66 7 13 8.34 13 10C13 11.66 11.66 13 10 13C8.34 13 7 11.66 7 10C7 8.34 8.34 7 10 7ZM15.25 3.5C14.836 3.5 14.5 3.836 14.5 4.25C14.5 4.664 14.836 5 15.25 5C15.664 5 16 4.664 16 4.25C16 3.836 15.664 3.5 15.25 3.5Z" fill="#00AABE" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ボーダー */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "40px auto 0",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "11px",
              fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              margin: 0,
            }}
          >
            © 2025 文化祭実行委員会. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["プライバシーポリシー", "利用規約"].map((label) => (
              <Link
                key={label}
                href="#"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
