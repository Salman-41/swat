# PHASE C — MODEL: GPT-6.1 SOL (agent with filesystem/browser access)

Read the master prompt, current repo, Phase A asset registry, Phase B art-direction spec, design package reference and screenshot set. Your job is **to build the entire site**. No partial single-screen pages.

Use Astro with TypeScript and React islands for spatial controls and complex interactions; CSS variables/Modules; semantic HTML. The packaged `preview/` is a rough design REFERENCE, not code to copy verbatim. Preserve the editorial identity and six fully scrollable pages, but improve rough art-direction and repetitive places/cards. Use optimized **real source photographs** that were vetted in Phase A. If these are not downloaded, fetch them now or explain the blocker. Never use generated photos.

Build all routes:
`/` | `/river` | `/through-time` | `/places` | `/living-swat` | `/fieldnotes` | `/sources` | `/404`.

Implement main header, responsive accessible full-screen menu with keyboard focus trapping, skip link, active location, nested-story navigation, author/credits metadata, alt text, semantic landmarks, image galleries with meaningful order, article anchors, custom 404, footer and mobile equivalents. Every link must work. Use static/SSG HTML for editorial content, island hydration only where needed. Preserve meaningful content when JavaScript is disabled.

Desktop/mobile editorial page flow exactly follows `FIGMA_PAGE_MAP.json` and reference screenshots; sections must feel art-directed rather than generic: full-bleed photo entry, negative-space typographic interludes, split photo/text panels, location-specific galleries, documentary archival sections, sources. Respect source truth: don't show Butkara as Barikot, don't show hypothetical historical reconstructions without labeling, and don't misidentify unrelated regional communities.

Use proper responsive image sources/picture `srcset`/`sizes`, intrinsic dimensions, `fetchpriority` only for hero, useful captions, `object-position` safe crops; lazy-load below-fold. Avoid overlays that obscure subjects. Implement practical mobile composition instead of simply shrinking desktop.

Tests and acceptance: check 320/390/768/1024/1440/1920 widths, proper heading order, all six full pages, no overflow, broken links, basic keyboard navigation, screenshots side-by-side with reference, style consistency and no console exceptions. Report deviations and fix the high-impact ones before moving on.

DON'T implement heavy WebGL or complex full-site motion yet. Implement page design at very high fidelity with appropriate markup and hooks for later animation. Make actual code changes and commit.
