import type { Narrative } from './contracts.ts';

// Source: packaged page map and user narrative brief; planning prose is not documentary evidence.
export const narratives: Narrative[] = [
  {
    id: 'home',
    path: '/',
    title: 'Home',
    description:
      'Landscape, river, history and living culture: a planned editorial entry.',
    sections: [
      {
        id: 'home-1',
        kind: 'landscape-entry',
        heading: 'Landscape entry',
        intent:
          'Open through an authentic landscape photograph and a short editorial invitation.',
        requiredEvidence:
          'Resolved river location, reviewed image and reference composition.',
        mediaAssetId: null,
        referenceSection: 'Cinematic hero',
      },
      {
        id: 'home-2',
        kind: 'mission',
        heading: 'Editorial mission',
        intent: 'Explain the project’s purpose with approved authored copy.',
        requiredEvidence: 'Master brief and accountable editorial owner.',
        mediaAssetId: null,
        referenceSection: 'Editorial manifesto',
      },
      {
        id: 'home-3',
        kind: 'river-connection',
        heading: 'Follow the river',
        intent: 'Introduce the River narrative as the first onward path.',
        requiredEvidence: 'Approved river context and sources.',
        mediaAssetId: null,
        link: {
          href: '/river/',
          label: 'Explore the River plan',
        },
        referenceSection: 'River exploration',
      },
      {
        id: 'home-4',
        kind: 'landscape-interlude',
        heading: 'Landscape interlude',
        intent: 'Make space for a real landscape between editorial movements.',
        requiredEvidence: 'Authentic reviewed photograph and crop approval.',
        mediaAssetId: null,
        referenceSection: 'Full-width landscape',
      },
      {
        id: 'home-5',
        kind: 'history-culture-mosaic',
        heading: 'History and culture mosaic',
        intent:
          'Connect independent archaeology and contemporary culture stories.',
        requiredEvidence:
          'Cited essays and approved voices; no invented dates.',
        mediaAssetId: null,
        referenceSection: 'Story mosaic',
      },
      {
        id: 'home-6',
        kind: 'craft-context',
        heading: 'Craft or sourced culture context',
        intent:
          'Use a real process story or a sourced text-only culture context.',
        requiredEvidence:
          'A documented Swat contributor, consent and authentic craft media.',
        mediaAssetId: null,
        link: {
          href: '/living-swat/',
          label: 'Explore Living Swat',
        },
        referenceSection: 'Living culture',
      },
      {
        id: 'home-7',
        kind: 'selected-places',
        heading: 'Selected places',
        intent: 'Introduce a small authored selection of destinations.',
        requiredEvidence: 'Place research and approved selection rationale.',
        mediaAssetId: null,
        link: {
          href: '/places/',
          label: 'Explore Places',
        },
        referenceSection: 'Places',
      },
      {
        id: 'home-8',
        kind: 'type-footer',
        heading: 'Closing editorial note',
        intent:
          'Close the opening narrative through typography and an onward invitation.',
        requiredEvidence: 'Approved final copy and reference typography.',
        mediaAssetId: null,
        referenceSection: 'Footer',
      },
    ],
  },
  {
    id: 'river',
    path: '/river/',
    title: 'River',
    description:
      'A planned spatial and editorial journey with evidence-led geographic stops.',
    sections: [
      {
        id: 'river-1',
        kind: 'spatial-intro',
        heading: 'Spatial introduction',
        intent: 'Orient the reader using verified river geography.',
        requiredEvidence:
          'An attributable river dataset and coordinate review.',
        mediaAssetId: null,
        referenceSection: 'Hero',
      },
      {
        id: 'river-2',
        kind: 'geographic-stops',
        heading: 'Geographic stops',
        intent:
          'Order stops only after their geographic relationships are verified.',
        requiredEvidence:
          'Verified coordinates, labels, scale and source dataset.',
        mediaAssetId: null,
        referenceSection: 'River index',
      },
      {
        id: 'river-3',
        kind: 'editorial-feature',
        heading: 'Bahrain editorial feature',
        intent: 'Shift from spatial orientation into a close authored essay.',
        requiredEvidence:
          'A sourced Bahrain article, credited author and authentic media.',
        mediaAssetId: null,
        referenceSection: 'Bahrain focus',
      },
      {
        id: 'river-4',
        kind: 'history-culture-branches',
        heading: 'History and culture branches',
        intent: 'Branch from river geography into relevant contextual stories.',
        requiredEvidence:
          'Reviewed relationships between places, history and living culture.',
        mediaAssetId: null,
        link: {
          href: '/through-time/',
          label: 'Explore Through Time',
        },
        referenceSection: 'Parallel narratives',
      },
      {
        id: 'river-5',
        kind: 'source-trail',
        heading: 'Fieldnotes and sources',
        intent: 'Expose the evidence behind the route and its interpretation.',
        requiredEvidence: 'Citations, dataset versions and uncertainty notes.',
        mediaAssetId: null,
        link: {
          href: '/fieldnotes/',
          label: 'Open Fieldnotes',
        },
        referenceSection: 'Field notes',
      },
    ],
  },
  {
    id: 'through-time',
    path: '/through-time/',
    title: 'Through Time',
    description:
      'A planned archaeological narrative with explicit provenance and historical uncertainty.',
    sections: [
      {
        id: 'through-time-1',
        kind: 'archaeological-opening',
        heading: 'Archaeological opening',
        intent:
          'Begin with an authentic site image and a carefully sourced framing.',
        requiredEvidence:
          'Reviewed Butkara photograph; cited archaeological context.',
        mediaAssetId: null,
        referenceSection: 'Editorial history hero',
      },
      {
        id: 'through-time-2',
        kind: 'sourced-stratigraphy',
        heading: 'Sourced stratigraphy',
        intent:
          'Present periods or layers only where their source supports the sequence.',
        requiredEvidence:
          'Archaeological publications, page locators and stated date precision.',
        mediaAssetId: null,
        referenceSection: 'Stratigraphy',
      },
      {
        id: 'through-time-3',
        kind: 'monument-essay',
        heading: 'Monument essay',
        intent: 'Move into a close reading of a documented monument.',
        requiredEvidence:
          'An approved essay with separated source statements and interpretation.',
        mediaAssetId: null,
        referenceSection: 'Heritage landscape',
      },
      {
        id: 'through-time-4',
        kind: 'provenance-archive',
        heading: 'Provenance archive',
        intent: 'Make the documentary record available for inspection.',
        requiredEvidence:
          'Source records, collection identifiers and permissions.',
        mediaAssetId: null,
        referenceSection: 'Source-led archive',
      },
      {
        id: 'through-time-5',
        kind: 'related-destinations',
        heading: 'Related destinations',
        intent: 'Connect the historical narrative to approved place essays.',
        requiredEvidence:
          'Cited place relationships and reviewed destination records.',
        mediaAssetId: null,
        link: {
          href: '/places/',
          label: 'Explore Places',
        },
        referenceSection: 'Related places',
      },
    ],
  },
  {
    id: 'places',
    path: '/places/',
    title: 'Places',
    description:
      'A planned authored place index with four distinct editorial treatments.',
    sections: [
      {
        id: 'places-1',
        kind: 'authored-index',
        heading: 'Landscape opening and authored introduction',
        intent:
          'Open through an authentic landscape and introduce the editorial basis for a selected place index.',
        requiredEvidence: 'Approved place research and inclusion rationale.',
        mediaAssetId: null,
        referenceSection: 'Hero',
      },
      {
        id: 'places-2',
        kind: 'place-treatments',
        heading: 'Four distinct place treatments',
        intent:
          'Reserve separate narratives for Kalam, Malam Jabba, Mahodand and Barikot.',
        requiredEvidence:
          'A place-specific essay and authentic media for every treatment.',
        mediaAssetId: null,
        referenceSection: 'Places index',
      },
      {
        id: 'places-3',
        kind: 'spatial-orientation',
        heading: 'Spatial orientation',
        intent: 'Locate reviewed destinations without implied precision.',
        requiredEvidence:
          'Coordinates and source-linked geography with accuracy recorded.',
        mediaAssetId: null,
        referenceSection: 'Geographic narrative',
      },
      {
        id: 'places-4',
        kind: 'landscape',
        heading: 'Landscape sequence',
        intent: 'Place real landscapes in their documented local context.',
        requiredEvidence:
          'Reviewed images, verified subjects and approved crops.',
        mediaAssetId: null,
        referenceSection: 'Landscape interlude',
      },
      {
        id: 'places-5',
        kind: 'responsible-travel',
        heading: 'Responsible travel',
        intent:
          'Publish practical travel context only after local and current-source review.',
        requiredEvidence:
          'Dated local guidance, review owner and approved wording.',
        mediaAssetId: null,
        referenceSection: 'Practical guide',
      },
    ],
  },
  {
    id: 'living-swat',
    path: '/living-swat/',
    title: 'Living Swat',
    description:
      'A planned contributor-led narrative with consent and authentic cultural evidence.',
    sections: [
      {
        id: 'living-swat-1',
        kind: 'contributor-story',
        heading: 'Contributor and human story',
        intent:
          'Begin with a named contributor’s account when they consent to publication.',
        requiredEvidence:
          'Real contributor, interview record, attribution preference and consent.',
        mediaAssetId: null,
        referenceSection: 'People hero',
      },
      {
        id: 'living-swat-2',
        kind: 'languages',
        heading: 'Languages',
        intent:
          'Describe language through sourced context or credited contributor voices.',
        requiredEvidence:
          'Authoritative references, spelling review and speaker consent.',
        mediaAssetId: null,
        referenceSection: 'Languages',
      },
      {
        id: 'living-swat-3',
        kind: 'craft-context',
        heading: 'Craft and documented process',
        intent:
          'Present documented local craft through real process media and contributor permission.',
        requiredEvidence:
          'Authentic Swat craft photographs or recordings, credits, rights and consent.',
        mediaAssetId: null,
        referenceSection: 'Crafts',
      },
      {
        id: 'living-swat-oral-history',
        kind: 'oral-history',
        heading: 'Oral history and sound',
        intent:
          'Reserve an independent listening section for authentic contributor recordings.',
        requiredEvidence:
          'Permission-cleared recording, transcript, speaker attribution, language review and contextual citations.',
        mediaAssetId: null,
        referenceSection: 'Oral history',
      },
      {
        id: 'living-swat-4',
        kind: 'contribution-invitation',
        heading: 'Contribution invitation',
        intent:
          'Invite contributions once a real editorial intake and consent process exist.',
        requiredEvidence:
          'Responsible contact, intake method and contributor consent policy.',
        mediaAssetId: null,
        referenceSection: 'Contributors',
      },
    ],
  },
  {
    id: 'fieldnotes',
    path: '/fieldnotes/',
    title: 'Fieldnotes',
    description:
      'A planned evidence-first notebook for environment stories and actual datasets.',
    sections: [
      {
        id: 'fieldnotes-1',
        kind: 'environment-story',
        heading: 'Sourced environment story',
        intent:
          'Begin with an authored environment question supported by inspectable sources.',
        requiredEvidence: 'Approved article, named author and dated evidence.',
        mediaAssetId: null,
        referenceSection: 'Landscape hero',
      },
      {
        id: 'fieldnotes-2',
        kind: 'dataset-visualization',
        heading: 'Satellite and terrain evidence',
        intent:
          'Render satellite or terrain visualizations only from an actual licensed dataset.',
        requiredEvidence:
          'Dataset URL, license, acquisition date, resolution, processing and limitations.',
        mediaAssetId: null,
        referenceSection: 'Observations comparison',
      },
      {
        id: 'fieldnotes-3',
        kind: 'provenance',
        heading: 'Map literacy and provenance',
        intent:
          'Explain what actual maps can support and what they cannot, while tracing source versions and processing history.',
        requiredEvidence:
          'Source versions, transformation records and reproducible methods.',
        mediaAssetId: null,
        referenceSection: 'Map literacy',
      },
      {
        id: 'fieldnotes-4',
        kind: 'interpretation-notes',
        heading: 'Sources, method and interpretation',
        intent:
          'Publish source records and methods, separating observations, historical-source statements and interpretation with explicit uncertainty.',
        requiredEvidence:
          'Cited claims, explicit uncertainty and review approval.',
        mediaAssetId: null,
        referenceSection: 'Sources and method',
      },
    ],
  },
];
