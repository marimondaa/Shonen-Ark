# Asset and dependency register — 2026-09-26

| Asset | Source/status | Active use / action |
| --- | --- | --- |
| Home monolith/crescent SVG | Original code in pages/index.js, created for this project; no anime character/panel reference | Active homepage, decorative, hidden from assistive technology |
| ark-mark.svg | Original project geometry | Active favicon; replaces provenance-unknown favicon |
| Catalog title compositions | Original CSS using factual titles, not copied cover designs | Active catalog; repeated title is hidden from AT; readable linked title follows |
| AniList catalog data | Official API, linked attribution, short bounded runtime caching | Terms require commercial/competitive-service assessment. Not proof of artwork copyright permission |
| AniList cover/character imagery | Individual copyright holders/permissions not established in repo | Removed API image fields and browser image requests; official source links retained |
| public/brand-logo.png; images/logo/shonen-ark/* and ICO/* | No source/commission/license evidence found | Original favicon substituted. Legacy files retained; **not cleared for production distribution**, including direct static downloads |
| public/assets/illustrations/shrine-ink-hero.png and images/content/illustrations/shrine-ink-hero.png | Unknown author/license, duplicated | Legacy shrine route blocked; obtain evidence or exclude from deployment |
| public/cursors/kunai-cursor.svg | Unknown provenance | Active cursor effect removed; legacy source retained |
| Google-hosted Inter/Poppins/JetBrains Mono | External stylesheet previously used; repo has no bundled font licenses | Network font import removed. System Arial/Helvetica/Arial Black/ui-monospace stacks, no font files distributed. Rendering may vary by OS |
| Lucide icons | lucide-react dependency, ISC package metadata | Mainly navigation controls; preserve distributed package license; no icon wallpaper in pilot |
| Software dependencies | `dependency-licenses.json`: 897 lock entries, installed metadata/license filenames, 3 unresolved entries | Metadata inventory is not license clearance. Inspect actual license texts/NOTICE obligations, optional/platform packages and production artifacts. No full dependency code is relicensed by the app |
| Repository license | package.json declares MIT; no root LICENSE text found | Owner must confirm rights and add correct notice. Do not invent copyright attribution or treat declaration as provenance for assets |
| Manga panels, anime clips, music, ads, stock photos | None newly introduced or active in reviewed MVP | Do not revive legacy media without rights and moderation review |

Attribution is not permission; a fan-project label is not a license. Do not publish the retained unknown static assets just because their routes are not linked. A deployment packaging/rights review is still required.

Preview addition: public/ink-dragon-atlas.png is a generated transparent body/head atlas based on the user-supplied painting. Used only at /home-preview. Exact prompt and method: ink-home-preview.md. Reference rights are not established by generation.

Irezumi update: Bangers-Regular.ttf (93,148 bytes) and Bangers-OFL.txt from https://github.com/google/fonts/tree/main/ofl/bangers are self-hosted. public/ink-clouds.svg and the six-star SVG in components/InkCursor.js are new code-native artwork. The orb uses the user's Dragon Ball reference direction; no Fandom bitmap is bundled. Review reference-derived art direction for production use. Dragon atlas unchanged. Earlier system-font-only and active-monolith entries are historical.

2026-09-26 current direction: Comic Sans is now a system-font reference, with no Windows font binary redistributed. Bangers is unused. The reference-derived orb is removed entirely from active code and replaced by an original small cloud drawn in components/InkCursor.js. The dragon atlas remains unchanged and is active on / and /home-preview; reference artwork rights still need review before deployment.
