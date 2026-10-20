# Asset and architecture audit · 20 October 2026

## Inspected inputs

The archive SHA256 is `3d21aa934fc4b4c143898d720a88ced8955aa919778c0fc2e26c380f67cc9e05`. All 39 extracted files match its bytes. The master/README, five phase prompts, page map, image manifest, provenance template, motion notes, packaged QA, preview HTML/CSS/JS, eight SVGs and twelve full-page screenshots were inspected. `npm run handoff:verify` repeats the archive/extraction check without executing packaged scripts.

The extracted files are retained unchanged in `reference/SWAT_CODEX_HANDOFF`. The two overview images and paired full-page screenshot contact sheets were visually inspected. Actual screenshot dimensions differ from the map's intended heights:

| Reference  | Desktop at 1440 px | Mobile at 390 px |
| ---------- | ------------------ | ---------------- |
| Home       | 6834 px            | 8011 px          |
| River      | 5009 px            | 5096 px          |
| History    | 4620 px            | 5476 px          |
| Places     | 5167 px            | 5812 px          |
| People     | 4211 px            | 3979 px          |
| Fieldnotes | 4256 px            | 4772 px          |

These lengths are comparison context, not hardcoded production heights. The reference contains empty split panels and a broken sound image. Recreate the intended composition while repairing those defects.

## Documentary corrections before layout

| Reference issue                                                                           | Required treatment                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| River hero source description says Kalam, but camera coordinates are 34.912233, 73.656039 | Withhold the photograph until independently resolved. The [Commons source](https://commons.wikimedia.org/wiki/File:Swat_River_at_Kalam_Valley.jpg) retains this discrepancy. The [PMD report](https://www.pmd.gov.pk/wind/KP/Kalam.pdf) is context, not a replacement atlas coordinate. |
| Home says “Above the tree line” over a forest                                             | Use a forest-specific caption after pixel review; do not assert elevation or treeline position.                                                                                                                                                                                         |
| River Bahrain feature uses the Kalam forest candidate                                     | Do not use it as Bahrain evidence. Acquire a Bahrain photograph or use text.                                                                                                                                                                                                            |
| Heritage feature says Barikot while proposing a Butkara photograph                        | Keep Butkara I separate from Barikot. The [university mission overview](https://www.unive.it/pag/14024/?tx_news_pi1%5Bnews%5D=9379) supplies research context; exact chronology still needs excavation publications.                                                                    |
| Barikot town panorama and museum exterior appear beside archaeology/collection copy       | Caption exactly what is visible. Neither image proves a photographed excavation or artefact.                                                                                                                                                                                            |
| Islampur village is proposed alongside crafts                                             | Use only for village context. No weaving, artisan identity or contributor consent can be inferred.                                                                                                                                                                                      |
| Abstract sound and textile graphics imply documentary content                             | No audio player, recorded waveform or traditional craft attribution without authentic materials and permission.                                                                                                                                                                         |
| Different schematic graphics appear as earlier/later observations                         | No change claim or slider. Acquire compatible registered scenes and retain dates, bands, CRS, resolution, cloud mask and processing.                                                                                                                                                    |
| Geographic curves and linked places in preview                                            | Do not trace or interpolate those curves into measured geography. The atlas requires an actual versioned licensed dataset and independent location checks.                                                                                                                              |

## Asset acquisition result

All ten candidate file pages were attempted again. Connected web access exposed source text for the river, both Mahodand images, Butkara I, Islampur, Kalam view and Malam Jabba; source-page reuse metadata is distinct from original-file verification. Current attempts for Kalam forest, Barikot and museum returned cache misses. Earlier registry checks are retained rather than misrepresented as newly fetched originals.

Terminal HTTPS access fails DNS resolution for Wikimedia, including with expanded execution permission. Running `npm run assets:fetch` on 20 October failed for all ten originals and recorded each failure in the registry. There are **zero local original photographs and zero processed derivatives**. No SHA256, source snapshot, crop rectangle or text safe area is invented. All ten assets remain unavailable for publication, with one explicit location conflict. Five other documentary slots remain missing: Bahrain, craft process, contributor portraits, audio and satellite/terrain evidence.

The handoff explicitly allows transparent missing-asset states in this stage. `SourcePhoto` implements that state as text and a source link; it emits no broken image request or external hotlink. Photography acquisition and pixel/crop approval remain open before photographic art direction can be completed.

## Foundation repairs

The existing registry's derivative and processing structures did not match its TypeScript contracts, and credits would stringify processing objects as `[object Object]`. Contracts now match actual pipeline output; Zod checks registry paths, URLs, duplicate identities, crop boxes, hashes and processing structures during builds and audits. Credits render actual operation names. Asset checks also validate decoded dimensions/formats/byte counts, original and derivative hashes, source metadata and snapshot presence, and stale derivative lineage. A reusable responsive picture component chooses local AVIF/WebP width sets and retains intrinsic dimensions and attribution.

`ARCHITECTURE.md`, the generated `SHOT_TO_SECTION_MATRIX.md`, the atlas acquisition record and primary method references define how the remaining work fits together. No completed map, interview, historical chronology, environmental comparison, motion sequence or design score is claimed.

## Next phase checklist

1. Restore outbound asset access or import the exact originals plus source metadata/snapshots through the pipeline; resolve the river discrepancy or choose another verifiable Swat river image.
2. Inspect real pixels, confirm subject and any people/privacy constraints, approve desktop/mobile crops and safe areas, then process 1x/2x widths without upscaling. Audit local bytes and publish accurate change/credit lines.
3. Complete `ART_DIRECTION_IMPLEMENTATION.md` using those photographs and the six distinct page rhythms. Retain text-led treatments for unavailable documentary media.
4. Build all six complete page compositions and functional anchored stories; run the six-width browser gate and screenshot comparison before motion work.
5. Add GSAP/Lenis with a single lifecycle; then the verified GIS atlas and distinct history, culture and environment systems. Missing evidence disables the corresponding documentary feature.
6. Finish production accessibility/performance evaluation and an honest internal design critique. Deployment requires the approval specified by the handoff.

The phase's recorded browser and command results belong in `PHASE_A_QA.md`. This is an asset/architecture checkpoint, not a declaration that the complete publication or the 8+ target is achieved.
