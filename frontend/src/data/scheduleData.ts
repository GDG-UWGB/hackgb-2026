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
  topic: string; // 'TBD' or specified
  room: string;
  category: 'workshop' | 'ceremony' | 'meal' | 'logistics';
  badge?: 'Modal' | 'Google Developer Expert' | 'Meal' | 'Key Milestone';
  badgeColor?: string;
  accent: string;
  speaker?: SpeakerProfile;
  bufferAfterMinutes?: number;
  bufferDescription?: string;
  desc: string;
  isWorkshop?: boolean;
}

export const saturdaySchedule: ScheduleItem[] = [
  {
    id: 'sat-checkin',
    time: '08:00 AM',
    endTime: '10:30 AM',
    title: 'Check-in & Registration',
    topic: 'Check-in',
    room: 'STEM Innovation Center',
    category: 'logistics',
    badge: 'Key Milestone',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Arrive at the STEM Innovation Center, check in at registration, and pick up your badge and event swag.',
  },
  {
    id: 'sat-opening',
    time: '11:00 AM',
    endTime: '12:00 PM',
    title: 'Opening Ceremony',
    topic: 'Kickoff',
    room: 'Rose Hall 250',
    category: 'ceremony',
    badge: 'Key Milestone',
    badgeColor: '#E37100',
    accent: '#E37100',
    desc: 'Welcome remarks, track announcements, sponsor introductions, and hackathon guidelines at Rose Hall 250. Following the ceremony, participants head to the University Union.',
  },
  {
    id: 'sat-hacking-begins',
    time: '12:00 PM',
    endTime: '12:00 PM',
    title: 'Hacking Officially Begins',
    topic: 'Hacking Sprint',
    room: 'Phoenix Room B & C (University Union)',
    category: 'logistics',
    badge: 'Key Milestone',
    badgeColor: '#61A644',
    accent: '#61A644',
    desc: 'Hacking begins! Teams set up workspaces in Phoenix Room B & C in the University Union.',
  },
  {
    id: 'sat-lunch',
    time: '12:30 PM',
    endTime: '01:30 PM',
    title: 'Lunch Provided',
    topic: 'Lunch',
    room: 'University Union Dining',
    category: 'meal',
    badge: 'Meal',
    badgeColor: '#ffbd2e',
    accent: '#ffbd2e',
    desc: 'Lunch served at University Union Dining.',
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
    title: 'Workshop 1: Modal Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Modal',
    badgeColor: '#00C853',
    accent: '#00C853',
    speaker: {
      name: 'Modal Speaker',
      role: 'Engineer / Developer Advocate',
      company: 'Modal',
      avatarUrl: '',
      bio: 'Representing Modal.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Opening workshop hosted by Modal. Topic: TBD. Hosted in the University Union (Room: TBD).',
  },
  {
    id: 'sat-workshop-2-gde',
    time: '02:30 PM',
    endTime: '03:15 PM',
    title: 'Workshop 2: GDE Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#4285F4',
    accent: '#4285F4',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Technical workshop hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
  },
  {
    id: 'sat-workshop-3-gde',
    time: '03:30 PM',
    endTime: '04:15 PM',
    title: 'Workshop 3: GDE Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#EA4335',
    accent: '#EA4335',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    bufferAfterMinutes: 45,
    bufferDescription: 'Buffer before dinner',
    desc: 'Technical workshop hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
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
     - Continues till 10:00 PM
     - In University Union (Room: TBD)
     - At least 15 min buffer between each
     - GDE workshops
     ======================================================================= */
  {
    id: 'sat-workshop-4-gde',
    time: '07:00 PM',
    endTime: '07:45 PM',
    title: 'Workshop 4: GDE Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#FBBC05',
    accent: '#FBBC05',
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
    title: 'Workshop 5: GDE Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#34A853',
    accent: '#34A853',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: '15-minute buffer before next workshop',
    desc: 'Technical workshop hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
  },
  {
    id: 'sat-workshop-6-gde',
    time: '09:00 PM',
    endTime: '09:45 PM',
    title: 'Workshop 6: GDE Workshop',
    topic: 'TBD',
    room: 'University Union (Room: TBD)',
    category: 'workshop',
    isWorkshop: true,
    badge: 'Google Developer Expert',
    badgeColor: '#4285F4',
    accent: '#4285F4',
    speaker: {
      name: 'Google Developer Expert',
      role: 'Google Developer Expert',
      company: 'Google Developer Experts',
      avatarUrl: '',
      bio: 'Recognized expert by Google.',
    },
    bufferAfterMinutes: 15,
    bufferDescription: 'Workshops conclude; return to STEM Innovation Center',
    desc: 'Final workshop of the day hosted by a Google Developer Expert. Topic: TBD. Hosted in the University Union (Room: TBD).',
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
