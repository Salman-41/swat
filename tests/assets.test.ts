import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  sourceRegistrySchema,
  sourceAssetSchema,
} from '../src/lib/registry.ts';
import { canPublishAsset } from '../src/lib/evidence.ts';
import { photoSources, processingChanges } from '../src/lib/photos.ts';

const registry = sourceRegistrySchema.parse(
  JSON.parse(
    readFileSync(
      new URL('../content/source-registry.json', import.meta.url),
      'utf8',
    ),
  ),
);
const candidate = registry.assets[0]!;

test('registry rejects traversal, duplicate identities and malformed processing records', () => {
  assert.equal(
    sourceAssetSchema.safeParse({
      ...candidate,
      localOriginalPath: 'assets/originals/../secrets.jpg',
    }).success,
    false,
  );
  assert.equal(
    sourceRegistrySchema.safeParse({
      ...registry,
      assets: [candidate, candidate],
    }).success,
    false,
  );
  assert.equal(
    sourceAssetSchema.safeParse({ ...candidate, processing: ['resize'] })
      .success,
    false,
  );
});

test('missing files never produce remote image URLs or picture sources', () => {
  for (const asset of registry.assets.filter(
    (item) => item.downloadStatus !== 'downloaded',
  )) {
    assert.equal(photoSources(asset), null);
  }
});

test('reviewed image selection retains provenance and rejects stale derivatives', () => {
  const digest = 'a'.repeat(64);
  const derivatives = ['avif', 'webp'].flatMap((format) =>
    [390, 780].map((width) => ({
      path: `public/images/test/w${width}.${format}`,
      url: `/images/test/w${width}.${format}`,
      width,
      height: width,
      format,
      sha256: 'b'.repeat(64),
      bytes: 500,
      uses: [{ displayWidth: 390, density: width === 390 ? 1 : 2 }],
      processing: {
        recipeId: 'uncropped',
        rect: null,
        textSafeArea: null,
        colourspace: 'srgb',
        upscaled: false,
        sourceSha256: digest,
      },
    })),
  );
  const approved = sourceAssetSchema.parse({
    ...candidate,
    downloadStatus: 'downloaded',
    sha256: digest,
    originalUrl: 'https://upload.wikimedia.org/wikipedia/commons/test.jpg',
    publicationApproved: true,
    visualReviewStatus: 'reviewed',
    location: { ...candidate.location, status: 'confirmed' },
    dimensions: {
      width: 1000,
      height: 1000,
      verification: 'verified-original',
    },
    sourceCheck: {
      ...candidate.sourceCheck,
      metadataPath: 'assets/provenance/test/commons-imageinfo.json',
      pageSnapshot: {
        type: 'html',
        path: 'assets/provenance/test/source-page.html',
        sha256: digest,
      },
    },
    derivatives,
    processing: [
      {
        at: '2026-10-20T00:00:00Z',
        tool: 'sharp',
        versions: {},
        operations: ['responsive resize', 'AVIF/WebP encoding'],
        originalModified: false,
        recipes: ['uncropped'],
      },
    ],
  });
  assert.equal(canPublishAsset(approved), true);
  assert.match(photoSources(approved)!.avif, /390w, .*780w/);
  assert.equal(photoSources(approved, 'unapproved-crop'), null);
  assert.deepEqual(processingChanges(approved), [
    'responsive resize',
    'AVIF/WebP encoding',
  ]);
  assert.equal(
    canPublishAsset({
      ...approved,
      derivatives: approved.derivatives.map((item) => ({
        ...item,
        processing: { ...item.processing, sourceSha256: 'c'.repeat(64) },
      })),
    }),
    false,
  );
  assert.equal(
    canPublishAsset({
      ...approved,
      sourceCheck: { ...approved.sourceCheck, pageSnapshot: null },
    }),
    false,
  );
});
