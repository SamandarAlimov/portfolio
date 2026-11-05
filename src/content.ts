export type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  href: string;
  source?: string;
  status: 'Live site' | 'In development' | 'Experimental';
  highlight: string;
  mark: string;
};

export const projects: Project[] = [
  {
    number: '01',
    title: 'Alsamos',
    category: 'Product ecosystem · Web + Mobile',
    description: 'An interconnected product ecosystem. Building the web experience with React and a cross-platform Flutter companion, with design parity across platforms as a central goal.',
    technologies: ['React', 'TypeScript', 'Flutter', 'Supabase'],
    href: 'https://github.com/SamandarAlimov/alsamos',
    source: 'https://github.com/SamandarAlimov/alsamos-superapp',
    status: 'In development',
    highlight: 'violet',
    mark: 'A',
  },
  {
    number: '02',
    title: 'Leo Logistics Academy',
    category: 'Website · Logistics education',
    description: 'A responsive digital presence for a logistics training academy, bringing clear information architecture and a practical, mobile-friendly experience to the learning journey.',
    technologies: ['Web development', 'Responsive UI', 'GitHub'],
    href: 'https://leo-logistics.uz',
    source: 'https://github.com/SamandarAlimov/pixel-perfect-replication',
    status: 'Live site',
    highlight: 'cyan',
    mark: 'L',
  },
  {
    number: '03',
    title: 'Alsamos AI',
    category: 'AI research · Developer tools',
    description: 'An evolving initiative exploring multilingual assistants, agent workflows and developer experiences. Ongoing research and prototyping rather than a finished AI platform.',
    technologies: ['AI', 'React', 'TypeScript', 'Research'],
    href: 'https://github.com/SamandarAlimov/alsamos-ai',
    status: 'In development',
    highlight: 'coral',
    mark: 'AI',
  },
  {
    number: '04',
    title: 'Proactive Marketing',
    category: 'Marketing agency · Corporate website',
    description: 'Developed a multilingual marketing agency website with service pages, project case studies, team and academy sections, a contact lead form, and a dedicated SEO layer.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    href: 'https://proactive.agency.uz',
    source: 'https://github.com/SamandarAlimov/proactiveagency',
    status: 'In development',
    highlight: 'lime',
    mark: 'P',
  },
];

export const skills = [
  { title: 'Frontend engineering', summary: 'Responsive interfaces, component systems and polished interactions.', tools: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  { title: 'Cross-platform products', summary: 'Moving from web experiences to applications across devices.', tools: ['Flutter', 'Dart', 'UI parity', 'Adaptive layouts'] },
  { title: 'Product & infrastructure', summary: 'Connecting interfaces to the services that make them useful.', tools: ['Supabase', 'GitHub', 'Vercel', 'APIs'] },
];

export const journey = [
  { period: '2019 — 2020', title: 'Started with web development', detail: 'Learned the fundamentals at Jizzakh IT Park and began turning curiosity into code.' },
  { period: '2022 — 2026', title: 'Economics meets technology', detail: 'Studied Economics at TMC Institute of Singapore in Tashkent while pursuing software projects.' },
  { period: '2026 — now', title: 'Building across disciplines', detail: 'Developing Alsamos projects and exploring practical logistics workflows alongside software engineering.' },
];
