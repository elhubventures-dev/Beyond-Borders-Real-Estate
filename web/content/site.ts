export const site = {
  name: "Beyond Borders",
  legalName: "Beyond Borders Ltd",
  description:
    "Smart and luxury homes, estates, and land investments across Abuja — building construction, real estate, and turnkey projects.",
  url: "https://www.beyondborders.ng",
  email: "info@beyondborders.ng",
  phone: "+234 704 207 0950",
  phoneAlt: "+234 907 171 1222",
  whatsapp: "2347042070950",
  address: {
    line1: "Suite A13D Platinum Plaza",
    line2: "opposite Mabushi Ultramodern Market, Jahi, Abuja, NG",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100074835450660",
    instagram: "https://www.instagram.com/beyondbordersng",
  },
  logo: "/media/Main_logo.png",
  logoHighRes: "/media/Main-Logo.png",
  favicon: "/icon.png",
  ogImage: "/og-image.png",
  promo: {
    eyebrow: "PROMO",
    title: "Special Independence Promo",
    body: "Get on board now as we celebrate you with our October Independence Promo. Make an outright payment and get an instant prize. Payment plans also available.",
    ctaLabel: "Schedule an Inspection",
    ctaHref: "/schedule-an-inspection/",
    image: "/media/promo-banner.jpg",
  },
  stats: {
    sqFt: "8 million sq ft",
    estates: "4 estates",
    lands: "About 19 conveniently located lands",
  },
  services: [
    "Architectural Design",
    "General Construction",
    "Building Construction",
    "Interior Design",
    "Flooring & Roofing",
    "INT/EXT Painting",
  ] as const,
  nav: [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/our-company/",
      children: [{ label: "Our Company", href: "/our-company/" }],
    },
    {
      label: "Projects",
      href: "/houses/",
      children: [
        { label: "White City Idu", href: "/houses-white-city-idu/" },
        {
          label: "White Country Gardens Lugbe",
          href: "/white-coutry-gardens-lugbe/",
        },
        { label: "White Courts Dakwo", href: "/houses-white-court-dakwo/" },
        { label: "White City Kuje", href: "/houses-white-city-kuje/" },
        { label: "White City Giri", href: "/houses-white-city-giri/" },
      ],
    },
    { label: "Schedule an Inspection", href: "/schedule-an-inspection/" },
    { label: "Contact Us", href: "/contact-us/" },
  ],
  footerProjects: [
    { label: "Estates", href: "/estates/" },
    { label: "Houses", href: "/houses/" },
    { label: "Lands", href: "/lands/" },
    { label: "Schedule an Inspection", href: "/schedule-an-inspection/" },
  ],
} as const;

export type SiteConfig = typeof site;
