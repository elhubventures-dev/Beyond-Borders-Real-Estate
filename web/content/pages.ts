export const aboutPage = {
  title: "Our Company",
  headline: "Who we are",
  body: [
    "At Beyond Borders, we take you further in the area of building construction, real estate, roads, bridges and turnkey projects. From smart homes to solar cities, we are your trusted name with home-grown engineers taking on world-class buildings and engineering infrastructure to change the African construction landscape.",
    "Our portfolio spans 8 million sq ft and comprises 4 estates with about 19 conveniently located lands. We hand-pick our assets to deliberately focus on providing top quality affordable housing solutions at excellent locations and we avoid structurally challenged sub-sector buildings and plazas.",
    "This focus, combined with our affordable housing and desirable locations, delivers sustainable and growing returns for our growing clients, while we also provide further opportunities to provide value from our portfolio of properties and lands.",
  ],
  pillars: [
    {
      title: "Planning & Strategy",
      body: "Our different portfolio options give us the flexibility to respond to a changing competitive landscape and deliver long-term value to our clients.",
    },
    {
      title: "Client Satisfaction",
      body: "The satisfaction of our clients is our topmost priority. Whether it is a luxury home, family home or investment opportunity, we offer a service that comes with peace of mind.",
    },
  ],
};

export const services = [
  {
    slug: "architectural-design",
    title: "Architectural Design",
    summary:
      "Thoughtful residential and estate architecture shaped around Abuja living — from smart duplexes to terrace homes.",
    body: "Our design team works with you to plan layouts, elevations and finishes that balance lifestyle, climate and budget. We translate Beyond Borders estate standards into homes that feel tailored from the first sketch.",
  },
  {
    slug: "general-construction",
    title: "General Construction",
    summary:
      "End-to-end building delivery with home-grown engineers and clear site discipline.",
    body: "From foundation to handover, we manage construction programmes across our estates and client projects — focusing on structural integrity, timelines and transparent communication.",
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    summary: "Warm, liveable interiors matched to your unit type and finishing package.",
    body: "Specify kitchens, bathrooms, joinery and material palettes that complement our estate architecture — whether you choose pre-finished or fully finished packages.",
  },
  {
    slug: "flooring-roofing",
    title: "Flooring & Roofing",
    summary: "Durable roofing systems and flooring selections built for Abuja weather.",
    body: "We specify and install roofing and flooring that stand up to heat, rain and everyday family use — aligned with each estate’s construction standard.",
  },
  {
    slug: "int-ext-painting",
    title: "INT/EXT Painting",
    summary: "Interior and exterior painting with estate-grade finishes.",
    body: "Protect and elevate your home with carefully prepared surfaces and lasting coatings — inside and out.",
  },
] as const;

export const faqs = [
  {
    category: "Buying with Beyond Borders",
    items: [
      {
        q: "What locations do you develop in?",
        a: "Our active projects include White City Idu, White Country Gardens Lugbe, White Courts Dakwo, White City Kuje and White City Giri — all in and around Abuja.",
      },
      {
        q: "Do you sell both houses and land?",
        a: "Yes. Most estates offer completed or finishing house packages as well as plot sizes (typically 300 and 500 square metres where listed).",
      },
      {
        q: "Are payment plans available?",
        a: "Yes. Outright payment promotions and payment plans are available depending on the project and offer period. Contact us or schedule an inspection to confirm current terms.",
      },
    ],
  },
  {
    category: "Inspections & contact",
    items: [
      {
        q: "How do I schedule a site inspection?",
        a: "Use the Schedule an Inspection form, choose your preferred project and date/time, or call / WhatsApp +234 704 207 0950.",
      },
      {
        q: "Where is your office?",
        a: "Suite A13D Platinum Plaza, opposite Mabushi Ultramodern Market, Jahi, Abuja, NG.",
      },
      {
        q: "Which email should I use?",
        a: "info@beyondborders.ng — we also monitor form submissions from this website.",
      },
    ],
  },
];

export const homeHero = {
  slides: [
    {
      title: "Smart And Luxury Home",
      subtitle: "Designed For Your Lifestyle",
      image: "/media/hero/banner-1.jpg",
      ctaLabel: "Schedule an Inspection",
      ctaHref: "/schedule-an-inspection/",
    },
    {
      title: "Building Tailormade Homes",
      subtitle: "With You In Mind",
      image: "/media/hero/banner-2.jpg",
      ctaLabel: "Schedule an Inspection",
      ctaHref: "/schedule-an-inspection/",
    },
  ],
};
