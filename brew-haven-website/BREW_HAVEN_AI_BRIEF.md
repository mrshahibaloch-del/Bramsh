# Brew Haven — AI Website Build Brief

Use this document as the source of truth whenever creating, extending, or redesigning the **Brew Haven** website. The goal is a premium coffee-roastery website that feels calm, tactile, intentional, and complete—not like a generic café template.

## 1. Project identity

**Brand:** Brew Haven  
**Category:** Premium urban coffee shop and small-batch roastery  
**Positioning:** A quiet, welcoming pause in the city for exceptionally crafted coffee, seasonal food, and unhurried connection.  
**Voice:** Warm, precise, calm, editorial, quietly confident. Avoid hype, slang, or overly whimsical language.

### Core idea

> A slower start. A brighter day.

The website should make people feel that Brew Haven respects their time. Coffee is presented as a ritual, not a transaction.

## 2. Non-negotiable visual direction

Do not replace the visual identity with a bright, playful, rustic, or overly minimal café design. Preserve these principles:

- Use a dark charcoal / warm cream / copper palette.
- Pair an editorial serif headline typeface with a clean modern sans-serif for body and UI text.
- Keep generous whitespace and confident, large typography.
- Use soft rounded corners (about 14–24px) and low-opacity, diffuse shadows.
- Use coffee imagery that is dark, warm, natural, refined, and editorial.
- Keep the experience minimal, luxury-oriented, and approachable.
- Prefer photographic textures, subtle light, gentle gradients, and restrained motion over loud visual effects.

### Design tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--black` | `#010101` | Hero, testimonials, deep contrast |
| `--charcoal` | `#1c1c1c` | Dark surfaces and footer |
| `--cream` | `#fcf9f5` | Primary page background |
| `--paper` | `#f6f3ef` | Soft alternate surface |
| `--sand` | `#eae8e4` | Elevated neutral cards/sections |
| `--line` | `#d9d5cf` | Quiet borders |
| `--muted` | `#686864` | Secondary content |
| `--copper` | `#be7326` | Primary accent and calls to action |
| `--copper-light` | `#ffb779` | Accent on dark surfaces |

### Typography

- **Headlines:** `Playfair Display`, Georgia, serif. Use a slightly tight letter spacing (`-0.035em` range) and high visual contrast.
- **Body / UI:** `DM Sans`, Arial, sans-serif. Keep labels small, bold, uppercase, and generously tracked.
- Use italic serif text selectively to highlight a phrase or create a refined emphasis.
- Do not use more than these two type families unless the user explicitly requests a change.

## 3. Required page structure

Keep this content sequence. Add sections only when they clearly support the same experience.

1. **Sticky navigation**
   - Brew Haven mark and wordmark
   - Links: Menu, Our Craft, Our Story, Visit Us
   - A visible reservation call to action
   - A mobile hamburger menu

2. **Hero**
   - Dark, atmospheric full-height introduction
   - Eyebrow: `Est. 2024 · Urban Roastery`
   - Heading: `A slower start. A brighter day.`
   - Short, quiet brand introduction
   - Primary menu button and secondary booking button
   - Small scroll cue at the bottom

3. **Curated Collections**
   - Asymmetrical feature grid
   - Large Ethiopian Yirgacheffe G1 card
   - Smaller Cloud Roast and Midnight Blend cards
   - Rich image hover treatment and restrained motion

4. **Why / Our Craft**
   - Dark section explaining the Brew Haven standard
   - Three principles: considered sourcing, roasted with intention, made for your moment
   - Use numbered rows and concise supporting copy

5. **Our Story**
   - Portrait-style barista image with offset colored shape
   - Heading about the ritual of the perfect pull
   - Brand story plus three statistics: `100% single origin`, `24hr roast to cup`, `12 farmer partners`

6. **Best Sellers**
   - Four products: Velvet Flat White, Cold Brew Nitro, Artisan Espresso, Ceremonial Matcha
   - Product image, short descriptor, and price
   - Responsive card grid with image zoom on hover

7. **Testimonials**
   - Dark visual section
   - One large testimonial visible at a time
   - Previous/next buttons and slide count
   - Gentle automatic rotation is acceptable, but must respect reduced-motion preferences

8. **Gallery**
   - Editorial image grid that feels casual but intentionally composed
   - Link to the social identity: `@brewhaven.coffee`
   - Include the supporting line: `Come as you are. Stay for a while.`

