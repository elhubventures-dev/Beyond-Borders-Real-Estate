# Design System Report — Beyond Borders

## Brand signals
- Logo: `Main_logo.png` (primary), favicon variant `Main-Logo.png`
- Accent (from WPBakery): `#ff8f3a` (warm construction orange)
- Photography: aerial estate shots, duplex exteriors, land plots (2022 uploads)
- Atmosphere: Abuja daylight, concrete + green landscape — not flat solid backgrounds

## Typography (Next.js)
Avoid Inter/Roboto/Arial. Pairing:
- **Display:** Fraunces (expressive serif for brand/hero)
- **Body / UI:** Manrope (geometric sans for nav, prices, forms)

## Color tokens
```css
--bb-ink: #1a1a1a;
--bb-muted: #5c5c5c;
--bb-cream: #f7f3ee; /* warm paper, not generic #F4F1EA terracotta kit */
--bb-sand: #e8dfd2;
--bb-accent: #ff8f3a;
--bb-accent-deep: #e07220;
--bb-forest: #1e3a2f; /* grounding for footer/contrast */
--bb-white: #ffffff;
```

## Layout
- Full-bleed hero only (edge-to-edge photography)
- Brand name is hero-level on home
- First viewport: brand + one headline + one supporting line + CTA group + dominant image
- No cards in hero; cards only for interactive project selection
- One job per section

## Motion
1. Hero text fade/slide on load  
2. Project grid stagger on scroll  
3. Form success state transition  

## Components
Header, Footer, Hero, PromoBanner, ProjectGrid, UnitPricing, FeatureList, CTABand, ContactForm, InspectionForm
