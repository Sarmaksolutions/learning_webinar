export interface TrainingResource {
  title: string;
  description: string;
  link: string;
  type: 'pdf' | 'video' | 'doc' | 'article';
}

export interface ScheduleItem {
  title: string;
  date: string;
  time: string;
  status: string;
}

export interface ProgressStat {
  label: string;
  value: string;
  description: string;
}

export interface ToolLink {
  label: string;
  href: string;
  description: string;
}

export interface NotificationItem {
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}

export interface CertificationItem {
  title: string;
  status: 'Completed' | 'In progress' | 'Pending';
  issuedDate?: string;
  link?: string;
}

export interface BonusResource {
  title: string;
  description: string;
  link: string;
  type: 'pdf' | 'video' | 'doc' | 'article';
}

export interface LiveSession {
  title: string;
  date: string;
  time: string;
  host: string;
  status: string;
  link: string;
}

export interface AiTool {
  title: string;
  description: string;
  href: string;
}

export interface UserSession {
  mobile: string;
  name: string;
  email: string;
  enrolledProgram: string;
  schedule: ScheduleItem[];
  trainingMaterials: TrainingResource[];
  completion: ProgressStat[];
  tools: ToolLink[];
  notifications: NotificationItem[];
  certifications: CertificationItem[];
  liveSessions: LiveSession[];
  bonusLearning: BonusResource[];
  aiToolKit: AiTool[];
  bugReportLink: string;
  repositoryLink: string;
}

const STORAGE_KEY = 'sarmak_learning_session';

const DEFAULT_SESSION: Partial<UserSession> = {
  schedule: [],
  trainingMaterials: [],
  completion: [],
  tools: [],
  notifications: [],
  certifications: [],
  liveSessions: [],
  bonusLearning: [],
  aiToolKit: [],
  bugReportLink:
    'mailto:support@sarmak.in?subject=Report%20a%20Bug%20in%20SARMAK%20Training%20Portal',
  repositoryLink: 'https://github.com/Sarmaksolutions/website',
};

/**
 * Get the saved learner session from localStorage.
 */
export const getUserSession = (): UserSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UserSession>;

    return {
      ...DEFAULT_SESSION,
      ...parsed,
    } as UserSession;
  } catch {
    return null;
  }
};

/**
 * Save the learner session to localStorage.
 */
export const saveUserSession = (session: UserSession): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

/**
 * Clear the locally saved learner session.
 * Firebase sign-out must be handled separately using logoutFirebase().
 */
export const clearUserSession = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

/**
 * Create the learner's dashboard session.
 * Firebase supplies the actual authenticated email and display name.
 */
