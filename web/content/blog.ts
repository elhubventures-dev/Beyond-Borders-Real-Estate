export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image?: string;
  body: string[];
  /** WP bodies were theme Lorem Ipsum; copy below is rewritten for readable UX while preserving title/URL. */
  sourceNote?: string;
};

/**
 * All published WP posts except hello-world.
 * Original post HTML was WPBakery + Lorem Ipsum (theme demo) — titles, dates, and slugs match SQL.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "5-points-to-consider-when-choosing-a-general-contractor",
    title: "5 Points to Consider When Choosing a General Contractor",
    date: "2018-04-01",
    category: "Business",
    image: "/media/blog/Blog-Image-004.png",
    excerpt:
      "Practical checks before you appoint a contractor for a residential or estate build.",
    sourceNote: "WP body was Lorem Ipsum / theme demo; rewritten.",
    body: [
      "Choosing the right general contractor shapes cost, quality and timeline. Start with verified experience on similar residential or estate projects in your market.",
      "Ask for recent references, clarify who manages subcontractors on site, and confirm how variations and payments are documented.",
      "Visit an active site if possible, review insurance and statutory compliance, and agree a communication rhythm before mobilisation.",
    ],
  },
  {
    slug: "commercial-construction-trends-of-2018-19",
    title: "Commercial Construction Trends of 2018-19",
    date: "2018-03-29",
    category: "Design",
    image: "/media/blog/Blog-Image-003.png",
    excerpt: "Notes on efficiency, materials and delivery models that still influence projects today.",
    sourceNote: "WP body was Lorem Ipsum / theme demo; rewritten.",
    body: [
      "Construction teams continue to lean on modular thinking, clearer prefabrication where it fits, and tighter collaboration between design and site.",
      "For developers, the lasting lesson is sequencing: lock critical path items early and keep client decision windows realistic.",
    ],
  },
  {
    slug: "artificial-intelligence-meets-construction",
    title: "Artificial Intelligence Meets Construction",
    date: "2018-03-21",
    category: "Startups",
    image: "/media/blog/Blog-Image-005.png",
    excerpt: "How digital tools assist planning, safety awareness and progress tracking on site.",
    sourceNote: "WP body was Lorem Ipsum / theme demo; rewritten.",
    body: [
      "AI-assisted scheduling and document review can reduce rework when paired with disciplined site reporting.",
      "Adopt tools that your supervisors will actually use daily — simplicity beats novelty on a live build.",
    ],
  },
  {
    slug: "how-to-integrate-bim-into-small-practices",
    title: "How to Integrate BIM Into Small Practices",
    date: "2018-02-09",
    category: "Construction",
    image: "/media/blog/Blog-Image-006.png",
    excerpt: "A pragmatic path for smaller teams adopting building information modelling.",
    sourceNote: "WP body was Lorem Ipsum / theme demo; rewritten.",
    body: [
      "Start with one pilot project, standardise naming and levels of detail, and train a champion before scaling licences.",
      "BIM pays off when clash detection and quantities feed procurement — not when models sit unused after design.",
    ],
  },
  {
    slug: "construction-output-slips-again",
    title: "Construction Output Slips Again",
    date: "2018-01-06",
    category: "Interiors",
    image: "/media/blog/Blog-Image-001.png",
    excerpt: "Market cycles remind developers to stress-test programmes and cashflow.",
    sourceNote: "WP body was Lorem Ipsum / theme demo; rewritten.",
    body: [
      "When output softens, resilient developers protect quality and client trust rather than racing unfinished inventory.",
      "Clear payment plans and transparent site progress remain the best antidote to buyer uncertainty.",
    ],
  },
  {
    slug: "within-the-construction-industry-as-their-overdraft",
    title: "Within the construction industry as their overdraft",
    date: "2017-12-23",
    category: "Construction",
    image: "/media/blog/Blog-Image-002.png",
    excerpt:
      "Cashflow pressure is common on builds — plan contingency before the overdraft becomes the project plan.",
    sourceNote: "Previously omitted; slug/title/date restored from SQL. WP body was Lorem Ipsum; rewritten.",
    body: [
      "Many construction programmes lean on short-term credit when payments lag behind materials and labour. That works only with clear milestone billing and disciplined variation control.",
      "Before you rely on an overdraft, map cash in versus cash out by week, agree client payment triggers in writing, and keep a contingency for delayed approvals.",
      "Beyond Borders buyers and partners benefit when financing conversations stay transparent from reservation through handover.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
