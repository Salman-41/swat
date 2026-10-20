# SWAT architecture · foundation checkpoint

The six narrative routes are one static editorial publication. The retained reference is a reconstruction, not production code. The working route plans remain visible while photographs and factual content are acquired; they are not the six finished designs.

## Rendering and ownership

- Astro 7.4.1 generates all narrative content as HTML. TypeScript contracts separate `observed`, `historical_source` and `interpretive` evidence. Native anchors and disclosures work without JavaScript.
- Share `BaseLayout`, navigation, footer, `SourcePhoto` and source citations. Compose each narrative in its own route; the present `SectionPlan` is an inspection scaffold and must not become the production layout template.
- `content/source-registry.json` owns photograph provenance. Zod validates it in builds and audits. `src/lib/evidence.ts` handles editorial eligibility; `asset-files.ts` also checks bytes and stored source metadata. `SourcePhoto` emits only eligible local AVIF/WebP sources, dimensions and visible credit links. Its fallback is readable text.
- `content/shot-to-section-matrix.json` preserves all 37 reference sections, including shared footers. Run `npm run assets:matrix` for the inspectable component/asset map.
- `content/geography/atlas-acquisition.json` owns the pending GIS acquisition record. No coordinates, basemap, geometry or satellite scene are invented. Actual data will have a separate, validated GeoJSON deliverable.
- Install React and the compatible official Astro integration only when the atlas or another complex stateful interaction needs an island. Hydrate the atlas on visibility; editorial pages should not load its code. The installed scaffold has no React integration to claim as tested.

## Page composition and interaction boundaries

| Route            | Composition to implement after asset review                                                                                                                                               | Interaction and static equivalent                                                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`              | Photo opening → offset manifesto → forest-green river split → full-width Kalam forest → asymmetric history/culture mosaic → stone culture context → three destinations → deep-green close | River progress and connected story previews; ordinary story links always present.                                                                                 |
| `/river/`        | Spatial opening → paper two-column place index and map → Bahrain essay → paired history/culture branches → sources bridge → close                                                         | Lazy MapLibre atlas, explicit place selection and URL anchor state. Separate settlement points from actual river geometry. Text index remains usable.             |
| `/through-time/` | Archaeological opening → evidence layers → site-specific heritage essay → three provenance entries → related places → close                                                               | Evidence layer selector with contextual source and date; static ordered evidence sections. Label any conceptual stratigraphy.                                     |
| `/places/`       | Landscape opening → four distinct destination photo treatments → geographic orientation → forest interlude → responsible travel → close                                                   | Place selection opens a real anchored essay; touch/keyboard selection must expose the same content as hover. No repeating flip cards.                             |
| `/living-swat/`  | Human/place context → language typography → documented craft → oral history → contributors → close                                                                                        | Voices and transcript selection only when permission-cleared originals exist. Until then, text-led context with no synthetic portrait, quote, player or waveform. |
| `/fieldnotes/`   | Environment question → observation pair → map literacy → sources and method → close                                                                                                       | Registered, dated comparison only after compatible scenes exist. Otherwise methods and evidence limitations, with no fake comparison control.                     |
| `/sources/`      | Source status → photograph records → missing documentary media → primary research/method links                                                                                            | Static, deep-linkable credits and native evidence disclosures. `/image-credits/` retains compatibility.                                                           |

An independent 404 links back to real routes. No publishing, accounts, uploads, forms or contributor contacts are implied by this foundation.

## Responsive layout contract

Preserve the section order at 320, 390, 768, 1024, 1440 and 1920 CSS pixels. The reference breakpoint is 760 px; do not force desktop layouts onto 768 px tablets without checking the actual content. Desktop gutters derive from `clamp(22px, 4.6vw, 74px)`; mobile uses 23 px unless a 320 px readability fix is needed. River and archaeological splits stack copy before imagery on mobile. The mosaic becomes a purposeful sequence, the four destination treatments become one column, languages stack, and source/method columns stack. Remove empty height from reference components whose vector images never rendered; do not reproduce those bugs.

The page map's Instrument families and declared palette are canonical. The reference CSS starts with Bodoni Moda and slightly different colour values; the screenshot may therefore use a fallback face. Keep self-hosted Instrument Serif roman/italic and Instrument Sans. Use `reference-tokens.css`, then approve crop and hierarchy in Phase B rather than silently changing the identity.

## Motion lifecycle, reserved for the motion phase

Use one owner for GSAP/ScrollTrigger and Lenis. Lenis will use `autoRaf: false`; its RAF is called by the GSAP ticker, its scroll event updates ScrollTrigger, and all callbacks/instances are cleaned up together. No scroll-jacking. Prefer ordinary document navigation in the first complete build; introduce Astro client routing only if focus, back/forward, scroll restoration and cleanup are explicitly tested. Reduced motion exposes all content without scroll transforms or smooth scrolling. Avoid pins on narrow screens unless the user task requires one.

GSAP, Lenis and MapLibre are intentionally not installed or simulated in Phase A. Check their official APIs and compatible stable releases when that phase starts. Three.js has no established need.

## Static deployment

`npm run build` produces `dist/`; no server adapter or runtime secrets are needed. Configure the eventual host to serve `404.html`. Set `SITE_URL` only to the approved origin. Keep `noindex`, crawler exclusions and the development notice until the publication review. The handoff requires deployment approval; this checkpoint is local and has not been registered, pushed or deployed with Sites.
