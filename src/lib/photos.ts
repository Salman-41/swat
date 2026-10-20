import type { SourceAsset } from '../data/contracts.ts';
import { canPublishAsset } from './evidence.ts';

/** Pure selection; callers must also verify local file checksums at the build boundary. */
export function photoSources(asset: SourceAsset, recipeId = 'uncropped') {
  if (!canPublishAsset(asset)) return null;
  const variants = asset.derivatives
    .filter((item) => item.processing.recipeId === recipeId)
    .sort((a, b) => a.width - b.width);
  const webp = variants.filter((item) => item.format === 'webp');
  const avif = variants.filter((item) => item.format === 'avif');
  if (!webp.length || !avif.length) return null;
  const fallback =
    webp.find((item) => item.width >= 768) ?? webp[webp.length - 1]!;
  const srcset = (items: typeof variants) =>
    items.map((item) => `${item.url} ${item.width}w`).join(', ');
  return { fallback, webp: srcset(webp), avif: srcset(avif) };
}

export function processingChanges(asset: SourceAsset): string[] {
  return [...new Set(asset.processing.flatMap((record) => record.operations))];
}
