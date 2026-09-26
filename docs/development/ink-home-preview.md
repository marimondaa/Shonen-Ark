# Ink dragon homepage preview — 2026-09-26

Working route: `/home-preview`. The existing `/` remains intact pending visual feedback. No deployment performed.

## Direction and scope

The prior homepage used a heavy uppercase editorial title, monolith geometry and an obsidian-only palette. This alternative uses a quieter upright Georgia display face, a three-line reading-focused headline, a large ink dragon beside the copy and ruled reading links underneath. Arial/Helvetica controls remain compact. Parchment, ink grey and lilac become charcoal, indigo and silver in dark mode. Blue is reserved for interaction accents and the optional flame. No remote fonts, copied calligraphy, seals or rectangular reference background.

Files: `pages/home-preview.js`, `styles/ink-home.module.css`, `components/InkDragon.js`, `public/ink-dragon-atlas.png`, `__tests__/ink-home.test.js`; a route-specific bypass in `src/components/layout/Layout.js`. `pages/privacy.js` now explains the appearance preference.

## Interaction and performance

- Separate painted body/head viewports reuse one transparent PNG atlas; foreground/background clouds and subtle whisker strokes are SVG. A code-native still dragon appears while the image loads or if it fails.
- Desktop pointer tracking is bounded to ±12 px horizontally and ±8 px vertically, with approximately 230 ms smoothing. After 850 ms inactivity it returns to idle. Only convergence requires requestAnimationFrame; continuous idle motion uses CSS transforms.
- Touch uses idle motion. Reduced-motion preferences, manual pause, page visibility and the hero intersection observer stop motion. There is no WebGL or continuous canvas rendering.
- Main navigation uses ordinary links. The optional desktop flame begins on pointer-down only when its endpoint is safe. Navigation is never prevented or delayed, so a quick navigation can interrupt the 480 ms effect. Mobile, reduced-motion, paused and offscreen conditions skip it.
- The atlas is 1536 × 1024 RGBA, 2,519,027 bytes. It is the principal first-load cost; both painted layers reuse the same URL. No claim of measured device frame rate or slow-network performance is made. Physical touch-device and OS reduced-motion testing remain outstanding.
- Light/dark preference is local to this preview. Explicit choices use localStorage `shonen-ark-appearance`; “Use device appearance” removes the key. Nothing is transmitted for this preference.

## Validation

Production build passed. All 49 Jest tests passed, including four preview tests for appearance persistence/device reset, reduced-motion/offscreen state and submenu Escape focus. Browser checks: desktop light/dark, persistence after reload, keyboard Enter/Escape submenu behavior, 390 px and 320 px layouts without horizontal overflow, manual motion pause, mobile Characters navigation and no dragon on the destination page. Screenshots: `screenshots/ink-home-light.png`, `ink-home-dark.png`, `ink-home-mobile.png`.

This is an implemented local preview, not a static mockup. Account persistence still depends on configuring the existing Supabase integration; this visual work does not change that limitation.

## Generated artwork record

Method: built-in image generation, transparent background, using the user-supplied dragon painting as visual reference. Generated PNG copied unchanged into `public/ink-dragon-atlas.png`; body and head are composed with SVG viewports. Reference ownership/production rights were not established by this generation step.

Exact prompt:

> Create a production transparent PNG SPRITE ATLAS for a website ink-dragon illustration, based closely on the supplied painting as anatomy/brushwork reference ONLY. Reinterpret, never reproduce calligraphy, seals or background painting. Canvas wide 3:2 landscape. TWO ISOLATED COMPONENTS with transparent gap: LEFT TWO THIRDS: long East Asian dragon BODY WITHOUT HEAD, elongated and elegant, coiling in two broad vertical S curves, tapered tail at top, neck ends at lower LEFT at about 70% canvas height ready for separate head overlay. Four beautifully drawn small clawed limbs attached to body, intricate overlapping scales, dark charcoal brush contour, grey ink washes, subtle violet shadows, silver grey highlights. NOT a winged or stout Western dragon. RIGHT THIRD: separately drawn horned DRAGON HEAD facing LEFT in three-quarter profile, long trailing black flowing mane, antler-like horns, elegantly curved long whiskers, expressive layered brows, open mouth with tiny muted plum tongue and amber eye. The head should align with the body lower-left neck when moved there by a developer. Match exact ink density and scale between components. Keep a clean fully transparent gap between body and head; do not let whiskers enter body zone. No words, labels, rectangles, borders, cloud backdrop, calligraphy, seals or flame. Sophisticated traditional Japanese sumi-e and irezumi linework, authentic dense hand-painted scales and soft wash tonal transitions, not vector flat cartoon, not neon, not 3D. Body part should be the dominant tall form, head large enough to have fine detail. True transparent alpha outside painted components. User reference image is the original dragon painting, not an edit target to reproduce in full.

Superseded by shared-system work: the dragon now renders at / and /home-preview under one global theme/header. Motion, navigation, font and cache changes are documented in irezumi-review.md. The original artwork prompt above remains the asset record.
