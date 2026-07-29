/**
 * Utility to check if an email address has already submitted an application
 * by querying the Google Apps Script endpoint linked to Google Sheets.
 * Supports individual endpoints per application type (hacker, judge, mentor).
 */

export async function checkDuplicateEmail(
  email: string,
  customCheckApiUrl?: string
): Promise<boolean> {
  const checkApiUrl = customCheckApiUrl || import.meta.env.VITE_CHECK_EMAIL_API_URL;

  if (!checkApiUrl || !email.trim()) {
    return false;
  }

  try {
    const res = await fetch(`${checkApiUrl}?email=${encodeURIComponent(email.trim().toLowerCase())}`);
    if (!res.ok) {
      return false;
    }
    const data = await res.json();
    return Boolean(data.exists);
  } catch (err) {
    console.warn('Duplicate email check failed, skipping validation:', err);
    return false;
  }
}
