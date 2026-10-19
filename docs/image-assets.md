# Swat editorial image assets

Metadata checked: 19 October 2026. This plan uses only the seven Wikimedia Commons file pages supplied by the user. Creator names, license versions, and original dimensions follow those pages. Descriptions and captions below follow the supplied source identifications; they are not independent geolocation verification.

The JSON manifest is at [`../content/image-manifest.json`](../content/image-manifest.json). Image files have not been downloaded, optimized, or visually reviewed. All image paths below are proposed. Confirm the final visible content and crop before publishing the suggested alt text.

## A) Final asset manifest

Paths in this table are relative to `assets/originals/`. Credit IDs resolve to the linked attribution entries in section C.

| Asset / page role | Suggested original filename | Original pixels | Suggested alt text | Suggested caption | Credit |
| --- | --- | --- | --- | --- | --- |
| `swat-river-kalam` — Homepage hero; River hero | `river/swat-river-kalam.jpg` | 3264 × 2448 | Swat River in Kalam Valley. | The Swat River at Kalam, Swat Valley. | C1 |
| `mahodand-lake-primary` — Places / Mahodand | `places/mahodand-lake-boats.jpg` | 2992 × 2000 | Boats on Mahodand Lake in Swat. | Boats on Mahodand Lake, in the Kalam area of Swat. | C2 |
| `mahodand-lake-alternate` — Places / alternate Mahodand | `places/mahodand-lake-alternate.jpg` | 4032 × 3024 | Mahodand Lake in Swat Valley. | Another view of Mahodand Lake, Swat Valley. | C3 |
| `barikot-swat` — Places / valley town | `places/barikot-swat-panorama.jpg` | 1385 × 640 | Panoramic view of Barikot in Swat Valley. | Barikot, a town in Swat Valley. | C4 |
| `butkara-1-stupa` — Through Time / archaeology | `through-time/butkara-1-stupa-swat.jpg` | 4288 × 3216 | Butkara I stupa archaeological site in Swat. | The Butkara I stupa site, Swat. | C5 |
| `swat-museum` — Through Time / museum support | `through-time/swat-museum.jpg` | 720 × 479 | Swat Museum building. | Swat Museum, photographed in 2017. | C6 |
| `islampur-swat` — Living Swat / local place context | `living-swat/islampur-swat.jpg` | 2592 × 1944 | Islampur village in Swat, Pakistan. | Islampur village, Swat. | C7 |

Use one river asset record across the Homepage and River page. The two Mahodand images depict the same destination. Islampur supplies place context only; it must not stand in for weaving, a workshop, an artisan portrait, or textile detail.

## B) Suggested file and folder structure

Only this document and the JSON manifest are created by this handoff. The image directories and files below are proposed for the download and optimization step.

```text
content/
  image-manifest.json
docs/
  image-assets.md
assets/
  originals/                       # Unmodified downloads; outside public/
    river/
      swat-river-kalam.jpg
    places/
      mahodand-lake-boats.jpg
      mahodand-lake-alternate.jpg
      barikot-swat-panorama.jpg
    through-time/
      butkara-1-stupa-swat.jpg
      swat-museum.jpg
    living-swat/
      islampur-swat.jpg
public/
  images/
    river/
    places/
    through-time/
    living-swat/
```

Download each original from the **Original file** link on its approved Commons page, preserving its bytes under the proposed filename. Keep its exact Commons title and source URL in the manifest, even when the local filename is shorter.

Place responsive derivatives under `public/images/<topic>/`, named `<basename>--w<width>.webp` or `.avif`; for example, `swat-river-kalam--w1920.webp`. With a `public/` static root, the corresponding browser URL is `/images/river/swat-river-kalam--w1920.webp`. If art direction needs separate crops, add the role: `swat-river-kalam--home-hero--w1920.webp`. Both crops retain the same source record and attribution.

Generate only widths supported by the original and the retained crop; do not upscale. Keep the Barikot panorama wide where practical. Reserve the museum photograph for small supporting use: at most 720 pixels wide at 1x, or 360 CSS pixels at 2x, before cropping. Choose hero focal points after checking both desktop and mobile layouts.

Record actual changes, such as resizing, format conversion, or cropping, in the manifest and published credit. Keep documentary content intact; do not use generative fill, invent scenery, remove identifying context, or substitute another region. If the final crop changes what is visible, revise its alt text accordingly. Alt text describes the subject; credit belongs in visible attribution, not in `alt`.

## C) Credits and attribution list

These entries provide the source title, credited creator, Commons source link, and exact license link. The `creditText` in JSON is the shorter nearby credit; pair it with a link to the full corresponding entry on the site's Image Credits page.

| ID | Full credit text |
| --- | --- |
| C1 | [Swat River at Kalam Valley](https://commons.wikimedia.org/wiki/File:Swat_River_at_Kalam_Valley.jpg) — Photo: Moeedayazbutt / Wikimedia Commons / [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). |
| C2 | [Mahodand Lake, Kalaam, Swat, KPK, Pakistan](https://commons.wikimedia.org/wiki/File:Mahodand_Lake,_Kalaam,_Swat,_KPK,_Pakistan.jpg) — Photo: Abeermajid1996 / Wikimedia Commons / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |
| C3 | [Mahodand Lake is an alpine glacial lake fed by melting glaciers](https://commons.wikimedia.org/wiki/File:Mahodand_Lake_is_an_alpine_glacial_lake_fed_by_melting_glaciers.jpg) — Photo: Shahzaib Damn Cruze / Wikimedia Commons / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |
| C4 | [Barikot Swat](https://commons.wikimedia.org/wiki/File:Barikot_Swat.jpg) — Photo: Junaidglg / Wikimedia Commons / [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). |
| C5 | [Butkara 1 Stupa Swat](https://commons.wikimedia.org/wiki/File:Butkara_1_Stupa_Swat.jpg) — Photo: Zainul Abideen / Wikimedia Commons / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |
| C6 | [Swat Museum](https://commons.wikimedia.org/wiki/File:Swat_Museum.jpg) — Photo: Adilswati / Wikimedia Commons / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |
| C7 | [Islampur swat pakistan](https://commons.wikimedia.org/wiki/File:Islampur_swat_pakistan.jpg) — Photo: Tabindaalkansjaffery / Wikimedia Commons / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). |

For the CC BY-SA photographs, retain attribution and the license link, indicate changes actually made, and keep adaptations of the photograph under the same or a compatible license. For example, append “Changes: cropped, resized, converted to WebP” only after those changes have actually been made. Barikot's CC0 dedication does not require attribution; keep the credit for transparent provenance. No website image edits have been made in this handoff.

## D) Missing-image list

| Page / image requirement | Status | Development handling |
| --- | --- | --- |
| Living Swat / craft or weaving process | **needs authentic source** | No supplied photograph documents local craft production. Leave the image path, alt text, caption, and credit empty. Use a text-only section until an approved photograph is supplied. |
| Living Swat / artisan portrait or textile close-up, if required by the design | **needs authentic source** | These subjects are not covered by the supplied set. Do not repurpose the Islampur place image or unrelated regional photographs. |
| Through Time / large-format museum image, if required by the design | **needs authentic source** | The approved museum photo remains usable as small supporting media. A larger layout needs a new approved authentic source. |
| Any other Figma image slots | **unassessed** | No Figma file or complete slot inventory was supplied. Map additional slots before claiming every placeholder has been replaced. |

A future craft source must identify the actual Swat location and subject, photographer, source URL, and reuse permission or license. No replacement source has been invented or selected.
