interface Env {
  RESEND_API_KEY?: string;
}

interface EmailRequest {
  to: string;
  name: string;
  type: 'hacker' | 'judge';
}

function buildHackerEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];
  return {
    subject: '🎉 HackGB 2026 — Application Received!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0C3C34 0%,#1a5c4a 100%);padding:40px 40px 32px;text-align:center;">
              <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px;font-weight:700;">HackGB 2026</h1>
              <p style="color:#61A644;font-size:14px;margin:0;font-weight:600;letter-spacing:1px;">APPLICATION RECEIVED</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="color:#1a1a1a;font-size:18px;margin:0 0 20px;font-weight:600;">Hey ${firstName}! 👋</p>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 20px;">
                Thank you for applying to <strong>HackGB 2026</strong>! We've received your hacker application and our team is reviewing it.
              </p>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Here's what happens next:
              </p>
              <!-- Steps -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;margin-bottom:8px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>1.</strong> Our team reviews your application</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>2.</strong> You'll receive an acceptance or waitlist email</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>3.</strong> Confirm your attendance and get ready to hack!</p>
                  </td>
                </tr>
              </table>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 8px;">
                In the meantime, follow us on social media for updates and announcements.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #eee;text-align:center;">
              <p style="color:#999;font-size:12px;margin:0 0 8px;">
                Questions? Reply to this email or reach out at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;">info@hackgb.com</a>
              </p>
              <p style="color:#bbb;font-size:11px;margin:0;">
                © 2026 HackGB · University of Wisconsin-Green Bay
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

function buildJudgeEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];
  return {
    subject: '🎉 HackGB 2026 — Judge Application Received!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0C3C34 0%,#1a5c4a 100%);padding:40px 40px 32px;text-align:center;">
              <h1 style="color:#ffffff;font-size:28px;margin:0 0 8px;font-weight:700;">HackGB 2026</h1>
              <p style="color:#61A644;font-size:14px;margin:0;font-weight:600;letter-spacing:1px;">JUDGE APPLICATION RECEIVED</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="color:#1a1a1a;font-size:18px;margin:0 0 20px;font-weight:600;">Hello ${firstName}! 👋</p>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 20px;">
                Thank you for your interest in judging at <strong>HackGB 2026</strong>! We've received your application and our organizing team is reviewing it.
              </p>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Here's what to expect:
              </p>
              <!-- Steps -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>1.</strong> Our team reviews your application and credentials</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>2.</strong> You'll receive a confirmation email with event details</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f0faf0;border-radius:10px;">
                    <p style="margin:0;color:#0C3C34;font-size:14px;"><strong>3.</strong> Judging guidelines and schedule will be shared closer to the event</p>
                  </td>
                </tr>
              </table>
              <p style="color:#4a4a4a;font-size:15px;line-height:1.7;margin:0 0 8px;">
                We truly appreciate your willingness to share your expertise with our hackers. Your involvement makes HackGB a better experience for everyone.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #eee;text-align:center;">
              <p style="color:#999;font-size:12px;margin:0 0 8px;">
                Questions? Reply to this email or reach out at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;">info@hackgb.com</a>
              </p>
              <p style="color:#bbb;font-size:11px;margin:0;">
                © 2026 HackGB · University of Wisconsin-Green Bay
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'RESEND_API_KEY is not configured.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body: EmailRequest = await request.json();

    if (!body.to || !body.name || !body.type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, name, type.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { subject, html } =
      body.type === 'judge' ? buildJudgeEmail(body.name) : buildHackerEmail(body.name);

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HackGB <info@hackgb.com>',
        to: [body.to],
        subject,
        html,
        reply_to: 'info@hackgb.com',
      }),
    });

    const result: any = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', result);
      return new Response(
        JSON.stringify({ error: result.message || 'Failed to send email.' }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ status: 'sent', id: result.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Send-email handler error:', error);
    const errMsg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
