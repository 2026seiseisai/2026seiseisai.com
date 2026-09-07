import assert from 'node:assert/strict';
import { test } from 'node:test';

// Node's built-in TypeScript runner resolves this file directly.
// @ts-expect-error TypeScript's bundler resolver does not allow the .ts suffix by default.
import { GOODS_API_URL, getGoodsSnapshot, isSafeGoodsImageUrl, type GoodsSnapshot } from './goods-api.ts';

const goodsSnapshot: GoodsSnapshot = {
  goods: [
    {
      id: 'goods-1',
      slug: 'goods-1',
      name: '菁々祭 Tシャツ',
      description: '公式Tシャツ',
      imageUrl: '/goods/t-shirt.webp',
      status: 'AVAILABLE',
      variants: [
        {
          id: 'variant-1',
          name: 'M',
          priceYen: 2_000,
          status: 'AVAILABLE',
        },
      ],
      updatedAt: '2026-09-07T12:00:00+09:00',
    },
  ],
  generatedAt: '2026-09-07T12:00:01+09:00',
};

test('getGoodsSnapshot requests the fixed public API and validates the complete envelope', async () => {
  let requestedUrl = '';
  let requestedInit: RequestInit | undefined;

  const snapshot = await getGoodsSnapshot({
    fetcher: async (input, init) => {
      requestedUrl = String(input);
      requestedInit = init;
      return Response.json({
        data: goodsSnapshot.goods,
        meta: { apiVersion: 'v1', generatedAt: goodsSnapshot.generatedAt },
      });
    },
  });

  assert.equal(requestedUrl, GOODS_API_URL);
  assert.equal(requestedInit?.cache, 'no-store');
  assert.equal(new Headers(requestedInit?.headers).get('accept'), 'application/json');
  assert.deepEqual(snapshot, goodsSnapshot);
});

test('getGoodsSnapshot rejects non-OK responses and malformed payloads', async () => {
  await assert.rejects(
    getGoodsSnapshot({
      fetcher: async () => new Response('upstream failure', { status: 502 }),
    }),
    { name: 'GoodsApiError', code: 'UPSTREAM_HTTP_ERROR' },
  );

  await assert.rejects(
    getGoodsSnapshot({
      fetcher: async () =>
        Response.json({
          data: [
            {
              ...goodsSnapshot.goods[0],
              imageUrl: 'https://attacker.example/unsafe.svg',
            },
          ],
          meta: { apiVersion: 'v1', generatedAt: goodsSnapshot.generatedAt },
        }),
    }),
    { name: 'GoodsApiError', code: 'UPSTREAM_INVALID_PAYLOAD' },
  );
});

test('getGoodsSnapshot rejects stale platform projections instead of presenting them as current', async () => {
  await assert.rejects(
    getGoodsSnapshot({
      fetcher: async () =>
        Response.json({
          data: goodsSnapshot.goods,
          meta: { apiVersion: 'v1', generatedAt: goodsSnapshot.generatedAt, stale: true },
        }),
    }),
    { name: 'GoodsApiError', code: 'UPSTREAM_INVALID_PAYLOAD' },
  );
});

test('image URL validation follows the platform thumbnail allowlist', () => {
  assert.equal(isSafeGoodsImageUrl('/assets/goods.png'), true);
  assert.equal(isSafeGoodsImageUrl('https://seiseisai.com/assets/goods.avif'), true);
  assert.equal(isSafeGoodsImageUrl('https://cdn.example.com/goods.webp'), false);
  assert.equal(isSafeGoodsImageUrl('data:image/svg+xml,<svg/>'), false);
  assert.equal(isSafeGoodsImageUrl('//attacker.example/goods.png'), false);
});
