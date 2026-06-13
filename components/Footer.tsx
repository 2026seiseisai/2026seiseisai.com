'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const FOOTER_DATA = [
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

export default function Footer() {
  const [imgError, setImgError] = useState(false);

  return (
    <footer
      style={{
        width: '100%',
        fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
      }}
    >
      {/* 1. Upper Section (Logo & Additional Links) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '40px 80px',
          borderTop: '1px solid #eaeaea',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* Logo & Copyright */}
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <div
              style={{
                marginBottom: '8px',
                minHeight: '60px',
                width: '200px',
                maxWidth: '100%',
              }}
            >
              {!imgError ? (
                <Image
                  src="/Infinityrogotype2.svg"
                  alt="Infinity Logo"
                  width={200}
                  height={60}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                  unoptimized
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  style={{
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#ccc',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  Infinity
                </div>
              )}
            </div>
            <p
              style={{
                color: '#666',
                fontSize: '12px',
                margin: 0,
                whiteSpace: 'nowrap',
              }}
            >
              © 2026 62nd seiseisai &quot;Infinity&quot;, Created by PR part
            </p>
          </div>

          {/* Additional Links */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'left',
              marginBottom: '0',
            }}
          >
            <Link
              href="/404"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '11px', color: '#999' }}>&gt;&gt;</span>{' '}
              お問い合わせ
            </Link>
            <Link
              href="/404"
              style={{
                color: '#333',
                textDecoration: 'none',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '11px', color: '#999' }}>&gt;&gt;</span>{' '}
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Section (Navy background) */}
      <div
        style={{
          backgroundColor: '#0A1B6F',
          color: '#ffffff',
          padding: '40px 48px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* Navigation Links */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))',
              gap: '32px',
              flex: '1 1 0',
              minWidth: '260px',
            }}
          >
            {FOOTER_DATA.map((section) => (
              <div key={section.title} style={{ textAlign: 'left' }}>
                <h3
                  style={{
                    color: '#00AABE',
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {section.title}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          color: '#DB5492',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500',
                          display: 'inline-block',
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
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              width: '100%',
              maxWidth: '240px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
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
        </div>
      </div>
    </footer>
  );
}
