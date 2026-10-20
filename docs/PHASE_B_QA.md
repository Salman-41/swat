# Phase B · art-direction verification

Scope: a complete six-page composition specification and a local browser study. Photographic pixel review remains blocked. This checkpoint does not claim the six final page designs, working documentary interactions or an internal design score.

## Deliverables

- [ART_DIRECTION_IMPLEMENTATION.md](../ART_DIRECTION_IMPLEMENTATION.md): page-by-page sequence, responsive treatment at all six widths, intake direction for all ten photographs, five purposeful interactions, motion/fallback rules and a Phase C boundary.
- [src/data/art-direction.ts](../src/data/art-direction.ts): 37 desktop/mobile section treatments, matched against the retained six-page matrix. A missing page or section-count mismatch fails generation.
- `/art-direction/`: a local, noindex study with three actual composition samples, six native page-direction disclosures and five interaction specifications. It renders no photographs, imitation GIS, synthetic audio or before/after comparison.
- Shared spacing, readable body colour and type scales in `reference-tokens.css` and `content/design-tokens.json`. The normal narrative scaffolds retain their existing presentation; the study opts into a wide layout.

## Verification record

| Check                              | Result                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Astro typecheck                    | Passed: 38 files, 0 errors, 0 warnings, 0 hints                                                                                     |
| Static build                       | Passed: 10 output pages, including the local study                                                                                  |
| Source/evidence contract tests     | Passed: 7 tests                                                                                                                     |
| Source registry and handoff        | Passed: 0 invalid assertions; all 39 retained reference files still match the archive                                               |
| Browser study and regression suite | Passed: 66 tests across all six widths; final run 1.7 minutes                                                                       |
| Formatting and patch hygiene       | Passed: changed authoring files formatted and git diff --check clean                                                                |
| Original acquisition retry         | Failed: Kalam forest and Kalam view returned DNS errors; Malam Jabba returned a connection reset with expanded execution permission |

The browser cases cover 320/390/768/1024/1440/1920 CSS pixels, all six study disclosures, all 37 section records, five interaction descriptions, overflow, keyboard use, no-JavaScript access, reduced-motion access and the absence of simulated documentary media. Existing narrative/source tests provide regression coverage. The preview now uses the test runner's Node executable directly, so the shell's unavailable Snap npm wrapper does not prevent QA. The first run timed out because port 4321 was occupied and Astro selected a different port. Final QA used the configurable SWAT_TEST_PORT=46371; the existing service was left untouched and the test runner cleaned up its own preview.

Measured solid-colour text pairs, using the WCAG relative-luminance formula:

| Foreground / background | Contrast                                     |
| ----------------------- | -------------------------------------------- |
| Ink / paper             | 12.72:1                                      |
| Muted ink / paper       | 5.55:1                                       |
| Paper-light / deep      | 16.45:1                                      |
| Paper-light / pine      | 11.95:1                                      |
| Aqua / deep             | 10.09:1                                      |
| Clay / paper            | 2.58:1 — decorative use only; not small text |

These measurements concern solid token pairs, not text over an unseen photograph and not a full accessibility certification.

## Screenshot review

- [Desktop study](qa/phase-b/study-chromium-1440.png)
- [Mobile study](qa/phase-b/study-chromium-390.png)

The 1440 px desktop and 390 px mobile viewport captures were inspected individually. Full-study captures were also reviewed: 1440×6697 output pixels on desktop and 1024×17401 output pixels on the mobile device profile (device-pixel ratio included). The reading order, paper/green/stone alternation, title spacing, quiet paragraph offset and stacked mobile river treatment matched the intended proof. Every page-direction disclosure was opened and checked for overflow at all six widths. No layout repair was needed after browser inspection. Full captures are in the temporary QA output directory; the two viewport captures above are retained in the repository.

## Photographic limit and handoff

No original image was downloaded. Exact crops, text-safe boxes, horizons, tonal sequencing and emotional/subject judgements remain unapproved. The source registry still withholds all ten candidates and quarantines the disputed river image. The crop configuration remains blocked and unchanged. The specification records intended framing and honest text-led alternatives; it does not present an unseen photograph as visually reviewed.

Phase C can implement the six editorial structures and text-led treatments from these decisions, retaining the missing-media boundary. Acquire and inspect actual photographs before approving their crops or declaring photographic art direction complete. Exclude the local study from the publication build and keep engineering notes out of visitor-facing story pages. No motion library, map engine, hosting registration, deployment or generated imagery was added in this phase.
