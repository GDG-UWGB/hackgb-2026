// General purpose constants used across the application

export const Email = "contact@hackgb.com"
export const UpcomingEventsUrl = 'https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/#taz9mL2u80T'

// Target application opening date: Monday, July 27, 2026 at 12:00 PM (noon) CDT (17:00 UTC)
export const APPLICATIONS_OPEN_DATE = new Date('2026-07-27T17:00:00Z');

// Application status flags — All applications are now closed
export const ALL_APPLICATIONS_CLOSED = true;
export const HACKER_APPLICATION_CLOSED = true;
export const JUDGE_APPLICATION_CLOSED = true;
export const MENTOR_APPLICATION_CLOSED = true;

export const checkApplicationsOpen = () => !ALL_APPLICATIONS_CLOSED && new Date() >= APPLICATIONS_OPEN_DATE;
export const APPLICATIONS_OPEN = false;

// Event Date: HackGB kicks off Saturday, October 17, 2026 at 8:00 AM CDT
export const EVENT_START_DATE = new Date('2026-10-17T08:00:00-05:00');

// Application Deadlines:
// Priority deadline was October 2, 2026 at 11:59 PM CDT
export const PRIORITY_APPLICATION_DEADLINE = new Date('2026-10-02T23:59:59-05:00');
// Final applications closed October 9, 2026
export const HACKER_APPLICATION_DEADLINE = new Date('2026-10-09T00:00:00-05:00');

export const checkPriorityDeadlinePassed = () => true;

export const APPLICATIONS_CLOSED_MESSAGE = {
  short: 'Applications closed • Event kicks off Oct. 17',
  full: 'Applications for HackGB 2026 are now closed. Thank you to all who applied! See you at the hackathon on October 17–18, 2026.',
};

// Deprecated alias for backwards compatibility
export const ROLLING_APPLICATION_MESSAGE = APPLICATIONS_CLOSED_MESSAGE;

