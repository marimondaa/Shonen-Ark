# Design pilot — 2026-09-26

The user approved the homepage/Discovery proposal during this session. The system is now applied to all MVP pages through `ark-edition`, with page-specific composition classes.

Audit: old homepage had an eyebrow badge, generic slogans, detached decorative captions, 3 equal icon cards and cursor particles. Inner pages reused identical glowing gradient cards and headings regardless of content. Global remote font stack and decorative icons added requests without clarifying content.

Direction: a nighttime manga journal. Editorial white headings, a framed original obsidian/crescent drawing, distinct reading and catalog compositions. No copied characters, manga panels or promotional art. Catalog typographic jackets deliberately substitute unverified covers, with source links intact.

- Palette: ink #0c0a10, warm white #f4f0e9, readable secondary #c0b9c7, purple #c5a2fa, surface #18121f, control border #857292. Purple indicates actions/current navigation and selected artwork lighting.
- Type: device-local Arial/Helvetica for text, Arial Black/Arial bold for principal headings, monospace only for short catalog metadata. Body 16–20; utility 13–15; item title 16–21; section 32–40; display fluid 44–80 px. Fallbacks intentional; exact shapes vary across systems.
- Spacing: 8, 16, 24, 32, 48, 64 px. Desktop grid uses existing max-width container. Mobile single-column editorial flow and two-column catalog, with full-width labeled search controls.
- Components: flat button with dark text on light purple; underline text link; framed illustration; typographic catalog jacket; ruled section; native input/select. Thin borders and restrained surfaces, no frosted glass/noise.
- States: hover adds underline or small directional movement/shadow; active button settles; 3 px focus ring; disabled has readable text and explicit unavailable affordance; existing loading/error/empty/retry/pagination preserved. No entry animation or cursor trail; reduced-motion suppresses transitions.
- Shared navigation destinations stay consistent; pilot uses an underlined current page rather than a pill. Escape closes disclosure and restores trigger focus. No modal or focus trap introduced.

Approved rollout: theory/dashboard archives use editorial lists; theory detail uses a narrower reading column and mixed-case title; auth uses a narrow form; gigs and collections use two columns; calendar uses horizontal airing rows; characters retain an index grid; policies use readable text columns. Signed-in data states still need real Supabase verification.
