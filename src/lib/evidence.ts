import type { Claim, Geography, SourceAsset } from '../data/contracts.ts';

/** Guard against treating typed-but-empty evidence or missing precision as publication approval. */
export function canPublishClaim(
  claim: Claim,
  verifiedSourceIds: ReadonlySet<string>,
): boolean {
  const evidence = claim.evidence;
  if (
    claim.reviewStatus !== 'approved' ||
    !claim.text.trim() ||
    !evidence.sourceIds.length ||
    evidence.sourceIds.some((id) => !id.trim() || !verifiedSourceIds.has(id))
  )
    return false;
  if (evidence.kind === 'observed')
    return (
      /^\d{4}-\d{2}-\d{2}$/.test(evidence.observedOn) &&
      !Number.isNaN(Date.parse(evidence.observedOn)) &&
      !!evidence.method.trim()
    );
  if (evidence.kind === 'historical_source') return !!evidence.locator.trim();
  return !!evidence.rationale.trim() && !!evidence.limitations.trim();
}
export function canMap(
  geography: Geography,
  verifiedSourceIds: ReadonlySet<string>,
): boolean {
  const point = geography.coordinates;
  return (
    geography.reviewStatus === 'approved' &&
    geography.precision !== 'unknown' &&
    !!point &&
    Number.isFinite(point.latitude) &&
    Math.abs(point.latitude) <= 90 &&
    Number.isFinite(point.longitude) &&
    Math.abs(point.longitude) <= 180 &&
    point.sourceIds.length > 0 &&
    point.sourceIds.every((id) => verifiedSourceIds.has(id))
  );
}
export function canPublishAsset(asset: SourceAsset): boolean {
  return (
    asset.publicationApproved === true &&
    asset.downloadStatus === 'downloaded' &&
    /^[a-f0-9]{64}$/.test(asset.sha256 ?? '') &&
    !!asset.originalUrl &&
    asset.rightsStatus === 'license-verified' &&
    asset.license.verification === 'verified-live' &&
    asset.dimensions.verification === 'verified-original' &&
    asset.location.status === 'confirmed' &&
    asset.visualReviewStatus === 'reviewed' &&
    !!asset.alt.trim() &&
    !!asset.sourceCheck.metadataPath &&
    !!asset.sourceCheck.pageSnapshot &&
    asset.derivatives.length > 0 &&
    asset.derivatives.every(
      (item) =>
        item.processing.sourceSha256 === asset.sha256 &&
        item.processing.upscaled === false &&
        item.width <= (item.processing.rect?.width ?? asset.dimensions.width),
    )
  );
}
