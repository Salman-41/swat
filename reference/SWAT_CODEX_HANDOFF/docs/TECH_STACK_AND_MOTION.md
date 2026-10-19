# Proposed creative-development stack

| Capability | Preferred | Why |
|---|---|---|
| Content-driven website with several long narrative routes | Astro + TypeScript | Excellent static HTML delivery, content provenance, modest JS on editorial pages |
| Rich interactions only where required | React islands | Lets river atlas and evidence tools be interactive without hydrating all pages |
| Scroll choreography and image transitions | GSAP + ScrollTrigger | Timeline choreography, responsive scoped triggers, scroll pins only where justified |
| Smooth scrolling | Lenis | Native-scroll-friendly, synchronize with GSAP ticker; disable for reduced-motion if needed |
| Art-directed text reveal | GSAP SplitText | Use sparingly; preserve accessible text; avoid character fireworks |
| Geospatial selection and real river geometry | MapLibre GL JS + GeoJSON | Interactive geographic exploration using sourced data and legal tile provider |
| Contextual SVG path animation | GSAP SVG transforms + clip-path | Lightweight line reveals and geological overlays |
| Very limited immersive 3D | Three.js/R3F optional | Only if photo/2D mapping cannot achieve the requested outcome and tests support it |
| Testing | Playwright + Vitest + Lighthouse | Functional, accessibility and performance checks |

**Example GSAP–Lenis synchronization** (adapt API to installed version):

```ts
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ autoRaf: false });
const tick = (time: number) => lenis.raf(time * 1000);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);
// On route cleanup: gsap.ticker.remove(tick); lenis.destroy();
```

Official references:
- https://github.com/darkroomengineering/lenis/blob/main/README.md
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://www.gsap.com/docs/v3/Plugins/SplitText/
- https://maplibre.org/maplibre-gl-js/docs/
