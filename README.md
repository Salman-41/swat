# SWAT — A Living Valley · Phase A

An Astro and TypeScript foundation for six distinct editorial narratives. This is a working development scaffold, with explicitly unavailable publication content and media. It is not the finished design.

The source is the reconstructed handoff in `reference/SWAT_CODEX_HANDOFF/`: its master prompt, page map, image manifest, preview code, and all six desktop and six mobile screenshots were reviewed. It is not a raw Figma export. The original seven-source `content/image-manifest.json` and `docs/image-assets.md` remain unchanged.

## Run locally

Use **Node 24** (the `.nvmrc` and `.node-version` select it), or Node ≥22.22, and npm ≥9.6.5. The system Node 20 in the task environment is too old. No global packages are required.

```sh
npm ci
# Optional in a restricted environment: prevent Astro from writing a telemetry config.
export ASTRO_TELEMETRY_DISABLED=1
npm run dev
```

```sh
npm run check
npm run lint
npm run format:check
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`test:e2e` starts a local preview of **the built `dist/`**, so build first. It checks all six narratives at desktop and mobile sizes, the source registry page, keyboard disclosure behavior, JavaScript errors, missing-media handling, and horizontal overflow. It does not certify visual fidelity or a production accessibility/performance score. `npm run preview` serves the build separately.

## Routes and structure

| Route            | Planned rhythm                                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`              | Landscape entry → mission → river → landscape interlude → history/culture mosaic → authentic craft context → selected places → typographic close    |
| `/river/`        | Spatial opening → geographic stops → Bahrain feature → history/culture branches → Fieldnotes sources                                                |
| `/through-time/` | Archaeological opening → sourced stratigraphy → monument essay → provenance archive → related places                                                |
| `/places/`       | Landscape opening → authored index with distinct Kalam, Malam Jabba, Mahodand and Barikot treatments → orientation → landscape → responsible travel |
| `/living-swat/`  | Contributor opening → languages → real craft process → permission-cleared oral history → contribution invitation                                    |
| `/fieldnotes/`   | Sourced environment story → actual satellite/terrain datasets → map literacy/provenance → sources/method/interpretation                             |
| `/sources/`      | Image source register and attribution; `/image-credits/` is a compatibility alias                                                                   |

A dedicated 404 page handles unknown paths on a host configured to use it. Reference slugs `history` and `people` map to `/through-time/` and `/living-swat/`.

- `src/data/narratives.ts` declares the ordered section plan for every route. Every section names its packaged reference section. Section intents are planning prose, not documentary claims. The shared `SectionPlan` is a Phase A inspection view only; finished pages require their own composed sections, layouts and media treatments.
- `src/data/contracts.ts` defines places, articles, image credits, geography, mapped evidence and narratives. Evidence distinguishes `observed`, `historical_source` and `interpretive`.
- `src/data/editorial.ts` retains `null` coordinates, dates, bylines, article bodies, datasets and media until real evidence exists. Null is never coerced to a map position or publication date.
- `src/lib/evidence.ts` gates publication eligibility; `src/lib/asset-files.ts` checks actual original/derivative checksums at build time. Source metadata alone does not make an image available.
- `src/styles/reference-tokens.css` records the map's declared palette and Instrument type families. The preview CSS has slightly different color values; these are not silently conflated. `development.css` keeps the scaffold neutral until Phase B.
- Instrument Serif (400 roman/italic) and Instrument Sans (400/600) are self-hosted via Fontsource. No remote font service is called. Full art direction is deferred.

## Asset workflow

`content/source-registry.json` is the active pipeline registry. Original links, authors, exact licenses, dimensions, checksum, verification status, location issues and processing history stay attached to each source. The older image manifest is a retained input record, not proof that files exist.

```sh
npm run assets:fetch
npm run assets:process
npm run assets:audit
npm run assets:matrix
# Publication gate: should fail while approved assets remain unavailable.
npm run assets:audit -- --strict
```

Fetch/process commands may update the registry and create local evidence files. Originals belong in `assets/originals/`; responsive AVIF/WebP derivatives belong in `public/images/`. Crop approvals belong in `content/image-crops.json`. Do not upscale, invent direct source URLs, remove documentary content, or approve image publication from source-page text alone.

A disputed river source remains quarantined pending its location resolution. Butkara is not a Barikot excavation photograph. The museum source is a building photograph with limited resolution. Islampur village is not evidence of craft production. Contributor portraits, craft processes and audio require authentic sources and documented permission. No illustrative reference artwork is treated as a map, satellite scene or photograph.

## Architecture decision: Astro, React and deployment

Astro generates static HTML for this phase. Native `<details>` provides the evidence disclosure and ordinary links provide navigation, so no React runtime, hydration, GSAP, Lenis, MapLibre or UI kit is currently needed. This is deliberate dependency restraint, not a claim those future interactions are implemented.

Astro supports React through the official `@astrojs/react` integration. Add a compatible integration and React peer packages only when a substantial interaction (for example a real sourced atlas or evidence explorer) justifies an island, and scope its `client:*` directive to that component. Compatibility was reviewed against the official Astro documentation; there is no installed React integration to test yet.

`npm run build` emits `dist/` with `output: 'static'`. It can be served by a static host without a server adapter. Deployment has not been performed. Set `SITE_URL` to an approved real origin for canonical and Open Graph URLs; otherwise those URLs are omitted. All scaffold pages retain `noindex, nofollow` and `robots.txt` disallows crawling. Review these protections only when publication is authorized. No invented social image, organization, geographic structured data or production host is emitted.

## Exact next-phase checklist

1. Resolve every original-file download, license, location and visual review issue; keep the river quarantined until the discrepancy is resolved. Approve safe desktop/mobile crops after actual pixel inspection, then generate and audit real derivatives.
2. Complete factual-copy review with source locators and precision. Keep historical-source statements separate from interpretation; approve contributors, consent, authentic craft/audio and article bylines before publication.
3. Reconcile the declared map palette with preview differences, verify local font weights, and create the Phase B art direction from the reconstructed reference. Preserve each page's sequence and asymmetry; do not promote this scaffold layout into the finished site.
4. Implement one reviewed route at a time with distinct section components, real available media, nearby attribution and the `/sources/` provenance trail. Compare fresh 1440 px and 390 px screenshots with the packaged references.
5. Introduce motion and React islands only for the phase that requires them. Verify cleanup, keyboard/focus behavior and reduced motion. Add geographic interaction only after real licensed datasets, coordinate accuracy and tile rights are recorded.
6. Run build, typecheck, lint, contract tests, desktop/mobile Playwright, asset audit and appropriate accessibility/performance checks against the final implementation. Record new results; the reference package's QA is not production verification.
7. Review production metadata, crawler rules and deployment configuration. Ask for deployment approval only when a concrete reviewed build is ready; no deployment is authorized by this scaffold.

Official references: [Astro installation](https://docs.astro.build/en/install-and-setup/), [TypeScript](https://docs.astro.build/en/guides/typescript/), [React integration](https://docs.astro.build/en/guides/integrations-guide/react/), [static deployment](https://docs.astro.build/en/guides/deploy/).
