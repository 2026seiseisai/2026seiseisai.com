import Link from 'next/link';
import styles from './page.module.css';

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="not-found-title">
        <span className={styles.ghostMark} aria-hidden="true">
          ∞
        </span>

        <div className={styles.visual} aria-hidden="true">
          <p className={styles.routeLabel}>PAGE MISSING / 404</p>
          <div className={styles.graphicStage}>
            <svg
              className={styles.lostPageGraphic}
              viewBox="0 0 460 315"
              focusable="false"
            >
            <g className={styles.paper}>
              <path
                className={styles.paperShadow}
                d="M155 68H303L333 98V277H155Z"
              />
              <path
                className={styles.paperSheet}
                d="M146 58H294L324 88V267H146Z"
              />
              <path
                className={styles.paperHeader}
                d="M146 58H294V90H146Z"
              />
              <circle className={styles.paperDotPink} cx="164" cy="74" r="4" />
              <circle className={styles.paperDotTeal} cx="178" cy="74" r="4" />
              <circle className={styles.paperDotWhite} cx="192" cy="74" r="4" />
              <path
                className={styles.paperFold}
                d="M294 58V88H324Z"
              />

              <text className={styles.paperCode} x="171" y="164">
                <tspan className={styles.paperCodeAccent}>4</tspan>
                <tspan>04</tspan>
              </text>
              <text className={styles.paperStatus} x="173" y="192">
                PAGE LOST
              </text>
              <path className={styles.paperRule} d="M173 211H274" />
              <path className={styles.paperRuleShort} d="M173 226H245" />

              <circle className={styles.errorBadge} cx="296" cy="232" r="25" />
              <path className={styles.errorCross} d="M286 222L306 242M306 222L286 242" />
              <path className={styles.paperAccentPink} d="M146 260H245" />
              <path className={styles.paperAccentTeal} d="M245 260H324" />
            </g>

            <g className={styles.sparkOne}>
              <path d="M75 55V75M65 65H85" />
            </g>
            <g className={styles.sparkTwo}>
              <path d="M385 72V88M377 80H393" />
            </g>
            <rect
              className={styles.sparkDiamond}
              x="386"
              y="239"
              width="12"
              height="12"
              transform="rotate(45 392 245)"
            />
            </svg>
          </div>
          <div className={styles.visualMeta}>
            <span>ROUTE / UNKNOWN</span>
            <span>62ND · INFINITY</span>
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>NOT FOUND</p>
          <h1 id="not-found-title">Page not found</h1>
          <p className={styles.description}>
            お探しのページは見つかりませんでした。URLが変更されたか、
            ページがまだ公開されていない可能性があります。
          </p>
          <Link className={styles.homeLink} href="/">
            <span>トップページへ戻る</span>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M5 12h14M14 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
