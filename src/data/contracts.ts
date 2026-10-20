/** Publication claims must retain their evidence class. Planning prose is not a claim. */
export type Evidence =
  | {
      kind: 'observed';
      sourceIds: [string, ...string[]];
      observedOn: string;
      method: string;
    }
  | {
      kind: 'historical_source';
      sourceIds: [string, ...string[]];
      locator: string;
      dateAsStated: string | null;
    }
  | {
      kind: 'interpretive';
      sourceIds: [string, ...string[]];
      rationale: string;
      limitations: string;
    };

export interface Claim {
  id: string;
  text: string;
  evidence: Evidence;
  reviewStatus: 'pending' | 'approved';
}
export interface Geography {
  coordinates: {
    latitude: number;
    longitude: number;
    accuracyMeters: number | null;
    sourceIds: [string, ...string[]];
  } | null;
  boundaryDataset: { url: string; version: string; license: string } | null;
  precision: 'unknown' | 'approximate' | 'surveyed';
  reviewStatus: 'pending' | 'approved';
}
export interface Place {
  id: string;
  name: string;
  treatment: string;
  geography: Geography;
  claims: Claim[];
  mediaAssetId: string | null;
}
export interface Article {
  id: string;
  title: string;
  author: string | null;
  publishedOn: string | null;
  body: string | null;
  claims: Claim[];
  status: 'awaiting-sources' | 'draft' | 'approved';
}
export interface MappedEvidence {
  id: string;
  geography: Geography;
  evidence: Evidence | null;
  dataset: {
    url: string;
    license: string;
    acquiredOn: string;
    resolution: string;
  } | null;
}
export interface SourceAsset {
  id: string;
  title: string;
  sourcePageUrl: string;
  localOriginalPath: string;
  originalUrl: string | null;
  photographer: string;
  license: {
    name: string;
    url: string;
    verification: 'previous-record' | 'verified-live';
  };
  dimensions: {
    width: number;
    height: number;
    verification:
      'previous-record' | 'source-page-recorded' | 'verified-original';
  };
  sha256: string | null;
  downloadStatus: 'missing' | 'downloaded' | 'failed';
  location: {
    claim: string;
    status: 'source-description-only' | 'location-conflict' | 'confirmed';
    notes: string[];
  };
  rightsStatus: 'pending-original-verification' | 'license-verified';
  publicationApproved?: boolean;
  visualReviewStatus: 'pending' | 'reviewed';
  derivatives: {
    path: string;
    url: string;
    width: number;
    height: number;
    format: 'avif' | 'webp';
    sha256: string;
    bytes: number;
    uses: { displayWidth: number; density: number }[];
    processing: {
      recipeId: string;
      rect: { left: number; top: number; width: number; height: number } | null;
      textSafeArea: {
        x: number;
        y: number;
        width: number;
        height: number;
      } | null;
      colourspace: string;
      upscaled: false;
      sourceSha256: string;
    };
  }[];
  alt: string;
  caption: string;
  credit: string;
  processing: {
    at: string;
    tool: string;
    versions: Record<string, string>;
    operations: string[];
    originalModified: boolean;
    recipes: string[];
  }[];
  sourceCheck: {
    status: 'verified-live' | 'pending';
    checkedOn: string | null;
    retrievedOn: string | null;
    metadataPath: string | null;
    sourceRevisionId: number | null;
    pageSnapshot: { type: 'html'; path: string; sha256: string } | null;
    screenshot: string | null;
    method?: string;
  };
  issues: string[];
}
export interface ImageCredit {
  id: string;
  title: string;
  creator: string;
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
  changes: string[];
  available: boolean;
  issues: string[];
}
export type SectionKind =
  | 'landscape-entry'
  | 'mission'
  | 'river-connection'
  | 'landscape-interlude'
  | 'history-culture-mosaic'
  | 'craft-context'
  | 'selected-places'
  | 'type-footer'
  | 'spatial-intro'
  | 'geographic-stops'
  | 'editorial-feature'
  | 'history-culture-branches'
  | 'source-trail'
  | 'archaeological-opening'
  | 'sourced-stratigraphy'
  | 'monument-essay'
  | 'provenance-archive'
  | 'related-destinations'
  | 'authored-index'
  | 'place-treatments'
  | 'spatial-orientation'
  | 'landscape'
  | 'responsible-travel'
  | 'contributor-story'
  | 'languages'
  | 'craft-sound-consent'
  | 'contribution-invitation'
  | 'environment-story'
  | 'dataset-visualization'
  | 'provenance'
  | 'interpretation-notes'
  | 'oral-history';
export interface NarrativeSection {
  id: string;
  kind: SectionKind;
  heading: string;
  referenceSection: string;
  intent: string;
  requiredEvidence: string;
  mediaAssetId: string | null;
  link?: { href: string; label: string };
}
export interface Narrative {
  id: string;
  path: string;
  title: string;
  description: string;
  sections: NarrativeSection[];
}
