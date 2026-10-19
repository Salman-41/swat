import type { Article, Geography, MappedEvidence, Place } from './contracts.ts';

const unknownGeography = (): Geography => ({
  coordinates: null,
  boundaryDataset: null,
  precision: 'unknown',
  reviewStatus: 'pending',
});
export const places: Place[] = [
  {
    id: 'kalam',
    name: 'Kalam',
    treatment:
      'A river-led arrival essay; do not infer position from disputed image metadata.',
    mediaAssetId: null,
  },
  {
    id: 'malam-jabba',
    name: 'Malam Jabba',
    treatment:
      'A terrain-led treatment after sourced landscape and access research.',
    mediaAssetId: null,
  },
  {
    id: 'mahodand',
    name: 'Mahodand',
    treatment:
      'A lake-led photo essay once approved images and local context are reviewed.',
    mediaAssetId: null,
  },
  {
    id: 'barikot',
    name: 'Barikot',
    treatment:
      'A settlement and archaeology relationship essay after evidence review.',
    mediaAssetId: null,
  },
].map((place) => ({ ...place, geography: unknownGeography(), claims: [] }));
export const articles: Article[] = [
  {
    id: 'bahrain-feature',
    title: 'Bahrain editorial feature',
    author: null,
    publishedOn: null,
    body: null,
    claims: [],
    status: 'awaiting-sources',
  },
  {
    id: 'monument-essay',
    title: 'Monument essay',
    author: null,
    publishedOn: null,
    body: null,
    claims: [],
    status: 'awaiting-sources',
  },
  {
    id: 'environment-story',
    title: 'Environment fieldnote',
    author: null,
    publishedOn: null,
    body: null,
    claims: [],
    status: 'awaiting-sources',
  },
];
export const mappedEvidence: MappedEvidence[] = [
  {
    id: 'river-orientation',
    geography: unknownGeography(),
    evidence: null,
    dataset: null,
  },
];
