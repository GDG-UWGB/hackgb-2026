import modalLogo from '../assets/images/sponsors/phoenix/modal.png';
import ftiLogo from '../assets/images/sponsors/flame/FTI.png';
import theVillageLogo from '../assets/images/sponsors/flame/the-village.png';
import googleLogo from '../assets/images/sponsors/phoenix/google-logo.webp';
import patScanlanImg from '../assets/images/speakers/pat-scanlan.png';
import kiruthikaImg from '../assets/images/speakers/kiruthika-subramani.png';
import mlhLogo from '../assets/images/sponsors/partners/mlh.png';

export interface SpeakerProfile {
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  bio?: string;
  linkedin?: string;
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
  perk?: string;
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
    room: 'Christie Theatre, University Union',
    category: 'milestone',
    badge: 'Key Milestone',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Welcome addresses from organizers, track announcements, sponsor challenges overview, and rules briefing at Christie Theatre, University Union.',
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
    time: '12:00 PM',
    endTime: '01:00 PM',
    title: 'Lunch',
    room: 'University Union Dining',
    category: 'food',
    badge: 'Meal',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Lunch served for all registered participants and mentors at University Union Dining.',
  },

  /* =======================================================================
     AFTERNOON WORKSHOPS BLOCK
     - Starts at 1:00 PM with Modal (Online)
     - GDE Technical Workshop: 1:30 PM - 2:15 PM in Phoenix Rooms BC (University Union)
     - FTI: 2:30 PM - 3:15 PM in 1965 Room (University Union)
     - Bay Tek: 3:30 PM - 4:30 PM in 1965 Room (University Union)
     ======================================================================= */
  {
    id: 'sat-workshop-1-modal',
    time: '01:00 PM',
    endTime: '01:30 PM',
    title: 'Technical Workshop & API Deep Dive',
    topic: 'Modal API, Cloud Compute & Track Criteria',
    room: 'Online (Virtual Session)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Modal',
    badgeColor: '#10B981',
    accent: '#10B981',
    companyLogo: modalLogo,
    companyLink: 'https://modal.com',
    speaker: {
      name: 'Andrew Hinh',
      role: 'Developer Relations (DevRel)',
      company: 'Modal',
      avatarUrl: '',
      linkedin: 'https://www.linkedin.com/in/andrew-hinh',
      bio: 'Developer Relations Engineer at Modal. Guiding participants on building serverless AI applications, GPU workloads, and containerized backend systems without managing infrastructure.',
    },
    desc: 'Virtual technical workshop hosted online by Andrew Hinh (DevRel at Modal). Learn how to use the Modal API to run code in the cloud without managing infrastructure, explore sample project ideas, and review judging criteria for the Best Use of Modal prize track.',
  },
  {
    id: 'sat-workshop-2-gde',
    time: '01:30 PM',
    endTime: '02:15 PM',
    title: '"From Demo to Production – Auto-scale Your AI Agent on Cloud Run"',
    topic: 'Auto-scaling AI Agents on Cloud Run',
    perk: '$25 Google Cloud Credits Provided',
    room: 'Phoenix Rooms BC (University Union)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#FBBC05',
    accent: '#FBBC05',
    companyLogo: googleLogo,
    companyLink: 'https://developers.google.com/community/experts',
    speaker: {
      name: 'Kiruthika Subramani',
      role: 'Google Developer Expert in AI & Data Scientist',
      company: 'Bell Canada',
      avatarUrl: kiruthikaImg,
      linkedin: 'https://www.linkedin.com/in/techwithkrithi/',
      bio: "Data Scientist at Bell Canada and Google Developer Expert in AI. Master's from MILA (Quebec AI Institute), author of two books on AI, IBM Champion for Data and AI, and Women Techmakers Ambassador. 9x certified cloud practitioner (4x GCP, 5x AWS), former Head of AI at Musitechnic Formation, Amazon intern, and 2025 Women in AI Scholarship Award Winner.",
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Afternoon technical workshop hosted by Kiruthika Subramani, Google Developer Expert in AI and Data Scientist at Bell Canada. Learn how to take an AI agent from a prototype to a scalable, production-grade service running on Google Cloud Run. All participants receive $25 in Google Cloud credits to build and deploy live during the workshop!',
  },
  {
    id: 'sat-workshop-3-fti',
    time: '02:30 PM',
    endTime: '03:15 PM',
    title: 'Company Info & Recruitment Session',
    topic: 'Company Overview, Careers & Hiring',
    room: '1965 Room (University Union)',
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
    id: 'sat-workshop-4-baytek',
    time: '03:30 PM',
    endTime: '04:30 PM',
    title: '"From Screen to Machine"',
    topic: 'Translating Digital Games to Physical Arcade Experiences',
    room: '1965 Room (University Union)',
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
     EVENING WORKSHOP & MINI-EVENT BLOCK
     - MLH Hacking with GitHub Copilot: 7:00 PM - 7:45 PM in 1965 Room
     - MLH TechTogether: 8:00 PM - 8:30 PM in 1965 Room
     ======================================================================= */
  {
    id: 'sat-workshop-copilot',
    time: '07:00 PM',
    endTime: '07:45 PM',
    title: 'Hacking with GitHub Copilot',
    topic: 'AI Pair Programming, MCP Servers & GitHub Profiles',
    perk: 'Exclusive GitHub Swag Up For Grabs',
    room: '1965 Room (University Union)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'MLH Workshop',
    badgeColor: '#E73356',
    accent: '#E73356',
    companyLogo: mlhLogo,
    companyLink: 'https://mlh.io',
    speaker: {
      name: 'Lucy & Wei',
      role: 'MLH Coaches',
      company: 'Major League Hacking',
      avatarUrl: '',
      bio: 'Official Major League Hacking (MLH) Coaches leading hands-on developer workshops, technical guidance, and mini-events at HackGB 2026.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before TechTogether session',
    desc: "Learning to use AI throughout your development flow is now an essential skill. GitHub Copilot is a fully-agentic AI pair programmer that can help you write, debug, & understand code. Today we’re learning by doing. We'll fork a README for your personal GitHub profile. We'll then use the GitHub and MLH MCP servers to pull live, personalized data. GitHub Copilot will use the template and data to create a customized profile just for you. * Exclusive GitHub swag up for grabs *",
  },
  {
    id: 'sat-workshop-techtogether',
    time: '08:00 PM',
    endTime: '08:30 PM',
    title: 'TechTogether Meetup & Community Session',
    topic: 'Addressing Gender Inequities in the Hackathon Community',
    room: '1965 Room (University Union)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'TechTogether',
    badgeColor: '#7C3AED',
    accent: '#7C3AED',
    companyLogo: mlhLogo,
    companyLink: 'https://techtogether.io',
    speaker: {
      name: 'Lucy & Wei',
      role: 'MLH Coaches',
      company: 'Major League Hacking (TechTogether)',
      avatarUrl: '',
      bio: "Official Major League Hacking (MLH) Coaches leading the TechTogether community initiative at HackGB 2026 to foster an inclusive, welcoming hackathon environment.",
    },
    bufferAfterMinutes: 90,
    bufferDescription: 'Open hacking in University Union before 10:00 PM transition to STEM Innovation Center',
    desc: "TechTogether is the nation's largest initiative to address the gender inequities in the hackathon community. Join us for a 30-minute community session to connect, share experiences, and learn how we can build a more welcoming, equitable hackathon culture.",
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
    room: 'Christie Theatre, University Union',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Closing remarks and event wrap-up at Christie Theatre, University Union.',
  },
  {
    id: 'sun-prizes',
    time: '06:00 PM',
    endTime: '07:00 PM',
    title: 'Prize Distribution',
    topic: 'Awards',
    room: 'Christie Theatre, University Union',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#4285F4',
    accent: '#4285F4',
    desc: 'Winners announced and prizes distributed at Christie Theatre, University Union.',
  },
];
