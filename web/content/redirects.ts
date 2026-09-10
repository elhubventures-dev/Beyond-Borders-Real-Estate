/** Permanent redirects from legacy WordPress / theme demo URLs */
export const redirects: { source: string; destination: string; permanent: boolean }[] = [
  // Retired estate URLs → current catalog
  { source: "/houses-white-city-idu", destination: "/houses-white-city-beverly/", permanent: true },
  { source: "/houses-white-city-idu/", destination: "/houses-white-city-beverly/", permanent: true },
  { source: "/lands-white-city-idu", destination: "/lands-white-city-beverly/", permanent: true },
  { source: "/lands-white-city-idu/", destination: "/lands-white-city-beverly/", permanent: true },
  { source: "/white-coutry-gardens-lugbe", destination: "/houses-white-country-parks/", permanent: true },
  { source: "/white-coutry-gardens-lugbe/", destination: "/houses-white-country-parks/", permanent: true },
  { source: "/white-country-gardens-lugbe", destination: "/lands-white-country-parks/", permanent: true },
  { source: "/white-country-gardens-lugbe/", destination: "/lands-white-country-parks/", permanent: true },
  { source: "/houses-white-court-dakwo", destination: "/houses-white-court/", permanent: true },
  { source: "/houses-white-court-dakwo/", destination: "/houses-white-court/", permanent: true },
  { source: "/houses-white-city-kuje", destination: "/houses-white-city-aspen-1/", permanent: true },
  { source: "/houses-white-city-kuje/", destination: "/houses-white-city-aspen-1/", permanent: true },
  { source: "/lands-white-city-kuje", destination: "/lands-white-city-aspen-1/", permanent: true },
  { source: "/lands-white-city-kuje/", destination: "/lands-white-city-aspen-1/", permanent: true },
  { source: "/houses-white-city-giri", destination: "/houses/", permanent: true },
  { source: "/houses-white-city-giri/", destination: "/houses/", permanent: true },
  { source: "/lands-white-city-giri", destination: "/lands/", permanent: true },
  { source: "/lands-white-city-giri/", destination: "/lands/", permanent: true },

  // Typo / alternate land-house links
  {
    source: "/white-country-gardens-lugbe-houses",
    destination: "/houses-white-country-parks/",
    permanent: true,
  },
  // Legacy subpath
  { source: "/bd/schedule-inspection", destination: "/schedule-an-inspection/", permanent: true },
  { source: "/bd/schedule-inspection/", destination: "/schedule-an-inspection/", permanent: true },
  { source: "/bd/:path*", destination: "/", permanent: true },

  // WooCommerce (empty store)
  { source: "/shop", destination: "/houses/", permanent: true },
  { source: "/shop/:path*", destination: "/houses/", permanent: true },
  { source: "/cart", destination: "/", permanent: true },
  { source: "/cart/", destination: "/", permanent: true },
  { source: "/checkout", destination: "/", permanent: true },
  { source: "/checkout/", destination: "/", permanent: true },
  { source: "/my-account", destination: "/", permanent: true },
  { source: "/my-account/:path*", destination: "/", permanent: true },

  // Sample / hello world
  { source: "/sample-page", destination: "/", permanent: true },
  { source: "/sample-page/", destination: "/", permanent: true },
  { source: "/hello-world", destination: "/blog/", permanent: true },
  { source: "/hello-world/", destination: "/blog/", permanent: true },

  // Theme home versions
  { source: "/home-version-1", destination: "/", permanent: true },
  { source: "/home-version-1/", destination: "/", permanent: true },
  { source: "/home-version-3", destination: "/", permanent: true },
  { source: "/home-version-3/", destination: "/", permanent: true },
  { source: "/home-version-4", destination: "/", permanent: true },
  { source: "/home-version-4/", destination: "/", permanent: true },
  { source: "/home-version-5", destination: "/", permanent: true },
  { source: "/home-version-5/", destination: "/", permanent: true },
  { source: "/home-version-6", destination: "/", permanent: true },
  { source: "/home-version-6/", destination: "/", permanent: true },

  // Projects version demos
  { source: "/projects-version-two", destination: "/houses/", permanent: true },
  { source: "/projects-version-two/", destination: "/houses/", permanent: true },
  { source: "/projects-version-three", destination: "/houses/", permanent: true },
  { source: "/projects-version-three/", destination: "/houses/", permanent: true },
  { source: "/projects-version-four", destination: "/houses/", permanent: true },
  { source: "/projects-version-four/", destination: "/houses/", permanent: true },
  { source: "/projects-version-five", destination: "/houses/", permanent: true },
  { source: "/projects-version-five/", destination: "/houses/", permanent: true },
  { source: "/projects-version-six", destination: "/houses/", permanent: true },
  { source: "/projects-version-six/", destination: "/houses/", permanent: true },
  { source: "/projects-version-seven", destination: "/houses/", permanent: true },
  { source: "/projects-version-seven/", destination: "/houses/", permanent: true },
  { source: "/projects-version-eight", destination: "/houses/", permanent: true },
  { source: "/projects-version-eight/", destination: "/houses/", permanent: true },

  // Contact version demos
  { source: "/contact-us-version-2", destination: "/contact-us/", permanent: true },
  { source: "/contact-us-version-2/", destination: "/contact-us/", permanent: true },
  { source: "/contact-us-version-3", destination: "/contact-us/", permanent: true },
  { source: "/contact-us-version-3/", destination: "/contact-us/", permanent: true },
  { source: "/contact-us-version-4", destination: "/contact-us/", permanent: true },
  { source: "/contact-us-version-4/", destination: "/contact-us/", permanent: true },

  // Element / shortcode demos
  { source: "/elements", destination: "/", permanent: true },
  { source: "/elements/:path*", destination: "/", permanent: true },
  { source: "/typography", destination: "/", permanent: true },
  { source: "/typography/", destination: "/", permanent: true },
  { source: "/alert-box", destination: "/", permanent: true },
  { source: "/before-after", destination: "/", permanent: true },
  { source: "/animated-link", destination: "/", permanent: true },
  { source: "/quote-box", destination: "/", permanent: true },
  { source: "/drop-caps", destination: "/", permanent: true },
  { source: "/classic-style", destination: "/houses/", permanent: true },
  { source: "/masonry-style", destination: "/houses/", permanent: true },
  { source: "/list-style", destination: "/houses/", permanent: true },
  { source: "/list-style-no-image", destination: "/houses/", permanent: true },
  { source: "/metro-style", destination: "/houses/", permanent: true },
  { source: "/popup-video", destination: "/", permanent: true },
  { source: "/flip-box", destination: "/", permanent: true },
  { source: "/timeline", destination: "/our-company/", permanent: true },
  { source: "/team-2", destination: "/our-company/", permanent: true },

  // Alternate land hubs
  { source: "/lands-2", destination: "/lands/", permanent: true },
  { source: "/lands-2/", destination: "/lands/", permanent: true },
  { source: "/lands-2-2", destination: "/lands/", permanent: true },
  { source: "/lands-2-2/", destination: "/lands/", permanent: true },

  // CPT archives (theme demo)
  { source: "/portfolio", destination: "/houses/", permanent: true },
  { source: "/portfolio/:path*", destination: "/houses/", permanent: true },
  { source: "/team", destination: "/our-company/", permanent: true },
  { source: "/team/:path*", destination: "/our-company/", permanent: true },
  { source: "/testimonials", destination: "/our-company/", permanent: true },
  { source: "/testimonials/:path*", destination: "/our-company/", permanent: true },
  { source: "/case-studies", destination: "/houses/", permanent: true },
  { source: "/case-studies/:path*", destination: "/houses/", permanent: true },
  { source: "/career", destination: "/contact-us/", permanent: true },
  { source: "/career/", destination: "/contact-us/", permanent: true },
  { source: "/management", destination: "/our-company/", permanent: true },
  { source: "/work-process", destination: "/our-company/", permanent: true },
  { source: "/our-history", destination: "/our-company/", permanent: true },
  { source: "/our-history/", destination: "/our-company/", permanent: true },
  { source: "/company-overview", destination: "/our-company/", permanent: true },
  { source: "/company-overview/", destination: "/our-company/", permanent: true },
  { source: "/our-locations", destination: "/contact-us/", permanent: true },
  { source: "/our-locations/", destination: "/contact-us/", permanent: true },

  // Blog posts live at root WordPress slugs; keep /blog/:slug working
  {
    source: "/blog/5-points-to-consider-when-choosing-a-general-contractor",
    destination: "/5-points-to-consider-when-choosing-a-general-contractor/",
    permanent: true,
  },
  {
    source: "/blog/5-points-to-consider-when-choosing-a-general-contractor/",
    destination: "/5-points-to-consider-when-choosing-a-general-contractor/",
    permanent: true,
  },
  {
    source: "/blog/commercial-construction-trends-of-2018-19",
    destination: "/commercial-construction-trends-of-2018-19/",
    permanent: true,
  },
  {
    source: "/blog/commercial-construction-trends-of-2018-19/",
    destination: "/commercial-construction-trends-of-2018-19/",
    permanent: true,
  },
  {
    source: "/blog/artificial-intelligence-meets-construction",
    destination: "/artificial-intelligence-meets-construction/",
    permanent: true,
  },
  {
    source: "/blog/artificial-intelligence-meets-construction/",
    destination: "/artificial-intelligence-meets-construction/",
    permanent: true,
  },
  {
    source: "/blog/how-to-integrate-bim-into-small-practices",
    destination: "/how-to-integrate-bim-into-small-practices/",
    permanent: true,
  },
  {
    source: "/blog/how-to-integrate-bim-into-small-practices/",
    destination: "/how-to-integrate-bim-into-small-practices/",
    permanent: true,
  },
  {
    source: "/blog/construction-output-slips-again",
    destination: "/construction-output-slips-again/",
    permanent: true,
  },
  {
    source: "/blog/construction-output-slips-again/",
    destination: "/construction-output-slips-again/",
    permanent: true,
  },
  {
    source: "/blog/within-the-construction-industry-as-their-overdraft",
    destination: "/within-the-construction-industry-as-their-overdraft/",
    permanent: true,
  },
  {
    source: "/blog/within-the-construction-industry-as-their-overdraft/",
    destination: "/within-the-construction-industry-as-their-overdraft/",
    permanent: true,
  },
];
