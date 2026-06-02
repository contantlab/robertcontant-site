export const SITE = {
  url: 'https://robertcontant.com',
  title: 'Robert Contant',
  tagline: 'Cybersecurity engineer',
  description:
    'Robert Contant — cybersecurity engineer working across networking, detection engineering, OSINT, and AI. Projects, writing, and resume.',
  author: 'Robert Contant',
  locale: 'en_US',
  twitter: '',
  github: 'https://github.com/contantlab',
  linkedin: 'https://www.linkedin.com/in/robert-contant/',
  defaultOgImage: '/og-default.svg',
  /**
   * TODO(bobby): replace with your real Formspree form endpoint after creating
   * the form at https://formspree.io. Format: 'https://formspree.io/f/XXXXXXXX'.
   * In the Formspree dashboard, set the destination email to
   * robert.v.contant@gmail.com. (The destination is held server-side by
   * Formspree, never in this repo or in served HTML.)
   * Leave as null to disable form submission (the page will show a friendly message).
   */
  formspreeEndpoint: null as string | null,
} as const;

export const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/about/',   label: 'About' },
  { href: '/projects/',label: 'Projects' },
  { href: '/blog/',    label: 'Blog' },
  { href: '/resume/',  label: 'Resume' },
] as const;
