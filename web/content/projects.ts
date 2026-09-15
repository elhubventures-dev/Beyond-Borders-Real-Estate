import {
  abuiaPlotFaqs,
  estateFees,
  type ProjectFaq,
  type ProjectFees,
} from "./formExtras";

export type Unit = {
  title: string;
  price: string;
  wasPrice?: string;
  image?: string;
};

export type Project = {
  id: string;
  name: string;
  shortName: string;
  cardImage: string;
  housesSlug: string;
  landsSlug?: string;
  inspectionLabel: string;
  houses: Unit[];
  lands?: Unit[];
  features: string[];
  housesIntro?: string;
  landsIntro?: string;
  locationBadge: string;
  distanceBadge: string;
  startingHouse: string;
  startingLand?: string;
  houseTypes: string;
  landSizes?: string;
  region: "abuja" | "port-harcourt";
  promo?: string;
  applicationPdf?: string;
  brochurePdf?: string;
  fees?: ProjectFees;
  faqs?: ProjectFaq[];
  progressGallery?: { src: string; alt: string }[];
  videos?: { src: string; label: string }[];
};

const ABUJA_ESTATE_FEATURES = [
  "Electric Charging Stations",
  "Buy & Build",
  "Instant Allocation",
  "Full House Automation",
  "Superior Estate Amenities",
  "High ROI",
  "FCDA Approved Layout",
];

const PH_LAND_FEATURES = [
  "Deed of Assignment",
  "Instant Allocation",
  "Receipt of Payment",
  "Secure Investment",
  "High Return on Investment",
];

const packageUnit = (
  sqm: number,
  title: string,
  was: string,
  now: string,
  image: string
): Unit => ({
  title: `${sqm} SQM — ${title}`,
  wasPrice: was,
  price: now,
  image,
});