export const createUserSession = (
  mobile: string,
  name: string,
): UserSession => ({
  mobile,
  name: name.trim() || 'Registered Learner',
  email: '',

  enrolledProgram: 'SARMAK Free Training Program',

  schedule: [
    {
      title: 'Orientation & Onboarding',
      date: '2026-06-03',
      time: '10:00 AM',
      status: 'Upcoming',
    },
    {
      title: 'AI Fundamentals Lab',
      date: '2026-06-06',
      time: '02:00 PM',
      status: 'Scheduled',
    },
    {
      title: 'Cloud Migration Workshop',
      date: '2026-06-10',
      time: '11:00 AM',
      status: 'Scheduled',
    },
    {
      title: 'Project Review Session',
      date: '2026-06-14',
      time: '04:00 PM',
      status: 'Pending',
    },
  ],

  trainingMaterials: [
    {
      title: 'Cloud Readiness Guide',
      description: 'A practical guide for cloud migration planning.',
      link: '/guides/cloud-readiness-guide.pdf',
      type: 'pdf',
    },
    {
      title: 'Security Audit Framework',
      description: 'Checklist for IT security and compliance readiness.',
      link: '/guides/security-audit-framework.pdf',
      type: 'pdf',
    },
    {
      title: 'Disaster Recovery Planning',
      description: 'A full recovery planning workbook.',
      link: '/guides/disaster-recovery-planning.pdf',
      type: 'pdf',
    },
    {
      title: 'AI in IT Operations Webinar',
      description: 'Recorded session on AI-enabled IT management.',
      link: '/webinars/ai-it-operations.mp4',
      type: 'video',
    },
  ],

  completion: [
    {
      label: 'Program Progress',
      value: '55%',
      description: 'Progress through the training curriculum.',
    },
    {
      label: 'Assessments Completed',
      value: '2/4',
      description: 'Assessment milestones completed successfully.',
    },
    {
      label: 'Skill Growth',
      value: '72%',
      description: 'Measured improvement in core IT skills.',
    },
  ],

  tools: [
    {
      label: 'Learning Portal',
      href: 'https://learn.sarmak.in',
      description: 'Access lesson content and session recordings.',
    },
    {
      label: 'Repository',
      href: 'https://github.com/Sarmaksolutions/website',
      description: 'Shared code samples and documentation hub.',
    },
    {
      label: 'Documentation Hub',
      href: 'https://learn.sarmak.in/docs',
      description: 'Training docs and reference material.',
    },
  ],

  notifications: [
    {
      title: 'New session added',
      description:
        'AI Fundamentals Lab has been added to your schedule.',
      time: 'Just now',
      unread: true,
    },
    {
      title: 'Certificate milestone',
      description:
        'Complete the next project to unlock your first certificate.',
      time: '2h ago',
      unread: true,
    },
    {
      title: 'Mentor message',
      description: 'Your mentor has shared a new project brief.',
      time: 'Yesterday',
      unread: false,
    },
  ],

  certifications: [
    {
      title: 'AI Foundations',
      status: 'Completed',
      issuedDate: '2026-06-02',
      link: '/certificates/ai-foundations.pdf',
    },
    {
      title: 'Cloud Migration Readiness',
      status: 'In progress',
    },
    {
      title: 'Cybersecurity Essentials',
      status: 'Pending',
    },
  ],

  liveSessions: [
    {
      title: 'Live Office Hours',
      date: '2026-06-07',
      time: '05:00 PM',
      host: 'Mentor Team',
      status: 'Upcoming',
      link: 'https://meet.sarmak.in/office-hours',
    },
    {
      title: 'AI Project Review',
      date: '2026-06-09',
      time: '03:00 PM',
      host: 'Lead Trainer',
      status: 'Upcoming',
      link: 'https://meet.sarmak.in/project-review',
    },
  ],

  bonusLearning: [
    {
      title: 'AI Prompt Design Templates',
      description:
        'Bonus collection of prompts to speed up your AI workflows.',
      link: '/bonus/ai-prompt-templates.pdf',
      type: 'pdf',
    },
    {
      title: 'Advanced DevOps Checklist',
      description:
        'Extra guide for automating infrastructure and CI/CD.',
      link: '/bonus/devops-checklist.pdf',
      type: 'pdf',
    },
    {
      title: 'Productivity Toolkit',
      description:
        'Curated bonus tools for tracking tasks and learning faster.',
      link: '/bonus/productivity-toolkit.pdf',
      type: 'article',
    },
  ],

  aiToolKit: [
    {
      title: 'AI Pair Programming',
      description:
        'Use the AI pair program assistant for code reviews and guidance.',
      href: 'https://ai.sarmak.in/pair-programming',
    },
    {
      title: 'Prompt Library',
      description:
        'Access ready-to-use AI prompts for engineering and automation tasks.',
      href: 'https://ai.sarmak.in/prompt-library',
    },
    {
      title: 'Model Explorer',
      description:
        'Discover the best AI models for your training and projects.',
      href: 'https://ai.sarmak.in/model-explorer',
    },
  ],

  bugReportLink:
    'mailto:support@sarmak.in?subject=Report%20a%20Bug%20in%20SARMAK%20Training%20Portal',

  repositoryLink: 'https://github.com/Sarmaksolutions/website',
});