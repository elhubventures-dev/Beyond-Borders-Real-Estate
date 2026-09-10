# Design System Report — Beyond Borders

## Brand signals
- Logo: `Main_logo.png` (horizontal lockup for header/footer), `Main-Logo.png` (stacked), `logo-mark.png` (emblem), `logo-light.png` (light-surface stacked)
- Source assets: `Updates/These are our current branding colors/`
- Tagline: “Achieving more…”
- Photography: aerial estate shots, duplex exteriors, land plots
- Atmosphere: Abuja daylight, landscape greens — soft green-tinted surfaces, not flat solid fills

## Typography (Next.js)
Avoid Inter/Roboto/Arial. Pairing:
- **Display:** Fraunces (expressive serif for brand/hero)
- **Body / UI:** Manrope (geometric sans for nav, prices, forms)

## Color tokens
Official brand primary from lockups: **`#0A4C04`**.

```css
--bb-forest: #0a4c04;      /* primary brand green */
--bb-bronze: #0a4c04;      /* accent alias (legacy token name) */
--bb-bronze-light: #3f8a38; /* accents on dark surfaces */
--bb-bronze-dark: #073803;  /* accents on light surfaces */
--bb-accent: #0a4c04;
--bb-accent-deep: #073803;
--bb-black: #000000;
--bb-obsidian: #0b0f17;    /* dark chrome / footer */
--bb-ink: #111827;
--bb-muted: #64748b;
--bb-cream: #f5f8f5;       /* light surface with green cast */
--bb-stone: #eef3ee;
--bb-sand: #e4ebe4;
--bb-white: #ffffff;
```

CTA class `.btn-gold` uses the green gradient (name retained for compatibility).

## Layout
- Full-bleed hero only (edge-to-edge photography)
- Brand name / logo is hero-level on home
- First viewport: brand + one headline + one supporting line + CTA group + dominant image
- No cards in hero; cards only for interactive project selection
- One job per section

## Motion
1. Hero text fade/slide on load  
2. Project grid stagger on scroll  
3. Form success state transition  

## Components
Header, Footer, Hero, PromoBanner, ProjectGrid, UnitPricing, FeatureList, CTABand, ContactForm, InspectionForm
