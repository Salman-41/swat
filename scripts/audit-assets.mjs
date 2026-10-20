import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { sourceRegistrySchema } from '../src/lib/registry.ts';
import { canPublishAsset } from '../src/lib/evidence.ts';
import { hasVerifiedAssetFiles } from '../src/lib/asset-files.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registry = sourceRegistrySchema.parse(
  JSON.parse(
    await readFile(resolve(root, 'content/source-registry.json'), 'utf8'),
  ),
);
let invalid = 0;
let missing = 0;
let quarantined = 0;
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const ids = new Set();
for (const asset of registry.assets) {
  const errors = [];
  if (ids.has(asset.id)) errors.push('duplicate ID');
  ids.add(asset.id);
  if (
    !asset.sourcePageUrl.startsWith('https://commons.wikimedia.org/wiki/File:')
  )
    errors.push('unexpected source page');
  if (asset.location.status === 'location-conflict') quarantined += 1;
  if (asset.downloadStatus === 'downloaded') {
    try {
      const bytes = await readFile(resolve(root, asset.localOriginalPath));
      if (!asset.sha256 || digest(bytes) !== asset.sha256)
        errors.push('original checksum mismatch');
      const decoded = await sharp(bytes).metadata();
      if (
        decoded.width !== asset.dimensions.width ||
        decoded.height !== asset.dimensions.height
      )
        errors.push('original dimensions mismatch');
    } catch {
      errors.push('claimed original does not exist');
    }
  } else {
    missing += 1;
    if (asset.sha256) errors.push('checksum present without verified download');
    if (asset.derivatives.length)
      errors.push('derivatives present without original');
  }
  for (const derivative of asset.derivatives) {
    try {
      const bytes = await readFile(resolve(root, derivative.path));
      if (digest(bytes) !== derivative.sha256)
        errors.push('derivative checksum mismatch');
      if (derivative.processing?.sourceSha256 !== asset.sha256)
        errors.push('derivative has stale source');
      const decoded = await sharp(bytes).metadata();
      if (
        decoded.width !== derivative.width ||
        decoded.height !== derivative.height ||
        decoded.format !== (derivative.format === 'avif' ? 'heif' : 'webp')
      )
        errors.push('derivative dimensions or format mismatch');
      if (bytes.length !== derivative.bytes)
        errors.push('derivative byte count mismatch');
    } catch {
      errors.push('claimed derivative does not exist');
    }
  }
  if (
    asset.publicationApproved &&
    (!canPublishAsset(asset) || !hasVerifiedAssetFiles(asset, root))
  )
    errors.push('invalid publication approval or missing provenance');
  invalid += errors.length;
  console.log(
    `${asset.id}: ${errors.length ? errors.join('; ') : asset.downloadStatus + (asset.location.status === 'location-conflict' ? ' / LOCATION CONFLICT' : '')}`,
  );
}
for (const path of [
  'START_HERE_MASTER_PROMPT.md',
  'docs/FIGMA_PAGE_MAP.json',
  'docs/REAL_IMAGE_MANIFEST.json',
]) {
  try {
    await access(
      resolve(
        root,
        'reference/SWAT_CODEX_HANDOFF',
        path === 'START_HERE_MASTER_PROMPT.md' ? `prompts/${path}` : path,
      ),
    );
  } catch {
    console.log(`Missing reference input: ${path}`);
  }
}
console.log(
  `${registry.assets.length} records; ${missing} unavailable originals; ${quarantined} location conflicts; ${invalid} invalid registry assertions.`,
);
if (
  invalid ||
  (process.argv.includes('--strict') &&
    (missing ||
      quarantined ||
      registry.assets.some((a) => !a.publicationApproved)))
)
  process.exitCode = 1;
