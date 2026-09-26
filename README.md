# Shonen Ark

An independent anime/manga discovery and community project. This repository uses Next.js 16 Pages Router, React 18, Tailwind and Supabase. The previous README described features that were not connected; this document reflects the current implementation.

## Current scope

- Approved editorial obsidian/purple design across the MVP: original illustration, typographic catalog jackets, reading layouts, labeled controls, keyboard focus and reduced-motion support.
- Live AniList anime/manga discovery, title search, sorting, pagination, character search and weekly anime airing schedules. No invented catalog or release data is substituted on failure.
- Supabase email/password sign-up, confirmation, sign-in, session restore, sign-out and password recovery.
- Theories: browse/search/filter, detail with spoiler reveal, create, private drafts, publish, edit and delete your own work.
- Private saved theories and named collections; move saved items between collections and remove them.
- Gigs: browse/search, post, edit/close your own opportunity, external contact/apply link. No payments are processed.
- Contact: authenticated messages stored privately for project administrators. No email delivery is claimed.

Community workflows are implemented but require a configured Supabase test project before their live persistence and cross-user authorization can be verified. Without it, the interface explains that services are unavailable; it does not simulate success.

## Requirements and setup

- Node.js 20.9+ (Node 24 recommended; see `.nvmrc`) and npm. Use the checked-in `package-lock.json`.
- Outbound HTTPS to AniList for catalog data, and to your Supabase project for accounts/community.
- No Docker, MongoDB, n8n, Stripe, OpenAI or Cloudinary is needed for the current MVP.

```sh
npm ci
# Copy .env.example to .env.local, then edit it locally.
npm run dev
```

Preview: http://localhost:3000 (use the URL printed by Next if port 3000 is occupied). Development output goes to `.next-dev`; production builds use `.next`, so they can be checked independently.

The `shonenark-backend` directory is a separate historical Express/MongoDB experiment and is not part of this runtime. Historical deployment scripts and documents are not authoritative for this MVP.

## Supabase configuration

1. Create or select an isolated **test** Supabase project.
2. Run `supabase/mvp.sql` once in its SQL editor. It creates only new `ark_*` tables with row-level security. The three historical migrations are incompatible alternatives; **do not run them as a sequence**. The MVP script deliberately fails if its tables already exist. Do not rerun it to upgrade an existing installation.
3. Put the project URL and public anon/publishable key in `.env.local` using the names from `.env.example`. Never put a service-role key in a `NEXT_PUBLIC_*` variable. This MVP does not use a service-role key.
4. Enable email/password authentication. Set the local Site URL to `http://localhost:3000`, and allow redirects to `/account/fan` and `/reset-password` at that origin. Configure equivalent HTTPS URLs before deploying.
5. Keep email confirmation enabled. Supabase's test email delivery has limits; configure an SMTP provider for real public signup/recovery.
6. Restart `npm run dev` after changing environment variables.

All community API requests use the public project key plus the caller's bearer token. The server verifies the token through Supabase Auth; database RLS also checks ownership. Client-provided owner IDs and author identities are ignored. Public readers only see published theories and open gigs. Contact messages have no application read endpoint; review them in the trusted Supabase dashboard.

Auth uses Supabase's browser session persistence. It does not use the historical NextAuth/local MongoDB backend or store passwords in application tables. An administrator still needs to handle account deletion/data requests through the Supabase dashboard.

## Run and verify

```sh
npm run dev
npm run type-check
npm run lint
npm test -- --runInBand
npm run build
npm start

# HTTP integration checks against the running server (no browser required):
npx playwright test --project=api
# Desktop and mobile browser suites:
npx playwright install chromium
npm run test:e2e
npm run audit:a11y # axe-core on server HTML; no layout/contrast or signed-in verification
npm audit --omit=dev
```

The browser suite covers actual catalog responses, navigation, layout and signed-out private-page boundaries. It requires AniList connectivity and may encounter upstream rate limits. It does not claim to test successful community persistence without a real test project. Unit tests cover input validation, ownership scoping, unavailable services and webhook regression cases; they mock external services.

