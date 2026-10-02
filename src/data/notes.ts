export interface ProcessNote {
  id: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  excerpt: string;
  content: string[];
}

export const PROCESS_NOTES: ProcessNote[] = [
  {
    id: 'accounting-not-bookkeeping',
    title: 'Why Accounting is More Than Bookkeeping: Learning the Grammar of Business',
    category: 'Accounting & Business',
    date: 'March 2026',
    readingTime: '3 min read',
    excerpt:
      'Bookkeeping records the transaction. Accounting asks what the transaction implies about solvency, capital allocation, and operational survival.',
    content: [
      'When I began my ADP in Accounting & Finance, my initial impression—like many students—was that accounting was a repetitive routine of matching numbers and ensuring balances equal zero.',
      'The turning point came when our lectures shifted toward financial statement analysis. I realized that a balance sheet is not a spreadsheet; it is an x-ray of an enterprise’s strategic decisions.',
      'When you see high accounts receivable alongside declining cash, you are not just looking at two numbers on a page. You are seeing a business that is making sales but failing at cash collection—a vulnerability that can quietly drive an ostensibly profitable firm into insolvency.',
      'Accounting gives me the structural grammar of business. When I write code or query databases later, that accounting grammar ensures that my queries serve actual business questions rather than mathematical vanity.'
    ]
  },
  {
    id: 'python-variables-breakthrough',
    title: 'What I Understood After Learning Python Variables & Tabular Logic',
    category: 'Python & Technology',
    date: 'March 2026',
    readingTime: '4 min read',
    excerpt:
      'In a spreadsheet, data and presentation live in the same cell. In code, data is an abstract structure that can be filtered, transformed, and validated without touching a visual grid.',
    content: [
      'Coming from Excel, learning Python required an unlearning process. In Excel, when you look at cell C4, you see both the number and the cell itself. Presentation and computation are physically intertwined.',
      'In Python, data lives purely in memory as variables, lists, and dictionaries. At first, not being able to "see" the grid felt disorienting. But then the realization clicked:',
      'Because the data is decoupled from the user interface, you can write validation rules that execute before bad data ever enters your model. You can write a loop that checks 5,000 ledger rows for debit-credit equilibrium in three milliseconds.',
      'That conceptual shift—from visual manipulation to algorithmic manipulation—is the bridge between basic office productivity and real data engineering.'
    ]
  },
  {
    id: 'analytics-before-dashboard',
    title: 'Data Analytics Starts Before the Dashboard: The Primacy of Clean Logic',
    category: 'Data Analytics',
    date: 'February 2026',
    readingTime: '3 min read',
    excerpt:
      'A sleek Power BI dashboard built on unverified data is worse than a plain sheet—it conveys an illusion of certainty that misleads executive decisions.',
    content: [
      'In online tutorials, data analytics is often depicted as creating colorful charts, gauge widgets, and dark-themed dashboards. It looks exciting, but it places the emphasis on the final 5% of the work.',
      'In practice, 95% of the real analytical challenge is data cleanliness, schema integrity, and definition consistency. What is the precise definition of "active customer"? Are returns deducted at the transaction date or the refund date? How do we handle partial currency conversions?',
      'If those foundational definitions are flawed, the most gorgeous visualization in the world is simply delivering erroneous information with high graphic fidelity.',
      'As a student aiming for analytics, my priority is developing respect for data hygiene and relational constraints long before worrying about visual flourishes.'
    ]
  },
  {
    id: 'finovah-product-lessons',
    title: 'What Building FINOVAH Taught Me About Scope, Formulas, and User Empathy',
    category: 'Projects & Product',
    date: 'February 2026',
    readingTime: '4 min read',
    excerpt:
      'Attempting to build a financial tool for fellow students forced me to strip away academic jargon and confront edge cases in financial mathematics.',
    content: [
      'When I conceived FINOVAH, my ambition was expansive: I wanted to build budgeting, investing, loan payoff calculators, and educational guides all in one go.',
      'Reality quickly humbled that ambition. Even a "simple" compound growth calculator requires careful mathematical treatment: periodic compounding frequencies, regular monthly deposits versus initial principal, and handling annual percentage yields.',
      'More importantly, testing the concept with non-finance friends revealed how quickly financial terminology alienates users. Phrases like "amortization schedule" or "opportunity cost" cause people to disengage.',
      'FINOVAH taught me that product design is not about displaying how much domain jargon you know. It is about doing the heavy mathematical translation quietly behind the scenes so the user receives clear, actionable clarity.'
    ]
  }
];
