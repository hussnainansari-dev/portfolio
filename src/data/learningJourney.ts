import { SITE_CONFIG } from './social';

export interface LearningEntry {
  dayNumber: number;
  date: string;
  topic: string;
  shortTitle: string;
  whyIStudiedIt?: string;
  whatILearned: string;
  whatConfusedMe: string;
  whatChanged: string;
  practice?: string;
  proof: string;
  tools: string[];
  githubLink?: string;
  instagramLink?: string;
  linkedinLink?: string;
  image?: string;
  status: 'COMPLETED' | 'LOGGED' | 'IN PROGRESS';
  isLocalPreview?: boolean;
}

export const LOCAL_JOURNEY_STORAGE_KEY = 'hussnain_journey_local_entries';

/**
 * Reads any locally saved Journey entries on this specific device.
 */
export function getLocalJourneyEntries(): LearningEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_JOURNEY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((e) => ({ ...e, isLocalPreview: true }));
    }
  } catch {
    // Graceful fallback in private browsing
  }
  return [];
}

/**
 * Saves local Journey entries to localStorage.
 */
export function saveLocalJourneyEntries(entries: LearningEntry[]): void {
  try {
    localStorage.setItem(LOCAL_JOURNEY_STORAGE_KEY, JSON.stringify(entries));
    window.dispatchEvent(new Event('journey-entries-updated'));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Repository published baseline entries.
 */
export const LEARNING_ENTRIES: LearningEntry[] = [
  {
    dayNumber: 5,
    date: '2026-03-24',
    topic: 'Python / Data Structures & Tabular Logic',
    shortTitle: 'Connecting Python Dictionaries to Accounting Ledgers',
    whyIStudiedIt: 'To connect programming data structures directly to financial accounting debit/credit hierarchies.',
    whatILearned:
      'How to structure nested dictionaries to represent hierarchical general ledger accounts with dynamic debit and credit balances, and how to iterate over transaction lists using list comprehensions.',
    whatConfusedMe:
      'Initially, mutable references in nested dictionaries caused unexpected updates across shallow copies until I learned deep copies and explicit key initialization.',
    whatChanged:
      'I stopped viewing Python collections as abstract math structures and realized they mirror the exact tree hierarchy of a standard Chart of Accounts.',
    practice: 'Wrote an automated ledger reconciliation script.',
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
    whyIStudiedIt: 'To master exact Python syntax rules and understand memory representations of numeric types.',
    whatILearned:
      'How Python represents primitive values (integers, floats, booleans, strings) in memory, and how Python handles type casting and string formatting.',
    whatConfusedMe:
      'Floating-point representation inaccuracies (e.g. 0.1 + 0.2 != 0.3) puzzled me, which in accounting is unacceptable since currency balances must never lose fractional precision.',
    whatChanged:
      'I started seeing deliberate grammatical structure instead of intimidating code symbols, and learned why decimal libraries are critical for financial computing.',
    practice: 'Created floating-point vs Decimal currency benchmark exercises.',
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
    whyIStudiedIt: 'To understand why transactional systems require relational integrity instead of single flat sheets.',
    whatILearned:
      'The purpose of database normalization (1NF through 3NF), establishing foreign key constraints, and writing multi-table INNER and LEFT JOINs.',
    whatConfusedMe:
      'Understanding NULL propagation in outer joins and how missing customer IDs can silently distort sales revenue aggregations in raw queries.',
    whatChanged:
      'I realized analytical credibility begins with clean relational schemas and integrity constraints, not with colorful dashboard visual cards.',
    practice: 'Normalized a flat order history table into Customer, Order, and LineItem tables.',
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
    whyIStudiedIt: 'To bridge traditional financial statement analysis with programmatic ratio sensitivity testing.',
    whatILearned:
      'Mathematical formulas for Current Ratio, Quick Ratio, Debt-to-Equity, and Working Capital, and exploring programmatic thresholds for liquidity risk.',
    whatConfusedMe:
      'How inventory valuation methods (FIFO vs Weighted Average) produce divergent Current Ratios on identical sales volumes during inflationary periods.',
    whatChanged:
      'I saw that financial ratios are not static answers on an exam; they are dynamic sensitivity levers that reveal operational bottlenecks.',
    practice: 'Calculated and simulated 5-year trend ratios across 3 corporate sample filings.',
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
    whyIStudiedIt: 'To break perfection paralysis and commit to building a public track record of authentic competence.',
    whatILearned:
      'Setting up version control with Git, organizing clean documentation workflows, and committing to publicly sharing my developmental progress.',
    whatConfusedMe:
      'The psychological hesitation of posting early student work without waiting until I feel like an "expert" first.',
    whatChanged:
      'Shifted from passive consumer mindset to active builder and documenter. Learning in public creates accountability, honest feedback, and real proof of work.',
    practice: 'Set up first public GitHub repository and established daily commit discipline.',
    proof: 'First Instagram post published + initial GitHub repository initiated.',
    tools: ['Git', 'GitHub', 'Markdown'],
    instagramLink: SITE_CONFIG.instagram,
    githubLink: SITE_CONFIG.github,
    status: 'COMPLETED'
  }
];

/**
 * Returns merged entries (including local drafts if on this browser) sorted descending by dayNumber.
 */
export function getMergedLearningEntries(): LearningEntry[] {
  const localEntries = getLocalJourneyEntries();
  const localDays = new Set(localEntries.map((e) => e.dayNumber));

  // Filter out any published entries that have a local draft override
  const baseEntries = LEARNING_ENTRIES.filter((e) => !localDays.has(e.dayNumber));
  const combined = [...localEntries, ...baseEntries];

  return combined.sort((a, b) => {
    if (b.dayNumber !== a.dayNumber) {
      return b.dayNumber - a.dayNumber;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getCurrentJourneyEntry(): LearningEntry {
  const sorted = getMergedLearningEntries();
  return sorted[0];
}

export function getRecentJourneyEntries(count = 3): LearningEntry[] {
  const sorted = getMergedLearningEntries();
  return sorted.slice(1, 1 + count);
}

export function getAllJourneyEntries(): LearningEntry[] {
  return getMergedLearningEntries();
}
