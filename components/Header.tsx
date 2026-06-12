'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Top', href: '/' },
  { label: 'Theme & Logo', href: '/theme' },
  { label: 'News', href: '/news' },
  { label: 'Access', href: '/access' },
];

const DRAWER_DATA = [
  {
    title: 'Overview',
    links: [
      { label: 'Top', href: '/' },
      { label: 'Theme & Logo', href: '/404' },
      { label: 'News', href: '/404' },
      { label: 'Access', href: '/404' },
    ],
  },
  {
    title: 'Guide',
    links: [
      { label: 'Events', href: '/404' },
      { label: 'Exhibition', href: '/404' },
      { label: 'Bazaar', href: '/404' },
      { label: 'Goods', href: '/404' },
    ],
  },
  {
    title: 'Contents',
    links: [
      { label: 'Blog', href: '/404' },
      { label: 'Gallery', href: '/404' },
      { label: 'Special', href: '/404' },
      { label: 'Archives', href: '/404' },
    ],
  },
];

// SVGロゴをインラインで定義
function InfinityLogo() {
  return (
    <svg
      width="100"
      height="40"
      viewBox="0 0 60 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.63046 18.7302L3.77588 18.8356V7.84282C3.77588 7.65549 3.93151 7.49353 4.12405 7.4828L5.63146 7.39597V18.7302H5.63046Z"
        fill="white"
      />
      <path
        d="M11.1974 18.4142L9.3418 18.5196V7.18339L10.8502 7.09656C11.0427 7.08583 11.1984 7.22925 11.1984 7.41657V18.4142H11.1974Z"
        fill="white"
      />
      <path
        d="M11.1972 7.41657V8.55029C11.1972 8.73859 11.0416 8.89957 10.849 8.91031L4.12308 9.29667C3.93054 9.3074 3.7749 9.16398 3.7749 8.97665V7.84294C3.7749 7.65561 3.93054 7.49365 4.12308 7.48292L10.849 7.09656C11.0416 7.08583 11.1972 7.22925 11.1972 7.41657Z"
        fill="white"
      />
      <path
        d="M29.7414 17.3615L27.8809 17.4669V6.45753C27.8809 6.26923 28.0375 6.10825 28.23 6.09654L29.7414 6.0097V17.3605V17.3615Z"
        fill="white"
      />
      <path
        d="M35.3249 17.0443L33.4634 17.1497V5.79597L34.9758 5.70914C35.1683 5.69841 35.3249 5.84183 35.3249 6.03013V17.0443Z"
        fill="white"
      />
      <path
        d="M35.3251 6.03009V7.16575C35.3251 7.35405 35.1685 7.51504 34.9759 7.52674L28.23 7.91408C28.0375 7.92481 27.8809 7.78139 27.8809 7.59406V6.45937C27.8809 6.27107 28.0375 6.11009 28.23 6.09838L34.9759 5.71007C35.1685 5.69934 35.3251 5.84276 35.3251 6.03106V6.03009Z"
        fill="white"
      />
      <path
        d="M21.1564 6.74541V8.56013L13.1216 9.02162V7.20689L21.1564 6.74541Z"
        fill="white"
      />
      <path
        d="M21.1567 1.51199V3.32672L16.5576 3.5921C16.3651 3.60283 16.2095 3.45941 16.2095 3.27208V2.13837C16.2095 1.95006 16.3651 1.78908 16.5576 1.77835L21.1567 1.51199Z"
        fill="white"
      />
      <path
        d="M18.067 18.0239L16.2095 18.1292V2.13821C16.2095 1.94991 16.3651 1.78893 16.5576 1.77819L18.067 1.69136V18.0248V18.0239Z"
        fill="white"
      />
      <path
        d="M24.9426 17.6337L23.083 17.739V6.73257C23.083 6.54427 23.2386 6.38329 23.4312 6.37255L24.5934 6.30627C24.7859 6.29554 24.9416 6.43896 24.9416 6.6263V17.6337H24.9426Z"
        fill="#DB5492"
      />
      <path
        d="M24.5934 3.80459L23.4312 3.87184C23.2386 3.88257 23.083 3.73915 23.083 3.55183V2.41715C23.083 2.22884 23.2386 2.06786 23.4312 2.05616L24.5934 1.98891C24.7859 1.97818 24.9416 2.1216 24.9416 2.30893V3.44361C24.9416 3.63191 24.7859 3.7929 24.5934 3.80459Z"
        fill="#DB5492"
      />
      <path
        d="M39.779 2.92946L38.6148 2.99671C38.4223 3.00745 38.2656 2.86403 38.2656 2.6757V1.54102C38.2656 1.35271 38.4223 1.19173 38.6148 1.18099L39.779 1.11374C39.9715 1.10301 40.1282 1.24643 40.1282 1.43473V2.56941C40.1282 2.75772 39.9715 2.91967 39.779 2.92946Z"
        fill="#00AABE"
      />
      <path
        d="M40.1292 16.7711L38.2666 16.8765V5.86025C38.2666 5.67195 38.4232 5.51097 38.6158 5.49927L39.78 5.43202C39.9725 5.42129 40.1292 5.5647 40.1292 5.75301V16.7711Z"
        fill="#00AABE"
      />
      <path
        d="M51.3823 5.10625V6.92488L42.0605 7.46062V5.64295L51.3823 5.10625Z"
        fill="white"
      />
      <path
        d="M47.6526 16.3438L45.7881 16.4502V0.428906C45.7881 0.240605 45.9447 0.0786132 46.1373 0.0678711L47.3025 0.000585938C47.496 -0.010144 47.6516 0.133301 47.6516 0.321602V16.3448L47.6526 16.3438Z"
        fill="white"
      />
      <path
        d="M1.50635 23.953L0.695312 23.9989C0.311279 24.0203 0 23.7335 0 23.3579V2.69638C0 2.50905 0.155624 2.34707 0.347168 2.33633L1.50537 2.26905C1.69691 2.25832 1.85254 2.40074 1.85254 2.58905V23.593C1.85254 23.7803 1.69691 23.9413 1.50537 23.953H1.50635Z"
        fill="white"
      />
      <path
        d="M59.9999 19.5118V19.9664C59.9999 20.343 59.6867 20.667 59.2996 20.6884L0.695312 23.9988C0.311279 24.0203 0 23.7334 0 23.3578V22.9041C0 22.5285 0.311279 22.2065 0.695312 22.1851L59.2996 18.8688C59.6867 18.8474 59.9999 19.1352 59.9999 19.5118Z"
        fill="white"
      />
      <path
        d="M60 12.5455V13.6832C60 13.8715 59.8433 14.0334 59.6498 14.0442L53.6671 14.3847C53.4735 14.3954 53.3169 14.252 53.3169 14.0637V12.927C53.3169 12.7387 53.4735 12.5768 53.6671 12.566L59.6498 12.2245C59.8433 12.2138 60 12.3572 60 12.5455Z"
        fill="white"
      />
      <path
        d="M55.1834 14.2979L53.6671 14.3837C53.4735 14.3944 53.3169 14.251 53.3169 14.0627V4.51403C53.3169 4.32572 53.4735 4.16374 53.6671 4.15301L54.8333 4.08575C55.0268 4.07502 55.1834 4.21844 55.1834 4.40674V14.2979Z"
        fill="white"
      />
      <path
        d="M59.2995 20.6885L58.1323 20.7549V4.27113C58.1323 4.08283 58.289 3.92085 58.4825 3.91011L59.6497 3.84282C59.8432 3.83209 59.9999 3.97551 59.9999 4.16381V19.9665C59.9999 20.3431 59.6866 20.6671 59.2995 20.6885Z"
        fill="white"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // メニュー開閉時にbodyのスクロール制御
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          backgroundColor: '#0A1B6F',
          height: '64px',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          boxSizing: 'border-box',
        }}
      >
        {/* 左：SVGロゴ */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <InfinityLogo />
        </Link>

        {/* 右：ナビ＋ハンバーガー（常に表示） */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* PC用ナビ（スマホでは非表示） */}
          <nav
            style={{ display: 'flex', alignItems: 'center', gap: '28px' }}
            className="pc-nav"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: '#DB5492',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: "'Arial', 'Helvetica', sans-serif",
                  fontWeight: '500',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/reservation"
              style={{
                backgroundColor: '#00AABE',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: "'Arial', 'Helvetica', sans-serif",
                fontWeight: '500',
                padding: '6px 20px',
                borderRadius: '10px',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              reservation
            </Link>
          </nav>

          {/* ハンバーガーボタン：常に表示 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              flexShrink: 0,
            }}
            aria-label="メニューを開く"
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                transition: 'transform 0.2s',
                transform: menuOpen
                  ? 'rotate(45deg) translate(5px, 5px)'
                  : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                transition: 'opacity 0.2s',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#ffffff',
                borderRadius: '2px',
                transition: 'transform 0.2s',
                transform: menuOpen
                  ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ドロワーメニュー（常に表示） */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: '#0A1B6F',
          zIndex: 99,
          maxHeight: 'calc(100vh - 64px)',
          overflowY: 'auto',
          padding: '24px 20px 32px',
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            width: '100%',
          }}
        >
          {DRAWER_DATA.map((section) => (
            <div
              key={section.title}
              style={{
                flex: '1 1 0',
                minWidth: 0,
                maxWidth: '33%',
                textAlign: 'left',
              }}
            >
              <h3
                style={{
                  color: '#00AABE',
                  fontSize: '20px',
                  fontWeight: '600',
                  margin: '0 0 8px 0',
                  paddingBottom: '8px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.6)',
                  width: '100%',
                }}
              >
                {section.title}
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '16px 0 0 0',
                }}
              >
                {section.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '12px' }}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        color: '#DB5492',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
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

        {/* SNS Icons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://x.com/seiseisai_tdj"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A1B6F">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@seiseisai_tdj"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#DB5492">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/seiseisai_tdj/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#00AABE">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4.162 4.162 0 1 1 0-8.324A4.162 4.162 0 0 1 12 16zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pc-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
