import { SITE_CONFIG } from './social';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  filterTag: 'all' | 'accounting' | 'data' | 'python';
  status: 'ACTIVE BUILD / ACADEMIC PROJECT' | 'PROTOTYPE' | 'LEARNING PROJECT';
  why: string;
  problem: string;
  approach: string;
  tools: string[];
  output: string;
  learned: string;
  caseStudyAvailable: boolean;
  links: {
    github?: string;
    demo?: string;
  };
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  meta: {
    number: string;
    category: string;
    stage: string;
    duration: string;
    focus: string;
  };
  sections: {
    id: string;
    number: string;
    title: string;
    content: string[];
    highlight?: string;
  }[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'finovah',
    number: 'PROJECT / 001',
    title: 'FINOVAH',
    category: 'Accounting × Finance × Education × Product Thinking',
    filterTag: 'accounting',
    status: 'ACTIVE BUILD / ACADEMIC PROJECT',
    why: 'Most personal finance and accounting education tools are either overly abstract textbooks or complex corporate software with zero educational empathy for beginners.',
    problem:
      'Students and young individuals struggle to connect basic accounting concepts (assets, liabilities, compounding interest, budget allocations) to real-world personal financial decisions.',
    approach:
      'Designing a clean, interactive digital platform concept combining clear financial calculators (compound growth, 50/30/20 budgeting, net worth tracking) with contextual educational insights.',
    tools: ['Financial Formulas', 'TypeScript', 'React', 'Tailwind CSS', 'Figma'],
    output:
      'An active academic prototype featuring working financial engines, interactive interest rate simulations, and modular budget planning tools.',
    learned:
      'Building product tools requires mastering the underlying mathematical formulas before writing a single line of interface code.',
    caseStudyAvailable: true,
    links: {
      github: SITE_CONFIG.github
    }
  },
  {
    id: 'ratio-analysis-engine',
    number: 'PROJECT / 002',
    title: 'Financial Ratio Analysis Engine',
    category: 'Accounting × Analytics × Business Metrics',
    filterTag: 'data',
    status: 'PROTOTYPE',
    why: 'Manual balance sheet calculations are prone to calculation slips and fail to clearly highlight liquidity risk across comparative accounting periods.',
    problem:
      'Raw balance sheet and income statement tables do not communicate solvency or operational efficiency without structured ratio normalization.',
    approach:
      'Built a structured computational model that ingests balance sheet line items and calculates Current Ratio, Quick Ratio, Debt-to-Equity, and Gross Margin with automated benchmark health flags.',
    tools: ['Excel', 'Python', 'Financial Modeling', 'Data Validation'],
    output:
      'Script and structured template that computes core financial ratios with automated visual variance analysis.',
    learned:
      'A financial ratio is meaningless in isolation; value comes from contextual comparison against industry baselines and historical trends.',
    caseStudyAvailable: false,
    links: {
      github: SITE_CONFIG.github
    }
  },
  {
    id: 'python-ledger-sandbox',
    number: 'PROJECT / 003',
    title: 'Python Ledger & Analytics Sandbox',
    category: 'Python × Tabular Data × Accounting Logic',
    filterTag: 'python',
    status: 'LEARNING PROJECT',
    why: 'Transitioning from spreadsheet formulas to programmatic data manipulation requires concrete, relatable datasets.',
    problem:
      'Spreadsheets hide data relationship errors until totals fail to balance; code enforces strict input validation at the moment of entry.',
    approach:
      'Created a suite of modular Python scripts to parse simulated ledger transaction logs, enforce debit=credit equality rules, and generate automated trial balance summaries.',
    tools: ['Python 3.12', 'VS Code', 'Git', 'Data Structures'],
    output:
      'A documented repository of Python scripts validating double-entry bookkeeping transactions and outputting summary reports.',
    learned:
      'The double-entry accounting equation (Assets = Liabilities + Equity) provides an ideal logical constraint for testing data pipeline integrity.',
    caseStudyAvailable: false,
    links: {
      github: SITE_CONFIG.github
    }
  }
];

