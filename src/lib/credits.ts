import registry from '../../content/source-registry.json';
import type { ImageCredit, SourceAsset } from '../data/contracts.ts';
import { hasVerifiedAssetFiles } from './asset-files.ts';
import { canPublishAsset } from './evidence.ts';

// The asset pipeline validates registry JSON. This typed adapter keeps publication guards at the build boundary.
export const sourceAssets: SourceAsset[] = registry.assets as SourceAsset[];
export const imageCredits: ImageCredit[] = sourceAssets.map((asset) => ({
  id: asset.id,
  title: asset.title,
  creator: asset.photographer,
  sourceUrl: asset.sourcePageUrl,
  licenseName: asset.license.name,
  licenseUrl: asset.license.url,
  changes: asset.processing,
  available:
    canPublishAsset(asset) && hasVerifiedAssetFiles(asset, process.cwd()),
  issues: asset.issues,
}));
