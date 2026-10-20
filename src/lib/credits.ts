import registry from '../../content/source-registry.json';
import type { ImageCredit } from '../data/contracts.ts';
import { hasVerifiedAssetFiles } from './asset-files.ts';
import { canPublishAsset } from './evidence.ts';
import { processingChanges } from './photos.ts';
import { sourceRegistrySchema } from './registry.ts';

// Invalid provenance fails the build instead of being hidden by a TypeScript cast.
export const sourceRegistry = sourceRegistrySchema.parse(registry);
export const sourceAssets = sourceRegistry.assets;
export const imageCredits: ImageCredit[] = sourceAssets.map((asset) => ({
  id: asset.id,
  title: asset.title,
  creator: asset.photographer,
  sourceUrl: asset.sourcePageUrl,
  licenseName: asset.license.name,
  licenseUrl: asset.license.url,
  changes: processingChanges(asset),
  available:
    canPublishAsset(asset) && hasVerifiedAssetFiles(asset, process.cwd()),
  issues: asset.issues,
}));
