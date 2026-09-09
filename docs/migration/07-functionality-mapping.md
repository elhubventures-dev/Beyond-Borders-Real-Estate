# Functionality Mapping

| WP Feature | Next.js |
|------------|---------|
| RevSlider hero | `Hero` carousel |
| Promo band | `PromoBanner` |
| Project gallery | `ProjectGrid` |
| Unit pricing shortcodes | `UnitPricing` + `content/projects.ts` |
| Feature lists | `FeatureList` |
| Consultation form | `ContactForm` → `submitContactForm` |
| Inspection form | `InspectionForm` → `submitInspectionForm` |
| Contact details | `content/site.ts` + Footer |
| Yoast meta | `content/seo.ts` + Metadata API |
| Menus | `site.nav` in Header |
| Blog | `content/blog.ts` + `/blog` + `/[slug]` |
| Services | `content/pages.ts` + `/our-projects/*` |
| FAQs | Real BB FAQs (theme Lorem removed) |
| Shop | Redirects only |
