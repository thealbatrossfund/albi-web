# CODEX IMPLEMENTATION REQUEST — ALBi cinematic ocean landing-page expansion

You are working inside the existing ALBi website repository. **Implement** the requested changes; do not only produce a plan. The user chose the **Cinematic Ocean Journey (Option 2)** concept, not Ocean Portal or 3D Chapter Transitions. Work from the existing codebase and the reference package in `./mockup/`.

## 0. Mission, boundaries, and source precedence

**Goal:** Keep the existing ALBi hero/homepage intact while expanding the landing page with four fully authored sections — **How It Works**, **Community**, **About**, and **FAQs**. The existing navigation should scroll smoothly to these sections; the navbar should remain visible the entire time. Every ocean background, **including the hero background if technically separable**, should have **very light, continuous ambient movement**. Moving from the hero down through the sections should feel like one cohesive cinematic ocean journey, not five unrelated screens.

**Source precedence:**
1. **Actual repository code, routes, and assets** are authoritative about existing functionality, navigation destinations, component conventions, and dependencies.
2. `./mockup/references/current-homepage.png` is authoritative about the current visual appearance, hierarchy, layout, CTA labels, and style to preserve.
3. `./mockup/references/selected-cinematic-ocean-journey.gif` is the **approved animation direction**; `selected-section-storyboard.gif` and `selected-how-it-works-transition.gif` are additional **conceptual visual guides**. Animated concept frames are not screenshots of the existing production site and should not be copied literally if they depict inaccurate app UI or text.
4. `./mockup/references/editorial-philosophy.pdf` is authoritative about **editorial tone and philosophy**, particularly the Feel Good Feed: authentic, constructive reframing, acknowledge the reality first, never force optimism, and leave room for the reader. It does **not** define technical behavior, fees, privacy policies, availability, or fulfillment rules.
5. The content in section 8 below is the requested homepage copy baseline. Use it as written; do not invent policies, features, success statistics, testimonials, fake activity, new navigation destinations, or claims that cannot be verified.

**Very important scope control:** This is a **landing-page-only** content, visual, and navigation change. No changes to backend services, APIs, database, authentication flows, internal app screens, feeds, moderation, wishlist logic, fulfillment integrations, payments, onboarding, account policies, privacy policies, or mobile app code. Do not rebuild, restyle, or replace the current hero; maintain its copy, product phone art, category tiles, and current CTA actions. Changes to the hero should be limited to making the navbar persistent, providing a compatible subtle ocean background animation, and necessary responsive/anchor-spacing corrections. Do not alter the ALBi logo or invent a bird mark. Do not modify working functionality or unrelated screens. If an existing route or component cannot be verified, retain it and report the issue rather than guessing.

## 1. Begin by inspecting the existing project

Before modifying code:
- Inspect `package.json`, project structure, existing frontend framework, routing, landing-page component(s), global styles, asset locations, and test/build scripts.
- Find the source for the current navbar, header, hero, desktop/mobile menus, footer (if present), and current button destinations: **Sign In, Get Started, Start Giving, Make a Wish**, and logo.
- Read the entire PDF editorial philosophy and inspect the reference GIF frame-by-frame as needed. There are also extracted frames under `./mockup/references/selected-keyframes/`.
- Identify usable existing ocean/hero background assets; keep them if they're already better quality or necessary for visual continuity.
- Determine whether a motion/scroll library is already installed. Use the current stack and conventions. **Do not install Three.js, WebGL engines, large video packages, scroll-jacking libraries, or unrelated UI frameworks.** You may use an already-installed animation library (for example GSAP/ScrollTrigger). If the repo has none, native CSS animations + `IntersectionObserver` + a small, cancellable `requestAnimationFrame` smooth-scroll helper are sufficient. Add at most one lightweight animation dependency **only if clearly necessary** and document why.
- Briefly summarize your implementation approach and the files you expect to touch before making changes, then implement.

## 2. Assets to use — exact `./mockup/` inventory

