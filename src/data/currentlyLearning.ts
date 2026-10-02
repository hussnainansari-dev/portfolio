export interface LearningTrack {
  id: string;
  name: string;
  category: string;
  current: string;
  next: string;
  why: string;
  statusTag: string;
  activeTopic: string;
}

export const CURRENTLY_LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Programming & Automation',
    activeTopic: 'Nested Data Structures & Algorithmic Problem Solving',
    current:
      'Mastering collections (lists, dictionaries, sets), nested data structures, list comprehensions, and modular file handling.',
    next:
      'Transitioning to Pandas & NumPy to manipulate tabular datasets and automate financial statement cleansing.',
    why:
      'Python transforms manual analytical chores into repeatable, automated pipelines capable of handling thousands of ledger records in seconds.',
    statusTag: 'Active Daily Practice'
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    category: 'Relational Models & BI',
    activeTopic: 'Relational Database Queries & Schema Integrity',
    current:
      'Writing multi-table SQL queries, aggregate functions (GROUP BY, HAVING), subqueries, and exploring database normalization rules.',
    next:
      'Deep dive into Power BI data modeling, Star Schema architectures, and DAX calculated columns for executive KPI cards.',
    why:
      'Businesses run on relational data. Knowing how to query data directly from databases eliminates reliance on error-prone static exports.',
    statusTag: 'Core Analytical Track'
  },
  {
    id: 'accounting',
    name: 'Accounting & Finance',
    category: 'Academic Foundation',
    activeTopic: 'Management Accounting & Cost Variance Analysis',
    current:
      'Cost-Volume-Profit analysis, absorption vs. variable costing, standard costing variance, and capital expenditure evaluation.',
    next:
      'Corporate valuation models, discounted cash flow (DCF) frameworks, and working capital optimization strategies.',
    why:
      'Data is blind without domain context. Deep accounting expertise provides the business logic needed to interpret what data actually means.',
    statusTag: 'University Degree (ADP)'
  },
  {
    id: 'communication',
    name: 'Communication & Documentation',
    category: 'Professional Craft',
    activeTopic: 'Explaining Technical Concepts with Clarity',
    current:
      'Refining written field notes, translating code logic into plain language, and creating structured learning posts for Instagram and LinkedIn.',
    next:
      'Practicing technical case presentation, structured executive summaries, and visual data storytelling.',
    why:
      'The most brilliant analytical findings are worthless if non-technical decision-makers cannot comprehend the conclusion or trust the reasoning.',
    statusTag: 'Continuous Habit'
  }
];
