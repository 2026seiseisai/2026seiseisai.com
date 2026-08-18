type ResponsivePagePlaceholderProps = {
  title: string;
  description?: string;
};

export default function ResponsivePagePlaceholder({
  title,
  description = 'このページは現在準備中です。',
}: ResponsivePagePlaceholderProps) {
  return (
    <main
      className="page-common"
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        padding: '40px 20px',
        boxSizing: 'border-box',
      }}
    >
      <section
        className="pc-only"
        style={{
          width: 'min(900px, 100%)',
          border: '1px solid rgba(10, 27, 111, 0.15)',
          borderRadius: '20px',
          padding: '36px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: 0,
            color: '#0A1B6F',
            fontSize: '40px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: '14px 0 0',
            color: '#334155',
            fontSize: '18px',
            lineHeight: 1.8,
          }}
        >
          {description}
          （PC表示）
        </p>
      </section>

      <section
        className="sp-only"
        style={{
          width: 'min(520px, 100%)',
          border: '1px solid rgba(10, 27, 111, 0.15)',
          borderRadius: '16px',
          padding: '24px 20px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: 0,
            color: '#0A1B6F',
            fontSize: '32px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: '12px 0 0',
            color: '#334155',
            fontSize: '16px',
            lineHeight: 1.8,
          }}
        >
          {description}
          （スマホ表示）
        </p>
      </section>
    </main>
  );
}
