// General purpose constants used across the application

export const Email = "contact@hackgb.com"
export const UpcomingEventsUrl = 'https://gdg.community.dev/gdg-on-campus-university-of-wisconsin-green-bay/#taz9mL2u80T'

// Target application opening date: Monday, July 27, 2026 at 12:00 PM (noon) CDT (17:00 UTC)
export const APPLICATIONS_OPEN_DATE = new Date('2026-07-27T17:00:00Z');
export const checkApplicationsOpen = () => new Date() >= APPLICATIONS_OPEN_DATE;
export const APPLICATIONS_OPEN = checkApplicationsOpen();

// Application status flags
export const JUDGE_APPLICATION_CLOSED = true;

// Event Date: HackGB kicks off Saturday, October 17, 2026 at 8:00 AM CDT
export const EVENT_START_DATE = new Date('2026-10-17T08:00:00-05:00');

// Application Deadlines:
// Priority deadline was October 2, 2026 at 11:59 PM CDT
export const PRIORITY_APPLICATION_DEADLINE = new Date('2026-10-02T23:59:59-05:00');
// Form remains open for rolling applications with limited review priority until the event
export const HACKER_APPLICATION_DEADLINE = new Date('2026-10-17T08:00:00-05:00');

export const checkPriorityDeadlinePassed = () => new Date() > PRIORITY_APPLICATION_DEADLINE;

export const ROLLING_APPLICATION_MESSAGE = {
  short: 'Priority closed Oct. 2 at 11:59 PM • Still accepting rolling applications with limited priority',
  full: 'Priority applications closed October 2 at 11:59 PM CDT. We are still accepting applications on a rolling, space-available basis with limited review priority.',
};
