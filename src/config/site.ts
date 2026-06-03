export const SITE = {
  url: 'https://robertcontant.com',
  title: 'Robert Contant',
  tagline: 'Cybersecurity engineer',
  description:
    'Robert Contant - cybersecurity engineer working across networking, detection engineering, OSINT, and AI. Projects, writing, and resume.',
  author: 'Robert Contant',
  locale: 'en_US',
  twitter: '',
  github: 'https://github.com/contantlab',
  linkedin: 'https://www.linkedin.com/in/robert-contant/',
  defaultOgImage: '/og-default.svg',
  /**
   * Formspree form endpoint for /contact/. Destination email is configured
   * in the Formspree dashboard (currently robert.v.contant@gmail.com) - held
   * server-side, never in this repo or served HTML.
   */
  formspreeEndpoint: 'https://formspree.io/f/mykagzer' as string | null,
} as const;

export const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/about/',   label: 'About' },
  { href: '/projects/',label: 'Projects' },
  { href: '/blog/',    label: 'Blog' },
  { href: '/resume/',  label: 'Resume' },
] as const;
