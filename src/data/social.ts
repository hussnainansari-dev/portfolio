export interface SocialLinks {
  name: string;
  professionalTitle: string;
  academicIdentity: string;
  github: string;
  githubAlt?: string;
  linkedin: string;
  instagram: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  location: string;
  resumePdfPath: string;
}

const baseUrl = import.meta.env.BASE_URL || '/';

export const SITE_CONFIG: SocialLinks = {
  name: 'Hussnain Ansari',
  professionalTitle: 'ADP Accounting & Finance Student · Aspiring Business & Data Analyst',
  academicIdentity: 'Hussnain Ali',
  github: 'https://github.com/hussnainansari-dev',
  githubAlt: 'https://github.com/hussnainali45',
  linkedin: 'https://www.linkedin.com/in/hussnain-ali45/',
  instagram: 'https://www.instagram.com/hussnain.ali45/',
  email: 'hussnainansari.dev@gmail.com',
  secondaryEmail: 'hussnainansa7@gmail.com',
  phone: '0318-9716834',
  location: 'Lahore, Pakistan',
  resumePdfPath: `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}resume/Hussnain_Ansari_Resume.pdf`
};