Before release, use two separate accounts in a test project to verify: email confirmation, login/reload/logout, recovery, create draft/reload, publish/read as second user, denial of editing another user's theory, private draft isolation, saving/collection assignment/reload/removal, gig publication/edit/closure, and contact storage. `supabase/verify-rls.sql` provides transaction-scoped policy checks for the database administrator. Never run live tests against production data.

## Deployment

No production deployment has been made. Once all live checks pass:

1. Set the two public Supabase build variables in the hosting environment and apply the reviewed MVP schema to the intended project.
2. Configure production Auth URL allowlists, mail delivery and abuse controls. Review operator details, final terms, data retention and moderation procedures.
3. Run the checks above, then `npm ci`, `npm run build` and `npm start` in a Node-capable host, or deploy the Pages Router project to a Next.js-compatible host.
4. Verify `/api/health`, real signup/recovery, ownership boundaries and persistence on the deployed preview before directing users to it.

`/api/health` is a process/configuration check, **not proof of database connectivity**. Public build variables are embedded at build time; rebuild when changing projects.

## Preserved but unavailable integrations

Historical video/shrine upload, news/admin, AI, payments and automation modules remain in the repository. Their routes show an integration notice or return `503 INTEGRATION_UNAVAILABLE`; the current API boundary allows only `/api/community/*`, `/api/catalog` and `/api/health`. This prevents unfinished legacy handlers from reporting success or using inconsistent authentication. New community routes do not rely on those modules.

Re-enabling uploads needs configured storage, content validation and ownership/moderation tests. Payments need real Stripe products/webhooks and verified entitlement logic. Editorial tools need a trusted admin model. None is part of the verified launch claim.

## Known limits

- Live Supabase account/persistence/RLS verification is pending environment configuration.
- No comments, social following, notifications, paid subscriptions or hosted video processing yet; earlier mock statistics are no longer presented as real.
- AniList is an external dependency; its availability and schedule accuracy are outside this project. The calendar is anime-only, uses local week/day boundaries and displays the visitor's timezone.
- Saved libraries and collection lists are loaded in one request; pagination for very large private libraries is future work (Supabase row limits apply).
- Production abuse prevention, moderation operations, account deletion UI and final operator policies require further work.

See `docs/development/FEATURES.md` for the inventory/tasks and `docs/development/DEVLOG.md` for dated checks and decisions.

## Privacy, security, accessibility and launch readiness

See [launch-readiness review](docs/development/launch-readiness.md) for the Québec-based assessment, data inventory, applicability checklist, official sources and unresolved decisions. [French policy drafts](docs/development/policy-drafts.fr.md) are repository-only drafts, not published policies or legal approval. `/privacy` and `/terms` describe the development preview; the footer and signup link to them.

The approved [design system](docs/development/design-system.md) is applied across the MVP after homepage/Discovery feedback. Google Fonts, remote catalog covers and cursor animation were removed. Original SVG/title compositions avoid introducing unverified artwork. [Asset and dependency inventory](docs/development/asset-register.md) flags retained static assets that are still not cleared for production distribution.

New safeguards include no-referrer/nosniff/frame-denial headers, restricted device permissions, a limited CSP, no-store catalog responses, no application caching of searches, and a bounded per-account write limiter. The limiter is process-local and does not protect direct Supabase traffic. A strict script CSP, host/DB abuse controls and live RLS tests remain release work. Do not mistake these fixes for full security or legal compliance.

Before public launch, resolve operator identity and monitored privacy/rights contact, age/audience policy, complete French Québec-facing journeys, provider regions/retention/backup schedules, EFVP/cross-border assessment, moderation and live request handling. `robots.txt` currently discourages indexing of the preview; it is not access control. No production deployment has been made.

Homepage visual study: visit /home-preview while the dev server runs. The current / is preserved. Implementation, artwork prompt and validation: docs/development/ink-home-preview.md.

Current preview: / uses the ink dragon and the shared light/dark navigation. /design-preview shows Comic Sans, controls and the original cloud. See docs/development/calendar-cloud-review.md for current verification and launch steps.

## Calendar, cloud and Comic Sans update — 2026-09-26

