export const aboutPage = {
  title: "Our Company",
  headline: "Who we are",
  body: [
    "At Beyond Borders, we take you further in the area of building construction, real estate, roads, bridges and turnkey projects. From smart homes to solar cities, we are your trusted name with home-grown engineers taking on world-class buildings and engineering infrastructure to change the African construction landscape.",
    "Our portfolio spans 8 million+ sq ft across master-planned communities in Abuja and Port Harcourt — from Idu, Kuje, Katampe, Ketti, Lifecamp, Guzape, and Jahi in the FCT to Igurita, Isiokpo, and Omagwa in Rivers. Completed delivery includes twenty 4-bedroom terraces at Dakwa, with ongoing estates and land banking across both cities.",
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

export const aboutGallery = [
  {
    src: "/media/brand/dream-home-delivered.jpeg",
    alt: "Your dream home delivered across Abuja corridors",
  },
  {
    src: "/media/brand/buy-sell-invest.jpeg",
    alt: "Buy, sell, and invest with Beyond Borders",
  },
  {
    src: "/media/brand/construction-crew.jpeg",
    alt: "Beyond Borders construction team on site",
  },
  {
    src: "/media/brand/site-machinery.jpeg",
    alt: "Estate construction machinery and delivery",
  },
  {
    src: "/media/brand/landlord-amenities.jpeg",
    alt: "Estate lifestyle and landlord amenities",
  },
] as const;

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
        a: "We develop across Abuja and Port Harcourt. In Abuja: Idu (White City Beverly, Savanah, Dallas; Royal City Beverly, Dallas & Phase 1), Kuje (Aspen), Katampe (KingsCity Davos), Ketti, Lifecamp, Guzape, Jahi, The White Court, and hectare land banking. In Port Harcourt: Igurita, Isiokpo, and Omagwa.",
      },
      {
        q: "Do you sell both houses and land?",
        a: "Yes. Most estates offer finished smart homes and Buy & Build packages (typically 250–750 SQM). We also sell hectare land banking (10,000 SQM / 1 hectare from ₦79M) plus investment plots in Port Harcourt.",
      },
      {
        q: "What extra fees apply when I buy?",
        a: "Application, documentation, and development levy amounts vary by estate — see each project page for the published schedule (and download the application form where available).",
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
        a: "Use the Schedule an Inspection form, choose your preferred project and date/time, or call / WhatsApp +234 907 171 1222 (Abuja) or +234 902 849 7393 (Port Harcourt).",
      },
      {
        q: "Where is your office?",
        a: "Primary: Suite A13D Platinum Plaza, opposite Mabushi Ultramodern Market, Jahi, Abuja. Also: Plot 84, Victor B.K Crescent, off Graba Idris Street, After Lakeview Homes, Behind Customs Quarters, Kado, Abuja.",
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
