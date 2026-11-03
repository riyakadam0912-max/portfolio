export type Project = {
  id: string
  title: string
  eyebrow: string
  type: 'public' | 'confidential'
  summary: string
  overview?: string
  problem?: string
  contribution: string
  features?: string[]
  technologies?: string[]
  github?: string
  liveUrl?: string
  confidentiality?: string
  cover: 'nexus' | 'bitewise' | 'web' | 'operations' | 'workflow' | 'cafe' | 'heritage'
}

export const profile = {
  name: 'Riya Ramesh Kadam',
  shortName: 'Riya Kadam',
  role: 'Associate Full Stack Developer',
  employer: 'Ekdrishti Group Pvt. Ltd.',
  location: 'Mumbai, Maharashtra, India',
  email: 'riyakadam0912@gmail.com',
  intro: 'I build business applications and web experiences across frontend, backend and database layers, with close attention to usability and visual detail.',
}

export const projects: Project[] = [
  {
    id: 'ekdrishti-web', title: 'EkDrishti Web', eyebrow: 'Organization website · Public work', type: 'public', cover: 'web',
    summary: 'A considered public-facing website that gives the organization’s services and work a clear, responsive home.',
    overview: 'The public organization website for Ekdrishti Group Pvt. Ltd., designed to make its offering easier to understand and navigate across devices.',
    problem: 'Present varied services and portfolio material in a coherent structure without overwhelming visitors.',
    contribution: 'I worked on responsive pages, reusable interface components, navigation, and the organization of service and portfolio content.',
    features: ['Responsive page layouts', 'Reusable content components', 'Service and portfolio presentation', 'Clear navigation and content hierarchy'],
    liveUrl: 'https://ekdrishti.com/',
  },
  {
    id: 'nexus', title: 'NEXUS', eyebrow: 'Independent project · Analytics & forecasting', type: 'public', cover: 'nexus',
    summary: 'An FMCG analytics and demand-forecasting workspace built around historical store–product-family data.',
    overview: 'NEXUS brings historical sales exploration, recursive demand forecasting and replenishment calculations into one focused analytical interface.',
    problem: 'Large historical datasets can make it difficult to connect demand patterns with practical stock-planning decisions.',
    contribution: 'I designed and built the frontend, API workflow, analytics views and forecasting integration across the application stack.',
    features: ['Sales, store and product-family analytics', '379,800 historical daily rows', 'LightGBM integration with a 56-feature inference contract', 'Recursive demand forecasting', 'Safety-stock and reorder-point calculations', 'Risk monitoring and data exploration'],
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'LightGBM', 'SQLite'],
    github: 'https://github.com/riyakadam0912-max/NEXUS',
    liveUrl: 'https://nexus-sand-five-22.vercel.app/',
  },
  {
    id: 'bitewise', title: 'BiteWise', eyebrow: 'Independent project · Nutrition tracking', type: 'public', cover: 'bitewise',
    summary: 'A personal nutrition tracker that keeps daily food, hydration and profile information in one calm experience.',
    overview: 'BiteWise is a persistent, account-based space for recording everyday nutrition and reviewing calorie and macronutrient summaries.',
    problem: 'Daily nutrition records are most useful when entry, review and personal preferences remain connected and easy to revisit.',
    contribution: 'I built the authenticated product experience, data model and responsive interface, including diary, hydration and profile workflows.',
    features: ['Authenticated food diaries', 'Calorie and macronutrient summaries', 'Hydration logs', 'Dietary recipe filters', 'Persistent user profiles'],
    technologies: ['React', 'TypeScript', 'Drizzle ORM', 'Cloudflare D1'],
    github: 'https://github.com/riyakadam0912-max/bitewise',
    liveUrl: 'https://bitewise-two.vercel.app/',
  },
  {
    id: 'enterprise-operations', title: 'Enterprise Operations Platform', eyebrow: 'Confidential employer project · Draft summary', type: 'confidential', cover: 'operations',
    summary: 'An internal business application supporting connected operational workflows.',
    contribution: 'I contribute full-stack work across application interfaces, API integration and database-backed features.',
    confidentiality: 'This summary is intentionally broad and remains subject to employer review. Product details, interfaces and internal systems are withheld.',
  },
  {
    id: 'hr-workflow', title: 'HR Workflow Automation', eyebrow: 'Confidential employer project · Internship · Draft summary', type: 'confidential', cover: 'workflow',
    summary: 'An interim system supporting attendance, leave and payroll administration through spreadsheet automation and basic dashboards.',
    contribution: 'During my internship, I built workflow automation and straightforward administrative views while keeping employee records, formulas and scripts private.',
    confidentiality: 'Actual sheets, records, formulas, scripts and employee information are not shown.',
  },
  {
    id: 'cafe-operations', title: 'Café Operations Platform', eyebrow: 'Confidential employer project · Draft summary', type: 'confidential', cover: 'cafe',
    summary: 'An application supporting customer-facing and staff workflows in a café context.',
    contribution: 'I work on application interfaces and backend integration, without disclosing implementation or operational details.',
    confidentiality: 'Product flows, operational rules, interfaces and implementation details are withheld.',
  },
  {
    id: 'heritage-site', title: 'Bilingual Heritage Website', eyebrow: 'Confidential client project · Draft summary', type: 'confidential', cover: 'heritage',
    summary: 'A responsive bilingual website designed to present cultural and heritage content with clarity.',
    contribution: 'I contribute responsive frontend development, reusable components, bilingual content presentation and accessible navigation.',
    confidentiality: 'The client identity, family information, source content and screenshots are withheld.',
    liveUrl: 'https://heritage-archive-delta.vercel.app/',
  },
]

export const experience = [
  { role: 'Associate Full Stack Developer', company: 'Ekdrishti Group Pvt. Ltd.', period: 'August 2026 — Present', detail: 'Full-time role spanning enterprise applications, the organization website, a heritage website and a café application.' },
  { role: 'Developer Intern', company: 'Ekdrishti Group Pvt. Ltd.', period: 'February 2026 — August 2026', detail: 'Contributed smaller website pages, frontend components and UI improvements, and built an interim HR management system.' },
]

export const skills = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'FastAPI', 'REST APIs'] },
  { group: 'Data', items: ['PostgreSQL', 'MongoDB', 'Prisma', 'SQL', 'Python'] },
  { group: 'Tools & automation', items: ['Git', 'GitHub', 'Postman', 'Vercel', 'Google Sheets', 'Apps Script'] },
]
