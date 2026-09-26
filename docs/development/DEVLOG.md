# Development log

## 2026-09-26 — baseline and first repairs
- Confirmed main branch and clean initial Git status. No AGENTS.md found in repository or immediate parent.
- Started Next.js at http://localhost:3000. Browser confirmed duplicate menus/footers and fake community claims.
- Unified shell; implemented obsidian/purple homepage with CSS portal art, shared tokens, keyboard skip link, accessible mobile menu and reduced-motion support.
- Removed fake authentication/publication success; theory form now calls API and preserves text on errors. Fixed theory creation link and series filter field.
- TypeScript passes; production build passes; lint completes with existing warnings. Browser home and mobile navigation checked; decorative overflow corrected.
- Jest baseline fixtures use obsolete response shapes and never-ended raw request streams. Root discovery narrowed to actual test folders; remaining tests being repaired.
- Product remains incomplete. Community persistence requires Supabase configuration. Three historical schemas conflict, so the new MVP schema will be additive and isolated.
- No dependencies installed, no production deployment or Git push.

## 2026-09-26 — functional implementation and verification
- Kept the Pages Router/React/Tailwind architecture and npm lockfile. Reused AniList and Supabase dependencies.
- Implemented one Supabase Auth browser session model with signup/confirmation/login/logout/recovery; removed the active dependency on mock login and the hardcoded localhost MongoDB backend.
- Added ark_* schema and owner-scoped API for theories, private drafts, bookmark collections, gigs and contact storage. Database permissions do not use a service-role key. Added transaction-scoped SQL RLS checks for two fixture users, pending execution on a configured test project.
- Added theory detail/spoiler reveal, editing/deletion, filters, personal dashboard, named collections, gig editing/closure and real contact submission states. No mock success is reported when services are unavailable.
- Replaced static discovery statistics and 2024 calendar placeholders with live AniList anime/manga/character data and daily airings. Verified HTTP 200 responses for all four catalog modes.
- Preserved historical upload, editorial/admin, AI, Stripe and n8n source. Their routes now explicitly show unavailable integration states or return 503 through proxy.ts. They are NOT claimed working. No production deployment or Git push performed.
- Security audit initially found 17 production vulnerabilities including 2 critical. Updated Next 13.5.11 to 16.3.6 without moving routers or changing React 18. Updated NextAuth/ESLint/UUID and compatible transitive dependencies; npm audit now reports 0 vulnerabilities across the installed tree. Node 20.9+ is now required (tested with Node 24.13.1). Next generated AGENTS.md/CLAUDE.md; the new local framework instructions were read.
- Migrated lint configuration to flat ESLint; production build and TypeScript pass. Lint passes without warnings after repairing legacy hook/quote/export issues.
- Consolidated duplicate obsolete webhook tests and supplied finite raw request streams. Added validation/ownership/failure tests: 40 Jest tests pass. Expected invalid-signature tests emit warnings, not failures.
- Replaced stale Playwright setup that tried to seed imaginary APIs. 9 HTTP integration tests pass against the running server. CLI desktop/mobile suites are updated but were not run; browser verification used the in-app browser instead.
- In-app browser: desktop Naruto search; Manga format and highest-score sort; next-page results; character search for Luffy; real calendar results, empty filter, next-day and direct date selection. Fixed date input handling uncovered by that check. No JavaScript console errors observed in the inspected final browser states.
- Mobile at 390 px: home and 15 routes have one main navigation and no horizontal overflow. Mobile menu opens, Escape closes it, and navigation closes it. Auth without configuration disables sign-in and explains why. Catalog cover images loaded. Screenshots saved under docs/development/screenshots.
- README and .env.example now describe the actual runtime, setup, verification, deployment and limitations. The ignored historical .env.local.example is not the canonical template; use .env.example.