**Reference-only; do not use the GIFs as the live background or as baked-in website UI:**
- `references/current-homepage.png` — the existing homepage screenshot and style baseline.
- `references/editorial-philosophy.pdf` — source for tone and editorial principles.
- `references/selected-cinematic-ocean-journey.gif` — primary choice: visual transition from sunset surface to illuminated underwater scenes.
- `references/selected-section-storyboard.gif` — conceptual cards, section style, and FAQ behavior (may contain non-final wording).
- `references/selected-how-it-works-transition.gif` — conceptual appearance of moving from the hero to the first section.
- `references/selected-keyframes/01-journey-frame.png` through `06-journey-frame.png` — six inspectable GIF frames.
- `references/selected-six-keyframes-contact-sheet.jpg` — overview of those frames.

**Usable, deliberately text-free concept background plates** (1920 × 1080 WebP; they are scene plates upscaled/retouched from the selected concept, not new high-resolution photographs):
- `media/scene-how-it-works.webp` — twilight/surface transitioning into underwater.
- `media/scene-community.webp` — clear underwater blues, soft overhead lighting.
- `media/scene-about.webp` — deeper, calmer, more restrained underwater scene.
- `media/scene-faqs.webp` — calm underwater with faint seafloor caustic light.

**Transparent, lightweight, animatable SVG overlays:**
- `media/overlays/water-ripples.svg`
- `media/overlays/light-rays.svg`
- `media/overlays/bubbles.svg`
- `media/overlays/seafloor-caustics.svg`

Do not ship the large GIF/storyboard files to application users. They are visual references **only**. Copy/use the scene plates and overlays in the site's existing asset convention (e.g. `public/assets/albi-ocean/`), with relevant attribution or references left in source comments if useful. If an existing production ocean asset better matches the hero, use that instead; do not replace a superior hero image with an upscaled concept image. Keep all text, buttons, panels, and FAQ interactions in **real HTML/components**, separate from background imagery. Image assets must contain no embedded site text or fake phone interfaces.

## 3. Overall layout and art direction

- Preserve the **deep navy/royal blue ocean** identity, white typography, high-contrast **ALBi yellow** accents, blue glass-like panels/cards, rounded corners, and the existing font family/style where possible. Sample the existing CSS tokens/colors rather than imposing a new brand palette.
- One continuous vertical landing page in this exact order: `Hero (existing) → How It Works → Community → About → FAQs → existing footer (if any)`.
- Use real semantic `<main>`, `<section>`, `<h1>`/`<h2>` structure, with **one existing hero h1**; the four new section headings are h2. Never use fake headings in background images.
- Do **not** place large, opaque white page panels below the hero. Let the background scene carry the visual atmosphere, with dark translucent/blurred readable containers as needed.
- Keep paragraphs at sensible reading widths, approximately 55–75 characters on desktop. Long About text must remain legible; avoid laying it over bright light beams.
- Card/grid layouts may adapt at breakpoints. Avoid novelty clutter: giant compass widgets, fabricated social counts, fake user profiles, extra buttons, or invented features are out of scope.
- Sections may have min-height near a viewport on wide screens where appropriate, **but must expand naturally** to fit content on smaller screens. Do not clip text or force fixed-height slides.
- The visual transitions between scene backgrounds should be seamless, using overlapping gradients, crossfades, layered image positioning, or subtle light bands. Avoid harsh horizontal cuts or flashes when sections change.

### Scene arc

**Hero (existing):** Keep original skyline/ocean, text, phone screenshots, cards, CTAs. Add only slight ocean/environment motion behind foreground content, e.g. an independent low-opacity ripple/lighting layer or an exceptionally slow background shift if feasible without moving product art. Header remains fixed above everything.

**How It Works:** Continue the twilight surface horizon, gently introducing underwater textures and soft wave lines. The content title appears first, followed by three sequential explanation cards. The ocean should look like the camera is beginning to descend, not a completely new website.

**Community:** Descend into brighter open underwater blue with visible but restrained light shafts, distant moving bubbles/particles, and three story/meaning cards. If images are needed, use supplied backgrounds/overlays or existing verified assets rather than fabricating user photos or real-world stories.

