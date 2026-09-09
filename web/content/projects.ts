export type Unit = {
  title: string;
  price: string;
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
};

export const projects: Project[] = [
  {
    id: "idu",
    name: "White City Idu",
    shortName: "Idu",
    cardImage: "/media/projects/Idu.jpg",
    housesSlug: "/houses-white-city-idu/",
    landsSlug: "/lands-white-city-idu/",
    inspectionLabel: "White City (Idu Train Station Abuja)",
    housesIntro: "Click to view our lands",
    landsIntro: "Click to view our houses",
    houses: [
      {
        title: "3 Bedroom Duplex + BQ",
        price: "₦29 million",
        image: "/media/units/4bed-duplex.jpeg",
      },
      {
        title: "4 Bedroom Duplex + 2BQ or Swimming Pool",
        price: "₦34 million",
        image: "/media/units/IMG-20211115-WA0010.jpg",
      },
      {
        title: "2 Bedroom Terrace + BQ",
        price: "₦19 million",
        image: "/media/units/4.jpeg",
      },
      {
        title: "3 Bedroom Terrace + BQ",
        price: "₦24.9 million",
        image: "/media/units/IMG-20211115-WA0006.jpg",
      },
      {
        title: "4 Bedroom Terrace + BQ",
        price: "₦28 million",
        image: "/media/units/1.jpeg",
      },
    ],
    lands: [
      { title: "300 Square meter", price: "₦3 million", image: "/media/lands/h.jpg" },
      { title: "500 Square meter", price: "₦4.5 million", image: "/media/lands/b.jpg" },
    ],
    features: [
      "Opposite Abuja Train Station",
      "10 mins from Wuse 2",
      "CCTV Security Cameras",
      "Smart Homes",
      "Stand By Generator",
      "Constant Water",
      "Tarred Roads",
      "Large windows",
      "Spacious rooms and kitchen",
      "Ample car parking spaces",
      "Exquisite finishing",
      "Serene Environment",
      "Green area & sporting facility",
    ],
  },
  {
    id: "lugbe",
    name: "White Country Gardens Lugbe",
    shortName: "Lugbe",
    cardImage: "/media/projects/ketti.jpg",
    housesSlug: "/white-coutry-gardens-lugbe/",
    landsSlug: "/white-country-gardens-lugbe/",
    inspectionLabel: "White Country Gardens (Ketti Lugbe Abuja)",
    houses: [
      {
        title: "3 Bedroom Duplex + BQ",
        price: "₦26.9 million",
        image: "/media/units/4bed-duplex.jpeg",
      },
      {
        title: "4 Bedroom Duplex + 2BQ or Swimming Pool",
        price: "₦30 million",
        image: "/media/units/IMG-20211115-WA0008.jpg",
      },
      {
        title: "3 Bedroom Terrace + BQ",
        price: "₦21.9 million",
        image: "/media/units/2.jpeg",
      },
      {
        title: "2 Bedroom Terrace + BQ",
        price: "₦17 million",
        image: "/media/units/3.jpeg",
      },
    ],
    lands: [
      {
        title: "300 Square meter",
        price: "₦800 thousand",
        image: "/media/lands/DJI_1750.jpg",
      },
      {
        title: "500 Square meter",
        price: "₦1.2 million",
        image: "/media/lands/DJI_1741.jpg",
      },
    ],
    features: [
      "6 mins to the Nnamdi Azikiwe Expressway",
      "20 mins to the Airport",
      "20 mins to the City Centre",
      "CCTV Security Cameras",
      "Stand By Generator",
      "Constant Water",
      "Tarred Roads",
      "Large windows",
      "Spacious rooms and kitchen",
      "Ample car parking spaces",
      "Exquisite finishing",
      "Serene Environment",
      "Green area & sporting facility",
      "Smart Homes",
    ],
  },
  {
    id: "dakwo",
    name: "White Courts Dakwo",
    shortName: "Dakwo",
    cardImage: "/media/projects/kabusa.jpg",
    housesSlug: "/houses-white-court-dakwo/",
    inspectionLabel: "White Courts (Kabusa Gardens, Dakwo Abuja)",
    houses: [
      {
        title: "3 Bedroom Duplex + BQ (Fully Finished)",
        price: "₦42 million",
        image: "/media/units/8.jpeg",
      },
      {
        title: "3 Bedroom Duplex + BQ (Pre Finished)",
        price: "₦38 million",
        image: "/media/units/DSC_9460.jpg",
      },
    ],
    features: [
      "5 mins from Wuse 2",
      "CCTV Security Cameras",
      "Smart Homes",
      "Stand By Generator",
      "Constant Water",
      "Tarred Roads",
      "Large windows",
      "Spacious rooms and kitchen",
      "Ample car parking spaces",
      "Exquisite finishing",
      "Serene Environment",
      "Green area & sporting facility",
    ],
  },
  {
    id: "kuje",
    name: "White City Kuje",
    shortName: "Kuje",
    cardImage: "/media/projects/Kuje.jpg",
    housesSlug: "/houses-white-city-kuje/",
    landsSlug: "/lands-white-city-kuje/",
    inspectionLabel: "White City (Kuje Abuja)",
    houses: [
      {
        title: "3 Bedroom Duplex + BQ",
        price: "₦26.9 million",
        image: "/media/units/4-bed-duplex.jpeg",
      },
      {
        title: "2 Bedroom Terrace + BQ",
        price: "₦17 million",
        image: "/media/units/3.jpeg",
      },
      {
        title: "3 Bedroom Terrace + BQ",
        price: "₦21.9 million",
        image: "/media/units/IMG-20211115-WA0006.jpg",
      },
      {
        title: "4 Bedroom Duplex + 2BQ",
        price: "₦30 million",
        image: "/media/units/IMG-20211115-WA0010.jpg",
      },
    ],
    lands: [
      {
        title: "300 Square meter",
        price: "₦1 million",
        image: "/media/lands/Kuje-1-1.jpg",
      },
      {
        title: "500 Square meter",
        price: "₦1.5 million",
        image: "/media/lands/Kuje-1.jpg",
      },
    ],
    features: [
      "CCTV Security Cameras",
      "Smart Homes",
      "Stand By Generator",
      "Constant Water",
      "Tarred Roads",
      "Large windows",
      "Spacious rooms and kitchen",
      "Ample car parking spaces",
      "Exquisite finishing",
      "Serene Environment",
    ],
  },
  {
    id: "giri",
    name: "White City Giri",
    shortName: "Giri",
    cardImage: "/media/projects/giri.jpg",
    housesSlug: "/houses-white-city-giri/",
    landsSlug: "/lands-white-city-giri/",
    inspectionLabel: "White City (Giri) Abuja",
    houses: [
      {
        title: "3 Bedroom Duplex + BQ",
        price: "₦26.9 million",
        image: "/media/units/4bed-duplex.jpeg",
      },
      {
        title: "4 Bedroom Duplex + 2BQ or Swimming Pool",
        price: "₦30 million",
        image: "/media/units/IMG-20211115-WA0008.jpg",
      },
      {
        title: "2 Bedroom Terrace + BQ",
        price: "₦17 million",
        image: "/media/units/2.jpeg",
      },
      {
        title: "3 Bedroom Terrace + BQ",
        price: "₦21.9 million",
        image: "/media/units/IMG-20211115-WA0006.jpg",
      },
    ],
    lands: [
      {
        title: "300 Square meter",
        price: "₦500 thousand",
        image: "/media/lands/Gwags-1.jpg",
      },
      {
        title: "500 Square meter",
        price: "₦800 thousand",
        image: "/media/lands/Gwags.jpg",
      },
    ],
    features: [
      "CCTV Security Cameras",
      "Smart Homes",
      "Stand By Generator",
      "Constant Water",
      "Tarred Roads",
      "Large windows",
      "Spacious rooms and kitchen",
      "Ample car parking spaces",
      "Exquisite finishing",
      "Serene Environment",
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

export const estateHubListings = [
  {
    title: "3 Bedroom Duplex + BQ",
    location: "White Court (Sunnyvale)",
    image: "/media/hubs/15.jpeg",
  },
  {
    title: "4 Bedroom Duplex + BQ",
    location: "White Court (Guzape)",
    image: "/media/hubs/14.jpeg",
  },
  {
    title: "2 Bedroom Duplex + BQ",
    location: "White City (IDU)",
    image: "/media/hubs/13.jpeg",
  },
  {
    title: "3 Bedroom Duplex + BQ",
    location: "White Country Gardens (LUGBE)",
    image: "/media/hubs/11.jpeg",
  },
];

export const landHubListings = [
  {
    title: "500 Square Meter",
    location: "White Court (Sunnyvale)",
    image: "/media/hubs/landss.jpg",
  },
  {
    title: "950 Square Meter",
    location: "White Court (Guzape)",
    image: "/media/hubs/DJI_1750.jpg",
  },
  {
    title: "500 Square Meter",
    location: "White City (IDU)",
    image: "/media/hubs/IMG_0241.jpg",
  },
  {
    title: "1500 Square Meter",
    location: "White Court (JAHI)",
    image: "/media/hubs/DSC_8983.jpg",
  },
];