export const projects: Project[] = [
  {
    id: "beverly",
    name: "White City Beverly",
    shortName: "Beverly",
    cardImage: "/media/projects/beverly-progress/gatehouse.jpg",
    housesSlug: "/houses-white-city-beverly/",
    landsSlug: "/lands-white-city-beverly/",
    inspectionLabel: "White City Beverly (Idu Abuja, Opposite Railway)",
    locationBadge: "Idu Abuja",
    distanceBadge: "Opposite Idu Railway",
    startingHouse: "₦59 Million",
    startingLand: "₦20 Million",
    houseTypes: "2–5 Bed Smart Homes + BQ",
    landSizes: "250–750 SQM Buy & Build",
    region: "abuja",
    promo: "Active campaign — 50% Independence Day Promo · site works ongoing opposite Idu Railway",
    housesIntro: "Brochure models with Independence Day promo pricing",
    landsIntro:
      "Buy & Build packages at White City Beverly. Hectare land banking (Idu Railway and other corridors) is listed once under Hectare O'Clock — Golden Abuja Land.",
    brochurePdf: "/media/brochures/white-city-beverly-brochure.pdf",
    progressGallery: [
      {
        src: "/media/projects/beverly-progress/gatehouse.jpg",
        alt: "White City Beverly estate gatehouse under construction opposite Idu Railway",
      },
      {
        src: "/media/projects/beverly-progress/duplex-aerial.jpg",
        alt: "Aerial view of a near-complete duplex at White City Beverly Idu",
      },
      {
        src: "/media/projects/beverly-progress/terrace-finishing.jpg",
        alt: "Terrace block exterior finishing in progress at White City Beverly",
      },
      {
        src: "/media/projects/beverly-progress/terrace-row.jpg",
        alt: "Row of terrace units under construction at White City Beverly",
      },
      {
        src: "/media/projects/beverly-progress/site-overview.jpg",
        alt: "Wide overview of White City Beverly construction opposite Idu Railway",
      },
      {
        src: "/media/projects/beverly-progress/shells-aerial.jpg",
        alt: "Aerial view of housing shells rising across White City Beverly",
      },
      {
        src: "/media/projects/beverly-progress/foundation-works.jpg",
        alt: "Foundation and civil works underway at White City Beverly",
      },
      {
        src: "/media/projects/beverly-progress/unit-scaffolding.jpg",
        alt: "Scaffolded residential unit with site utilities at White City Beverly",
      },
    ],
    videos: [
      {
        src: "/media/video/white-city-cgi-tour.mp4",
        label: "White City Vision — Gate & Mall",
      },
      {
        src: "/media/video/beverly-4bed-duplex-build.mp4",
        label: "4 Bed Duplex + BQ Build",
      },
      {
        src: "/media/video/beverly-4bed-idu-construction.mp4",
        label: "White City Idu Construction",
      },
      {
        src: "/media/video/beverly-site-blockwork.mp4",
        label: "Site Blockwork Progress",
      },
      {
        src: "/media/video/white-city-interior-tour.mp4",
        label: "Interior Living Area",
      },
    ],
    houses: [
      {
        title: "High Flyer — 2 Bed + BQ Apartment",
        wasPrice: "₦118 million",
        price: "₦59 million",
        image: "/media/projects/beverly-2bed-apartment.jpg",
      },
      {
        title: "Pearl 2 — 3 Bed Terrace Duplex + BQ",
        wasPrice: "₦178 million",
        price: "₦89 million",
        image: "/media/projects/beverly-3bed-terrace.jpg",
      },
      {
        title: "Emerald — 3 Bed Semi Detached Duplex",
        wasPrice: "₦189 million",
        price: "₦99 million",
        image: "/media/projects/beverly-3bed-semi.jpg",
      },
      {
        title: "Silver — 3 Bed Duplex + BQ",
        wasPrice: "₦219 million",
        price: "₦109 million",
        image: "/media/projects/beverly-3bed-duplex.jpg",
      },
      {
        title: "Gold — 4 Bed Duplex + 2BQ Spaces",
        wasPrice: "₦228 million",
        price: "₦114 million",
        image: "/media/projects/beverly-4bed-duplex.jpg",
      },
      {
        title: "Diamond — 5 Bed Duplex + BQ",
        wasPrice: "₦258 million",
        price: "₦129 million",
        image: "/media/projects/beverly-5bed-duplex.jpg",
      },
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦40 million", "₦20 million", "/media/projects/white-city-beverly.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦60 million", "₦30 million", "/media/projects/white-city-beverly.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦80 million", "₦40 million", "/media/projects/white-city-beverly.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦120 million", "₦60 million", "/media/projects/white-city-beverly.jpg"),
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Directly opposite Idu Railway Station · Lugbe 1 Layout",
      "~15 mins to Nnamdi Azikiwe International Airport",
      "Smart Home Automation",
      "24-hour power supply",
      "Central gas & safe water systems",
      "White City Mall · cinema · gym · spa",
      "4-star resort amenities",
      "Sporting facilities · children's playground",
      "Gated compound · armed security · CCTV",
      "Tarred roads with drainage · fibre internet",
      "Modern healthcare facility",
      "Ongoing development — houses and Buy & Build plots available",
    ],
  },
  {
    id: "savanah",
    name: "White City Savanah",
    shortName: "Savanah",
    cardImage: "/media/projects/white-city-savanah.jpg",
    housesSlug: "/houses-white-city-savanah/",
    landsSlug: "/lands-white-city-savanah/",
    inspectionLabel: "White City Savanah (Idu Abuja, After Train Station)",
    locationBadge: "Idu Abuja",
    distanceBadge: "After Idu Train Station",
    startingHouse: "₦6 Million",
    startingLand: "₦6 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦12 million", "₦6 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦15 million", "₦7.5 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦24 million", "₦12 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦36 million", "₦18 million", "/media/projects/white-city-savanah.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦12 million", "₦6 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦15 million", "₦7.5 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦24 million", "₦12 million", "/media/projects/white-city-savanah.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦36 million", "₦18 million", "/media/projects/white-city-savanah.jpg"),
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Located at Idu, after the Idu Train Station",
    ],
    applicationPdf: "/media/forms/white-city-savanah-application.pdf",
    fees: estateFees("₦20,000", "₦200,000 / plot", "₦1,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "White City Savanah is located at Idu, after the Idu Train Station.",
      levy: "₦1,500,000",
      documentation: "₦200,000",
      title: "C of O and R of O",
    }),
  },
  {
    id: "dallas",
    name: "White City Dallas",
    shortName: "Dallas",
    cardImage: "/media/projects/white-city-dallas.jpg",
    housesSlug: "/houses-white-city-dallas/",
    landsSlug: "/lands-white-city-dallas/",
    inspectionLabel: "White City Dallas (Idu Abuja, Before Nigerian Army Estate)",
    locationBadge: "Idu Abuja",
    distanceBadge: "Before Nigerian Army Estate",
    startingHouse: "₦5 Million",
    startingLand: "₦5 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦10 million", "₦5 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦13 million", "₦6.5 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦20 million", "₦10 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦30 million", "₦15 million", "/media/projects/white-city-dallas.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦10 million", "₦5 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦13 million", "₦6.5 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦20 million", "₦10 million", "/media/projects/white-city-dallas.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦30 million", "₦15 million", "/media/projects/white-city-dallas.jpg"),
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Before Nigerian Army Estate",
      "After Idu Train Station and Police Service Commission",
    ],
    applicationPdf: "/media/forms/white-city-dallas-application.pdf",
    fees: estateFees("₦20,000", "₦200,000 / plot", "₦1,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "White City Dallas is located at Idu, after the Idu Train Station and Police Service Commission, before the Nigerian Army Estate.",
      levy: "₦1,500,000",
      documentation: "₦200,000",
      title: "C of O and R of O",
    }),
  },
  {
    id: "royal-beverly",
    name: "Royal City Beverly",
    shortName: "Royal Beverly",
    cardImage: "/media/projects/royal-city-beverly.jpg",
    housesSlug: "/houses-royal-city-beverly/",
    landsSlug: "/lands-royal-city-beverly/",
    inspectionLabel: "Royal City Beverly (Idu Abuja, Before Train Station)",
    locationBadge: "Idu Abuja",
    distanceBadge: "Before Idu Train Station",
    startingHouse: "₦15 Million",
    startingLand: "₦15 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦30 million", "₦15 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦40 million", "₦20 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦60 million", "₦30 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦90 million", "₦45 million", "/media/projects/royal-city-beverly.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦30 million", "₦15 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦40 million", "₦20 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦60 million", "₦30 million", "/media/projects/royal-city-beverly.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦90 million", "₦45 million", "/media/projects/royal-city-beverly.jpg"),
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Located at Idu, just before the Idu Train Station",
    ],
    applicationPdf: "/media/forms/royal-city-beverly-application.pdf",
    fees: estateFees("₦20,000", "₦200,000 / plot", "₦3,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "Royal City Beverly is located at Idu, just before the Idu Train Station.",
      levy: "₦3,500,000",
      documentation: "₦200,000",
      title: "C of O and R of O",
    }),
  },
  {
    id: "royal-phase-1",
    name: "Royal City Phase 1",
    shortName: "Royal Phase 1",
    cardImage: "/media/projects/royal-city-dallas.jpg",
    housesSlug: "/houses-royal-city-phase-1/",
    landsSlug: "/lands-royal-city-phase-1/",
    inspectionLabel: "Royal City Phase 1 (Idu Abuja, Before Train Station)",
    locationBadge: "Idu Abuja",
    distanceBadge: "Before Idu Train Station",
    startingHouse: "Contact for packages",
    startingLand: "Contact for packages",
    houseTypes: "Legacy Idu phase — houses & plots",
    landSizes: "Plots available on inquiry",
    region: "abuja",
    promo: "Legacy Idu phase — schedule an inspection for current availability",
    houses: [
      {
        title: "Housing units — current availability",
        price: "Contact for pricing",
        image: "/media/projects/royal-city-dallas.jpg",
      },
    ],
    lands: [
      {
        title: "Demarcated plots — current availability",
        price: "Contact for pricing",
        image: "/media/projects/royal-city-dallas.jpg",
      },
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Located at Idu, just before the Idu Train Station",
      "Legacy Royal City phase (separate from Royal Beverly & Royal Dallas)",
    ],
    applicationPdf: "/media/forms/royal-city-phase-1-application.pdf",
    fees: estateFees("₦20,000", "₦200,000 / plot", "₦3,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "Royal City Phase 1 is located at Idu, just before the Idu Train Station.",
      levy: "₦3,500,000",
      documentation: "₦200,000",
      title: "C of O and R of O",
    }),
  },
  {
    id: "royal-dallas",
    name: "Royal City Dallas",
    shortName: "Royal Dallas",
    cardImage: "/media/projects/royal-city-dallas.jpg",
    housesSlug: "/houses-royal-city-dallas/",
    landsSlug: "/lands-royal-city-dallas/",
    inspectionLabel: "Royal City Dallas (Idu Abuja)",
    locationBadge: "Idu Abuja",
    distanceBadge: "Idu Growth Corridor",
    startingHouse: "₦7.5 Million",
    startingLand: "₦7.5 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦15 million", "₦7.5 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦18 million", "₦9 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦28 million", "₦14 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦45 million", "₦22.5 million", "/media/projects/royal-city-dallas.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦15 million", "₦7.5 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦18 million", "₦9 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦28 million", "₦14 million", "/media/projects/royal-city-dallas.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦45 million", "₦22.5 million", "/media/projects/royal-city-dallas.jpg"),
    ],
    features: ABUJA_ESTATE_FEATURES,
  },
  {
    id: "aspen-1",
    name: "White City Aspen 1",
    shortName: "Aspen 1",
    cardImage: "/media/projects/white-city-aspen-1.jpg",
    housesSlug: "/houses-white-city-aspen-1/",
    landsSlug: "/lands-white-city-aspen-1/",
    inspectionLabel: "White City Aspen 1 (Kuje Abuja)",
    locationBadge: "Kuje Abuja",
    distanceBadge: "FCDA Approved",
    startingHouse: "₦4 Million",
    startingLand: "₦4 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦10 million", "₦4 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦10 million", "₦5 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦11 million", "₦8 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦14 million", "₦12 million", "/media/projects/white-city-aspen-1.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦10 million", "₦4 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦10 million", "₦5 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦11 million", "₦8 million", "/media/projects/white-city-aspen-1.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦14 million", "₦12 million", "/media/projects/white-city-aspen-1.jpg"),
    ],
    features: ABUJA_ESTATE_FEATURES,
  },
  {
    id: "aspen-2",
    name: "White City Aspen 2",
    shortName: "Aspen 2",
    cardImage: "/media/projects/white-city-aspen-2.jpg",
    housesSlug: "/houses-white-city-aspen-2/",
    landsSlug: "/lands-white-city-aspen-2/",
    inspectionLabel: "White City Aspen 2 (Kuje Abuja, Near Kuchiako LEA)",
    locationBadge: "Kuje Abuja",
    distanceBadge: "Near Kuchiako LEA",
    startingHouse: "₦3 Million",
    startingLand: "₦3 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦6 million", "₦3 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦9 million", "₦4.5 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦12 million", "₦6 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦18 million", "₦9 million", "/media/projects/white-city-aspen-2.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦6 million", "₦3 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦9 million", "₦4.5 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦12 million", "₦6 million", "/media/projects/white-city-aspen-2.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦18 million", "₦9 million", "/media/projects/white-city-aspen-2.jpg"),
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Near Kuchiako LEA Primary School",
      "Before 1,000 Housing Estate, Kuje Abuja",
    ],
    applicationPdf: "/media/forms/white-city-aspen-2-application.pdf",
    fees: estateFees("₦10,000", "₦200,000 / plot", "₦2,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "White City Aspen 2 is located near Kuchiako LEA Primary School, before 1,000 Housing Estate, Kuje Abuja.",
      levy: "₦2,500,000",
      documentation: "₦200,000",
      title: "FCDA R of O",
      documents: "Sales Invoice, Receipt, Deed of Assignment, and Power of Attorney.",
      allocationExtra:
        "After complete payment for the land and documentation fees you receive allocation. Construction on the land begins after payment of development fees.",
    }),
    videos: [
      {
        src: "/media/video/white-city-aspen-2-promo.mp4",
        label: "White City Aspen 2 Promo",
      },
    ],
  },
  {
    id: "ketti",
    name: "White Country Parks & Gardens",
    shortName: "Ketti",
    cardImage: "/media/projects/white-country-parks.jpg",
    housesSlug: "/houses-white-country-parks/",
    landsSlug: "/lands-white-country-parks/",
    inspectionLabel: "White Country Parks & Gardens (Ketti 1&2 Abuja)",
    locationBadge: "Ketti 1&2",
    distanceBadge: "Lugbe / Airport Corridor",
    startingHouse: "₦2.5 Million",
    startingLand: "₦2.5 Million",
    houseTypes: "3–6 Bed Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special Promo Pricing",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦3 million", "₦2.5 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦4 million", "₦3 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦6 million", "₦5 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦8 million", "₦7.5 million", "/media/projects/white-country-parks.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦3 million", "₦2.5 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦4 million", "₦3 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦6 million", "₦5 million", "/media/projects/white-country-parks.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦8 million", "₦7.5 million", "/media/projects/white-country-parks.jpg"),
    ],
    features: ABUJA_ESTATE_FEATURES,
  },
  {
    id: "davos",
    name: "KingsCity Davos 1&2",
    shortName: "Davos",
    cardImage: "/media/projects/kingscity-davos.jpg",
    housesSlug: "/houses-kingscity-davos/",
    landsSlug: "/lands-kingscity-davos/",
    inspectionLabel: "KingsCity Davos 1&2 (Katampe Extension Abuja)",
    locationBadge: "Katampe Extension",
    distanceBadge: "Hilltop Living",
    startingHouse: "₦25 Million",
    startingLand: "₦25 Million",
    houseTypes: "3–6 Bed Smart Duplex Packages",
    landSizes: "250–750 SQM",
    region: "abuja",
    promo: "Special 50% Promo",
    houses: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦50 million", "₦25 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦64 million", "₦32 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦100 million", "₦50 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦150 million", "₦75 million", "/media/projects/kingscity-davos.jpg"),
    ],
    lands: [
      packageUnit(250, "3 Bed Semi Detached with BQ", "₦50 million", "₦25 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(300, "4 Bed Smart Duplex with BQ", "₦64 million", "₦32 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(500, "6 Bed Smart Duplex with BQ", "₦100 million", "₦50 million", "/media/projects/kingscity-davos.jpg"),
      packageUnit(750, "3 Bed Terrace Duplex with BQ", "₦150 million", "₦75 million", "/media/projects/kingscity-davos.jpg"),
    ],
    features: [...ABUJA_ESTATE_FEATURES, "Hilltop Living at Its Peak", "Katampe Hilltop Abuja"],
    applicationPdf: "/media/forms/kingscity-davos-application.pdf",
    fees: estateFees("₦20,000", "₦200,000 / plot", "₦4,500,000 / plot"),
    faqs: abuiaPlotFaqs({
      where: "KingsCity Davos is located at Katampe Hilltop / Katampe Extension, Abuja.",
      levy: "₦4,500,000",
      documentation: "₦200,000",
      title: "C of O and R of O",
    }),
  },
  {
    id: "white-court",
    name: "The White Court",
    shortName: "White Court",
    cardImage: "/media/projects/white-court-flyer.jpg",
    housesSlug: "/houses-white-court/",
    inspectionLabel: "The White Court (Jahi Abuja)",
    locationBadge: "Jahi Abuja",
    distanceBadge: "Prime Living, Prime Location",
    startingHouse: "₦250 Million",
    houseTypes: "5 Bed Premium Smart Duplex + BQ",
    region: "abuja",
    promo: "Active 50% Promo — was ₦500M · now ₦250M · installment available",
    housesIntro: "Premium finished smart duplex — FCDA approved",
    houses: [
      {
        title: "5 Bedroom Premium Finished Smart Duplex + BQ",
        wasPrice: "₦500 million",
        price: "₦250 million",
        image: "/media/projects/white-court-flyer.jpg",
      },
    ],
    features: [
      "Cinema",
      "Double Living Room",
      "Swimming Pool",
      "Spacious Masters",
      "Serene & Secure Environment",
      "24/7 Security",
      "Well-planned Road Network",
      "Modern Infrastructure & Amenities",
      "Approved by FCDA",
      "Jahi Abuja — prime living, prime location",
    ],
  },
  {
    id: "lifecamp",
    name: "Beyond Borders Lifecamp",
    shortName: "Lifecamp",
    cardImage: "/media/projects/dream-home-corridors.jpg",
    housesSlug: "/houses-beyond-borders-lifecamp/",
    landsSlug: "/lands-beyond-borders-lifecamp/",
    inspectionLabel: "Beyond Borders Lifecamp (Abuja)",
    locationBadge: "Lifecamp Abuja",
    distanceBadge: "Dream Home Corridor",
    startingHouse: "Contact for packages",
    startingLand: "Contact for packages",
    houseTypes: "Smart homes & Buy & Build",
    landSizes: "Plots on inquiry",
    region: "abuja",
    promo: "Full estate offering — schedule an inspection for current packages",
    houses: [
      {
        title: "Residential packages — Lifecamp",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    lands: [
      {
        title: "Land parcels — Lifecamp",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    features: [...ABUJA_ESTATE_FEATURES, "Lifecamp Abuja growth corridor"],
  },
  {
    id: "guzape",
    name: "Beyond Borders Guzape",
    shortName: "Guzape",
    cardImage: "/media/projects/dream-home-corridors.jpg",
    housesSlug: "/houses-beyond-borders-guzape/",
    landsSlug: "/lands-beyond-borders-guzape/",
    inspectionLabel: "Beyond Borders Guzape (Abuja)",
    locationBadge: "Guzape Abuja",
    distanceBadge: "Dream Home Corridor",
    startingHouse: "Contact for packages",
    startingLand: "Contact for packages",
    houseTypes: "Smart homes & Buy & Build",
    landSizes: "Plots on inquiry",
    region: "abuja",
    promo: "Full estate offering — schedule an inspection for current packages",
    houses: [
      {
        title: "Residential packages — Guzape",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    lands: [
      {
        title: "Land parcels — Guzape",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    features: [...ABUJA_ESTATE_FEATURES, "Guzape Abuja premium corridor"],
  },
  {
    id: "jahi",
    name: "Beyond Borders Jahi",
    shortName: "Jahi",
    cardImage: "/media/projects/dream-home-corridors.jpg",
    housesSlug: "/houses-beyond-borders-jahi/",
    landsSlug: "/lands-beyond-borders-jahi/",
    inspectionLabel: "Beyond Borders Jahi (Abuja)",
    locationBadge: "Jahi Abuja",
    distanceBadge: "Near Mabushi Office Corridor",
    startingHouse: "Contact for packages",
    startingLand: "Contact for packages",
    houseTypes: "Smart homes & Buy & Build",
    landSizes: "Plots on inquiry",
    region: "abuja",
    promo: "Full estate offering — schedule an inspection for current packages",
    houses: [
      {
        title: "Residential packages — Jahi",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    lands: [
      {
        title: "Land parcels — Jahi",
        price: "Contact for pricing",
        image: "/media/projects/dream-home-corridors.jpg",
      },
    ],
    features: [
      ...ABUJA_ESTATE_FEATURES,
      "Jahi Abuja — near Mabushi Ultramodern Market office corridor",
    ],
  },
  {
    id: "manhattan",
    name: "Kings City Manhattan Parks",
    shortName: "Manhattan",
    cardImage: "/media/projects/kingscity-manhattan.jpg",
    housesSlug: "/lands-kingscity-manhattan/",
    landsSlug: "/lands-kingscity-manhattan/",
    inspectionLabel: "Kings City Manhattan Parks (Igurita, Port Harcourt)",
    locationBadge: "Igurita, Port Harcourt",
    distanceBadge: "Invest & Earn",
    startingHouse: "₦7.9 Million",
    startingLand: "₦7.9 Million",
    houseTypes: "Land Investment Plots",
    landSizes: "250–750 SQM",
    region: "port-harcourt",
    promo: "Up to 50% off",
    houses: [],
    lands: [
      { title: "250 SQM Plot", wasPrice: "₦16 million", price: "₦7.9 million", image: "/media/projects/kingscity-manhattan.jpg" },
      { title: "300 SQM Plot", wasPrice: "₦20 million", price: "₦9.9 million", image: "/media/projects/kingscity-manhattan.jpg" },
      { title: "500 SQM Plot", wasPrice: "₦32 million", price: "₦15.9 million", image: "/media/projects/kingscity-manhattan.jpg" },
      { title: "750 SQM Plot", wasPrice: "₦48 million", price: "₦23.9 million", image: "/media/projects/kingscity-manhattan.jpg" },
    ],
    features: PH_LAND_FEATURES,
  },
  {
    id: "parks-ph",
    name: "KingsCity Parks & Gardens",
    shortName: "Parks PH",
    cardImage: "/media/projects/kingscity-parks-gardens.jpg",
    housesSlug: "/lands-kingscity-parks-gardens/",
    landsSlug: "/lands-kingscity-parks-gardens/",
    inspectionLabel: "KingsCity Parks & Gardens (Isiokpo, Port Harcourt)",
    locationBadge: "Isiokpo, Port Harcourt",
    distanceBadge: "Near Wigwe University",
    startingHouse: "₦1.6 Million",
    startingLand: "₦1.6 Million",
    houseTypes: "Land Investment Plots",
    landSizes: "250–450 SQM",
    region: "port-harcourt",
    promo: "Up to 50% off",
    houses: [],
    lands: [
      { title: "250 SQM Plot", wasPrice: "₦3.2 million", price: "₦1.6 million", image: "/media/projects/kingscity-parks-gardens.jpg" },
      { title: "300 SQM Plot", wasPrice: "₦4 million", price: "₦2 million", image: "/media/projects/kingscity-parks-gardens.jpg" },
      { title: "450 SQM Plot", wasPrice: "₦7.4 million", price: "₦3.2 million", image: "/media/projects/kingscity-parks-gardens.jpg" },
    ],
    features: [
      ...PH_LAND_FEATURES,
      "Near Wigwe University",
      "Near General Hospital",
      "Near Police Area Command",
      "Near Corps Members' Lodge",
      "Near Nigeria Customs Area Command",
      "Near INEC Office",
    ],
  },
  {
    id: "los-angeles",
    name: "Kingscity Los Angeles",
    shortName: "Los Angeles",
    cardImage: "/media/projects/kingscity-los-angeles.jpg",
    housesSlug: "/lands-kingscity-los-angeles/",
    landsSlug: "/lands-kingscity-los-angeles/",
    inspectionLabel: "Kingscity Los Angeles (Omagwa, Port Harcourt)",
    locationBadge: "Omagwa, Port Harcourt",
    distanceBadge: "Near PH Airport",
    startingHouse: "₦3 Million",
    startingLand: "₦3 Million",
    houseTypes: "Land Investment Plots",
    landSizes: "250–450 SQM",
    region: "port-harcourt",
    promo: "Up to 50% off",
    houses: [],
    lands: [
      { title: "250 SQM Plot", wasPrice: "₦6 million", price: "₦3 million", image: "/media/projects/kingscity-los-angeles.jpg" },
      { title: "300 SQM Plot", wasPrice: "₦8 million", price: "₦4 million", image: "/media/projects/kingscity-los-angeles.jpg" },
      { title: "450 SQM Plot", wasPrice: "₦11 million", price: "₦5.5 million", image: "/media/projects/kingscity-los-angeles.jpg" },
    ],
    features: [
      ...PH_LAND_FEATURES,
      "Near PH International & Domestic Airport",
      "Near Omagwa Main Market",
      "Behind SEPCO Oil Company",
      "Near Police College Housing Project",
    ],
  },
  {
    id: "hectare-abuja",
    name: "Hectare O'Clock — Golden Abuja Land",
    shortName: "Hectare O'Clock",
    cardImage: "/media/projects/hectare-oclock-flyer.jpg",
    housesSlug: "/lands-hectare-abuja/",
    landsSlug: "/lands-hectare-abuja/",
    inspectionLabel: "Hectare O'Clock — Idu Railway, Katampe Extension, Kuje, Ketti",
    locationBadge: "Abuja Corridors",
    distanceBadge: "10,000 SQM · From ₦79M",
    startingHouse: "₦79 Million",
    startingLand: "₦79 Million",
    houseTypes: "Estate Development Land",
    landSizes: "1 Hectare (10,000 SQM)",
    region: "abuja",
    promo: "Hectare O'Clock — start your own estate development from ₦79M",
    landsIntro: "10,000 SQM of Golden Abuja Land — start your own estate development with ease",
    brochurePdf: "/media/brochures/beverly-and-hectare-flyer.pdf",
    houses: [],
    lands: [
      {
        title: "1 Hectare (10,000 SQM) — Idu Railway",
        price: "From ₦79 million",
        image: "/media/projects/hectare-oclock-flyer.jpg",
      },
      {
        title: "1 Hectare (10,000 SQM) — Katampe Extension",
        price: "From ₦79 million",
        image: "/media/projects/hectare-oclock-flyer.jpg",
      },
      {
        title: "1 Hectare (10,000 SQM) — Kuje",
        price: "From ₦79 million",
        image: "/media/projects/hectare-oclock-flyer.jpg",
      },
      {
        title: "1 Hectare (10,000 SQM) — Ketti",
        price: "From ₦79 million",
        image: "/media/projects/hectare-oclock-flyer.jpg",
      },
    ],
    features: [
      "Prime Location",
      "Verified Documents In Your Name",
      "Easy Payment Plan",
      "Unbeatable ROI up to 500%",
      "FCDA Approved Designs",
      "Secured Land Banking",
      "Start Your Own Estate Development with Ease",
      "Available: Idu Railway · Katampe Extension · Kuje · Ketti",
    ],
  },
  {
    id: "halaand",
    name: "Halaand Estate",
    shortName: "Halaand",
    cardImage: "/media/projects/halaand-estate-flyer.jpg",
    housesSlug: "/houses-halaand-estate/",
    landsSlug: "/lands-halaand-estate/",
    inspectionLabel: "Halaand Estate (Katampe Abuja)",
    locationBadge: "Katampe Abuja",
    distanceBadge: "Hectares Investment · High ROI",
    startingHouse: "₦69 Million",
    startingLand: "₦14.9 Million",
    houseTypes: "Housing units from ₦69M",
    landSizes: "Serviced plots from ₦14.9M · Hectares from ₦449M",
    region: "abuja",
    promo: "Hectares on promo — from ₦449M (was ₦900M)",
    housesIntro: "Housing units available at Halaand Estate, Katampe",
    landsIntro:
      "Serviced plots and hectare land banking — build wealth, establish legacy, own your estate brand",
    houses: [
      {
        title: "Housing Units — Halaand Estate",
        price: "From ₦69 million",
        image: "/media/projects/halaand-estate-flyer.jpg",
      },
    ],
    lands: [
      {
        title: "Serviced Plots",
        price: "From ₦14.9 million",
        image: "/media/projects/halaand-estate-flyer.jpg",
      },
      {
        title: "1 Hectare — Halaand Estate (Katampe)",
        wasPrice: "₦900 million",
        price: "From ₦449 million",
        image: "/media/projects/halaand-estate-flyer.jpg",
      },
    ],
    features: [
      "EV Charging Stations",
      "Golf Course",
      "Movie Production Studios",
      "Water Shows",
      "Corporate Towers",
      "Sporting & Entertainment Centers",
      "Katampe Abuja",
      "Unbeatable Opportunity · High ROI",
      "Build Wealth · Establish Legacy · Own Your Estate Brand",
    ],
  },
  {
    id: "beyond-towers",
    name: "Beyond Towers",
    shortName: "Beyond Towers",
    cardImage: "/media/projects/beyond-towers-flyer.jpg",
    housesSlug: "/houses-beyond-towers/",
    landsSlug: "/lands-beyond-towers/",
    inspectionLabel: "Beyond Towers — Twin Tower Mixed-Use",
    locationBadge: "Abuja",
    distanceBadge: "Premium Mixed-Use",
    startingHouse: "Contact for packages",
    startingLand: "Contact for commercial",
    houseTypes: "Residential apartments",
    landSizes: "Retail & commercial spaces",
    region: "abuja",
    promo: "Exclusive twin tower mixed-use — a smarter way to live",
    housesIntro: "Residential apartments in an exclusive twin-tower mixed-use project",
    landsIntro: "Retail and commercial spaces within Beyond Towers",
    houses: [
      {
        title: "Residential Apartments",
        price: "Contact for pricing",
        image: "/media/projects/beyond-towers-flyer.jpg",
      },
    ],
    lands: [
      {
        title: "Retail & Commercial Spaces",
        price: "Contact for pricing",
        image: "/media/projects/beyond-towers-flyer.jpg",
      },
    ],
    features: [
      "Residential Apartments",
      "Retail & Commercial Spaces",
      "Premium Security",
      "Modern Living Environment",
      "Exclusive twin tower mixed-use project",
      "Premium real estate · a smarter way to live",
    ],
  },
];

export function getProjectByHousesSlug(slug: string) {
  const normalized = slug.startsWith("/") ? slug : `/${slug}/`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return projects.find((p) => p.housesSlug === withSlash);
}

export function getProjectByLandsSlug(slug: string) {
  const normalized = slug.startsWith("/") ? slug : `/${slug}/`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return projects.find((p) => p.landsSlug === withSlash);
}

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export const estateHubListings = [
  {
    title: "Beyond Towers — Residential Apartments",
    location: "Twin Tower Mixed-Use",
    image: "/media/projects/beyond-towers-flyer.jpg",
  },
  {
    title: "2 Bed + BQ Apartment",
    location: "White City Beverly (Idu)",
    image: "/media/projects/beverly-2bed-apartment.jpg",
  },
  {
    title: "5 Bed Premium Smart Duplex + BQ",
    location: "The White Court (Jahi)",
    image: "/media/projects/white-court-flyer.jpg",
  },
  {
    title: "3 Bed Semi Detached Package",
    location: "White City Aspen 2 (Kuje)",
    image: "/media/projects/white-city-aspen-2.jpg",
  },
];

export const landHubListings = [
  {
    title: "1 Hectare (10,000 SQM) from ₦79M",
    location: "Idu · Katampe · Kuje · Ketti — Hectare O'Clock",
    image: "/media/projects/hectare-oclock-flyer.jpg",
  },
  {
    title: "Halaand Estate — plots from ₦14.9M · hectares from ₦449M",
    location: "Katampe Abuja",
    image: "/media/projects/halaand-estate-flyer.jpg",
  },
  {
    title: "250–750 SQM Buy & Build",
    location: "White City Beverly (Idu)",
    image: "/media/projects/white-city-beverly.jpg",
  },
  {
    title: "250–450 SQM Land",
    location: "KingsCity Parks & Gardens (Isiokpo)",
    image: "/media/projects/kingscity-parks-gardens.jpg",
  },
  {
    title: "250–750 SQM Land",
    location: "Kings City Manhattan (Igurita)",
    image: "/media/projects/kingscity-manhattan.jpg",
  },
];
