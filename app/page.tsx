'use client';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

// ===== セクションラベル =====
function SectionLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        marginBottom: '32px',
      }}
    >
      {/* 紺背景のラベル */}
      <div
        style={{
          backgroundColor: '#0A1B6F',
          color: '#ffffff',
          fontFamily: "'Arial', 'Helvetica', sans-serif",
          fontWeight: '700',
          fontSize: '18px',
          letterSpacing: '0.08em',
          padding: '10px 28px',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {text}
      </div>
      {/* ピンクの三角装飾 */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '22px solid transparent',
          borderBottom: '22px solid transparent',
          borderLeft: '18px solid #DB5492',
        }}
      />
      {/* ティールの三角装飾 */}
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '22px solid transparent',
          borderBottom: '22px solid transparent',
          borderLeft: '18px solid #00AABE',
          marginLeft: '-6px',
        }}
      />
    </div>
  );
}

// ===== カウントダウン =====
function Countdown() {
  const target = new Date('2026-09-12T00:00:00+09:00').getTime();
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number, len = 2) => String(n).padStart(len, '0');

  return (
    <div
      style={{
        backgroundColor: '#0A1B6F',
        borderRadius: '8px',
        padding: '32px 40px',
        maxWidth: '660px',
        width: '100%',
        margin: '0 auto 64px',
        boxSizing: 'border-box',
      }}
    >
      {/* COUNTDOWN タイトル */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontFamily: "'Arial Black', 'Arial', sans-serif",
            fontWeight: '900',
            fontSize: '40px',
            letterSpacing: '-0.02em',
            color: '#fff',
            lineHeight: 1,
          }}
        >
          C<span style={{ color: '#DB5492' }}>O</span>UNT
          <span style={{ color: '#00AABE' }}>D</span>OWN
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: '14px',
            fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
          }}
        >
          菁々祭まで
        </div>
      </div>

      {/* 数字 */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-end',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { value: pad(time.days, 3), label: 'DAYS' },
          { value: pad(time.hours), label: 'HOURS' },
          { value: pad(time.minutes), label: 'MIN' },
          { value: pad(time.seconds), label: 'SEC' },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: '900',
                fontSize: '52px',
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                fontFamily: "'Arial', sans-serif",
                marginTop: '4px',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* 日付 */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span
            style={{
              color: '#DB5492',
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: '900',
              fontSize: '28px',
            }}
          >
            2
          </span>
          <span
            style={{
              color: '#ffffff',
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: '900',
              fontSize: '28px',
            }}
          >
            0
          </span>
          <span
            style={{
              color: '#00AABE',
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: '900',
              fontSize: '28px',
            }}
          >
            2
          </span>
          <span
            style={{
              color: '#ffffff',
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: '900',
              fontSize: '28px',
            }}
          >
            6
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              marginLeft: '8px',
            }}
          >
            SAT
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              marginLeft: '24px',
            }}
          >
            SUN
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
          <span
            style={{
              color: '#ffffff',
              fontFamily: "'Arial Black', sans-serif",
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
              fontFamily: "'Arial Black', sans-serif",
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
              fontFamily: "'Arial Black', sans-serif",
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
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: '900',
              fontSize: '64px',
              lineHeight: 1,
            }}
          >
            3
          </span>
        </div>
      </div>
    </div>
  );
}

// ===== メインページ =====
export default function Home() {
  return (
    <>
      <Header />

      {/* ヒーロー画像エリア（グレープレースホルダー） */}
      <div
        style={{
          width: '100%',
          height: '480px',
          backgroundColor: '#cccccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{ color: '#888', fontSize: '18px', fontFamily: 'sans-serif' }}
        >
          メインビジュアル（画像を後で設定）
        </span>
      </div>

      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '64px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* カウントダウン */}
        <Countdown />

        {/* SEISEISAI セクション */}
        <section style={{ marginBottom: '64px' }}>
          <SectionLabel text="SEISEISAI" />
          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* 学校ロゴプレースホルダー */}
            <div
              style={{
                width: '180px',
                height: '160px',
                backgroundColor: '#ddd',
                borderRadius: '8px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#888', fontSize: '12px' }}>学校ロゴ</span>
            </div>
            <div style={{ flex: 1, minWidth: '260px' }}>
              {/* 大きな透かし文字 */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    color: '#f0f0f0',
                    fontSize: 'clamp(40px, 6vw, 72px)',
                    fontWeight: '900',
                    fontFamily: "'Arial Black', sans-serif",
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    userSelect: 'none',
                    position: 'absolute',
                    top: '-20px',
                    right: 0,
                    zIndex: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  SEISEISAI
                </div>
                <p
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: '#333',
                    fontSize: '15px',
                    lineHeight: '2',
                    fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                    margin: 0,
                  }}
                >
                  菁々祭とは東大寺学園で行われる文化祭のこと。
                  <br />
                  第62回菁々祭 "Infinity"は2026年9月に開催予定。
                  <br />
                  東大寺学園の100周年を飾る菁々祭をぜひご覧ください！
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Infinity セクション */}
        <section style={{ marginBottom: '64px' }}>
          <SectionLabel text="Infinity" />
          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* ロゴ画像 */}
            <div style={{ flexShrink: 0 }}>
              <img
                src="/Infinity_rogotype_1.png"
                alt="Infinity logo"
                style={{ height: '80px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
              <div
                style={{
                  color: '#f0f0f0',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: '900',
                  fontFamily: "'Arial Black', sans-serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  userSelect: 'none',
                  position: 'absolute',
                  top: '-16px',
                  right: 0,
                  zIndex: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                INFINITY
              </div>
              <p
                style={{
                  position: 'relative',
                  zIndex: 1,
                  color: '#333',
                  fontSize: '15px',
                  lineHeight: '2',
                  fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                  margin: 0,
                }}
              >
                第62回菁々祭のテーマは"Infinity"です。
                <br />
                生徒が持つ、無限の可能性を十分に発揮して欲しい
                <br />
                という思いが込められています。
              </p>
            </div>
          </div>
        </section>

        {/* ACCESS セクション */}
        <section style={{ marginBottom: '64px' }}>
          <SectionLabel text="ACCESS" />
          <div
            style={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Google マップ埋め込み */}
            <div
              style={{
                width: '280px',
                height: '200px',
                backgroundColor: '#eee',
                borderRadius: '8px',
                overflow: 'hidden', // マップが角丸からはみ出さないように
                flexShrink: 0,
                border: '1px solid #ddd',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.3741635816173!2d135.78694137633215!3d34.71333338276135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600139169649936b%3A0x67343e061801267!2z5p2x5aSn5a-65a2m5ZyS5Lit5a2m5qCh44O76auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1715432000000!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
            <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
              <div
                style={{
                  color: '#f0f0f0',
                  fontSize: 'clamp(36px, 5vw, 60px )',
                  fontWeight: '900',
                  fontFamily: "'Arial Black', sans-serif",
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  userSelect: 'none',
                  position: 'absolute',
                  top: '-10px',
                  right: 0,
                  zIndex: 0,
                }}
              >
                ACCESS
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  style={{
                    color: '#333',
                    fontSize: '15px',
                    lineHeight: '2',
                    fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                    margin: '0 0 12px',
                  }}
                >
                  東大寺学園中学校・高等学校 〒631-0803 奈良市山陵町1375
                </p>
                <a
                  href="https://tdj.ac.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#00AABE',
                    fontSize: '14px',
                    fontFamily: "'Hiragino Sans', 'Yu Gothic', sans-serif",
                  }}
                >
                  https://tdj.ac.jp/
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
