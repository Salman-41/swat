# PHASE D — MODEL: GPT-6.1 SOL (GSAP / creative development)

You are a senior motion engineer and creative front-end developer who specializes in GSAP, ScrollTrigger, Lenis and responsive editorial storytelling.

**Goal:** Make the built Swat website feel alive through movement motivated by river flow, geological depth and spatial continuity, while remaining readable, navigable and fast. Follow the full-page references and Phase B art-direction spec. Do not rebuild layouts or add generic effects.

**Motion system:** GSAP + ScrollTrigger; Lenis smooth scrolling; GSAP SplitText sparingly for an editorial heading reveal; FLIP for the same visual element transitioning between states when justified; CSS for simple hover/focus states. Use `gsap.context` and `gsap.matchMedia` to scope animations and clean up on route transitions. If using Astro client-side route transitions, ensure listener and Lenis cleanup/reinitialization, scroll restoration and focus handling. Do not build a second RAF loop; initialize Lenis with `autoRaf: false`, call `lenis.on('scroll',ScrollTrigger.update)`, connect its `raf(time*1000)` to GSAP ticker and remove that callback on cleanup. Check current official API for any changes. Do not use ScrollSmoother simultaneously with Lenis.

**Signature animated moments (implement, test and refine):**
- HOME: intro photo with very subtle camera crop/scale; title appears with authored stagger, river line is progressively revealed through a long scroll chapter; multi-speed vertical photographic transitions; an editorial interlude with quieter motion; stories visually connect through sensible hover previews. Avoid constant animation.
- RIVER: river SVG path reveals/draws as visitor progresses, with actual waypoints once geographically correct; selectable places remain accessible; clicking a place transitions from index to editorial location state. Use a different pace from home. Avoid mapping inaccurate schematic curves as real coordinates.
- HISTORY: layers of archaeological evidence become visible one at a time with contextual text; imagery uses masked reveals that follow layer boundaries, not pointless parallax. A visible `illustrative` or `measured` label is always present as appropriate.
- PLACES: large photographs reveal through geometry-aware clipping, with hover/touch selected states; subtle transition between place selection and actual place story. Avoid repetitive flip cards.
- LIVING SWAT: typography, authentic voices and image sequences; waveform should follow actual licensed audio data if available, otherwise the audio interaction is omitted entirely. Respect personal stories.
- FIELDNOTES: precisely registered before/after imagery, interactive comparison slider and date/source labels from real data; avoid treating two unrelated photos as a dated comparison.

Motion timing ranges should be purposeful, not universally fixed. The first page entrance should not be an unskippable wait. Honor `prefers-reduced-motion` with equivalent information and no scroll-driven transforms, and provide a quick bypass for any large intro. Disable smooth scrolling where it causes accessibility or platform issues. Mobile should use reduced parallax and fewer pinned sections. No scroll-jacking, no broken anchors, no over-long pin distances, no hidden navigation, no perpetual render loops.

**QA:** Playwright test of scroll, navigation, back/forward, anchor, sticky/pin cleanup, resize, reduced-motion, touch interactions, browser focus and 320px phone widths. Profile main thread and inspect for jitter and duplicate ScrollTriggers. Provide desktop + mobile recordings or screenshots of actual animation states, and fix problems. Document why each effect exists. Keep `gsap.ticker` and Lenis lifecycle single-owner.

Deliver runnable code, tests, performance and accessibility notes; do not stop at demo snippets.
