interface Env {
  RESEND_API_KEY?: string;
}

interface EmailRequest {
  to: string;
  name: string;
  type: 'hacker' | 'judge';
}

const LOGO_URL = 'https://hackgb.com/hackgb-logo-white.png';
const DECISION_DATE = 'early October 2026';

/* ── Shared email scaffolding ─────────────────────────────── */

function emailWrapper(headerSubtitle: string, bodyContent: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f0f2f5;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Email container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);text-align:left;">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background:linear-gradient(145deg,#0a2f28 0%,#0C3C34 40%,#145740 100%);padding:0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:36px 40px 20px;text-align:center;">
                    <img src="${LOGO_URL}" alt="HackGB" width="160" style="display:inline-block;margin:0 auto;max-width:160px;height:auto;border:0;outline:none;" />
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 40px 8px;text-align:center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                      <tr>
                        <td style="background:rgba(97,166,68,0.2);border:1px solid rgba(97,166,68,0.35);border-radius:20px;padding:5px 16px;">
                          <span style="color:#8fd473;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${headerSubtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 40px 6px;text-align:center;">
                    <p style="color:rgba(255,255,255,0.55);font-size:12px;margin:0;letter-spacing:0.3px;">October 17–18, 2026 · STEM Innovation Center · UW–Green Bay</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 40px 0;text-align:center;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(97,166,68,0.4),transparent);"></div>
                  </td>
                </tr>
                <tr>
                  <td style="height:28px;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ BODY ═══ -->
          <tr>
            <td style="padding:36px 40px 24px;background-color:#ffffff;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="padding:0 40px;background-color:#ffffff;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#e0e0e0,transparent);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 20px;text-align:center;background-color:#ffffff;">
              <!-- Social links -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://www.instagram.com/hack.gb/" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">Instagram</a>
                  </td>
                  <td style="color:#ccc;font-size:12px;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://www.facebook.com/hackgb" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">Facebook</a>
                  </td>
                  <td style="color:#ccc;font-size:12px;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://www.linkedin.com/showcase/hackgb/" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">LinkedIn</a>
                  </td>
                  <td style="color:#ccc;font-size:12px;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://hackgb.com" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">Website</a>
                  </td>
                </tr>
              </table>
              <p style="color:#999;font-size:12px;margin:0 0 6px;line-height:1.6;">
                Questions? Contact us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:600;">info@hackgb.com</a>
              </p>
              <p style="color:#bbb;font-size:11px;margin:0;line-height:1.5;">
                © 2026 HackGB · University of Wisconsin–Green Bay
              </p>
            </td>
          </tr>
          <tr>
            <td style="height:8px;background-color:#ffffff;"></td>
          </tr>

        </table>

        <!-- Below-card note -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:16px 20px 0;text-align:center;">
              <p style="color:#aaa;font-size:10px;margin:0;">
                You're receiving this because you submitted an application on hackgb.com
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/* ── Judge email ──────────────────────────────────────────── */

function buildJudgeEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];

  const body = `
    <p style="color:#1a1a1a;font-size:17px;margin:0 0 22px;font-weight:600;line-height:1.4;">
      Hello ${firstName},
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      Thank you for applying to serve as a judge for <strong style="color:#0C3C34;">HackGB 2026</strong> at the University of Wisconsin–Green Bay.
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      We have successfully received your application and appreciate your interest in supporting student innovation and entrepreneurship. Our organizing team will review your application, professional experience, and areas of expertise as part of our selection process.
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 22px;">
      HackGB will take place on <strong style="color:#0C3C34;">October 17–18, 2026</strong> at the <strong style="color:#0C3C34;">STEM Innovation Center at UW–Green Bay</strong>, bringing together students from across the region for a weekend of building, learning, and collaboration.
    </p>

    <!-- Info card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:linear-gradient(135deg,#f6faf4 0%,#edf5ea 100%);border:1px solid #d4e8cc;border-radius:14px;padding:22px 24px;">
          <p style="color:#0C3C34;font-size:13px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:0.8px;">If selected, you will receive details on:</p>
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Judging schedule and logistics</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Event agenda and judging criteria</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Parking and campus information</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Travel reimbursement or accommodations (if applicable)</td></tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Decision date badge -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;display:inline-table;">
            <tr>
              <td style="background:#0C3C34;border-radius:10px;padding:12px 24px;text-align:center;">
                <p style="color:rgba(255,255,255,0.65);font-size:11px;margin:0 0 2px;letter-spacing:0.5px;text-transform:uppercase;">Decisions expected by</p>
                <p style="color:#ffffff;font-size:15px;font-weight:700;margin:0;">${DECISION_DATE}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      If you have any questions in the meantime, please feel free to contact us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:600;">info@hackgb.com</a>.
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 28px;">
      Thank you again for your willingness to support the next generation of builders and innovators. We hope to welcome you to HackGB this fall.
    </p>

    <!-- Sign-off -->
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-top:1px solid #eee;padding-top:20px;width:100%;">
      <tr>
        <td style="text-align:left;">
          <p style="color:#1a1a1a;font-size:14px;font-weight:600;margin:0 0 2px;">Best regards,</p>
          <p style="color:#666;font-size:13px;margin:0 0 1px;">HackGB Organizing Team</p>
          <p style="color:#999;font-size:12px;margin:0;">University of Wisconsin–Green Bay</p>
        </td>
      </tr>
    </table>`;

  return {
    subject: 'HackGB 2026 — Judge Application Received',
    html: emailWrapper('Judge Application Received', body),
  };
}

/* ── Hacker email ─────────────────────────────────────────── */

function buildHackerEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];

  const body = `
    <p style="color:#1a1a1a;font-size:17px;margin:0 0 22px;font-weight:600;line-height:1.4;">
      Hello ${firstName},
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      Thank you for applying to participate in <strong style="color:#0C3C34;">HackGB 2026</strong>!
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      We're excited that you're interested in joining us at the University of Wisconsin–Green Bay for a weekend of building, learning, and innovation alongside students from across the region and beyond.
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 22px;">
      We have successfully received your application and our team will review submissions as we work to build an engaging and diverse hacker community for our inaugural event.
    </p>

    <!-- Event details card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;">
      <tr>
        <td style="background:#0C3C34;border-radius:14px;padding:22px 24px;">
          <p style="color:#8fd473;font-size:11px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:1.2px;">Event Details</p>
          <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.7);font-size:13px;width:80px;vertical-align:top;">Date</td>
              <td style="padding:4px 0;color:#ffffff;font-size:13.5px;font-weight:600;">October 17–18, 2026</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.7);font-size:13px;vertical-align:top;">Location</td>
              <td style="padding:4px 0;color:#ffffff;font-size:13.5px;font-weight:600;">STEM Innovation Center, UW–Green Bay</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.7);font-size:13px;vertical-align:top;">Website</td>
              <td style="padding:4px 0;"><a href="https://hackgb.com" style="color:#8fd473;font-size:13.5px;font-weight:600;text-decoration:none;">hackgb.com</a></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- What's next card -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td style="background:linear-gradient(135deg,#f6faf4 0%,#edf5ea 100%);border:1px solid #d4e8cc;border-radius:14px;padding:22px 24px;">
          <p style="color:#0C3C34;font-size:13px;font-weight:700;margin:0 0 14px;text-transform:uppercase;letter-spacing:0.8px;">Selected participants will receive info on:</p>
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Admission decisions and confirmation deadlines</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Travel reimbursement opportunities (if available)</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Event schedule and workshops</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Team formation resources</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;Parking, housing, and campus logistics</td></tr>
            <tr><td style="padding:4px 0;color:#3a6b32;font-size:13.5px;line-height:1.5;">✦&nbsp;&nbsp;What to bring and how to prepare</td></tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Decision date badge -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto;display:inline-table;">
            <tr>
              <td style="background:#0C3C34;border-radius:10px;padding:12px 24px;text-align:center;">
                <p style="color:rgba(255,255,255,0.65);font-size:11px;margin:0 0 2px;letter-spacing:0.5px;text-transform:uppercase;">Decisions begin releasing by</p>
                <p style="color:#ffffff;font-size:15px;font-weight:700;margin:0;">${DECISION_DATE}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 18px;">
      If you have any questions in the meantime, please don't hesitate to reach out to us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:600;">info@hackgb.com</a>.
    </p>
    <p style="color:#444;font-size:14.5px;line-height:1.75;margin:0 0 28px;">
      Thank you again for your interest in being part of the first-ever HackGB. We look forward to reviewing your application and hope to see you in Green Bay this October.
    </p>

    <!-- Sign-off -->
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-top:1px solid #eee;padding-top:20px;width:100%;">
      <tr>
        <td style="text-align:left;">
          <p style="color:#1a1a1a;font-size:14px;font-weight:600;margin:0 0 2px;">Best regards,</p>
          <p style="color:#666;font-size:13px;margin:0 0 1px;">HackGB Organizing Team</p>
          <p style="color:#888;font-size:12px;margin:0 0 1px;">HackGB 2026 · University of Wisconsin–Green Bay</p>
          <p style="color:#999;font-size:12px;margin:0;">
            <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;">info@hackgb.com</a>
            &nbsp;·&nbsp;
            <a href="https://hackgb.com" style="color:#61A644;text-decoration:none;">hackgb.com</a>
          </p>
        </td>
      </tr>
    </table>`;

  return {
    subject: 'HackGB 2026 — Application Received!',
    html: emailWrapper('Application Received', body),
  };
}

