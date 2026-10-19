# SWAT — Codex visual handoff

## READ FIRST

This package contains a **faithful rebuilt visual reference, not a raw export or complete editable Figma file**. The Figma Starter-plan export tool hit its limit. The reference is derived from the six long-form desktop pages and six mobile pages already reviewed in Figma. Do not imply that the code is an exact Figma asset export. Original Figma: https://www.figma.com/design/YcTUvG9MEAZ2g2oQDsPfOe

### What is inside
- `preview/` — a static multi-page design reference with CSS and local vector placeholders; **not** the production app. Open `preview/index.html` or run `python -m http.server`.
- `screenshots/desktop/` and `screenshots/mobile/` — full-page browser screenshots generated from the local reconstructed reference.
- `reference_art/` — original lightweight vector fallback art (not photo evidence).
- `docs/FIGMA_PAGE_MAP.json` — Figma node references, dimensions, section sequence, palette and fonts.
- `docs/REAL_IMAGE_MANIFEST.json` — real Commons photographs with photographer, license, intended placement. Links only.
- `docs/SOURCE_CREDIT_TEMPLATE.md` — attribution and content provenance.
- `prompts/` — separate ordered, actionable build prompts.

### Critical truth constraints
**No real photograph files are bundled** because the runtime could not download source images; the build agent should fetch and check them. Do not use AI-generated photography; do not bundle previous generated images from the conversation. Do not present the vector river as a real measured river map.

### Implementation priorities
Real image acquisition + usage audit → Astro site structure → precise six-page editorial layout → GSAP/Lenis creative choreography → real geospatial interactive river → QA. Preserve the Figma sections and text hierarchy, but refine the repeated patterns rather than copying every rough art-direction choice.

### Where to start
Run the project as a static reference using `python -m http.server 8765` from this folder and visit `/preview/?page=home`. Screenshots give a fallback when a local browser is unavailable.
