# ALBi Cinematic Ocean Journey — mockup package

This folder is designed to be placed at the root of your **existing ALBi website repository** as `./mockup/`. It contains a detailed Codex implementation prompt and references for implementing the selected **Option 2: Cinematic Ocean Journey** concept.

## How to use

1. Extract the downloaded ZIP **at your repository root** (it contains a top-level `mockup/` directory).
2. Open Codex at the repository root.
3. Prompt Codex: **"Read and implement every requirement in `./mockup/CODEX_PROMPT.md`. Inspect all provided `./mockup/` reference assets before editing. Keep all changes within the stated landing-page scope."**
4. Review the result in your browser, particularly on mobile, before publishing. **Mobile is a required target, not a scaled-down desktop mockup:** test portrait/landscape iPhone and Android layouts, browser resizing, larger text, fixed menu/anchor offsets, and reduced-motion performance. The Codex prompt has an explicit responsive acceptance matrix.

## Media inventory

- `CODEX_PROMPT.md` — the complete implementation specification, exact four-section copy, animation timing, responsive behavior, accessibility, and acceptance tests.
- `references/current-homepage.png` — actual screenshot of your existing hero/layout.
- `references/editorial-philosophy.pdf` — user's original philosophy (3 pages).
- `references/selected-cinematic-ocean-journey.gif` — chosen cinematic journey reference, **not** a production site background.
- `references/selected-section-storyboard.gif` — supplementary visual direction for section layouts.
- `references/selected-how-it-works-transition.gif` — supplementary visual direction for traveling between hero and first section.
- `references/selected-keyframes/` + contact sheet — inspectable snapshots of the approved GIF.
- **No production ocean background photographs included.** The old GIF-upscaled images were too low-quality and have been removed, not replaced with another upscaled proxy. Codex must use existing true high-resolution repo assets or acquire verified licensed masters before claiming final visual quality.
- `MEDIA_SOURCE_OPTIONS.md` — source/licensing leads for finding original-resolution photographs; references only, not downloaded files.
- `media/overlays/*.svg` — four subtle transparent decor layers designed for CSS/JS transform/opacity animation. They are not self-animating.
- `ASSET_MANIFEST.json` — file list and checksums.

## Important

The philosophy addresses the *Feel Good Feed's editorial approach*. The current screenshot illustrates the *wishes/giving product*. The Codex prompt incorporates both without making unsupported claims about policies or backend features. The GIF/storyboard may contain conceptual UI/text; **always use actual website markup and the final copy in the prompt, never rasterized GIF text.**

**No production app code has been modified in this package.** This is a content, motion, and layout specification bundle. **Production image acquisition remains outstanding** unless appropriate high-resolution photographs already exist in the actual repository.

## Responsive implementation audit (November 2026)

The main prompt includes explicit instructions for fluid screen-width adaptation; fixed mobile header and fully functional six-destination menu; dynamic address bars, rotation, and safe-area insets; no fixed-height content clipping; responsive background framing; lighter ambient animations and no mobile scroll parallax; and an expanded cross-device acceptance checklist. The SVG overlays are layered motion assets; GIFs are low-resolution references only, NOT background assets. No production scene photographs are bundled. Codex must build the actual responsive DOM/components and validate them.
