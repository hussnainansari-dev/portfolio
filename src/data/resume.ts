import { SITE_CONFIG } from './social';

export interface ResumeData {
  name: string;
  officialIdentity: string;
  headline: string;
  location: string;
  phone: string;
  email: string;
  secondaryEmail?: string;
  linkedin: string;
  github: string;
  instagram: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    status: string;
    focus?: string;
    keyCoursework?: string[];
  }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    duration: string;
    responsibilities: string[];
    transferableSkills: string[];
    lessons?: string;
  }[];
  coreProjects: {
    name: string;
    role: string;
    status: string;
    description: string;
    technologies: string[];
    keyOutcomes: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
    status: 'Completed' | 'In Progress';
    description?: string;
  }[];
  academicParticipation: {
    title: string;
    institution: string;
    session: string;
    notes: string;
  }[];
  skillset: {
    category: string;
    items: string[];
  }[];
  languages: {
    language: string;
    proficiency: string;
  }[];
}

export const RESUME_DATA: ResumeData = {
  name: SITE_CONFIG.name,
  officialIdentity: SITE_CONFIG.academicIdentity,
  headline: SITE_CONFIG.professionalTitle,
  location: SITE_CONFIG.location,
  phone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  secondaryEmail: SITE_CONFIG.secondaryEmail,
  linkedin: SITE_CONFIG.linkedin,
  github: SITE_CONFIG.github,
  instagram: SITE_CONFIG.instagram,
  summary:
    'ADP Accounting & Finance student at University of Central Punjab (UCP) building a solid foundation across accounting, finance, business, and data analytics. Brings 1.5 years of customer service and call center experience, along with practical exposure to graphic design, sales, and Urdu/English data entry. Focused on connecting financial understanding with data, modern tools, and business decision-making through hands-on project prototypes, daily practice, and documenting learning in public.',
  education: [
    {
      degree: 'Associate Degree Program (ADP) — Accounting & Finance',
      institution: 'University of Central Punjab (UCP)',
      location: 'Lahore, Pakistan',
      period: '2024 — Expected 2027',
      status: '2nd Semester Completed',
      focus: 'Accounting Fundamentals, Commercial Logic, Business Statistics, Management Accounting',
      keyCoursework: [
        'Financial Accounting & Reporting',
        'Business Mathematics & Statistics',
        'Principles of Micro & Macroeconomics',
        'Cost & Management Accounting',
        'Business Law & Commercial Frameworks'
      ]
    },
    {
      degree: 'Intermediate — I.Com (Commerce)',
      institution: 'Punjab Group of Colleges (Airline Campus)',
      location: 'Lahore, Pakistan',
      period: 'Completed',
      status: 'Completed',
      focus: 'Principles of Accounting, Banking, Commercial Geography, Economics'
    },
    {
      degree: 'Matriculation — Computer Science',
      institution: 'Government High School, Sher Shah Colony, Raiwind Road',
      location: 'Lahore, Pakistan',
      period: 'Completed',
      status: 'Completed',
      focus: 'Computer Science, Mathematics, Science Fundamentals'
    }
  ],
  experience: [
    {
      role: 'Call Center Agent',
      organization: 'ODS',
      period: '1.5 Years',
      duration: '1.5 Years',
      responsibilities: [
        'Handled customer interactions professionally across routine service inquiries.',
        'Developed practical skills in communication, active listening, problem-solving, and customer handling.',
        'Worked in a target- and time-sensitive environment while maintaining service quality.'
      ],
      transferableSkills: [
        'Active Listening',
        'Customer Care & Retention',
        'Working Under Time Pressure',
        'Target Management',
        'Professional Communication'
      ],
      lessons: 'Customer trust is built on clear listening and rapid, reliable resolution.'
    },
    {
      role: 'Graphic Designer & Sales Assistant',
      organization: '3H Printing Shop',
      period: '6 Months',
      duration: '6 Months',
      responsibilities: [
        'Prepared basic customer design work and supported printing-related requirements.',
        'Assisted customers with orders, product selection, and sales communication.',
        'Gained practical exposure to customer service, sales, design, and day-to-day business operations.'
      ],
      transferableSkills: [
        'Visual Layout & Composition',
        'Commercial Sales Communication',
        'Order Fulfillment',
        'Customer Requirement Scoping',
        'Small Business Operations'
      ],
      lessons: 'Clear visual communication directly impacts sales conversions and order accuracy.'
    },
    {
      role: 'Data Entry Operator — InPage',
      organization: 'Arshad Associates',
      period: '4 Months',
      duration: '4 Months',
      responsibilities: [
        'Performed Urdu and English data entry and document formatting using InPage.',
        'Entered and organized written information with attention to accuracy and consistency.'
      ],
      transferableSkills: [
        'High Numerical & Text Accuracy',
        'Bilingual Formatting (Urdu/English)',
        'Data Verification & Consistency',
        'Information Organization'
      ],
      lessons: 'Data hygiene and meticulous verification prevent compounding errors downstream.'
    }
  ],
  coreProjects: [
    {
      name: 'FINOVAH',
      role: 'Creator & Concept Architect',
      status: 'Active Build / Academic Project',
      description:
        'A student-built digital personal finance and accounting platform concept exploring budgeting, savings goals, loans, investments, compound interest, net worth, and interactive financial calculators.',
      technologies: ['Financial Modeling', 'TypeScript', 'React', 'Tailwind CSS', 'Figma'],
      keyOutcomes: [
        'Built working compound interest formulas with periodic deposits.',
        'Modeled dynamic 50/30/20 monthly budgeting engines.',
        'Created educational guides clarifying complex financial terminology.'
      ]
    },
    {
      name: 'Learning in Public',
      role: 'Author & Practitioner',
      status: 'Ongoing Daily Journey',
      description:
        'A documented student journey recording daily lessons, challenges, practice outputs, and conceptual shifts.',
      technologies: ['Python 3', 'SQL', 'Git & GitHub', 'Instagram', 'LinkedIn'],
      keyOutcomes: [
        'Structured daily field notes covering Python data types, dictionaries, and ledger logic.',
        'Public accountability repository with transparent challenges and breakthroughs.'
      ]
    }
  ],
  certifications: [
    {
      title: 'Special Foundation Programme Certificate',
      issuer: 'University of Central Punjab / Punjab Colleges',
      year: '2025',
      status: 'Completed',
      description: 'Computer Science, Microsoft Office, Emailing Skills, Beginner-Level Coding, English, and Mathematics.'
    },
    {
      title: 'Email Etiquette',
      issuer: 'Professional Development',
      year: '2026',
      status: 'In Progress',
      description: 'Corporate communication standards, executive correspondence, and professional clarity.'
    },
    {
      title: 'Communication & Presentation',
      issuer: 'Professional Development',
      year: '2026',
      status: 'In Progress',
      description: 'Public speaking, active articulation, and persuasive stakeholder communication.'
    },
    {
      title: 'Python Programming',
      issuer: 'Independent Technical Studies',
      year: '2026',
      status: 'In Progress',
      description: 'Core syntax, data structures, algorithms, and tabular analysis pipelines.'
    }
  ],
  academicParticipation: [
    {
      title: 'Certificate of Participation — Entrepreneurial Creativity',
      institution: 'University of Central Punjab',
      session: 'Academic Session 2025–2027 · Semester 2',
      notes: 'Demonstrated initiative in business ideation, team presentations, and creative commercial solutions.'
    },
    {
      title: 'Special Foundation Programme',
      institution: 'Punjab Colleges / UCP',
      session: 'Completed 3-Month Intensive',
      notes: 'Regular active participation across foundational business, technical, and analytical modules.'
    }
  ],
  skillset: [
    {
      category: 'Accounting & Business',
      items: [
        'Accounting Fundamentals (Double-entry, Ledgers, Trial Balance)',
        'Financial & Business Concepts',
        'Attention to Detail & Verification',
        'Cost Accounting Basics',
        'Working Capital Understanding'
      ]
    },
    {
      category: 'Data & Technology',
      items: [
        'Python (Learning & Daily Practice)',
        'Microsoft Office (Excel Formulas, Word, PowerPoint)',
        'Data Entry & InPage (Urdu/English formatting)',
        'Data Analytics (Developing: SQL, Relational Logic, Power BI)',
        'Git & GitHub Version Control'
      ]
    },
    {
      category: 'Professional & Transferable',
      items: [
        'Customer Service & Active Listening',
        'Professional Communication',
        'Sales & Customer Handling',
        'Teamwork & Collaboration',
        'Time Management & Working Under Targets',
        'Problem Solving'
      ]
    },
    {
      category: 'Creative & Design',
      items: ['Basic Graphic Design', 'Print Preparation & Layout', 'Visual Hierarchy']
    }
  ],
  languages: [
    { language: 'Urdu', proficiency: 'Native / Fluent' },
    { language: 'Punjabi', proficiency: 'Fluent' },
    { language: 'English', proficiency: 'Working Proficiency' }
  ]
};