9. **Reservation**
   - Dark booking card paired with an atmospheric shop image
   - Date, time, and email fields
   - Clear accessible validation and success feedback

10. **Newsletter**
    - Dark callout encouraging guests to receive roastery notes
    - One email field with validation and a concise success message

11. **Footer**
    - Brand identity, social links, explore links, visiting details, legal line
    - Address: `18 Orchard Lane, San Francisco, CA`
    - Hours: `Daily · 7am — 6pm`

## 4. Required functional behavior

Use vanilla HTML, CSS, and JavaScript only unless the user clearly authorizes another stack.

- Sticky header that gains a blurred dark background after scroll begins.
- Responsive navigation: desktop links and a keyboard-accessible mobile menu.
- Smooth in-page navigation.
- Active navigation state based on the section in view.
- Scroll progress bar at the top of the viewport.
- Back-to-top button after the visitor has scrolled down the page.
- Intersection-observer reveal effects for sections and cards.
- Product / gallery image hover zooms and subtle card lift behavior.
- Functional testimonial slider with clear accessible labels.
- Reservation and newsletter validation with inline feedback.
- Honor `prefers-reduced-motion` by removing nonessential animation.
- Do not introduce console errors, broken anchors, horizontal scrolling, or inaccessible keyboard traps.

## 5. Responsive rules

The site must work cleanly at 360px, 480px, 768px, 1024px, 1440px, and 1920px+.

- Build mobile-first.
- Maintain at least 20px side gutters on small mobile.
- Convert the desktop navigation into a hamburger menu below desktop width.
- Collapse grids naturally: 1 column on small screens, 2 columns at medium sizes where appropriate, and fuller editorial layouts on desktop.
- Avoid tiny touch targets: controls should generally be at least 40px in one dimension.
- Never rely on hover alone to expose essential content.
- Never allow unintentional horizontal scrolling.

## 6. Accessibility and quality bar

- Use semantic elements: `header`, `nav`, `main`, `section`, `article`, `figure`, `footer`, and real form labels.
- Preserve a logical heading hierarchy.
- Provide meaningful alt text for every content image.
- Provide visible keyboard focus indicators.
- Use `aria-label`, `aria-expanded`, `aria-controls`, and live regions where interaction requires them.
- Keep text contrast readable on dark imagery and surfaces.
- Lazy load below-the-fold images and provide width/height attributes to reduce layout shift.
- Keep dependencies to zero. The project should be easy to open as a static website.

## 7. Engineering constraints

- **Allowed:** HTML5, CSS3, vanilla JavaScript, inline SVG icons, external font loading.
- **Do not use:** React, Vue, Angular, Bootstrap, Tailwind, jQuery, or UI frameworks.
- Keep styles modular:
  - `css/style.css` — visual system and primary component styles
  - `css/responsive.css` — breakpoints and adaptive layouts
  - `css/animations.css` — keyframes, reveal states, motion preferences
  - `js/main.js` — lightweight behavior only
- Do not duplicate CSS rules or write one-off styles when an existing component pattern can be reused.
- Keep the design refined. When uncertain, remove visual noise rather than adding more decoration.

## 8. Content-writing rules

- Use grounded, sensory language: roast, ritual, quiet, warmth, craft, origin, pause, slow, considered.
- Prefer short paragraphs and compact sentences.
- Avoid salesy clichés such as `best coffee ever`, `unforgettable journey`, `coffee perfection`, or excessive exclamation marks.
- Product descriptions should name an origin, texture, or tasting note.
- Buttons should use calm action labels: `Explore our menu`, `Book a table`, `Secure my seat`, `Discover our philosophy`.

## 9. Existing implementation map

The current working website is contained in:

```text
index.html
css/
  style.css
  responsive.css
  animations.css
js/
  main.js
images/
assets/icons/
```

When editing this project, preserve the existing section IDs and navigation targets whenever possible:

```text
#menu
#craft
#story
#best-sellers
#visit
#reserve
#newsletter
```

## 10. Instruction to the implementing AI

Before making a change, read the existing HTML, CSS, and JavaScript. Keep the Brew Haven design language intact. Make the smallest set of changes that delivers the request cleanly, test interactive behaviors, and do not silently replace the visual identity with a generic template.
