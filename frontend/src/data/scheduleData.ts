import modalLogo from '../assets/images/sponsors/phoenix/modal.png';
import ftiLogo from '../assets/images/sponsors/flame/FTI.png';
import theVillageLogo from '../assets/images/sponsors/flame/the-village.png';
import googleLogo from '../assets/images/sponsors/phoenix/google-logo.webp';
import patScanlanImg from '../assets/images/speakers/pat-scanlan.png';

export interface SpeakerProfile {
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  bio?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime: string;
  title: string;
  topic?: string; // 'TBD' or specified
  room: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  accent?: string;
  speaker?: SpeakerProfile;
  companyLogo?: string;
  companyLink?: string;
  bufferAfterMinutes?: number;
  bufferDescription?: string;
  desc?: string;
  isWorkshop?: boolean;
}

export const saturdaySchedule: ScheduleItem[] = [
  {
    id: 'sat-checkin',
    time: '08:00 AM',
    endTime: '11:00 AM',
    title: 'Check-in & Registration',
    room: 'STEM Innovation Center',
    category: 'milestone',
    badge: 'Key Milestone',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Pick up your badge, swag pack, and get settled in. Meet organizers, network, and form teams before opening ceremonies.',
  },
  {
    id: 'sat-opening',
    time: '11:00 AM',
    endTime: '12:00 PM',
    title: 'Opening Ceremony',
    room: 'Wood Hall',
    category: 'milestone',
    badge: 'Key Milestone',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Welcome addresses from organizers, track announcements, sponsor challenges overview, and rules briefing.',
  },
  {
    id: 'sat-hacking-begins',
    time: '12:00 PM',
    endTime: '12:00 PM',
    title: 'Hacking Begins & Team Building',
    room: 'Phoenix Room B & C (University Union)',
    category: 'milestone',
    badge: 'Key Milestone',
    badgeColor: '#0C3C34',
    accent: '#0C3C34',
    desc: 'Official start of the 24-hour hacking countdown! Form teams, claim tables, and start building.',
  },
  {
    id: 'sat-lunch',
    time: '12:30 PM',
    endTime: '01:30 PM',
    title: 'Lunch',
    room: 'University Union Dining',
    category: 'food',
    badge: 'Meal',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Lunch served for all registered participants and mentors.',
  },

  /* =======================================================================
     AFTERNOON WORKSHOPS BLOCK
     - Starts at 1:30 PM
     - First from Modal
     - Buffer: >= 15 min
     - In University Union (Room: TBD)
     ======================================================================= */
  {
    id: 'sat-workshop-1-modal',
    time: '01:30 PM',
    endTime: '02:15 PM',
    title: 'Technical Workshop & API Deep Dive',
    topic: 'Modal API, Cloud Compute & Track Criteria',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Modal',
    badgeColor: '#10B981',
    accent: '#10B981',
    companyLogo: modalLogo,
    companyLink: 'https://modal.com',
    speaker: {
      name: 'Modal Engineering Team',
      role: 'Core Engineering & Developer Platform',
      company: 'Modal',
      avatarUrl: '',
      bio: 'Engineers from Modal guiding participants on building serverless AI applications, GPU workloads, and containerized backend systems.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Technical workshop hosted by Modal. Learn how to use the Modal API to run code in the cloud without managing infrastructure, explore sample project ideas, and review judging criteria for the Best Use of Modal prize track.',
  },
  {
    id: 'sat-workshop-2-fti',
    time: '02:30 PM',
    endTime: '03:15 PM',
    title: 'Company Info & Recruitment Session',
    topic: 'Company Overview, Careers & Hiring',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Faith Technologies, Inc. (FTI)',
    badgeColor: '#0284C7',
    accent: '#0284C7',
    companyLogo: ftiLogo,
    companyLink: 'https://www.faithtechinc.com/',
    speaker: {
      name: 'Recruiting Team',
      role: 'Talent Acquisition & Technical Team',
      company: 'Faith Technologies, Inc. (FTI)',
      avatarUrl: '',
      bio: 'Connect with recruiters and team members from Faith Technologies, Inc. (FTI) to learn about open roles, internships, and company culture.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Company information and recruiting session hosted by Faith Technologies, Inc. (FTI). Meet the team, learn about the company and what they do, and discover career and internship opportunities.',
  },
  {
    id: 'sat-workshop-3-baytek',
    time: '03:30 PM',
    endTime: '04:30 PM',
    title: '"From Screen to Machine"',
    topic: 'Translating Digital Games to Physical Arcade Experiences',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Bay Tek (The Village)',
    badgeColor: '#E37100',
    accent: '#E37100',
    companyLogo: theVillageLogo,
    companyLink: 'https://www.thevillage.bz/',
    speaker: {
      name: 'Pat Scanlan',
      role: 'Director of Product Development',
      company: 'Bay Tek Entertainment',
      avatarUrl: patScanlanImg,
      bio: 'Director of Product Development at Bay Tek Entertainment. Guiding participants through translating digital game mechanics into real-world arcade experiences and leading a Shark Tank-style pitch session.',
    },
    bufferAfterMinutes: 30,
    bufferDescription: '30-minute buffer before dinner',
    desc: 'Take a popular mobile or digital game and translate it into a real-world mechanical arcade game! Use workshop time to research, select your game, and pitch your idea. Conclude with a cabinet render for a Shark Tank-like pitch session (30 minutes to prep/develop, followed by 2–3 minutes per group to pitch to Bay Tek).',
  },

  /* =======================================================================
     DINNER BREAK: STRICTLY NO WORKSHOPS (5:00 PM - 7:00 PM)
     ======================================================================= */
  {
    id: 'sat-dinner',
    time: '05:00 PM',
    endTime: '07:00 PM',
    title: 'Dinner Break (No Workshops)',
    topic: 'Dinner Break',
    room: 'University Union Dining',
    category: 'meal',
    badge: 'Meal',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Dinner served at University Union Dining. No workshops scheduled during this time.',
  },

  /* =======================================================================
     EVENING WORKSHOPS BLOCK
     - Two GDE technical workshops (7:00 PM - 8:45 PM)
     - In University Union (Room: TBD)
     - 15 min buffer between sessions
     ======================================================================= */
  {
    id: 'sat-workshop-4-gde',
    time: '07:00 PM',
    endTime: '07:45 PM',
    title: 'Workshop 4: GDE Workshop (Session 1)',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#FBBC05',
    accent: '#FBBC05',
    companyLogo: googleLogo,
    companyLink: 'https://developers.google.com/community/experts',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Evening technical workshop hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
  },
  {
    id: 'sat-workshop-5-gde',
    time: '08:00 PM',
    endTime: '08:45 PM',
    title: 'Workshop 5: GDE Workshop (Session 2)',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#34A853',
    accent: '#34A853',
    companyLogo: googleLogo,
    companyLink: 'https://developers.google.com/community/experts',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    desc: 'Technical workshop hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
  },

  /* =======================================================================
     10:00 PM TRANSITION BACK TO STEM INNOVATION CENTER
     ======================================================================= */
  {
    id: 'sat-return-stem',
    time: '10:00 PM',
    endTime: '10:00 PM',
    title: 'Return to STEM Innovation Center',
    topic: 'Venue Transition',
    room: 'STEM Innovation Center',
    category: 'logistics',
    badge: 'Key Milestone',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'The University Union closes at 10:00 PM. All hackers return to the STEM Innovation Center for overnight hacking.',
  },
];

export const sundaySchedule: ScheduleItem[] = [
  {
    id: 'sun-breakfast',
    time: '08:00 AM',
    endTime: '09:30 AM',
    title: 'Breakfast Provided',
    topic: 'Breakfast',
    room: 'STEM Innovation Center',
    category: 'meal',
    badge: 'Meal',
    badgeColor: '#ffbd2e',
    accent: '#ffbd2e',
    desc: 'Breakfast served at the STEM Innovation Center.',
  },
  {
    id: 'sun-code-freeze',
    time: '12:00 PM',
    endTime: '12:00 PM',
    title: 'Hacking Ends & Submissions Due',
    topic: 'Code Freeze',
    room: 'STEM Innovation Center',
    category: 'logistics',
    badge: 'Key Milestone',
    badgeColor: '#EA4335',
    accent: '#EA4335',
    desc: 'All project submissions must be submitted on Devpost by 12:00 PM.',
  },
  {
    id: 'sun-lunch',
    time: '12:00 PM',
    endTime: '01:00 PM',
    title: 'Lunch Provided',
    topic: 'Lunch',
    room: 'STEM Innovation Center',
    category: 'meal',
    badge: 'Meal',
    badgeColor: '#ffbd2e',
    accent: '#ffbd2e',
    desc: 'Lunch served at the STEM Innovation Center before judging starts.',
  },
  {
    id: 'sun-expo-judging',
    time: '01:00 PM',
    endTime: '04:30 PM',
    title: 'Judging & Project Expo',
    topic: 'Judging',
    room: 'STEM Innovation Center',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Teams showcase and demo their projects to the judges at the STEM Innovation Center.',
  },
  {
    id: 'sun-closing',
    time: '05:00 PM',
    endTime: '06:00 PM',
    title: 'Closing Ceremony',
    topic: 'Closing Ceremony',
    room: 'STEM Innovation Center',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Closing remarks and event wrap-up at the STEM Innovation Center.',
  },
  {
    id: 'sun-prizes',
    time: '06:00 PM',
    endTime: '07:00 PM',
    title: 'Prize Distribution',
    topic: 'Awards',
    room: 'Rose Hall 250',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#4285F4',
    accent: '#4285F4',
    desc: 'Winners announced and prizes distributed at Rose Hall 250.',
  },
];