**About:** Move into deeper, calmer water with softer/darker lighting and more negative space. Let typography and philosophy dominate. A decorative nautical motif is optional **only if it stays subtle and doesn't add a new functional widget**; the reference GIF's compass is illustrative, not required.

**FAQs:** Settle near calm, softly lit seafloor water/caustics; use elegant, high-contrast accordion panels with restrained border/hover/expand animation. The last question should lead naturally into the existing footer, not an invented marketing section.

## 4. Precisely define the navigation and scroll interaction

### Fixed/sticky navbar — mandatory
- The header **must remain visible at the top of the viewport** during every scroll and every section transition on desktop and mobile. Use a robust fixed or sticky strategy, not a navbar that disappears with the hero or is trapped in an overflow/transform ancestor.
- Maintain the existing **ALBi | How It Works | Community | About | FAQs | Sign In | Get Started** order/identity on desktop. The exact current route actions for logo, Sign In, and Get Started must remain unchanged.
- Transparent or translucent navy header at top with a restrained dark backdrop blur; adapt opacity slightly over lighter backgrounds to ensure readability. Maintain useful separation from scene background without a bulky bar.
- Add an elegant, thin ALBi-yellow active indicator below the selected section label; move/animate it smoothly and visibly, but not with aggressive glows. If no new section is active, the hero need not show a selected section label.
- Navigation links are real anchors: `#how-it-works`, `#community`, `#about`, `#faqs`.
- Clicking ALBi logo preserves the app's existing destination/behavior. Do not silently replace routing behavior.

### Smooth scroll — mandatory
- Clicking a section link triggers a **continuous, controlled, eased scroll to the actual destination section**, rather than a page load, jump cut, full-screen portal wipe, horizontal slide, modal, or hard reload.
- This is the **Cinematic Ocean Journey** concept: the user sees the ocean scenery change as they travel **down or up** through the page. Motion through intermediate sections is allowed and should feel natural; don't cover the entire content with an artificial transition.
- Preferred click animation: smooth ease-in-out with distance-aware duration, approximately **750–1500 ms** depending on distance; maintain at least the destination's heading comfortably beneath the navbar. Avoid overlong travels across the page. Browser-native smooth scrolling is acceptable if it produces a comparably natural result; otherwise a minimal cancellable `requestAnimationFrame` implementation is fine.
- Any custom scroll helper must **cancel promptly on manual wheel, touch, pointer drag, keyboard navigation, a second link click, route change, or unmount**. Do not hijack or re-ease ordinary user scrolling.
- Use CSS `scroll-margin-top` / `scroll-padding-top` with the real calculated header height, including the mobile header. Account for sticky elements without hard-coded offsets that fail at different breakpoints.
- Update the URL hash in a way compatible with app routing and browser Back/Forward. Ensure reload or direct navigation to `/#community`, `/#faqs`, etc., lands on the correct section **after layout/asset load**, not hidden beneath the navbar.
- Active nav state should follow the section currently in view during manual scrolling and after navigation. Do not let observer updates cause flickering or fight an in-progress click scroll.
- Do not enable mandatory scroll snapping, paged scrolling, mouse-wheel remapping, or horizontal scrolling.

### Entry choreography — mandatory
- Each section's main heading enters with a subtle upward reveal (~12–24px) and opacity change (~350–600ms); supporting copy follows slightly, then cards stagger by ~70–140ms. Avoid delaying all content until a full animation finishes.
- On scroll back upward, scenery should travel naturally in reverse. Content should not disappear or reanimate distractingly every time the user moves a few pixels; use a sensible reveal-on-first-entry default.
- Section-to-section background appearance can subtly interpolate as the viewport crosses section boundaries, but keep DOM readable and stable throughout.
- Use the attached GIF for **feel and environment**, not as a literal frame-by-frame script. This is a webpage, not a video.

## 5. Every ocean background must be lightly animated — mandatory

Implement subtle **perpetual ambience** on all five scenes (including hero when separable from its foreground content). The background should feel alive even when the reader stops scrolling, but it must never compete with reading or cause nausea.

