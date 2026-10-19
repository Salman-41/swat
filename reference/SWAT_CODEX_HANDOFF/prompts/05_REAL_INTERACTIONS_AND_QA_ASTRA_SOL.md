# PHASE E — GPT-6.1 SOL for engineering + ASTRA PRO for independent audit

Implement the authentic interactive documentary systems and perform strict production QA. Reuse prior work; do not start a new app.

**Interactive river atlas:** Use MapLibre GL JS with real GIS coordinates, verified settlement locations, georeferenced Swat River geometry, and a licensed tile source (no production reliance on demo tiles). Use QGIS/GDAL offline preprocessing if needed. A photo-driven 2D map may outperform expensive 3D terrain. Offer alternate textual index and keyboard selection. Sync scroll-driven geography only when it remains useful; never fake elevations or river curvature. Route selection leads to real story pages. Keep MapLibre map source/attribution visible, lazy-load at the correct section, destroy on route leave.

**Archaeology:** Pair Butkara images with Butkara claims. Barikot panorama illustrates living context only; find a verified archaeological excavation image if needed. Include academically grounded dates, evidence/interpretation distinction and links to original studies. Layer comparison must show real documented features or be clearly marked a conceptual diagram.

**Culture:** Authentic photographic contributors and real permission-cleared recordings, Pashto/Torwali/Gawri verified transcriptions; no fictional quotations, voices or unrelated regional weaving imagery. Missing assets should block corresponding documentary features rather than prompt inventions.

**Environment:** Dates and source must be clear for satellite imagery. Use real public-domain/open datasets with suitable licenses, documented processing and correct geographic registration. The before/after slider is only enabled when there are valid comparable observations.

**Production review:** run typecheck, build, link crawler, responsive Playwright at 320/390/768/1024/1440/1920, keyboard and touch, reduced-motion and screen-reader sanity checks, browser console tests, Lighthouse mobile + desktop, representative CPU/GPU profiles, and image/attribution audits. Optimize for LCP≤2.5s, INP≤200ms and CLS≤0.1 where real field measurements are possible; don't fabricate. Verify no heavy scene loading on non-map pages, proper image compression and robust browser history after transitions.

**Internal Awwwards evaluation:** Design 40%, Usability 30%, Creativity 20%, Content 10%. Aiming for 8+ is ambition, not prediction. Astra Pro should critique visually across 12 page/device screenshots and flag template patterns, weak photo selection, dead interactions and repetitive scroll effects. Sol should apply prioritized fixes, recapture screenshots and rerun tests. Document true metrics and remaining limitations. Do not submit to Awwwards or deploy publicly without explicit approval.
