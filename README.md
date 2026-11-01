# ALBi landing page

A responsive React/Vite implementation of the supplied ALBi landing-page
mockups. The page uses real navigation, hero, category, call-to-action, and
process containers; the supplied raster references are not rendered as the
page itself.

The layout has three responsive compositions:

- Desktop uses a two-column hero, a six-column category row, and a horizontal
  process strip.
- Compact screens stack the hero and expose the category cards as a horizontal
  scroll-snap row.
- Narrow phones reorder the hero content, stack the primary actions, show the
  categories as a two-column grid, and turn the process strip into a vertical
  timeline.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

The mobile menu is interactive. Other controls currently point to page anchors
and are ready to be connected to application routes or handlers.