Recommended independent layers and values (tune visually rather than strictly matching numeric targets):
1. **Slow scene drift:** background image or child image layer translates/pans by ~0.5–1.5% over **20–40s**, preferably alternating smoothly. Never animate scale so far that page edges reveal or crop important content. Use a slightly oversized scene element if needed.
2. **Water-ripple drift:** overlay at extremely low opacity (~3–10%), translating horizontally or vertically for **14–26s**. Use only on scenes where visually appropriate.
3. **Volumetric light shimmer:** faint overhead ray overlay shifts/softens in opacity over **9–18s**. Keep beams away from paragraphs when possible.
4. **Bubbles/particles:** a **small** number of very faint bubbles drift upward over **20–35s**; do not create hundreds of animated DOM nodes or distracting particle storms. On mobile use fewer or none.
5. **Seafloor caustics:** low-opacity rippling light shifts slowly over **15–30s** in the FAQ scene. Do not animate with heavy per-frame blur filters.
6. **Scroll-linked parallax:** desktop layers may move at slightly different rates with progress (roughly **8–24px** of differential motion over a section). Keep foreground copy and controls stable. On mobile, disable or substantially reduce parallax.

Implementation guidance:
- Prefer animating **transform and opacity** on composited layers, not `background-position` on huge images every frame or expensive per-frame CSS filters. Use `will-change` selectively, not everywhere, and pause/remove inactive animation work where practical.
- The site's **hero phone mockups, headings, buttons, and interactive cards must not endlessly float or wobble**. The request is to animate the **background imagery**, with separate one-time entry reveals for new content.
- Avoid flashing, dramatic splashes, fast zooms, aggressive waves, or transitions that obscure the navbar.
- No looping GIF should be used as the production page background; the selected GIF is low-resolution and contains baked-in UI.
- If images cannot safely be separated from foreground UI in the existing hero, use a very lightweight atmospheric overlay rather than moving the entire hero image or disrupting its composition.
- Respect `prefers-reduced-motion: reduce`: disable ambient drift/parallax/stagger transitions and use instant or near-instant navigation without layout jumps. Consider data/battery constraints and browser tab visibility.

## 6. Responsive and accessibility behavior

**Desktop (e.g. >= 1024px):** Keep original left/right hero composition. Navbar remains fixed. Section cards in three columns only when readable. Maintain deliberate hierarchy, generous spacing, not oversized paragraphs. Background scenes should have `object-fit: cover`/appropriate `background-size: cover` and safe focal points.

**Tablet (~768–1023px):** Collapse grids appropriately (two columns where useful; one when text needs more width). Avoid content colliding with decorative lighting. Keep nav usable; if it no longer fits, switch to responsive menu without overlapping other buttons.

**Mobile (~320–767px):** Maintain a **fixed compact header** with ALBi logo and accessible menu trigger. The menu must expose **all four sections plus existing Sign In and Get Started**, with no lost routes. It should open/close accessibly; close when a nav item is chosen; support Escape, keyboard focus, and not cover the destination heading. Do not create a different mobile product experience. Stack cards. Keep CTAs tappable. Use restrained motion/overlay effects to protect battery and performance. Prevent horizontal overflow.

Accessibility and SEO:
- Semantic anchors, buttons, heading order, landmarks, descriptive labels. Keep FAQ controls as actual `<button>` elements with `aria-expanded`, `aria-controls`, controlled panel IDs, and proper hidden state.
- Visible focus rings; keyboard-operable nav and accordions; never require hover for information.
- Honor reduced motion; avoid flashing and distracting animation. Color/contrast for white/light gray on dark blue, including text over imagery, must remain WCAG AA as practical.
- Decorative layers `aria-hidden="true"`, `pointer-events: none`; never interfere with selection, scrolling, or clicks.
- Avoid duplicated h1, duplicate landmark labels, duplicate section IDs, and inaccessible title-in-image text.
- Respect scroll restoration/deep linking and avoid layout shifts after image load.

## 7. Section structure and required visual treatments

