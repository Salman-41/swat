import matrix from '../../content/shot-to-section-matrix.json';

export interface SectionDirection {
  composition: string;
  mobile: string;
}
export interface PageDirection {
  id: string;
  route: string;
  title: string;
  opening: string;
  character: string;
  sections: (SectionDirection & {
    referenceSection: string;
    candidateAssetIds: string[];
  })[];
}

const treatments: Record<
  string,
  {
    title: string;
    opening: string;
    character: string;
    sections: SectionDirection[];
  }
> = {
  home: {
    title: 'Home',
    opening: 'Swat. Some places stay with you.',
    character:
      'An expansive arrival, a quiet pause, then a river-led invitation into the valley.',
    sections: [
      {
        composition:
          'Full-bleed verified river landscape; the large Swat wordmark sits upper left, with an italic second thought below. Keep the river and inhabited context visible.',
        mobile:
          'Use a separately reviewed portrait crop; wordmark above the subject, short introduction below it. When no crop is safe, keep the photograph separate from the title.',
      },
      {
        composition:
          'Paper field, large left-aligned manifesto and a short paragraph offset to the right. White space creates the first pause.',
        mobile:
          'Stack heading and paragraph with 48–72 px of breathing space, not an empty fixed-height screen.',
      },
      {
        composition:
          'Pine split: a typographic place index at 44% and verified geographic exploration at 56%. The normal place links remain the primary control.',
        mobile:
          'Show the index before the map. Offer an explicit Explore map action; no scroll capture or pinned map on a phone.',
      },
      {
        composition:
          'A wide Kalam forest photograph with a small caption beneath. Move any large statement outside the image if it competes with tree structure.',
        mobile:
          'A 4:5 frame only after crop review; otherwise show the original ratio. Caption stays in document flow.',
      },
      {
        composition:
          'An asymmetric story mosaic: one substantial archaeology essay beside two quieter culture links. Use typography when culture media is missing.',
        mobile:
          'History first, then language, then craft. Distinct text treatments prevent a column of identical cards.',
      },
      {
        composition:
          'Stone background with human-scale copy and a documented process photograph. Until a craft source exists, use sourced text; Islampur may appear only as village context.',
        mobile:
          'Copy before the image. Keep contributor and consent context beside the actual work, never hidden behind a hover.',
      },
      {
        composition:
          'Three destinations with uneven photographic scale: Kalam as a tall arrival, Mahodand as a horizontal water study, Barikot as an uncropped town panorama.',
        mobile:
          'A single ordered sequence with full place names, visible captions and an ordinary link to each anchored essay.',
      },
      {
        composition:
          'Deep green typographic close: Take the long way. Compact navigation and a clear sources link below one fine rule.',
        mobile:
          'Let the line wrap naturally. Navigation becomes two readable columns; no forced single-line display type.',
      },
    ],
  },
  river: {
    title: 'The River',
    opening: 'The river remembers.',
    character:
      'A spatial reading experience, with explicit choices and room to stay at a place.',
    sections: [
      {
        composition:
          'A spatial title on deep green; pair with a verified river photograph only when it establishes the stated location. A decorative line must never impersonate measured geography.',
        mobile:
          'Keep title, introduction and next-section link visible without waiting for an animated entrance.',
      },
      {
        composition:
          'Paper two-column atlas: accessible place list at left, true river geometry at right. Put source/attribution and selected place context immediately below the map.',
        mobile:
          'A text index precedes a bounded map. Selecting a place updates its heading and URL anchor, not the page scroll position unexpectedly.',
      },
      {
        composition:
          'Bahrain as a specific editorial essay. Use a genuine Bahrain view or a wide text-led feature; the Kalam forest cannot fill this slot.',
        mobile:
          'A short headline followed by copy and any verified local view. No fixed 800 px photograph with a bottom-aligned wall of text.',
      },
      {
        composition:
          'Two unequal story branches: archaeology on paper and living culture on stone. Each has a title, a short reason to leave the river, and a real route link.',
        mobile:
          'Stack branches with different spacing and hierarchy; no two identical promotional tiles.',
      },
      {
        composition:
          'A quiet methods bridge with a source locator and a short account of what the geography can and cannot show.',
        mobile:
          'Keep attribution and source links readable in the normal text flow.',
      },
      {
        composition: 'Shared deep-green typographic footer.',
        mobile:
          'Shared accessible footer, with no map or animation code loading here.',
      },
    ],
  },
  history: {
    title: 'Through Time',
    opening: 'The ground has a longer memory.',
    character:
      'An evidence-led reading of layers, with each place retaining its identity.',
    sections: [
      {
        composition:
          'An archaeological editorial opening, using a Butkara I photograph only with a Butkara-specific caption. Place the main type on paper if the monument is visually dense.',
        mobile:
          'Headline above a complete view of the monument; never crop a stupa into an unidentified texture behind text.',
      },
      {
        composition:
          'A contextual evidence sequence: source label, period as stated, feature and interpretation. Any conceptual layer illustration is visibly labelled and separated from excavation evidence.',
        mobile:
          'A stacked reading order with accessible layer selection. All layers remain available without JavaScript.',
      },
      {
        composition:
          'A monument essay with a dominant Butkara view and smaller contextual text. A Barikot excavation essay needs its own verified excavation image and research.',
        mobile:
          'Image, caption, then essay. Avoid masked image boundaries that conceal the documented feature.',
      },
      {
        composition:
          'A provenance-led archive with three distinct entries: Barikot town context, Butkara monument, museum exterior. Show source and image role beside each entry.',
        mobile:
          'Retain full panoramas and small museum scale. These are documentary entries, not a carousel of interchangeable ancient objects.',
      },
      {
        composition:
          'A spacious text invitation into related places, with one supporting town view if useful.',
        mobile:
          'One clear destination link followed by supporting context; no redundant gallery.',
      },
      {
        composition: 'Shared deep-green typographic footer.',
        mobile: 'Shared accessible footer.',
      },
    ],
  },
  places: {
    title: 'Places',
    opening: 'Every bend holds a place.',
    character:
      'An authored set of place essays, rather than a ranking or a checklist.',
    sections: [
      {
        composition:
          'A generous landscape entry with a short title on paper or a reviewed safe image area. The square Kalam candidate is not assumed to support a panoramic hero.',
        mobile:
          'Use a complete square view if the approved portrait crop is weak. Title can sit above the image.',
      },
      {
        composition:
          'Four deliberately different essays: tall Kalam, wide Malam Jabba, a quiet Mahodand water spread, and a letterboxed Barikot panorama. Each opens actual anchored place content.',
        mobile:
          'One destination at a time with mixed natural aspect ratios. Tap and keyboard expose the same essay as pointer selection.',
      },
      {
        composition:
          'A geographic orientation spread with a short north-to-south narrative and verified settlement points only after acquisition. No implied distances or elevations from the layout.',
        mobile:
          'A readable ordered place list. Geographic interaction is optional, never required to access an essay.',
      },
      {
        composition:
          'An immersive Kalam forest interlude using the photograph at a large, calm scale. A sentence can follow on paper rather than cover the trees.',
        mobile:
          'Prioritize an intact subject and a useful caption over edge-to-edge cropping.',
      },
      {
        composition:
          'A practical, restrained close with general care principles and dated official links for changeable travel information. Do not invent current road conditions.',
        mobile:
          'Short paragraphs and comfortably sized links; no fake booking or itinerary controls.',
      },
      {
        composition: 'Shared deep-green typographic footer.',
        mobile: 'Shared accessible footer.',
      },
    ],
  },
  people: {
    title: 'Living Swat',
    opening: 'A place is its people.',
    character:
      'A quieter human scale, with consent and contributor attribution shaping the pacing.',
    sections: [
      {
        composition:
          'A text-led human opening until an identified contributor consents. A verified Islampur village view may establish place, with no inferred biography or craft identity.',
        mobile:
          'Allow the headline to lead; keep a contributor name and credit next to any future portrait, not as overlay microtext.',
      },
      {
        composition:
          'A language-led typographic spread: names, sourced context and reviewed spelling. Keep Pashto, Torwali and Gawri distinct; introduce local scripts only after language review.',
        mobile:
          'Names stack at a readable scale. No decorative invented script, transliteration or synthetic quotation.',
      },
      {
        composition:
          'Document materials, hands and process through an actual craft contributor. Until that exists, a short stone-background editorial treatment replaces the photograph entirely.',
        mobile:
          'Use text and any cleared process sequence in natural order. Do not turn the reference textile illustration into evidence of local tradition.',
      },
      {
        composition:
          'A focused listening space only after audio, transcript, translation and permission are present. Otherwise state the editorial intention without a player or waveform.',
        mobile:
          'Transcript remains visible and selectable. Playback requires a deliberate action and never starts on scroll.',
      },
      {
        composition:
          'A contribution invitation that credits actual contributors and describes the consent process. Add a submission control only when a real intake destination exists.',
        mobile:
          'Plain-language consent and a real contact method; no nonfunctional form.',
      },
      {
        composition: 'Shared deep-green typographic footer.',
        mobile: 'Shared accessible footer.',
      },
    ],
  },
  fieldnotes: {
    title: 'Fieldnotes',
    opening: 'The landscape is still being written.',
    character:
      'Clear questions, dated observations and explicit limits on interpretation.',
    sections: [
      {
        composition:
          'An environment question on deep green, with one verified landscape only if relevant. No implied climate trend from a scenic photograph.',
        mobile:
          'A compact title and question; source context follows immediately.',
      },
      {
        composition:
          'Two registered observations at identical extent and scale, with dates, season, bands and processing visible. Until matching scenes exist, use a text-led observation method.',
        mobile:
          'Offer an accessible comparison control plus full earlier/later views. No unrelated images or illustrative before-and-after panels.',
      },
      {
        composition:
          'A stone map-literacy spread that distinguishes a measurement from an interpretation. Data legends have real units only when a real dataset exists.',
        mobile:
          'Read explanation before visualization; keep the legend adjacent and never hide uncertainty in a tooltip.',
      },
      {
        composition:
          'A paper source-and-method close: dataset identifier, licence, acquisition date, transformation and limitations. Use editorial rules and typography rather than three generic method cards.',
        mobile:
          'Stack source records with wrapping URLs and descriptive links; preserve the evidence class in text.',
      },
      {
        composition: 'Shared deep-green typographic footer.',
        mobile: 'Shared accessible footer.',
      },
    ],
  },
};

