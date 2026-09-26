# MVP inventory and task list

Source audit: 2026-09-26. Repository: Shonen-Ark, branch main; initial working tree clean. README was not used as implementation evidence.

| Routes | Observed baseline | MVP work |
|---|---|---|
| / | Duplicate shells, unsupported community claims | One shell, obsidian/purple home, working destination links |
| /theories, /submit-theory | Empty stub API, wrong filter, missing detail route, simulated save | Supabase publication/drafts, detail, search, series filter, bookmarks |
| /login, /register, /account/* | Fake API success, two incompatible auth systems, mock dashboard | Supabase Auth, verification/recovery, actual personal content |
| /discovery, /discovery/[category] | Static popularity claims; older AniList helper available | Reuse AniList for live anime/manga search, sort, pagination |
| /calendar | Static March 2024 dates | Live upcoming anime airings, date/search filters, truthful errors |
| /characters | Three hardcoded cards, inert controls | AniList character search and source profile links |
| /gigs | Empty API, fake POST success, inert actions | Community opportunities with persistent posts and valid contact links |
| /collections | Supabase writes without useful errors, no contents | Private saved-theory library with persistence and removal |
| /contact | Simulated submit despite existing API | Real authenticated message storage, no pretend email delivery |
| /about, /terms | Broad unverified promises | Accurate MVP/about and explicitly provisional usage information |
| /news, /news/[slug], /admin/* | Separate schema/auth assumptions | Integration preview; not claimed launch-ready |
| /shrine, /submit-video, /manga-showcase | Upload/payment dependencies, local/mock state | Preserve original modules; explicit unavailable integration states |

## Scope and decisions
- Preserve Next.js Pages Router, React, Tailwind, npm lockfile. No Docker or framework migration.
- Retain community intent using existing Supabase dependency. Public AniList data requires no account.
- Use an additive, isolated ark_* schema to avoid guessing which of three incompatible historic migrations is deployed. Do not run the historic migrations together.
- Payments, media uploads, AI, editorial news/admin need external configuration and further integration. Preserve source and clearly mark these unavailable, rather than simulate success.
- No production publishing, Git push, external journal update, or paid services authorized. Notion destination is not available.

## Tasks
- [x] Start server and inspect home in browser
- [x] Remove duplicate shell; coherent home; mobile menu; motion preferences
- [x] Remove fake success from authentication/publication APIs
- [x] Repair type-check imports; first production build passes
- [x] Implement authenticated community persistence and owner access (live verification pending)
- [x] Complete live discovery, calendar, characters
- [x] Complete gigs, named private collections, contact, informational pages (live saves pending)
- [x] Repair stale test fixtures and add meaningful regression checks
- [x] Desktop/mobile in-app browser verification and build/lint/type/unit/API tests
- [ ] Verify Supabase persistence and cross-user RLS against configured test project
- [x] Accurate README, configuration, launch limitations and progress handoff

## Approved design and readiness follow-up (2026-09-26)
- [x] Audit visual repetition and create homepage/Discovery pilot.
- [x] Show preview, obtain explicit visual approval, extend system across MVP.
- [x] Original artwork/system fonts; remove cursor trail and remote cover/font requests.
- [x] Privacy data map, official-source legal issue review, internal French drafts and asset register.
- [x] Security headers, private caching controls, per-account write brake and regressions.
- [x] Structural accessibility audit plus desktop/mobile and keyboard checks.
- [ ] Obtain operator identity, monitored privacy contact and age/audience decision.
- [ ] Complete French-facing journeys and professional policy review before Québec launch.
- [ ] Configure test Supabase and verify live account/RLS/persistence/request handling.
- [ ] Approve retention/backup/transfer governance and operational moderation/abuse protections.

- Alternate ink-dragon homepage: /home-preview. Local light/dark preference, layered motion, mobile submenu navigation. Awaiting visual feedback before replacing /. See ink-home-preview.md.

- Current visual system: shared Irezumi edition on all active routes. /design-preview contains type/control samples; /home-preview now shares the real homepage. Earlier notes about preserving the monolith at / are superseded. See irezumi-review.md.
