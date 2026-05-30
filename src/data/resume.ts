/**
 * TODO(bobby): replace all placeholder content with your real resume data.
 * The structure is intentionally typed so the /resume page renders consistently
 * as you edit. Keep entries newest-first; the page does not re-sort.
 */

export interface ResumeRole {
  title: string;
  org: string;
  location?: string;
  start: string;       // free-form, e.g. "Jan 2023"
  end: string;         // "Present" or "Apr 2025"
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  org: string;
  start?: string;
  end?: string;
  notes?: string;
}

export interface ResumeCert {
  name: string;
  issuer: string;
  year?: string;
  link?: string;
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface Resume {
  /** Path to the downloadable PDF in /public — leave as null if you haven't uploaded one yet */
  pdfPath: string | null;
  headline: string;
  location: string;
  summary: string;
  roles: ResumeRole[];
  education: ResumeEducation[];
  certifications: ResumeCert[];
  skills: ResumeSkillGroup[];
}

export const RESUME: Resume = {
  pdfPath: '/resume.pdf', // TODO(bobby): drop your PDF here in /public/resume.pdf (or set to null to hide the download link)

  headline: 'Cybersecurity engineer', // TODO(bobby): your real role line
  location: 'TODO(bobby) — city, state',

  summary:
    'TODO(bobby) — 2-3 sentence summary. Hands-on cybersecurity engineer with depth in networking, detection engineering, and OSINT, plus the GRC literacy to translate engineering work into the language auditors and executives need to hear.',

  roles: [
    {
      title: 'TODO — Job title',
      org: 'TODO — Company',
      location: 'TODO — city/remote',
      start: 'Mon YYYY',
      end: 'Present',
      bullets: [
        'TODO — accomplishment with a concrete outcome and (where possible) a number.',
        'TODO — a different kind of accomplishment so the bullets do not feel like a list of one thing.',
        'TODO — a third bullet showing range (e.g. cross-functional / written work / mentorship).',
      ],
    },
    {
      title: 'TODO — Previous job title',
      org: 'TODO — Company',
      location: 'TODO',
      start: 'Mon YYYY',
      end: 'Mon YYYY',
      bullets: [
        'TODO — what you owned and what changed because of you.',
        'TODO — a representative project, named.',
      ],
    },
  ],

  education: [
    {
      degree: 'TODO — degree / program',
      org: 'TODO — institution',
      start: 'YYYY',
      end: 'YYYY',
      notes: 'TODO (optional) — honors, focus area, relevant coursework',
    },
  ],

  certifications: [
    // TODO(bobby): add real certs. Example shape:
    // { name: 'Security+', issuer: 'CompTIA', year: '2024' },
    { name: 'TODO — cert name', issuer: 'TODO — issuer', year: 'YYYY' },
  ],

  skills: [
    {
      label: 'Security engineering',
      items: ['TODO', 'TODO', 'TODO'],
    },
    {
      label: 'Networking',
      items: ['TODO', 'TODO', 'TODO'],
    },
    {
      label: 'OSINT & investigation',
      items: ['TODO', 'TODO'],
    },
    {
      label: 'Languages & tooling',
      items: ['TODO', 'TODO', 'TODO'],
    },
  ],
};
