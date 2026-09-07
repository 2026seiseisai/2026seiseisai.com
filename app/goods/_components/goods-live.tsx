'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type {
  GoodsSnapshot,
  GoodsStatus,
  PublicGoods,
  PublicGoodsVariant,
} from '../_lib/goods-api';

import styles from '../page.module.css';

const POLL_INTERVAL_MS = 30_000;
const REQUEST_TIMEOUT_MS = 8_000;

const LOCAL_GOODS_IMAGES: Record<string, string> = {
  't-shirt': '/goods/t-shirt.svg',
  'acrylic-keyholder': '/goods/acrylic-keyholder.svg',
  'tote-bag': '/goods/tote-bag.svg',
  'charm-ballpoint-pen': '/goods/charm-ballpoint-pen.svg',
  penlight: '/goods/penlight.svg',
  mug: '/goods/mug.svg',
  towel: '/goods/towel.svg',
};

type GoodsLiveProps = {
  initialSnapshot: GoodsSnapshot | null;
  initialError?: boolean;
};

type VariantView = {
  id: string;
  name: string;
  priceYen: number;
  status: GoodsStatus;
};

type ProductView = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string | null;
  status: GoodsStatus;
  variants: VariantView[];
  priceYen: number | null;
};

function normaliseStatus(status: GoodsStatus | string | undefined): GoodsStatus {
  switch (status) {
    case 'AVAILABLE':
    case 'LOW_STOCK':
    case 'SOLD_OUT':
    case 'COMING_SOON':
    case 'SALES_ENDED':
      return status;
    default:
      return 'COMING_SOON';
  }
}

function toProductView(product: PublicGoods): ProductView {
  const variants = product.variants.map((variant: PublicGoodsVariant) => ({
    id: variant.id,
    name: variant.name,
    priceYen: variant.priceYen,
    status: normaliseStatus(variant.status),
  }));

  const variantPrices = variants
    .map((variant) => variant.priceYen)
    .filter((price): price is number => Number.isFinite(price));
  const uniqueVariantPrices = [...new Set(variantPrices)];

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    status: normaliseStatus(product.status),
    variants,
    priceYen: uniqueVariantPrices.length === 1 ? uniqueVariantPrices[0] : null,
  };
}

function formatPrice(priceYen: number | null) {
  if (priceYen === null) return null;
  return `${priceYen.toLocaleString('ja-JP')}円`;
}

function statusLabel(status: GoodsStatus, stale: boolean) {
  if (stale) return '在庫確認中';

  switch (status) {
    case 'AVAILABLE':
      return '在庫あり';
    case 'LOW_STOCK':
      return '在庫残りわずか';
    case 'SOLD_OUT':
      return '在庫なし';
    case 'COMING_SOON':
      return '販売前';
    case 'SALES_ENDED':
      return '販売終了';
  }
}

function statusTone(status: GoodsStatus, stale: boolean) {
  if (stale) return 'checking';
  if (status === 'AVAILABLE') return 'available';
  if (status === 'LOW_STOCK') return 'low';
  return 'closed';
}

function StatusBadge({ status, stale }: { status: GoodsStatus; stale: boolean }) {
  const label = statusLabel(status, stale);
  const tone = statusTone(status, stale);

  return (
    <span className={`${styles.status} ${styles[`status--${tone}`]}`}>
      {label}
    </span>
  );
}

