export type SkillStatus =
  | 'APPLIED'
  | 'WORKING KNOWLEDGE'
  | 'PRACTICING'
  | 'DEVELOPING'
  | 'LEARNING';

export interface SkillItem {
  name: string;
  status: SkillStatus;
  context: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'accounting-business',
    title: 'Accounting & Business',
    description:
      'Academic grounding in financial recording, financial statements, and commercial fundamentals.',
    skills: [
      {
        name: 'Accounting Fundamentals',
        status: 'APPLIED',
        context: 'Double-entry bookkeeping, trial balance, ledgers, and financial statement structures.'
      },
      {
        name: 'Financial & Business Concepts',
        status: 'APPLIED',
        context: 'Balance sheets, profit & loss, cash flows, and liquidity metrics.'
      },
      {
        name: 'Attention to Detail',
        status: 'APPLIED',
        context: 'Zero-tolerance verification for ledger discrepancies and numerical alignment.'
      },
      {
        name: 'Cost & Management Accounting',
        status: 'DEVELOPING',
        context: 'Cost classification, inventory valuation, and basic variance analysis.'
      },
      {
        name: 'Commercial Operations',
        status: 'WORKING KNOWLEDGE',
        context: 'Unit economics, pricing, small business operations, and transaction flow.'
      }
    ]
  },
  {
    id: 'data-technology',
    title: 'Data & Technology',
    description:
      'Technical toolset being cultivated to query, validate, automate, and model tabular and business data.',
    skills: [
      {
        name: 'Python',
        status: 'PRACTICING',
        context: 'Learning in public: syntax, primitive literals, dictionaries, nested collections, and scripts.'
      },
      {
        name: 'Microsoft Office & Excel',
        status: 'WORKING KNOWLEDGE',
        context: 'Financial formulas, pivot tables, spreadsheet modeling, and presentation documents.'
      },
      {
        name: 'Data Entry & InPage',
        status: 'APPLIED',
        context: 'Urdu and English high-accuracy data entry, document formatting, and verification.'
      },
      {
        name: 'Data Analytics',
        status: 'DEVELOPING',
        context: 'Path: Excel → SQL → Power BI → Python → Business Analysis & Decisions.'
      },
      {
        name: 'SQL & Relational Logic',
        status: 'LEARNING',
        context: 'Relational database schemas, normalization (1NF-3NF), queries, and joins.'
      },
      {
        name: 'Git & Version Control',
        status: 'PRACTICING',
        context: 'Branching, commit hygiene, and maintaining public learning repositories.'
      }
    ]
  },
  {
    id: 'professional-transferable',
    title: 'Professional & Transferable',
    description:
      'Customer-facing, communication, and execution discipline proven across 1.5 years in call centers and sales.',
    skills: [
      {
        name: 'Customer Service',
        status: 'APPLIED',
        context: '1.5 years at ODS handling customer inquiries, de-escalating concerns, and active listening.'
      },
      {
        name: 'Professional Communication',
        status: 'APPLIED',
        context: 'Clear articulation, phone etiquette, and bilingual correspondence (English/Urdu).'
      },
      {
        name: 'Sales & Customer Handling',
        status: 'APPLIED',
        context: '6 months at 3H Printing supporting orders, product selection, and client service.'
      },
      {
        name: 'Time & Target Management',
        status: 'APPLIED',
        context: 'Thriving in target- and time-sensitive environments while upholding service quality.'
      },
      {
        name: 'Problem Solving & Teamwork',
        status: 'APPLIED',
        context: 'Collaborative academic presentations and fast operational troubleshooting.'
      },
      {
        name: 'Basic Graphic Design',
        status: 'WORKING KNOWLEDGE',
        context: 'Preparing customer print layouts, design typography, and visual hierarchy.'
      }
    ]
  }
];
