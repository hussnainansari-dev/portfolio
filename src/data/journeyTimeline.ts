export interface JourneyStep {
  number: string;
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  keyShift: string;
  artifacts: string[];
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    stage: 'FOUNDATION',
    title: 'Accounting & Finance',
    subtitle: 'Understanding businesses through financial information',
    description:
      'Gained deep familiarity with the foundational rules of financial reporting: debits and credits, journal vouchers, general ledgers, trial balances, and financial statements. Discovered that accounting is not mechanical bookkeeping, but the fundamental vocabulary of commercial enterprise.',
    keyShift: 'From seeing numbers as cold arithmetic to recognizing them as business narratives.',
    artifacts: ['ADP Accounting & Finance Coursework', 'Financial Statement Analysis', 'Ledger Integrity Drills']
  },
  {
    number: '02',
    stage: 'EXPANSION',
    title: 'Business Thinking',
    subtitle: 'Connecting financial metrics to operational realities',
    description:
      'Explored how financial health governs every strategic decision a company can afford to make. Studied how cash flow constraints, unit economics, cost structures, and working capital cycles dictate business viability in dynamic markets.',
    keyShift: 'From reporting past transactions to evaluating future operational feasibility.',
    artifacts: ['Case Study Syntheses', 'Working Capital Models', 'Commercial Operations Notes']
  },
  {
    number: '03',
    stage: 'DISCOVERY',
    title: 'Data Analytics',
    subtitle: 'Expanding from spreadsheets into scalable analytical frameworks',
    description:
      'Realized that traditional spreadsheets reach limits when data grows complex or fragmented. Began dedicated study of relational databases, SQL queries, Excel advanced analytical tools, and business intelligence concepts.',
    keyShift: 'From static tables to relational databases and structured query patterns.',
    artifacts: ['SQL Query Scripts', 'Excel Scenario Frameworks', 'Relational Schemas']
  },
  {
    number: '04',
    stage: 'EXPERIMENTATION',
    title: 'Python / Technology',
    subtitle: 'Programming fundamentals applied toward analytical rigor',
    description:
      'Immersed in Python programming fundamentals: data types, control flow, functions, dictionaries, and programmatic problem-solving. Bridged the gap between manual calculation and algorithmic data processing.',
    keyShift: 'From manual record-keeping to writing automated scripts that validate and process data.',
    artifacts: ['Python Scripts', 'Transaction Validator', 'Algorithmic Problem Notebooks']
  },
  {
    number: '05',
    stage: 'BUILDING',
    title: 'Projects',
    subtitle: 'Turning conceptual knowledge into functional prototypes',
    description:
      'Began turning theory into code through hands-on project builds. Architected FINOVAH to explore interactive personal finance tools and educational modules, ensuring that every calculation engine is grounded in sound accounting mathematics.',
    keyShift: 'From absorbing lectures to designing and building tangible digital systems.',
    artifacts: ['FINOVAH Platform Concept', 'Financial Ratio Engine', 'Interactive Calculators']
  },
  {
    number: '06',
    stage: 'DOCUMENTING',
    title: 'Learning in Public',
    subtitle: 'Sharing the unfiltered process of development and discovery',
    description:
      'Committed to public documentation across Instagram, LinkedIn, and GitHub. Publishing honest field notes, code snippets, architectural challenges, and conceptual breakthroughs. Holding myself accountable to continuous growth.',
    keyShift: 'From learning in isolation to building an authentic, verifiable archive of work.',
    artifacts: ['Instagram Learning Logs', 'GitHub Commit History', 'Reflective Field Notes']
  }
];
