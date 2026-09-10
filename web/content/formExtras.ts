export type ProjectFees = {
  applicationForm: string;
  documentation: string;
  developmentLevy: string;
  notes?: string[];
};

export type ProjectFaq = { q: string; a: string };

export const FEE_NOTES_STANDARD = [
  "Corner piece plots attract a 10% surcharge",
  "Late installment payments may incur 5% monthly charges and possible unit relocation",
];

export function estateFees(
  applicationForm: string,
  documentation: string,
  developmentLevy: string,
  notes: string[] = FEE_NOTES_STANDARD
): ProjectFees {
  return { applicationForm, documentation, developmentLevy, notes };
}

export function abuiaPlotFaqs(opts: {
  where: string;
  levy: string;
  documentation: string;
  title: string;
  documents?: string;
  allocationExtra?: string;
}): ProjectFaq[] {
  return [
    { q: "Where is this estate?", a: opts.where },
    { q: "Who is the developer?", a: "Beyond Borders Real Estate Ltd." },
    {
      q: "What infrastructure will the developer provide?",
      a: "Perimeter fencing, earth road and gate house, drainage, and electricity.",
    },
    {
      q: "Is there a development levy?",
      a: `Yes — ${opts.levy} per plot.`,
    },
    {
      q: "Is there a documentation fee?",
      a: `Yes — ${opts.documentation} per plot.`,
    },
    {
      q: "When will my plot be allocated?",
      a:
        opts.allocationExtra ??
        "After 100% payment of all fees.",
    },
    {
      q: "What do I get after completing payment?",
      a:
        opts.documents ??
        "Offer Letter, Sales Receipt, Contract of Sale, Deed of Assignment, Power of Attorney, and Allocation Letter.",
    },
    { q: "What title does the land have?", a: opts.title },
    {
      q: "Can I pay a deposit and complete later?",
      a: "After the initial deposit, balances are expected monthly or quarterly. Non-payment when due is a fundamental breach and may attract 5% monthly late charges and possible relocation of the unit.",
    },
    {
      q: "Is there an extra cost for a corner piece?",
      a: "Yes — corner piece plots attract a 10% surcharge.",
    },
    {
      q: "Can I re-sell my plot or property?",
      a: "Yes. Provide written notice of ownership transfer to Beyond Borders Real Estate Ltd. A transfer fee applies.",
    },
  ];
}
