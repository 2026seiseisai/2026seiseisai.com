'use client';

import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  type CSSProperties,
} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '../(header)/Header';
import Footer from '../(footer)/Footer';
import { Noto_Sans_JP } from 'next/font/google';
import animationData from '@/app/(top)/Infinity animation.json';
import tdjLogo from '@/app/(top)/TDJ-Logo.svg';
import infinityRogotype from '@/app/(top)/Infinity rogotype.svg';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
});

const SplashScreen = dynamic(() => import('./components/SplashScreen'), {
  ssr: false,
});

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

/* ------------------------------------------------------------------ */
/* SectionLabel */
/* ------------------------------------------------------------------ */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="section-label-wrap">
      <div className="section-label-box">
        <span className="section-label-part section-label-part-blue">
          {text}
        </span>
        <span className="section-label-part section-label-part-pink" />
        <span className="section-label-part section-label-part-teal" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BackgroundText (watermark) */
/* ------------------------------------------------------------------ */
function BackgroundText({ text }: { text: string }) {
  return (
    <div className="bg-watermark" aria-hidden="true">
      {text}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Countdown */
/* ------------------------------------------------------------------ */
function Countdown() {
  const target = useMemo(
    () => new Date('2026-09-12T09:00:00+09:00').getTime(),
    [],
  );

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    calc();
    updateIsMobile();
    const id = setInterval(calc, 1000);
    window.addEventListener('resize', updateIsMobile);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', updateIsMobile);
    };
  }, [target]);

  const formatValue = (n: number, len = 2) =>
    isMobile ? String(n) : String(n).padStart(len, '0');

  const countdownCardStyle: CSSProperties = isMobile
    ? {
        backgroundColor: '#0A1B6F',
        borderRadius: '8px',
        padding: '32px 40px',
        maxWidth: '660px',
        width: '100%',
        margin: '0 auto 64px',
        boxSizing: 'border-box',
        color: '#fff',
      }
    : {
        backgroundColor: '#0A1B6F',
        borderRadius: '8px',
        padding: '3vw 4vw',
        width: 'calc(100% - 26vw)',
        margin: '0 13vw 64px',
        boxSizing: 'border-box',
        color: '#fff',
      };

  const countdownTitleStyle: CSSProperties = isMobile
    ? {
        fontWeight: '900',
        fontSize: '40px',
        letterSpacing: '-0.02em',
        color: '#fff',
        lineHeight: 1,
      }
    : {
        fontWeight: '900',
        fontSize: 'clamp(38px, 3.8vw, 60px)',
        letterSpacing: '-0.08em',
        color: '#fff',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      };

  const countdownNumberStyle: CSSProperties = isMobile
    ? {
        fontWeight: '900',
        fontSize: 'clamp(34px, 8vw, 52px)',
        color: '#fff',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        overflowWrap: 'break-word',
      }
    : {
        fontWeight: '900',
        fontSize: 'clamp(44px, 5vw, 88px)',
        color: '#fff',
        lineHeight: 1,
        letterSpacing: '-0.04em',
        overflowWrap: 'break-word',
      };

  const countdownLabelStyle: CSSProperties = isMobile
    ? {
        color: 'rgba(255,255,255,0.6)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        marginTop: '4px',
      }
    : {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 'clamp(12px, 1.2vw, 14px)',
        letterSpacing: '0.14em',
        marginTop: '6px',
      };

  return (
    <div style={countdownCardStyle}>
      {isMobile ? (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={countdownTitleStyle}>
              C<span style={{ color: '#DB5492' }}>O</span>UNT
              <span style={{ color: '#00AABE' }}>D</span>OWN
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginBottom: '24px',
              flexWrap: 'nowrap',
              overflowX: 'hidden',
              paddingBottom: '8px',
              width: '100%',
              minWidth: 0,
            }}
          >
            {[
              { value: formatValue(time.days, 3), label: 'DAYS' },
              { value: formatValue(time.hours), label: 'HOURS' },
              { value: formatValue(time.minutes), label: 'MIN' },
              { value: formatValue(time.seconds), label: 'SEC' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  flex: '1 1 0',
                  minWidth: 0,
                  maxWidth: '120px',
                }}
              >
                <div style={countdownNumberStyle}>{value}</div>
                <div style={countdownLabelStyle}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div
              style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}
            >
              <span
                style={{
                  color: '#DB5492',
                  fontWeight: '900',
                  fontSize: '28px',
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '28px',
                }}
              >
                0
              </span>
              <span
                style={{
                  color: '#00AABE',
                  fontWeight: '900',
                  fontSize: '28px',
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '28px',
                }}
              >
                6
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  marginLeft: '8px',
                }}
              >
                SAT / SUN
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '64px',
                  lineHeight: 1,
                }}
              >
                9.1
              </span>
              <span
                style={{
                  color: '#DB5492',
                  fontWeight: '900',
                  fontSize: '64px',
                  lineHeight: 1,
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: '64px',
                  lineHeight: 1,
                }}
              >
                -9.1
              </span>
              <span
                style={{
                  color: '#00AABE',
                  fontWeight: '900',
                  fontSize: '64px',
                  lineHeight: 1,
                }}
              >
                3
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={countdownTitleStyle}>
              C<span style={{ color: '#DB5492' }}>O</span>UNT
              <span style={{ color: '#00AABE' }}>D</span>OWN
            </div>
            <div
              style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: 'clamp(16px, 1.4vw, 20px)',
                whiteSpace: 'nowrap',
              }}
            >
              菁々祭まで
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '18px',
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginBottom: '28px',
              flexWrap: 'wrap',
              overflowX: 'hidden',
              paddingBottom: '8px',
              width: '100%',
              minWidth: 0,
            }}
          >
            {[
              { value: formatValue(time.days, 3), label: 'DAYS' },
              { value: formatValue(time.hours), label: 'HOURS' },
              { value: formatValue(time.minutes), label: 'MIN' },
              { value: formatValue(time.seconds), label: 'SEC' },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  flex: '1 1 0',
                  minWidth: 0,
                  maxWidth: '160px',
                }}
              >
                <div style={countdownNumberStyle}>{value}</div>
                <div style={countdownLabelStyle}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: '#DB5492',
                  fontWeight: '900',
                  fontSize: 'clamp(24px, 2.4vw, 36px)',
                  lineHeight: 1,
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: 'clamp(24px, 2.4vw, 36px)',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              <span
                style={{
                  color: '#00AABE',
                  fontWeight: '900',
                  fontSize: 'clamp(24px, 2.4vw, 36px)',
                  lineHeight: 1,
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: 'clamp(24px, 2.4vw, 36px)',
                  lineHeight: 1,
                }}
              >
                6
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 'clamp(14px, 1.3vw, 18px)',
                  marginLeft: '12px',
                  whiteSpace: 'nowrap',
                }}
              >
                SAT / SUN
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '6px',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: 'clamp(72px, 8vw, 120px)',
                  lineHeight: 1,
                }}
              >
                9.1
              </span>
              <span
                style={{
                  color: '#DB5492',
                  fontWeight: '900',
                  fontSize: 'clamp(72px, 8vw, 120px)',
                  lineHeight: 1,
                }}
              >
                2
              </span>
              <span
                style={{
                  color: '#ffffff',
                  fontWeight: '900',
                  fontSize: 'clamp(72px, 8vw, 120px)',
                  lineHeight: 1,
                }}
              >
                -9.1
              </span>
              <span
                style={{
                  color: '#00AABE',
                  fontWeight: '900',
                  fontSize: 'clamp(72px, 8vw, 120px)',
                  lineHeight: 1,
                }}
              >
                3
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */
export default function Home() {
  const [splashDone, setSplashDone] = useState<boolean>(false);

  // Read sessionStorage on client after mount to decide whether to skip splash.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timeoutId = window.setTimeout(() => {
      if (sessionStorage.getItem('splashSeen') === '1') {
        setSplashDone(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleSplashFinish = useCallback(() => {
    try {
      sessionStorage.setItem('splashSeen', '1');
    } catch {
      /* ignore */
    }
    setSplashDone(true);
  }, []);

  return (
    <div className={notoSansJP.className}>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transition: 'opacity 0.4s ease 0.1s',
          pointerEvents: splashDone ? 'all' : 'none',
        }}
      >
        <Header />

        {/* Hero Lottie */}
        <div className="hero-lottie-section">
          <div className="hero-lottie-box">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <main style={{ padding: '16px 5vw', boxSizing: 'border-box' }}>
          <Countdown />

          {/* ---- SEISEISAI ---- */}
          <section className="content-section">
            <SectionLabel text="SEISEISAI" />
            <div className="two-col-body">
              <div className="two-col-left">
                <Image
                  src={tdjLogo}
                  alt="東大寺学園ロゴ"
                  className="section-logo-image"
                  width={200}
                  height={200}
                  style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                    maxHeight: 'min(280px, 30vh)',
                    maxWidth: '100%',
                  }}
                  loading="eager"
                />
              </div>
              <div className="two-col-right">
                <BackgroundText text="SEISEISAI" />
                <p className="section-body-text">
                  菁々祭とは東大寺学園で行われる文化祭のこと。
                  第62回菁々祭&ldquo;Infinity&rdquo;は2026年9月に開催予定。
                  東大寺学園の100周年を飾る菁々祭をぜひご覧ください！
                </p>
              </div>
            </div>
          </section>

          {/* ---- Infinity ---- */}
          <section className="content-section">
            <SectionLabel text="Infinity" />
            <div className="two-col-body">
              <div className="two-col-left">
                <Image
                  src={infinityRogotype}
                  alt="Infinityロゴタイプ"
                  className="section-logo-image"
                  width={200}
                  height={200}
                  style={{
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                    maxHeight: 'min(280px, 30vh)',
                    maxWidth: '100%',
                  }}
                  loading="eager"
                />
              </div>
              <div className="two-col-right">
                <BackgroundText text="INFINITY" />
                <p className="section-body-text">
                  第62回菁々祭のテーマは&ldquo;Infinity&rdquo;です。
                  生徒が持つ、無限の可能性を十分に発揮して欲しいという思いが込められています。
                </p>
              </div>
            </div>
          </section>

          {/* ---- LOGO-PV ---- */}
          <section className="content-section">
            <SectionLabel text="LOGO-PV" />
            <div className="two-col-body">
              <div className="two-col-left">
                <div className="yt-placeholder">
                  <iframe
                    src="https://www.youtube.com/embed/gEj_JFokp90"
                    title="LOGO-PV YouTube"
                    allowFullScreen
                    style={{
                      border: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '6px',
                    }}
                  />
                </div>
              </div>
              <div className="two-col-right">
                <BackgroundText text="PV" />
                <p className="section-body-text-pv">LOGO-PVを公開中！</p>
              </div>
            </div>
          </section>

          {/* ---- ACCESS ---- */}
          <section className="content-section">
            <SectionLabel text="ACCESS" />
            <div className="two-col-body">
              <div className="two-col-left access-map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.3741635816173!2d135.78694137633215!3d34.71333338276135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600139169649936b%3A0x67343e061801267!2z5p2x5aSn5a-65a2m5ZyS5Lit5a2m5qCh44O76auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1715432000000!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '6px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
              </div>
              <div className="two-col-right">
                <BackgroundText text="ACCESS" />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    className="section-body-text"
                    style={{ marginBottom: '12px' }}
                  >
                    東大寺学園中学校・高等学校
                    <br />
                    〒631-0803 奈良市山陵町1375
                  </p>

                  <a
                    href="https://tdj.ac.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#00AABE', fontSize: '14px' }}
                  >
                    https://tdj.ac.jp/
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
