import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import type { SourceAsset } from '../data/contracts.ts';

/** Build-time only: an approved registry record cannot stand in for actual bytes. */
export function hasVerifiedAssetFiles(
  asset: SourceAsset,
  projectRoot: string,
): boolean {
  const root = resolve(projectRoot);
  const matches = (
    path: string,
    checksum: string | null,
    directory: string,
  ): boolean => {
    if (!checksum || !/^[a-f0-9]{64}$/i.test(checksum)) return false;
    const absolute = resolve(root, path);
    if (!absolute.startsWith(resolve(root, directory) + sep)) return false;
    try {
      return (
        createHash('sha256').update(readFileSync(absolute)).digest('hex') ===
        checksum
      );
    } catch {
      return false;
    }
  };
  return (
    matches(asset.localOriginalPath, asset.sha256, 'assets/originals') &&
    asset.derivatives.length > 0 &&
    asset.derivatives.every(
      (derivative) =>
        derivative.width > 0 &&
        derivative.height > 0 &&
        matches(derivative.path, derivative.sha256, 'public/images'),
    )
  );
}
