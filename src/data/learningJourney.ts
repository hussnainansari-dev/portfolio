import { SITE_CONFIG } from './social';

export interface LearningEntry {
  dayNumber: number;
  date: string;
  topic: string;
  shortTitle: string;
  whatILearned: string;
  whatConfusedMe: string;
  whatChanged: string;
  proof: string;
  tools: string[];
  githubLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  image?: string;
  status: 'COMPLETED' | 'LOGGED' | 'IN PROGRESS';
}

/**
 * =====================================================================
 * LIVE LEARNING IN PUBLIC SYSTEM — STRUCTURED DATA LAYER
 * =====================================================================
 * 
 * TO ADD A NEW DAY:
 * Simply add a new object to the top of this array!
 * 
 * The system automatically:
 * 1. Sorts entries newest first (descending Day / Date)
 * 2. Designates the newest entry as "CURRENT JOURNEY"
 * 3. Places prior entries into "RECENT JOURNEY" and "FULL ARCHIVE"
 * 4. Preserves all historical records without modifying UI code!
 */
export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    dayNumber: 5,
    date: '2026-03-24',
    topic: 'Python / Data Structures & Tabular Logic',
    shortTitle: 'Connecting Python Dictionaries to Accounting Ledgers',
    whatILearned:
      'How to structure nested dictionaries to represent hierarchical general ledger accounts with dynamic debit and credit balances, and how to iterate over transaction lists using list comprehensions.',
    whatConfusedMe:
      'Initially, mutable references in nested dictionaries caused unexpected updates across shallow copies until I learned deep copies and explicit key initialization.',
    whatChanged:
      'I stopped viewing Python collections as abstract math structures and realized they mirror the exact tree hierarchy of a standard Chart of Accounts.',
    proof: 'Transaction ledger validator practice script tested on sample journal entries.',
    tools: ['Python 3.12', 'VS Code', 'Git'],
    githubLink: SITE_CONFIG.github,
    linkedinLink: SITE_CONFIG.linkedin,
    instagramLink: SITE_CONFIG.instagram,
    status: 'COMPLETED'
  },
  {
    dayNumber: 4,
    date: '2026-03-18',
    topic: 'Python / Syntax & Primitive Literals',
    shortTitle: 'Syntax stopped looking random.',
    whatILearned:
      'How Python represents primitive values (integers, floats, booleans, strings) in memory, and how Python handles type casting and string formatting.',
    whatConfusedMe:
      'Floating-point representation inaccuracies (e.g. 0.1 + 0.2 != 0.3) puzzled me, which in accounting is unacceptable since currency balances must never lose fractional precision.',
    whatChanged:
      'I started seeing deliberate grammatical structure instead of intimidating code symbols, and learned why decimal libraries are critical for financial computing.',
    proof: 'Practice code + handwritten notes + public Instagram documentation post.',
    tools: ['Python 3.12', 'Jupyter Notebook'],
    githubLink: SITE_CONFIG.github,
    instagramLink: SITE_CONFIG.instagram,
    status: 'COMPLETED'
  },
  {
    dayNumber: 3,
    date: '2026-03-11',
    topic: 'Data Analytics / SQL Relational Foundations',
    shortTitle: 'Normalization: Why One Giant Spreadsheet Breaks Down',
    whatILearned:
      'The purpose of database normalization (1NF through 3NF), establishing foreign key constraints, and writing multi-table INNER and LEFT JOINs.',
    whatConfusedMe:
      'Understanding NULL propagation in outer joins and how missing customer IDs can silently distort sales revenue aggregations in raw queries.',
    whatChanged:
      'I realized analytical credibility begins with clean relational schemas and integrity constraints, not with colorful dashboard visual cards.',
    proof: 'Sample relational database schema + join queries exploring customer and billing lines.',
    tools: ['PostgreSQL', 'DBeaver', 'SQL'],
    githubLink: SITE_CONFIG.github,
    status: 'COMPLETED'
  },
  {
    dayNumber: 2,
    date: '2026-03-04',
    topic: 'Accounting & Analytics / Financial Ratios',
    shortTitle: 'Liquidity vs. Solvency: Codifying Balance Sheet Health',
    whatILearned:
      'Mathematical formulas for Current Ratio, Quick Ratio, Debt-to-Equity, and Working Capital, and exploring programmatic thresholds for liquidity risk.',
    whatConfusedMe:
      'How inventory valuation methods (FIFO vs Weighted Average) produce divergent Current Ratios on identical sales volumes during inflationary periods.',
    whatChanged:
      'I saw that financial ratios are not static answers on an exam; they are dynamic sensitivity levers that reveal operational bottlenecks.',
    proof: 'Financial ratio analysis exploratory model and comparative balance sheet calculations.',
    tools: ['Excel', 'Python', 'Financial Formulas'],
    linkedinLink: SITE_CONFIG.linkedin,
    status: 'COMPLETED'
  },
  {
    dayNumber: 1,
    date: '2026-02-25',
    topic: 'Foundations / Learning in Public',
    shortTitle: 'The Commitment to Learn and Build in Public',
    whatILearned:
      'Setting up version control with Git, organizing clean documentation workflows, and committing to publicly sharing my developmental progress.',
    whatConfusedMe:
      'The psychological hesitation of posting early student work without waiting until I feel like an "expert" first.',
    whatChanged:
      'Shifted from passive consumer mindset to active builder and documenter. Learning in public creates accountability, honest feedback, and real proof of work.',
    proof: 'First Instagram post published + initial GitHub repository initiated.',
    tools: ['Git', 'GitHub', 'Markdown'],
    instagramLink: SITE_CONFIG.instagram,
    githubLink: SITE_CONFIG.github,
    status: 'COMPLETED'
  }
];

export function getSortedLearningEntries(): LearningEntry[] {
  return [...LEARNING_ENTRIES].sort((a, b) => {
    if (b.dayNumber !== a.dayNumber) {
      return b.dayNumber - a.dayNumber;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCurrentJourneyEntry(): LearningEntry {
  const sorted = getSortedLearningEntries();
  return sorted[0];
}

export function getRecentJourneyEntries(count = 3): LearningEntry[] {
  const sorted = getSortedLearningEntries();
  return sorted.slice(1, 1 + count);
}

export function getAllJourneyEntries(): LearningEntry[] {
  return getSortedLearningEntries();
}