/* ── Cloudflare Pages Function handler ────────────────────── */

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

    let resendResponse = await fetch('https://api.resend.com/emails', {
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

    let result: any = await resendResponse.json();

    // Fallback: If domain is not verified in Resend, retry sending using the onboarding@resend.dev sandbox domain
    if (!resendResponse.ok && (resendResponse.status === 403 || (result.message && result.message.toLowerCase().includes('verified domain')))) {
      console.warn('Domain hackgb.com is not verified in Resend. Retrying using onboarding@resend.dev fallback...');
      resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HackGB <onboarding@resend.dev>',
          to: [body.to],
          subject,
          html,
          reply_to: 'info@hackgb.com',
        }),
      });
      result = await resendResponse.json();
    }

    if (!resendResponse.ok) {
      console.error('Resend API error:', result);
      return new Response(
        JSON.stringify({ error: result.message || 'Failed to send email.' }),
        { status: resendResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Send notification email to info@hackgb.com (non-blocking)
    const adminSubject = `[Notification] New ${body.type === 'judge' ? 'Judge' : 'Hacker'} Application - ${body.name}`;
    const adminHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0C3C34; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Application Submitted</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.to}</p>
        <p><strong>Role:</strong> ${body.type === 'judge' ? 'Judge' : 'Hacker'}</p>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">Submitted at: ${new Date().toISOString()}</p>
      </div>
    `;

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HackGB System <info@hackgb.com>',
        to: ['info@hackgb.com'],
        subject: adminSubject,
        html: adminHtml,
        reply_to: body.to,
      }),
    }).then(async (adminRes) => {
      if (!adminRes.ok) {
        const errObj: any = await adminRes.json().catch(() => ({}));
        if (adminRes.status === 403 || (errObj.message && errObj.message.toLowerCase().includes('verified domain'))) {
          console.warn('Admin domain not verified. Retrying admin email via onboarding@resend.dev...');
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'HackGB System <onboarding@resend.dev>',
              to: ['info@hackgb.com'],
              subject: adminSubject,
              html: adminHtml,
              reply_to: body.to,
            }),
          });
        }
      }
    }).catch((adminErr) => {
      console.error('Failed to send admin notification email:', adminErr);
    });

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