export const pageDirections: PageDirection[] = matrix.pages.map((page) => {
  const treatment = treatments[page.referenceKey];
  if (!treatment || treatment.sections.length !== page.sections.length) {
    throw new Error(
      `Art direction does not cover the full reference: ${page.referenceKey}`,
    );
  }
  return {
    id: page.referenceKey,
    route: page.route,
    title: treatment.title,
    opening: treatment.opening,
    character: treatment.character,
    sections: page.sections.map((section, index) => ({
      ...treatment.sections[index]!,
      referenceSection: section.referenceSection,
      candidateAssetIds: section.candidateAssetIds,
    })),
  };
});

export const signatureInteractions = [
  {
    title: 'Follow the water',
    purpose:
      'A real place selection connects map, local essay and related stories; the visitor can stay, return or follow a text link.',
    motion:
      'In the motion phase, animate the verified river path only inside its bounded section. Use explicit selection, visible attribution and a static index; reduce to instant selection for reduced motion.',
  },
  {
    title: 'Read a layer',
    purpose:
      'A history selection changes the feature, source locator and interpretation together so the image is read in context.',
    motion:
      'Reveal only the selected evidence boundary over 350–550 ms. Preserve all static evidence sections and label conceptual diagrams; no invented excavation depth.',
  },
  {
    title: 'Enter a place',
    purpose:
      'Distinct destination images lead into real essays while preserving the visitor’s location in the index.',
    motion:
      'A modest 250–400 ms image-to-essay transition after deliberate selection. Pointer previews are optional; touch and keyboard have the same destination and content.',
  },
  {
    title: 'Listen with context',
    purpose:
      'Permission-cleared voices are heard with speaker credit, language, transcript and a clear consent trail.',
    motion:
      'Keep typography calm; indicate progress only from actual playback. Omit the player until authentic audio exists; never use decorative audio bars.',
  },
  {
    title: 'Compare an observation',
    purpose:
      'A dated, registered pair lets readers examine a specific environmental question without mistaking a visual difference for a causal explanation.',
    motion:
      'Native range input with keyboard increments, a visible value and separate full-scene views. No looping reveal; reduce motion to direct position changes. Do not enable without comparable scenes.',
  },
];