### How It Works (`id="how-it-works"`)
- Label/eyebrow `HOW IT WORKS`, prominent title, introductory body.
- Three cards in a connected visual progression: `01 — Make a Wish`, `02 — Find a Wish to Support`, `03 — Make It Happen`.
- Icons may use the existing icon library (request/heart or people/delivery box) but no new large illustrative assets required.
- Closing statement and **Start Giving** / **Make a Wish** buttons; reuse their existing destinations and semantics. Don't fake a checkout or promise fees/eligibility.
- Very light card entrance and hover (desktop) without constant bobbing.

### Community (`id="community"`)
- Intro title + copy and three distinct cards: `Real People. Real Needs.`, `Stories Worth Noticing.`, `A Different Perspective.`.
- The community copy connects the **wishlist/helping experience** to the **Feel Good Feed**. Both ideas matter. No fake community posts, live counters, fake photos, or newly implemented feed features.
- One existing **Get Started** CTA may be reused only if its existing route is known. No fabricated `/community` route.

### About (`id="about"`)
- Long-form but easy-to-scan editorial statement; use 2-column composition on large screens only if it reads naturally.
- Emphasis on authenticity, real needs, factual context, unmanufactured perspective, and reader agency. Use restrained decorative elements; keep content legible over darker water.
- No invented founding story, team biographies, company metrics, mission claims beyond the supplied materials.

### FAQs (`id="faqs"`)
- FAQ intro + **nine** accessible expandable questions from section 8. Use a max width around 760–900px on desktop.
- Smooth ~180–300ms expansion/collapse, preferably height/opacity where safe; ensure content remains keyboard and screen-reader accessible. A single open accordion at a time is an acceptable implementation default if the existing design has no convention; opening another should not cause jarring scroll jumps. Reduced motion becomes instant.
- Do not add unverified policy FAQs about fees, eligibility, refunds, privacy promises, safety screening, shipping guarantees, anonymity, or moderation. Capture those as separate questions for the product owner rather than writing invented answers.

## 8. Exact proposed section copy — implement this baseline

> Editorial requirement: Use ordinary, human language. Never tell the reader to feel happy. Don't minimize difficulty, manufacture a silver lining, promise success, or imply every wish will be fulfilled. Keep the distinction between the wish-giving platform and Feel Good Feed understandable.

### HOW IT WORKS

**Headline:** Help starts with something real.

**Intro:** Everyone needs a hand sometimes. And sometimes, helping someone is simpler than we think.

ALBi connects people who need everyday essentials with people who want to help. Whether it's baby formula, groceries, school supplies, or pet food, the idea is simple: make a specific wish, find someone willing to help, and turn a small act of generosity into something tangible.

**Card 01 — Make a Wish**
Need something? Share a wish for a specific item that would make a difference in your everyday life. You don't need an extraordinary story or a perfect explanation. Sometimes, you simply need a little help.

**Card 02 — Find a Wish to Support**
Want to help? Explore wishes shared by others and choose something you can provide. You'll know what someone needs and can decide where you'd like to make a difference.

**Card 03 — Make It Happen**
When a wish is fulfilled, the item is ordered and delivered directly to the person who requested it. It's a practical way to help someone without the complications of coordinating an exchange.

**Closing:** Because making a difference doesn't always require a grand gesture. Sometimes, it's as simple as showing up for someone.

**CTA labels:** Start Giving | Make a Wish

### COMMUNITY

**Headline:** There's more to every story.

**Intro:** A request for help is only one part of someone's life. A news headline is only one part of what happened.

At ALBi, we believe community begins when we look beyond the surface. Behind every wish is a real person, and behind every difficult situation, there may be people working to make things better.

Not every story has a happy ending. Not every challenge has an easy solution. But there are meaningful things happening around us every day that deserve to be noticed.

**Card — Real People. Real Needs.**
Our community connects people around specific, everyday needs. Sometimes the most meaningful way to support someone is simply to understand what they're asking for and lend a hand.

**Card — Stories Worth Noticing.**
Through the ALBi Feel Good Feed, we look for stories of cooperation, recovery, discoveries, human kindness, and genuine progress. Not because the world is always good, but because those stories are part of the world, too.