export const FINOVAH_CASE_STUDY: CaseStudyData = {
  title: 'FINOVAH: Demystifying Financial Logic Through Interactive Systems',
  subtitle: 'A student-led exploration into bridging academic financial theory with practical personal utility.',
  meta: {
    number: 'CASE STUDY / 001',
    category: 'Accounting × Finance × Product Design',
    stage: 'Active Build / Academic Project',
    duration: 'Ongoing Research & Prototyping',
    focus: 'Financial Education & Algorithmic Tooling'
  },
  sections: [
    {
      id: 'question',
      number: '01',
      title: 'The Question',
      content: [
        'How can financial concepts like compound interest, budget variance, and net worth calculations be experienced dynamically rather than memorized as static formulas in a textbook?',
        'As an Accounting & Finance student, I observed that classmates and peers frequently memorized definitions for exams but struggled to calculate their own monthly burn rate or understand how credit card interest silently compounds over time.'
      ],
      highlight: 'Understanding numbers begins with feeling their real-world impact.'
    },
    {
      id: 'context',
      number: '02',
      title: 'Context & Background',
      content: [
        'Financial literacy among university students is frequently hampered by intimidation. Most commercial financial platforms either assume corporate CFO expertise (ERP systems, complex enterprise accounting tools) or dilute practical accounting into gamified gimmickry with zero financial rigor.',
        'FINOVAH was conceived as an academic laboratory: a place to take the core principles taught in accounting courses—debits, credits, liquidity, time value of money—and build clean, interactive modules that anyone can inspect and use.'
      ]
    },
    {
      id: 'idea',
      number: '03',
      title: 'The Core Concept',
      content: [
        'The core proposition of FINOVAH is straightforward: combine rigorous mathematical financial engines with calm, editorial design and clear educational explanations.',
        'Instead of opaque black-box outputs, each tool exposes the underlying formula: explaining what happens to future value when interest rate increases by 1%, or how allocating an extra 10% to debt repayment shortens loan duration by years.'
      ]
    },
    {
      id: 'approach',
      number: '04',
      title: 'Analytical Approach & Formula Modeling',
      content: [
        'Before designing the user interface, I structured the financial models. I began by standardizing standard financial equations:',
        '1. Compound Growth: A = P(1 + r/n)^(nt) with regular periodic contributions.',
        '2. Budget Allocation: 50% Needs, 30% Wants, 20% Savings/Debt reduction adjusted for varying monthly income tiers.',
        '3. Net Worth Equation: Total Liquid + Illiquid Assets minus Short-Term and Long-Term Liabilities.'
      ]
    },
    {
      id: 'design',
      number: '05',
      title: 'Design System & Architecture',
      content: [
        'To prevent visual noise, FINOVAH adheres to an editorial, typography-first aesthetic. Thin hairline borders, clear monochrome surfaces, and single-purpose input parameters ensure high legibility.',
        'The interface avoids unnecessary decorative fluff, focusing user attention on numerical sensitivity and actionable balance sheets.'
      ]
    },
    {
      id: 'build',
      number: '06',
      title: 'What Was Built & Working Engines',
      content: [
        'I built working computational engines that calculate real-time figures as the user adjusts inputs. There are no mock numbers or static slides; every slider recalculates the underlying mathematical equations instantaneously.',
        'The prototype includes a functional Compound Growth Simulator, an interactive 50/30/20 Budget Allocator, and a Net Worth Balance Sheet builder.'
      ]
    },
    {
      id: 'challenges',
      number: '07',
      title: 'Challenges & Complexities Encountered',
      content: [
        'Handling edge cases in financial mathematics: handling 0% interest rates without zero-division errors, validating negative cash flows, and formatting currency precision without floating-point inaccuracies.',
        'Balancing comprehensive accounting accuracy with accessible user experience so the tool remains welcoming to non-finance peers.'
      ]
    },
    {
      id: 'lessons',
      number: '08',
      title: 'Key Lessons & Understanding Gained',
      content: [
        'Building an application forces a much deeper mastery of subject matter than merely studying for an exam. You cannot code an algorithm for a concept you only partially understand.',
        'Financial technology is fundamentally about trust, precision, and clarity. Even a single cent variance in a reconciliation equation invalidates user confidence.'
      ]
    },
    {
      id: 'output',
      number: '09',
      title: 'Current Project Output',
      content: [
        'FINOVAH exists as an active build and academic prototype. It is not an enterprise commercial company or launched fintech startup, but an authentic demonstration of product thinking, accounting logic, and frontend execution.',
        'The live simulator embedded in this portfolio showcases the working engine built for the concept.'
      ]
    },
    {
      id: 'next',
      number: '10',
      title: 'What Comes Next',
      content: [
        'Integrating Python scripts to process CSV bank transaction exports.',
        'Expanding tax calculation algorithms relevant to regional tax brackets in Pakistan.',
        'Publishing detailed research notes on personal balance sheet hygiene for university students.'
      ]
    }
  ]
};
