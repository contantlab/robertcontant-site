export interface ResumeRole {
  title: string;
  org: string;
  location?: string;
  start: string;
  end: string;
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
  /** Path to the downloadable PDF in /public — null hides the download link */
  pdfPath: string | null;
  /** Filename shown in the browser's Save As dialog. Defaults to URL filename. */
  pdfDownloadName?: string;
  headline: string;
  location: string;
  summary: string;
  highlights: string[];
  roles: ResumeRole[];
  education: ResumeEducation[];
  certifications: ResumeCert[];
  skills: ResumeSkillGroup[];
  /** "Projects & continuous learning" — short-form bullets, not full project writeups */
  learning: string[];
}

export const RESUME: Resume = {
  pdfPath: '/resume.pdf',
  pdfDownloadName: 'Robert Contant Resume.pdf',

  headline: 'Cybersecurity Engineer · Security Operations · Cloud Security · Incident Response',
  location: 'West Springfield, MA',

  summary:
    'Cybersecurity professional with 14+ years of combined experience across military security, signals intelligence, classified information protection, cybersecurity, information security, and GRC — including 9+ years building and maturing security programs for global software organizations. Focused on hands-on security operations, incident response, vulnerability management, cloud security, identity and access controls, Microsoft security tooling, and practical security automation. Experienced partnering with IT, CloudOps, engineering, legal, privacy, and external SOC/MDR teams to improve detection, response, hardening, remediation, and operational resilience. U.S. Marine Corps veteran with prior TS/SCI clearance.',

  highlights: [
    'Report directly to the CIO while leading cybersecurity, security operations coordination, incident response, vendor risk, customer assurance, and compliance functions for a global software organization.',
    'Manage an external SOC/MDR relationship covering threat monitoring, incident response, vulnerability management, security escalations, and penetration testing coordination.',
    'Led multiple high-severity security and privacy incident response efforts involving investigation tracking, remediation oversight, executive coordination, and regulatory reporting support.',
    'Partner with IT, CloudOps, and engineering teams to improve Microsoft Defender, Defender for Cloud, Microsoft Sentinel, endpoint controls, cloud logging, and vulnerability management processes.',
    'Build AI-assisted security workflows to streamline incident reporting, vendor risk assessments, ISMS Q&A, contract/DPA review, and customer security questionnaire support.',
  ],

  roles: [
    {
      title: 'Director of Cybersecurity & Compliance',
      org: 'XTEL',
      location: 'Remote, US',
      start: 'Apr 2025',
      end: 'Present',
      bullets: [
        'Lead cybersecurity and security operations coordination across internal teams and an external SOC/MDR provider, including incident response, vulnerability management, security monitoring, and penetration testing.',
        'Coordinate vulnerability scanning and penetration testing across cloud, application, and infrastructure environments, ensuring appropriate scope, ownership, remediation tracking, and risk-based follow-up.',
        'Partner with IT, CloudOps, engineering, product, legal, and privacy stakeholders to integrate cybersecurity requirements into cloud operations, software delivery, customer commitments, and enterprise risk decisions.',
        'Work with IT and CloudOps to improve Microsoft Defender, Defender for Cloud, Microsoft Sentinel, endpoint controls, cloud logging, and vulnerability management processes; identify opportunities to reduce legacy cloud cost and attack surface.',
        'Run phishing simulation campaigns using Microsoft Attack Simulation Training and use results to improve security awareness and email security posture.',
        'Created and operationalized a vendor risk management program for third-party security reviews, risk tracking, evidence collection, and reporting.',
        'Reduced audit and assurance burden by consolidating external audit partners and aligning ISO 27001 and SOC 2 audit schedules to support combined evidence reuse and fewer control owner meetings.',
      ],
    },
    {
      title: 'Senior Manager — Risk & Compliance',
      org: 'HCL Software',
      location: 'Remote, US',
      start: 'Dec 2022',
      end: 'Mar 2025',
      bullets: [
        'Served as a security, risk, and compliance SME across SOC 2, data privacy, ISO 27001, ISO 27017, ISO 27018, and cloud control environments for global enterprise software teams.',
        'Partnered with technical and business stakeholders to assess access controls, operational risks, remediation plans, control design, and evidence quality across distributed product and infrastructure environments.',
        'Managed concurrent audits and assurance activities across multiple products, services, data centers, environments, and globally distributed technical teams.',
        'Identified more than $750,000 in annual operational cost savings through risk-based review of technology, process, and control requirements.',
      ],
    },
    {
      title: 'IT Compliance Manager',
      org: 'Documo',
      location: 'Remote, US',
      start: 'Aug 2022',
      end: 'Oct 2022',
      bullets: [
        'Analyzed internal systems through manual and automated control testing against SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, and related security requirements.',
        'Developed risk management and vendor management programs and investigated potential security incidents as a member of the Incident Response Team.',
      ],
    },
    {
      title: 'Information Security & Compliance Lead',
      org: 'Zoovu',
      location: 'Remote, US',
      start: 'Nov 2020',
      end: 'Jun 2022',
      bullets: [
        'Built the company’s security and compliance program in alignment with SOC 2 and ISO 27001, successfully obtaining the company’s first SOC 2 Type II report within 12 months.',
        'Implemented endpoint protection controls across company computers and helped mature employee onboarding/offboarding, access review, and password security review processes.',
        'Created security awareness modules and phishing simulation campaigns to improve user security behavior and reduce social engineering risk.',
        'Investigated potential security incidents as part of the Incident Response Team and led testing sessions for Disaster Recovery and Business Continuity Plans.',
      ],
    },
    {
      title: 'Information Security Lead & Data Protection Officer',
      org: 'Pera (formerly Seedlink)',
      location: 'Shanghai, China',
      start: 'Feb 2017',
      end: 'Nov 2020',
      bullets: [
        'Built the company’s security and compliance program in alignment with ISO 27001 while supporting global customer, legal, and data protection requirements.',
        'Coordinated penetration tests and internal/external audits while partnering with HR and business teams on secure onboarding, offboarding, and awareness processes.',
      ],
    },
    {
      title: 'Commercial Team Leader',
      org: 'Pera (formerly Seedlink)',
      location: 'Shanghai, China',
      start: 'Feb 2017',
      end: 'Jun 2020',
      bullets: [
        'Managed six direct reports and key accounts across Asia, Europe, and the Americas; expanded a key account to 15 countries and increased account revenue by more than 500%.',
      ],
    },
    {
      title: 'Sergeant — Signals Intelligence Operator / Embassy Security Guard',
      org: 'U.S. Marine Corps',
      location: 'Various Overseas Assignments',
      start: 'Jun 2010',
      end: 'Aug 2015',
      bullets: [
        'Granted a Top Secret/TS SCI security clearance and served as a Signals Intelligence Operator with responsibilities involving classified information, data classification, encryption, analysis, and threat awareness.',
        'Served as a Marine Corps Embassy Security Guard for three years, protecting U.S. Embassies and Consulates in London, Shanghai, and Sarajevo.',
        'Supported high-profile security assignments for senior U.S. government officials, reinforcing judgment, composure, operational discipline, and protection of sensitive information.',
      ],
    },
  ],

  education: [
    {
      degree: 'Master of Science in Cybersecurity',
      org: 'Bay Path University',
      start: 'Oct 2025',
      end: 'Present',
    },
    {
      degree: 'Bachelor of Arts in Liberal Arts',
      org: 'University of Massachusetts Dartmouth',
      start: 'Sep 2013',
      end: 'Aug 2020',
    },
    {
      degree: 'Chinese Language Program',
      org: 'Tongji University',
      start: 'Sep 2015',
      end: 'Jan 2016',
    },
  ],

  certifications: [],

  skills: [
    {
      label: 'Security Operations & Incident Response',
      items: [
        'Incident Response',
        'Threat Monitoring',
        'SOC/MDR Coordination',
        'Security Escalations',
        'Phishing Simulations',
        'Security Awareness',
        'Operational Resilience',
      ],
    },
    {
      label: 'Cloud, Identity & Endpoint Security',
      items: [
        'Azure',
        'AWS',
        'Microsoft 365',
        'Microsoft Defender',
        'Defender for Cloud',
        'Microsoft Sentinel',
        'Entra ID',
        'Intune',
        'IAM',
        'Endpoint Security',
        'Logging & Monitoring',
      ],
    },
    {
      label: 'Vulnerability Management & Testing',
      items: [
        'Vulnerability Scanning',
        'Penetration Testing Coordination',
        'Risk-Based Remediation',
        'Control Validation',
        'Access Reviews',
        'Password Security Reviews',
      ],
    },
    {
      label: 'Security Automation & AI Workflows',
      items: [
        'Langdock',
        'AI-Assisted Workflows',
        'Incident Report Drafting',
        'Vendor Risk Reviews',
        'Security Questionnaire Support',
        'Policy/Procedure Drafting',
        'Power Automate',
      ],
    },
    {
      label: 'Security Foundations',
      items: [
        'NIST Cybersecurity Framework',
        'NIST 800-53',
        'ISO 27001',
        'SOC 2',
        'Data Protection',
        'Vendor Risk',
        'BCP/DRP',
        'Classified Information Protection',
      ],
    },
  ],

  learning: [
    'Pursuing a Master of Science in Cybersecurity while building and documenting practical security projects through this site and GitHub.',
    'Build and maintain a personal cybersecurity homelab to deepen hands-on experience with networking, security tooling, monitoring, automation, and cloud/security workflows.',
    'Experiment with AI agents and automation to improve security operations, incident reporting, policy review, vendor risk analysis, and security documentation.',
  ],
};
