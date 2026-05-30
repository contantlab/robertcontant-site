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
  // TODO(bobby): confirm LinkedIn URL (guessed slug — replace with the real one)
  linkedin: 'https://www.linkedin.com/in/robertcontant/',
  // TODO(bobby): decide which email to expose here — current value is your contantsolutions.com
  // business email; you may prefer a personal address for this individual-professional site.
  email: 'bobby@contantsolutions.com',
  defaultOgImage: '/og-default.png',
} as const;

export const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/about/',   label: 'About' },
  { href: '/projects/',label: 'Projects' },
  { href: '/blog/',    label: 'Blog' },
  { href: '/resume/',  label: 'Resume' },
] as const;
