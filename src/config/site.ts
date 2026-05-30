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
  /**
   * BUILD-TIME ONLY. Do NOT import into any component that ends up in the
   * client bundle — the address must never appear in publicly served HTML.
   * The /contact/ form routes messages here via the form provider's backend.
   */
  email: 'bobby@contantsolutions.com',
  defaultOgImage: '/og-default.png',
  /**
   * TODO(bobby): replace with your real Formspree form endpoint after creating
   * the form at https://formspree.io. Format: 'https://formspree.io/f/XXXXXXXX'.
   * In the Formspree dashboard, set the destination email to bobby@contantsolutions.com.
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
