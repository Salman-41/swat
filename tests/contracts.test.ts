import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { narratives } from '../src/data/narratives.ts';
import { places, mappedEvidence } from '../src/data/editorial.ts';
import {
  canMap,
  canPublishAsset,
  canPublishClaim,
} from '../src/lib/evidence.ts';
import type { Claim, SourceAsset } from '../src/data/contracts.ts';

const registry = JSON.parse(
  readFileSync(
    new URL('../content/source-registry.json', import.meta.url),
    'utf8',
  ),
) as { assets: SourceAsset[] };

test('unknown geography never becomes a map point', () => {
  for (const item of [...places, ...mappedEvidence]) {
    assert.equal(item.geography.coordinates, null);
    assert.equal(canMap(item.geography, new Set()), false);
  }
});
test('publication requires review and substantive evidence', () => {
  const claim: Claim = {
    id: 'contract-test',
    text: 'Test claim',
    reviewStatus: 'pending',
    evidence: {
      kind: 'historical_source',
      sourceIds: ['test-source'],
      locator: 'p. 4',
      dateAsStated: null,
    },
  };
  assert.equal(canPublishClaim(claim, new Set(['test-source'])), false);
  assert.equal(
    canPublishClaim(
      {
        ...claim,
        reviewStatus: 'approved',
        evidence: { ...claim.evidence, sourceIds: [''] },
      },
      new Set(['test-source']),
    ),
    false,
  );
  assert.equal(
    canPublishClaim(
      { ...claim, reviewStatus: 'approved' },
      new Set(['test-source']),
    ),
    true,
  );
});
test('unavailable sources remain withheld; disputed river cannot be cleared by download alone', () => {
  assert.equal(registry.assets.length, 10);
  for (const asset of registry.assets)
    if (asset.downloadStatus !== 'downloaded')
      assert.equal(canPublishAsset(asset), false);
  const river = registry.assets.find(
    (asset) => asset.id === 'swat-river-kalam',
  )!;
  assert.equal(river.location.status, 'location-conflict');
  assert.equal(
    canPublishAsset({
      ...river,
      publicationApproved: true,
      downloadStatus: 'downloaded',
      sha256: 'a'.repeat(64),
      rightsStatus: 'license-verified',
      visualReviewStatus: 'reviewed',
      license: { ...river.license, verification: 'verified-live' },
      dimensions: { ...river.dimensions, verification: 'verified-original' },
      derivatives: [
        {
          path: 'public/images/river.webp',
          url: '/images/river.webp',
          width: 640,
          height: 480,
          format: 'webp',
          sha256: 'b'.repeat(64),
          bytes: 100,
          uses: [{ displayWidth: 640, density: 1 }],
          processing: {
            recipeId: 'uncropped',
            rect: null,
            textSafeArea: null,
            colourspace: 'srgb',
            upscaled: false,
            sourceSha256: 'a'.repeat(64),
          },
        },
      ],
    }),
    false,
  );
});
test('narrative routes are unique and never assign invented media', () => {
  assert.equal(new Set(narratives.map((item) => item.path)).size, 6);
  const ids = narratives.flatMap((item) =>
    item.sections.map((section) => section.id),
  );
  assert.equal(new Set(ids).size, ids.length);
  for (const narrative of narratives) {
    assert.ok(narrative.sections.length >= 4);
    for (const section of narrative.sections) {
      assert.equal(section.mediaAssetId, null);
      if (section.link)
        assert.ok(narratives.some((item) => item.path === section.link?.href));
    }
  }
});