function GoodsImage({ product }: { product: ProductView }) {
  const localImageUrl = Object.hasOwn(LOCAL_GOODS_IMAGES, product.slug)
    ? LOCAL_GOODS_IMAGES[product.slug]
    : null;
  const imageUrl = product.imageUrl ?? localImageUrl;
  const [failedUrl, setFailedUrl] = useState<string | null>(null);

  if (!imageUrl || failedUrl === imageUrl) {
    return (
      <div className={styles.imageFrame} role="img" aria-label={`${product.name}の商品画像準備中`}>
        <div className={styles.imageScene}>
          <span className={styles.imageFallback}>商品画像準備中</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.imageFrame}>
      <div className={styles.imageScene}>
        {/* The source is an admin-controlled thumbnail URL validated by the public API. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={imageUrl}
          alt={`${product.name}の商品画像`}
          loading="lazy"
          onError={() => setFailedUrl(imageUrl)}
        />
      </div>
    </div>
  );
}

function ProductCard({ product, stale }: { product: ProductView; stale: boolean }) {
  const price = formatPrice(product.priceYen);
  const showVariantPrices = product.priceYen === null;

  return (
    <li className={styles.productItem}>
      <article className={styles.product}>
        <div className={styles.productHeader}>
          <h2 className={styles.productName}>{product.name}</h2>
          {price && <p className={styles.productPrice}>{price}</p>}
        </div>

        {product.variants.length > 0 ? (
          <ul className={styles.variantList} aria-label={`${product.name}のバリエーション`}>
            {product.variants.map((variant) => (
              <li className={styles.variant} key={variant.id}>
                {variant.name !== '標準' && <span className={styles.variantName}>{variant.name}</span>}
                <StatusBadge status={variant.status} stale={stale} />
                {showVariantPrices && (
                  <span className={styles.variantPrice}>{formatPrice(variant.priceYen)}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.productStatus}>
            <StatusBadge status={product.status} stale={stale} />
          </div>
        )}

        <GoodsImage key={product.imageUrl ?? product.slug} product={product} />
        <p className={styles.description}>{product.description}</p>
      </article>
    </li>
  );
}

function isGoodsSnapshot(value: unknown): value is GoodsSnapshot {
  if (!value || typeof value !== 'object') return false;
  const snapshot = value as { goods?: unknown; generatedAt?: unknown };
  return Array.isArray(snapshot.goods) && typeof snapshot.generatedAt === 'string';
}

export default function GoodsLive({ initialSnapshot, initialError = false }: GoodsLiveProps) {
  const [snapshot, setSnapshot] = useState<GoodsSnapshot | null>(initialSnapshot);
  const [isRequesting, setIsRequesting] = useState(false);
  const [pollError, setPollError] = useState(initialError);
  const [initialRequestError, setInitialRequestError] = useState(initialError);
  const inFlightRef = useRef(false);
  const visibleRef = useRef(true);
  const snapshotRef = useRef<GoodsSnapshot | null>(initialSnapshot);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeControllerRef = useRef<AbortController | null>(null);
  const disposedRef = useRef(false);
  const requestSnapshotRef = useRef<() => Promise<void>>(async () => undefined);

  const clearPollTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedulePoll = useCallback(() => {
    clearPollTimer();
    if (!visibleRef.current || disposedRef.current) return;

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      if (disposedRef.current) return;
      void requestSnapshotRef.current();
    }, POLL_INTERVAL_MS);
  }, [clearPollTimer]);

  const requestSnapshot = useCallback(async () => {
    if (inFlightRef.current || !visibleRef.current || disposedRef.current) return;

    inFlightRef.current = true;
    setIsRequesting(true);
    const controller = new AbortController();
    activeControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/goods', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(`goods request failed: ${response.status}`);

      const nextSnapshot: unknown = await response.json();
      if (!isGoodsSnapshot(nextSnapshot)) throw new Error('invalid goods response');
      if (disposedRef.current) return;

      snapshotRef.current = nextSnapshot;
      setSnapshot(nextSnapshot);
      setPollError(false);
      setInitialRequestError(false);
    } catch {
      if (disposedRef.current) return;
      setPollError(true);
      if (snapshotRef.current === null) setInitialRequestError(true);
    } finally {
      clearTimeout(timeoutId);
      if (activeControllerRef.current === controller) activeControllerRef.current = null;
      inFlightRef.current = false;
      if (!disposedRef.current) {
        setIsRequesting(false);
        schedulePoll();
      }
    }
  }, [schedulePoll]);

  useEffect(() => {
    requestSnapshotRef.current = requestSnapshot;
  }, [requestSnapshot]);

  useEffect(() => {
    disposedRef.current = false;

    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      visibleRef.current = isVisible;

      if (!isVisible) {
        clearPollTimer();
        return;
      }

      void requestSnapshotRef.current();
    };

    visibleRef.current = document.visibilityState === 'visible';
    document.addEventListener('visibilitychange', handleVisibilityChange);
    schedulePoll();

    return () => {
      disposedRef.current = true;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearPollTimer();
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
    };
  }, [clearPollTimer, schedulePoll]);

  const products = snapshot?.goods.map(toProductView) ?? [];
  const hasStaleCatalog = snapshot !== null && pollError;
  const showInitialError = snapshot === null && initialRequestError;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Goods</h1>

        {hasStaleCatalog && (
          <div className={styles.alert} role="status">
            在庫情報を更新できませんでした。表示中の商品情報は最後に取得した内容です。
          </div>
        )}

        {showInitialError ? (
          <section className={styles.errorState} aria-labelledby="goods-error-title">
            <h2 id="goods-error-title">商品情報を取得できませんでした</h2>
            <p>時間をおいて、もう一度お試しください。</p>
            <button type="button" onClick={() => void requestSnapshot()} disabled={isRequesting}>
              {isRequesting ? '確認中…' : '再読み込み'}
            </button>
          </section>
        ) : products.length > 0 ? (
          <ul className={styles.productGrid} aria-label="グッズ一覧">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} stale={hasStaleCatalog} />
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState}>現在販売中の商品情報はありません。</p>
        )}

        <GoodsDetails />
      </div>
    </main>
  );
}

function GoodsDetails() {
  return (
    <div className={styles.details}>
      <section className={`${styles.detailSection} ${styles.stockSection}`} aria-labelledby="stock-title">
        <h2 id="stock-title">在庫について</h2>
        <p>
          随時更新しておりますが多少の誤差がある場合がございます。
          <br />
          詳しくはグッズ販売所の掲示、もしくはスタッフにお尋ねください。
        </p>
      </section>

      <section className={`${styles.detailSection} ${styles.sizeSection}`} aria-labelledby="tshirt-size-title">
        <div className={styles.tShirtSize}>
          <h2 id="tshirt-size-title">Tシャツのサイズについて</h2>
          <div className={styles.tShirtSizeRow}>
            <table className={styles.sizeTable}>
              <caption className={styles.visuallyHidden}>Tシャツサイズ表</caption>
              <thead>
                <tr>
                  <th scope="col">サイズ</th>
                  <th scope="col">S</th>
                  <th scope="col">M</th>
                  <th scope="col">L</th>
                  <th scope="col">XL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">身丈</th>
                  <td>66</td>
                  <td>70</td>
                  <td>74</td>
                  <td>78</td>
                </tr>
              </tbody>
            </table>
            <p>オリジナルTシャツのサイズ表です（単位：cm）。</p>
          </div>
        </div>

        <div className={styles.otherSizes}>
          <h3>Tシャツ以外のサイズについて</h3>
          <dl>
            <div>
              <dt>アクリルキーホルダー</dt>
              <dd>45mm×18mm</dd>
            </div>
            <div>
              <dt>トートバッグ</dt>
              <dd>360mm×370mm</dd>
            </div>
            <div>
              <dt>マグカップ</dt>
              <dd>Φ82mm×96mm</dd>
            </div>
            <div>
              <dt>タオル</dt>
              <dd>340mm×850mm</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