**Card — A Different Perspective.**
We don't believe in covering up difficult realities with inspirational headlines. We believe in acknowledging what happened and making room for the developments and perspectives that might otherwise go unnoticed.

**Closing:** The good doesn't have to be exaggerated to matter.

**CTA label:** Get Started (reuse existing verified destination)

### ABOUT ALBi

**Headline:** A different way to see the same world.

The world can be difficult, complicated, and sometimes overwhelming. We don't believe pretending otherwise makes it better.

ALBi is built around a simple idea: people deserve to be seen, meaningful actions deserve attention, and the full story deserves to be told.

Through everyday wishes, we want to make it easier for people to help one another in practical, direct ways.

Through our Feel Good Feed, we want to offer something different from both sensational news coverage and manufactured positivity.

We don't ignore hardship. We don't rewrite bad news into good news. And we won't tell you how you should feel about what you read.

Instead, we look for the developments, people, and perspectives that may have been overlooked. Sometimes that's a community coming together after a disaster. Sometimes it's a scientific breakthrough, an unexpected opportunity, or one person quietly helping another.

And sometimes, a situation really is just difficult. We believe there's value in being honest about that, too.

We're not here to convince you that everything is wonderful.

**Closing emphasis:** We're here to help you see more of what's really happening, and leave you to decide what it means.

**Subheading:** Authenticity Above All Else.

**Tagline:** Real people. Real needs. Real stories. A different perspective.

### FAQS

**Headline:** Questions? Let's talk about it.

**Intro:** Whether you're here to lend a hand, ask for one, or explore a different perspective on what's happening in the world, here's a little more about ALBi.

**Q1: What exactly is ALBi?**
ALBi is a community-focused platform connecting people who need everyday essentials with people willing to help. It also features a Feel Good Feed, which highlights meaningful stories of human kindness, cooperation, recovery, and progress without ignoring the realities surrounding them.

**Q2: How does making a wish work?**
You share a specific item you need, such as baby formula, diapers, groceries, school supplies, or pet food. Other people can discover your wish and choose to help fulfill it.

**Q3: How does giving work?**
You can explore wishes from other people and choose a specific item to support. When a wish is fulfilled, the item is ordered and delivered directly to the person who requested it.

**Q4: What is the ALBi Feel Good Feed?**
It's our approach to discovering and sharing meaningful stories that might otherwise go unnoticed. Rather than focusing exclusively on negative headlines or artificially uplifting content, we look for genuine examples of cooperation, resilience, discovery, recovery, and progress.

**Q5: Does ALBi only share positive news?**
No. We believe good reporting starts with being honest about what happened. Difficult situations deserve to be understood, not disguised. When there's a meaningful constructive perspective, we want to share it without minimizing the challenges involved.

**Q6: How do you decide which stories to share?**
We look for stories with meaningful, factually supported perspectives that may not receive as much attention elsewhere. We consider the full context, acknowledge difficult circumstances, and avoid exaggerated or manufactured conclusions. Not every story needs to appear in the feed.

**Q7: Can I use ALBi if I just want to explore the community?**
ALBi includes both community-oriented content and opportunities to give or request help. You don't have to approach every story as a problem you need to solve.

**Q8: Is Bill Help available?**
Not yet. Bill Help is currently marked as Coming Soon.

**Q9: How do I get started?**
Choose Start Giving if you'd like to help fulfill a wish, or Make a Wish if you need something yourself. You can also use Get Started to begin exploring ALBi.

**Accuracy guardrail:** The editorial-philosophy PDF validates **editorial principles**, not product capabilities. The current homepage screenshot supports the visible bill-help "Coming Soon" label and item examples. **Before publishing**, verify against the actual app whether wish creation and item delivery work exactly as described; whether the Feel Good Feed is currently live or only planned; and whether a visitor can explore the community without signing in. If a claim cannot be verified, preserve the section structure but flag the exact sentence for owner review. Do not invent a workaround or silently present unverified product behavior as fact.

## 9. Motion and design constraints, explicitly excluded features