Calendar lives at `/calendar`, linked beneath Discovery and as a direct navigation shortcut. It is a local-time weekly agenda with previous/next (eight weeks each way), Today, title/format/upcoming filters, explicit loading/error/empty states, manual pagination and keyboard-accessible series details. Search filters loaded listings only; pagination is disclosed. Broadcast times do not imply regional streaming availability. Missing dates and episode totals are never fabricated.

`GET /api/schedule?from=<epoch seconds>&to=<epoch seconds>&page=1` uses AniList GraphQL `airingSchedules`, at most eight days and 50 results per request, with a ten-page safety ceiling. Weeks are computed from local midnight, including DST transitions. The old daily catalog endpoint is retired. No schedule database, catalog import, background crawler or user progress tracker is implemented. The server reuses successful public schedule responses for 60 seconds (discovery: five minutes), bounded to 100 cache entries; stale entries are removed on subsequent access. Search responses are not retained. Responses to the browser are `no-store`. The shared source client conservatively limits itself to 20 new upstream requests/minute/process and honors upstream Retry-After/reset headers. Multi-instance hosting needs a shared rate budget before launch.

### Source rights and limits

Checked the official [AniList terms](https://docs.anilist.co/guide/terms-of-use) and [rate documentation](https://docs.anilist.co/guide/rate-limiting) on 2026-09-26. Terms prohibit hoarding/mass collection, backup/storage use, and competing non-complementary anime/manga list or tracker services. The commercial text permits use below $150 monthly revenue and requires a license above it; currency, the exact boundary and this product's complementary status need confirmation with AniList before monetization/public launch. Normal capacity is 90 requests/minute, with the documented current degraded limit at 30/minute, plus burst limits. No entitlement to higher limits is assumed.

The limited read-only schedule supports fan discussion, but this implementation does **not** establish legal clearance for the intended long-term product. AniList source links are visible; attribution alone does not grant ownership or override restrictions. Turning API results into our own schema does not make the source data ours. Do not mirror its catalogue. For independence, obtain a written data license or authorized publisher feeds, maintain source/provenance and permission records, then build a separately reviewed ingestion adapter. Until then, retain this bounded preview and keep deployment/monetization blocked pending the source decision.

### Pointer and lettering

The old six-star orb and particle-canvas implementation are replaced by an original 30×18 px ink cloud. It follows mouse movement with a time-based lag, settles underneath the pointer, and shows a small wind stroke only while catching up. It never intercepts events. Typing fields hide it; touch/coarse pointers and reduced motion use the native pointer alone. Animation frames stop when settled, hidden or disabled. The dragon artwork and its independent bounded tracking are preserved.

Comic Sans applies throughout the shared shell, including headings, forms, navigation and cards. Stack: Comic Sans MS, Comic Sans, Segoe UI, sans-serif. The installed Windows font supports the tested French/Spanish accents, ligatures and currency signs. Japanese in the type specimen and arrow/disclosure/theme symbols use system glyph fallback. Devices without Comic Sans use the next available family. Exact cross-device Comic Sans requires an appropriately licensed webfont; Windows font binaries were not uploaded. See [Microsoft's font FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq), `/design-preview`, and `docs/development/comic-font-check.json`.

### Release status

Code is prepared on `codex/calendar-cloud-comic-sans`, avoiding the existing main-branch production deployment triggers. No production deployment is requested or performed. Before launch: resolve source rights; configure Supabase and test two-account RLS/persistence/email recovery; review operator/privacy/retention/moderation and artwork permissions; configure mail/abuse controls and shared rate limiting; replace historical Node 18 deployment workflows with a reviewed current-Node pipeline; finish payments only if explicitly selected for scope. Stripe, uploads, AI and historical admin integrations remain unavailable. See `docs/development/calendar-cloud-review.md` for actual checks and limitations.

### Main branch integration

The completed calendar/cloud/Comic Sans work is integrated into main at the owner's request. The integration commit uses [skip ci] to skip push-triggered GitHub Actions for this update only, including automatic production deployment. Workflows remain unchanged; future main pushes may deploy and must be reviewed before proceeding. Existing local test results apply. Backend, legal, data-source and CI modernization launch gates remain open.