### Remaining blocker and next actions
- No Supabase test project is configured in .env.local. Actual signup/email recovery, reload persistence and cross-user database access HAVE NOT BEEN verified. Do not call the community MVP launch-ready yet.
- Configure the two public Supabase variables locally, apply the final supabase/mvp.sql once to a test project, allow localhost Auth redirects, restart the server, then run supabase/verify-rls.sql and the two-user workflow checklist in README.
- Review production operator/retention/moderation policies and mail/abuse configuration before public launch. Paid subscriptions and uploads remain separate unfinished integrations.
## 2026-09-26 — approved visual system and launch-readiness review
- Inspected the prior homepage, shared UI, forms, live catalog, allowed API graph and data schema. Identified repeated badges/slogans, equal icon cards, generic surface treatments, remote fonts and the active particle cursor.
- Built homepage and Discovery proposals first, shared working links and screenshots, and requested visual feedback. The user explicitly answered “Valider cette direction”. Applied the approved system across the MVP with different archive, calendar, reading and form compositions.
- Replaced remote fonts, cover images and unknown-provenance favicon with system fonts and original project geometry/type compositions. Kept third-party source links. Retained legacy assets are documented as not cleared for production distribution.
- Added factual /privacy information linked from footer/signup; corrected the usage page’s claim that an authenticated contact form was a working public privacy channel. French policy drafts stay in the repository, with no invented operator/contact/age terms. Added source-grounded Québec/Canada review and conditional foreign-jurisdiction analysis, data inventory, launch checklist and asset/software license register.
- Added no-referrer/nosniff/frame-denial headers, device-permission restrictions and limited CSP. Catalog responses are no-store and searches are not cached by the app. Added bounded per-account API write limiter and tests; direct Supabase/replica abuse protection still needs deployment work. Reset unpublished editor state when account identity changes.
- Verified: 45 Jest tests; 12 HTTP Playwright checks; lint and production build (including TypeScript) pass. Installed existing axe-core 4.10.3/jsdom 20.0.3 as explicit dev requirements for reproducibility; npm install audit reports zero vulnerabilities.
- Structural axe-core audit on server-rendered HTML: 17 routes, no detected violations; several form-label checks remain “incomplete” in JSDOM. Browser register inspection found one enclosing label per input. This audit excludes contrast, layout, hydrated/signed-in views and screen-reader certification. Solid token contrast checks saved separately (primary 17.33:1, secondary 10.32:1, button 8.92:1, control boundary 4.21:1).
- Browser: anime Naruto search and manga switch returned real source links; navigation Escape closed the mobile disclosure and returned focus to its trigger. At 390px checked 17 MVP routes (Discovery separately); a long gigs heading overflow was found, corrected and rechecked. Six key routes also pass no-overflow checks at 320px. Form labels and disabled unconfigured signup inspected. Final screenshots under screenshots/edition-*.
- Remaining: operator/contact details, minimum-age/audience decision, full French journeys and legal review; live Supabase accounts/RLS/persistence, public privacy request handling, provider retention/regions, moderation and production abuse controls. No live account data created, no policies published to production, no deployment or GitHub push, no Notion destination available.

- Final regression: changing signed-in account clears an unsaved theory (JSDOM component test). Keyboard skip link moves focus to main content; its contrast was corrected. Desktop calendar displayed live time elements. Six 320px layouts have no horizontal overflow.

## Ink dragon preview — 2026-09-26
Added /home-preview with layered ink artwork, light/dark appearance, responsive navigation and motion controls. Original homepage preserved for comparison. Build and 49 unit tests passed; desktop and 320/390 px browser checks completed. Details and generation prompt: ink-home-preview.md.

## Shared Irezumi edition — 2026-09-26
Promoted dragon to /, unified theme/navigation, added local Bangers, six-star cursor, ink contours and themed errors. Added bounded public catalog request sharing and fixed duplicate date-triggered fetch. See irezumi-review.md and next-steps.fr.md for route coverage and deployment prerequisites.

## 2026-09-26 — weekly calendar, original cloud and Comic Sans

Latest user direction supersedes the Bangers/Georgia and six-star pointer decisions above. Preserved the existing ink dragon, themes and working community code. Started from main at 6086309, inspected the full dirty working tree and origin, fetched to confirm no divergence, then created codex/calendar-cloud-comic-sans. The commit includes the previously uncommitted MVP/dragon work needed by this version; no files were discarded.

Implemented bounded AniList airing schedules with local-time week boundaries, title/format/upcoming filters, manual paging, source attribution and native dialog details. Current terms/rate research and long-term source restrictions are documented in README. Added conservative process rate budget and Retry-After support; retired the unbounded old daily schedule endpoint. No catalogue import.

Replaced orb/particle effect with original event-transparent cloud, idle frame cancellation and reduced-motion/touch alternatives. Applied Comic Sans system stack across the shell and adjusted homepage/catalog heading sizes. Verified French/Spanish glyphs in installed Comic Sans; Japanese and several UI symbols use glyph fallback. No Windows font redistribution.

Related fix: same-route links now close the mobile menu, including Calendar under Discovery. Checks and remaining launch blockers: calendar-cloud-review.md. No production deployment. Large local screenshot history is preserved outside the commit.