DO:
- Create the smooth vertically continuous ocean journey with fixed navigation, scroll-target anchors, active link indicator, subtle environmental animation, section entrance reveals, functional FAQ accordions, and responsive layout.
- Prefer existing button and link routing rather than creating new destinations.
- Keep overlays low-opacity, animate a few well-chosen layers, and make copy readable.
- Include necessary tests for anchor/hash scrolling, fixed header, FAQ accessibility, and regression where existing test conventions allow it.
- Use the provided scene plates / overlays and existing assets; no external image API or CDNs are required.

DO NOT:
- Create a slide deck, embedded fullscreen video, 3D WebGL site, Ocean Portal wipe, horizontal carousel, background audio, automatic route changes, scroll-snapping framework, or new page routes for these four sections.
- Modify app-level sign-in/registration, wishlist creation, fulfillment/payment, product categories, news processing, or any other existing screen/function.
- Add fake user stories, donations, metrics, testimonials, company/founder biographies, fabricated FAQ policies, or AI editorial implementation details not in the source.
- Add additional feature sections, a blog, newsletter signup, a contact form, social integrations, onboarding flow, analytics events, consent banners, or new admin controls.
- Change the current hero copy, images of phones, buttons, category names, or CTA destinations.
- Use the reference GIF itself as a looping page background or copy its rasterized UI/text into production markup.

## 10. Testing and completion — must verify before final response

Functional/regression checklist:
1. Desktop homepage matches existing hero layout and retains its existing exact CTAs/routes, category tiles, and phone imagery.
2. Fixed navbar stays visible from top of hero to bottom of FAQ/footer and in reverse scroll, in Chromium/WebKit if available.
3. Clicking each of the four nav links smoothly scrolls to the exact section, both upward and downward. Heading remains visible and offset below header; no jump/flash.
4. Direct `/#how-it-works`, `/#community`, `/#about`, and `/#faqs` URLs work after reload. Browser Back/Forward works; repeated clicks and double clicks don't produce stuck animations.
5. Manual wheel/touch/keyboard input interrupts any programmatic scroll immediately; normal scroll remains completely natural.
6. Active nav link follows location accurately, without flicker at section boundaries.
7. All five ocean scenes have noticeable only-on-inspection light movement at rest (ambient slow drift), and scroll-linked depth shift on capable desktop devices. No background animation moves or jitters foreground text or phone art.
8. All new content appears as editable DOM text; nothing relies on a GIF, screenshot, or baked-in image copy.
9. FAQ questions expand/collapse correctly, support keyboard and screen-reader semantics, don't hide text, and preserve the intended background.
10. Responsive checks at 320, 375, 390, 768, 1024, 1440, and 1920px. No horizontal scroll; no clipped headings; readable cards/long paragraphs; mobile menu works and keeps Sign In / Get Started.
11. Keyboard, focus visibility, reduced-motion preference, color contrast, and touch targets verified.
12. Run the project's existing lint, typecheck, tests, and production build (as available). Fix failures caused by this change; don't use unrelated global rewrites.
13. Review runtime errors, failed asset requests, large layout shifts, and avoid excessive image weight or animation CPU. Load lower-section images appropriately and preserve graceful fallback when animation/JS isn't available.
14. Verify site behavior on mobile Safari/WebKit as feasible, including fixed navbar, viewport height changes, and non-fixed-background fallback.
15. Provide a **concise change log** with changed files, notable implementation decisions, test/build results, and any product-fact ambiguities you could not validate. Include a clear distinction between completed behavior and anything requiring owner confirmation.

## 11. Definition of done

The result should look and feel like a polished continuation of the existing ALBi website. Clicking **How It Works**, **Community**, **About**, or **FAQs** should take the user through a smooth, cohesive cinematic **ocean depth journey**, with lightly animated ocean backgrounds even when idle. The navbar is always present. All four sections have the specified readable copy; FAQs are functional; the page is responsive and accessible; and **all existing application behavior remains intact**. Do not stop at wireframes, an explanation, or a partial UI mockup — implement the result in this repository and verify it.
