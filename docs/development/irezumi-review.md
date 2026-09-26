# Shonen Ark: shared ink edition

Date: 2026-09-26. Running local preview: http://localhost:3000/. Visual direction awaits owner review. No deployment, account creation or external publication performed.

## Audit and causes

The dragon study bypassed `Layout` on `/home-preview`. It carried an independent header, appearance state and stylesheet. Other routes rendered `Navbar.tsx`, while `_document.js` forced `className="dark"`. The true `/` still contained the moon/monolith SVG. This split explained both the changing menus and loss of the light theme after navigation.

The active route graph was inspected through `_app`, `Layout`, `Navbar`, `Footer`, `PageLayout`, `CommunityUI`, `Catalog`, `AuthScreen`, `TheoryEditor`, `GigBoard`, auth/resource hooks and Next redirects/rewrites. Button/Card primitives were aligned too. `ParticleCursor`, `CursorTrail`, `ShrineHero`, manga effects and `ink-theme.css` are retained historical source, outside the active route graph. Disabled API endpoints remain blocked by `proxy.ts`; they were not enabled by this work.

## Changes

- `/` now renders the preserved dragon composition. `/home-preview` uses that same component. There is one shared header, footer and main landmark across the app.
- Home, Theories → Saved, Discovery → Characters, Gigs, Calendar, Account and appearance controls share one implementation. Mobile submenus open on click/keyboard, Escape returns focus to their trigger, outside clicks close the menu, and route changes reset it. Account login/register/profile/logout remain available.
- A final computed-style check also found the legacy html.light input selector overriding field borders; an explicit shared form rule now applies the palette in both themes. One appearance provider persists the light/dark choice across routes and observes device changes in Auto mode. A small initial document script applies the preference before paint. No theme request goes to a third party.
- `styles/edition.css` now owns semantic light/dark tokens and shared controls. Original SVG ink-cloud contours, asymmetrical surfaces, clear borders, high-contrast states and separate catalog/calendar/writing compositions replace the old visual treatment. Custom 404 and 500 pages follow the same theme.
- Bangers is locally hosted (93,148-byte TTF, OFL license included) for display lettering. Georgia is preserved on the homepage; Arial/Helvetica serves paragraphs, forms and navigation. `/design-preview` contains real type samples, accents, an editable non-saving form, empty/status examples and the six-star orb. French accented glyphs, œ/æ and quotation marks are in Bangers; → falls back to the font stack. Japanese text uses the device's script fallback.
- The dragon's art stays pointer-transparent. Document capture observes pointer movement across overlaid controls; the head target is calculated from the artwork rather than the whole hero. Movement is clamped to ±24/18 px, smoothed at ~360 ms, returns to idle after 1.1 seconds and gently retreats within 100 px of the estimated face anchor. It does not chase or reposition itself onto controls. The whole dragon floats through an 18 px vertical range over alternating 12-second passes. Art intersection, page visibility, manual pause and reduced motion stop movement.
- The six-star lilac orb is original SVG geometry based on the user's reference direction, not a downloaded Fandom image. It appears 20 px beside mouse interactions, never hides the native pointer, is pointer-transparent, and hides on text fields, click, scroll and keyboard input. Coarse pointers and reduced motion disable it. Its footer toggle lasts for the mounted app session.
- AniList requests now share concurrent public-page work, reuse general pages for five minutes and calendar pages for one minute, and retain at most 100 public pages per process. Searches are not retained. The initial irrelevant date update no longer refetches anime/character results. This reduces calls; it is **not** an independent catalog or permission to mirror AniList.

## Pages inspected in the browser

37 representative addresses, including query variants, redirects, dynamic-route examples and error routes, were checked in dark/light and desktop/mobile configurations (148 matrix entries in `irezumi-route-results.json`). Dynamic pages cannot be exhaustively checked for every possible ID.

| Route group | Addresses / result |
| --- | --- |
| Home and study | `/`, `/home-preview`, `/design-preview` |
| Catalog | `/discovery`, `/characters`, `/calendar` |
| Community | `/theories`, `/theories/00000000-0000-4000-8000-000000000001`, `/submit-theory`, `/collections`, `/gigs`, `/gigs?mine=true` |
| Accounts | `/login`, `/register`, `/forgot-password`, `/reset-password`, `/account/fan`, `/account/creator`, `/account/onboarding` |
| Information | `/contact`, `/about`, `/privacy`, `/terms`, `/integrations` |
| Unavailable historical routes | `/shrine`, `/submit-video`, `/news`, `/news/preview`, `/admin`, `/admin/dashboard`, `/admin/news-manager` resolve to the shared unavailable screen |
| Redirects | `/discovery/anime`, `/manga-showcase` → Discovery; `/home` → home; `/theories/new` → editor |
| Errors | `/not-a-real-page` → themed 404; `/500` → themed server-error page |

All matrix entries had one navigation/main, a heading, no active moon art and no horizontal overflow. Initial matrix desktop width was 1067 CSS px; additional loaded-state checks used 1280 px. Mobile measured 325 CSS px because this browser session scales the requested viewport. This is browser viewport testing, not a physical phone test. Several initial screenshots show loading states; `irezumi-loaded-results.json` separately verifies 24 completed catalog/community states across the four configurations. Live catalog lists loaded; community routes correctly reported unconfigured services.

## Validation and limits

- Production build, ESLint and TypeScript passed.
- 55 Jest tests passed, including capture through a control that stops bubbling, target bounds/retreat, reduced/offscreen motion state, theme persistence, submenu focus, pointer-type/text-field cursor exclusions and public cache reuse/expiry/search privacy.
- 12 HTTP Playwright API tests passed. Browser UI was exercised with the in-app browser, not that CLI suite.
- axe-core on 21 server-rendered pages reported no violations. This JSDOM check disables color-contrast and flagged some label checks as incomplete; it is not a browser accessibility certification. Browser form labels were visible and usable.
- Semantic palette calculations pass 4.5:1 for checked text and 3:1 for checked control borders (`irezumi-contrast.json`). This is not exhaustive contrast testing of every pixel.
- Browser checks included desktop/mobile menu disclosure, Enter/Escape focus, Saved navigation with menu closure, theme persistence, loaded content in both themes, manual animation pause and stopping the art when it moves behind the sticky header/offscreen. Motion timing and touch/reduced-motion branches additionally have unit/CSS coverage. Physical touch devices, screen readers and OS-level reduced-motion settings still need acceptance testing.
- Original dragon atlas remains 2,519,027 bytes. No extra raster illustration, remote font, canvas or WebGL effect was added. Real low-end device/GPU and slow-network profiling remain outstanding.
- Supabase is not configured. Authenticated editor, save, deletion, ownership and recovery flows are not verified against a live database. No fictitious account/content was added to make the screenshots look populated.

See `next-steps.fr.md` for the ordered path to a deployable MVP.
