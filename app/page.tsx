import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 40px",
          background: "linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "800px", width: "100%" }}>
          <div
            style={{
              color: "#00AABE",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.2em",
              fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Cultural Festival 2025
          </div>

          <h1
            style={{
              color: "#0A1B6F",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: "700",
              fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              lineHeight: "1.1",
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            文化祭
          </h1>

          <div
            style={{
              width: "60px",
              height: "4px",
              background: "#DB5492",
              margin: "0 auto 32px",
              borderRadius: "2px",
            }}
          />

          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: "1.9",
              fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
              maxWidth: "600px",
              margin: "0 auto 48px",
            }}
          >
            今年の文化祭が開幕します。
            <br />
            展示・ステージ・飲食など様々な催しをご用意しました。
            <br />
            皆様のお越しをお待ちしております。
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/program"
              style={{
                backgroundColor: "#0A1B6F",
                color: "#ffffff",
                textDecoration: "none",
                padding: "14px 36px",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              プログラムを見る
            </a>
            <a
              href="/access"
              style={{
                backgroundColor: "transparent",
                color: "#0A1B6F",
                textDecoration: "none",
                padding: "14px 36px",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                fontWeight: "600",
                letterSpacing: "0.05em",
                border: "2px solid #0A1B6F",
              }}
            >
              アクセス
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
