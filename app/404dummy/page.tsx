import Link from 'next/link';

export default function NotFoundDummyPage() {
  return (
    <main
      className="page-common"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '120px 20px',
        boxSizing: 'border-box',
        background:
          'radial-gradient(circle at top left, rgba(219, 84, 146, 0.14), transparent 28%), radial-gradient(circle at top right, rgba(0, 170, 190, 0.18), transparent 32%), linear-gradient(180deg, #f6f8ff 0%, #ffffff 100%)',
      }}
    >
      <section
        style={{
          width: 'min(100%, 760px)',
          backgroundColor: '#ffffff',
          border: '1px solid rgba(10, 27, 111, 0.08)',
          borderRadius: '28px',
          boxShadow: '0 24px 80px rgba(10, 27, 111, 0.12)',
          padding: 'clamp(28px, 6vw, 60px)',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#DB5492',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 900,
            letterSpacing: '0.12em',
            lineHeight: 1,
          }}
        >
          404
        </p>
        <h1
          style={{
            margin: '18px 0 14px',
            color: '#0A1B6F',
            fontSize: 'clamp(34px, 6vw, 68px)',
            lineHeight: 1,
            letterSpacing: '-0.05em',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            margin: 0,
            color: '#334155',
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            lineHeight: 1.8,
          }}
        >
          お探しのページは見つかりませんでした。メニューから別のページへ移動してください。
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginTop: '32px',
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              backgroundColor: '#0A1B6F',
              padding: '12px 18px',
              borderRadius: '999px',
              fontWeight: 700,
            }}
          >
            Topへ戻る
          </Link>
          <Link
            href="https://mirai-compass.net/usr/tdijgj/event/evtIndex.jsf"
            style={{
              textDecoration: 'none',
              color: '#0A1B6F',
              backgroundColor: '#ffffff',
              border: '2px solid #0A1B6F',
              padding: '10px 16px',
              borderRadius: '999px',
              fontWeight: 700,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            入場申し込み
          </Link>
        </div>
      </section>
    </main>
  );
}
