# Calendar / cloud review — 2026-09-26

## Actual verification

- Production build, ESLint and TypeScript checks pass. Unit/component suite covers bounded request validation, adult/out-of-window filtering, source failures/429, empty schedules, week navigation and Today, retry, year boundaries, cloud pointer behavior, theme/navigation and existing community authorization. HTTP integration suite: 12 passing tests. Final unit count is recorded in the delivery message.
- Browser route matrix: 37 addresses × light/dark × 1280/390 CSS px = 148 checks, no horizontal overflow, exactly one shared navigation and cloud, Comic Sans first in computed font stacks. Includes home, previews, Discovery, Characters, Calendar, Theories/detail/create, Collections, Gigs, auth/recovery, accounts, Contact, About, Privacy, Terms, integration notices, legacy redirects and 404/500. Raw measurements: calendar-route-review.json. This checks rendered signed-out pages, not successful backend workflows.
- Live AniList schedule returned real episode/timestamp metadata. Manual load grew 44 visible non-adult listings to 87. Tested title no-match, format/upcoming filters, next week, Today, series dialog and Escape. Source 429/offline/empty states are deterministic mocked component/API tests, not invented production listings.
- Structural axe audit across 21 routes reports no violations; it does not measure browser contrast or certify accessibility. Existing semantic theme colors are retained. Native form controls and visible keyboard outlines inspected in both themes.
- Comic Sans local cmap check confirms French/Spanish accented letters and currency glyphs. The font is supplied by Windows locally, not served from this repository. No assurance that every visitor has it installed.

## Before deployment

1. Decide the lawful long-term schedule/catalog source. Confirm AniList complementary/commercial status in writing or license authorized alternative feeds. No mirroring or ownership-by-conversion assumption.
2. Configure isolated Supabase test project, apply reviewed MVP SQL once, run RLS checks and two-user signup/recovery/draft/publication/collections/gig/contact persistence scenarios. Currently unconfigured.
3. Finalize operator/contact, privacy retention/requests, age/audience, moderation and asset permissions. Existing legal pages are drafts, not a certified launch package.
4. Configure email, shared source/write rate budgets, hosting logs, secrets and monitoring; review dependency audit and legacy dependencies. Current Node 18 GitHub deployment workflows are historical and need modernization before use. This feature branch does not match their deployment branch triggers.
5. Keep Stripe, uploads and AI/admin integrations disabled until separately completed and tested. No payment or production deploy in this task.
6. After these gates, use a non-production deployment preview, test actual auth and source behavior there, then seek production deployment authorization.

Small related improvements: mobile navigation closes on same-route links; legacy particle cursor entry point now uses the original cloud; retired old daily schedule endpoint avoids bypassing the new bounded schedule window.

Final dependency check: npm audit --omit=dev on 2026-09-26 reported 0 vulnerabilities. This is an advisory scan, not proof that legacy features or licensing are ready.

Final suite: 63 unit/component tests pass. Reduced-motion/coarse-pointer behavior is tested with mocked media queries; browser checks verified ordinary mouse movement, settled cloud wind opacity zero, event transparency and manual dragon pause/resume. A physical touchscreen and OS reduced-motion switch were not exercised in this environment. All signed-in persistence checks remain pending Supabase configuration.
