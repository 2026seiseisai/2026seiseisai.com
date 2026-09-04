'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import footerLogo from './Infinityrogotype2.svg';

const FOOTER_DATA = [
  {
    title: 'Overview',
    links: [
      { label: 'Top', href: '/' },
      { label: 'News', href: '/news' },
      { label: 'Theme&Logo', href: '/theme&logo' },
      { label: 'Access', href: '/access' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'Exhibitions', href: '/exhibitions' },
      { label: 'Map', href: '/map' },
      { label: 'Goods', href: '/goods' },
    ],
  },
  {
    title: 'Contents',
    links: [
      { label: 'Blog', href: '/blog/blog一覧' },
      { label: 'Special', href: '/special' },
      { label: 'Brochures', href: '/brochures' },
      { label: 'Archives', href: '/archives' },
    ],
  },
];

const SNS_LINKS = [
  {
    name: 'X',
    href: 'https://x.com/seiseisai_tdj',
    color: '#0A1B6F',
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@seiseisai_tdj',
    color: '#DB5492',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/seiseisai_tdj/',
    color: '#00AABE',
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

const PUBLISHED_PATHS = new Set([
  '/',
  '/news',
  '/theme&logo',
  '/access',
  '/contact',
  '/privacy-policy',
]);

function isPublishedPath(href: string) {
  return PUBLISHED_PATHS.has(href) || href.startsWith('/news/');
}

export default function Footer() {
  const [imgError, setImgError] = useState(false);
  const contactIsPublished = isPublishedPath('/contact');
  const privacyPolicyIsPublished = isPublishedPath('/privacy-policy');

  return (
    <footer
      className="site-footer"
      style={{
        width: '100%',
        fontFamily: 'inherit',
      }}
    >
      <div
        className="footer-top"
        style={{
          backgroundColor: '#ffffff',
          padding: '40px 20px',
          borderTop: '1px solid #eaeaea',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="footer-top-inner"
          style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                marginBottom: '8px',
                minHeight: '60px',
                width: 'clamp(180px, 20vw, 320px)',
                maxWidth: '100%',
              }}
            >
              {!imgError ? (
                <Image
                  src={footerLogo}
                  alt="Infinity Logo"
                  width={200}
                  height={60}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager"
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
                fontWeight: '700',
                margin: 0,
              }}
            >
              © 2026 62nd seiseisai &quot;Infinity&quot;, Created by PR part
            </p>
          </div>
          <div
            className="footer-actions"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {contactIsPublished ? (
              <Link
                href="/contact"
                className="footer-action-link"
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#999' }}>
                  &gt;&gt;
                </span>
                お問い合わせ
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="footer-action-link"
                style={{
                  color: '#999999',
                  fontSize: '13px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'not-allowed',
                }}
              >
                <span style={{ fontSize: '11px', color: '#999999' }}>
                  &gt;&gt;
                </span>
                お問い合わせ
              </span>
            )}
            {privacyPolicyIsPublished ? (
              <Link
                href="/privacy-policy"
                className="footer-action-link"
                style={{
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '11px', color: '#999' }}>
                  &gt;&gt;
                </span>
                プライバシーポリシー
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="footer-action-link"
                style={{
                  color: '#999999',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'not-allowed',
                }}
              >
                <span style={{ fontSize: '11px', color: '#999999' }}>
                  &gt;&gt;
                </span>
                プライバシーポリシー
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className="footer-bottom"
        style={{
          backgroundColor: '#0A1B6F',
          color: '#ffffff',
          padding: '32px 20px 40px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="footer-bottom-inner"
          style={{
            width: '100%',
            maxWidth: 'none',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            overflowX: 'hidden',
            paddingBottom: '8px',
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              alignItems: 'stretch',
              gap: 'clamp(12px, 2.2vw, 36px)',
            }}
          >
            {FOOTER_DATA.map((section) => (
              <div key={section.title} style={{ textAlign: 'left' }}>
                <h3
                  style={{
                    color: '#00AABE',
                    fontSize: '46px',
                    fontWeight: '700',
                    margin: '0 0 22px 0',
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                    borderBottom: '2px solid rgba(255, 255, 255, 0.65)',
                    paddingBottom: '8px',
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
                  {section.links.map((link) => {
                    const linkIsPublished = isPublishedPath(link.href);
                    const linkStyle = {
                      color: linkIsPublished ? '#DB5492' : '#999999',
                      textDecoration: 'none',
                      fontSize: '32px',
                      fontWeight: '700',
                      letterSpacing: '0.01em',
                      display: 'inline-block',
                    } as const;

                    return (
                      <li key={link.label}>
                        {linkIsPublished ? (
                          <Link
                            href={link.href}
                            className="footer-link"
                            style={linkStyle}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <span
                            aria-disabled="true"
                            style={{ ...linkStyle, cursor: 'not-allowed' }}
                          >
                            {link.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '18px',
                  marginTop: 'auto',
                }}
              >
                {SNS_LINKS.map((sns) => (
                  <a
                    key={sns.name}
                    href={sns.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={sns.name}
                    style={{
                      color: sns.color,
                      width: '36px',
                      height: '36px',
                      backgroundColor: '#ffffff',
                      borderRadius: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {sns.icon}
                  </a>
                ))}
                <Link
                  href="https://tickets.seiseisai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: '#0A1B6F',
                    backgroundColor: '#ffffff',
                    border: '2px solid #0A1B6F',
                    borderRadius: '999px',
                    padding: '8px 14px',
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Web整理券
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
