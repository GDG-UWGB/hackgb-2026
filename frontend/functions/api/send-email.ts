interface Env {
  RESEND_API_KEY?: string;
}

interface EmailRequest {
  to: string;
  name: string;
  type: 'hacker' | 'judge';
}

const LOGO_URL = 'https://hackgb.com/hackgb-logo-dark.png';
const DECISION_DATE = 'early September 2026';

/* ── Shared email scaffolding ─────────────────────────────── */

function emailWrapper(headerSubtitle: string, bodyContent: string): string {
  const filename = headerSubtitle.toLowerCase().replace(/\s+/g, '_') + '.md';
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0;padding:0;background-color:#eff6eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#eff6eb;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Mock IDE Window Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid rgba(12,60,52,0.15);border-radius:12px;overflow:hidden;box-shadow:0 8px 30px rgba(12,60,52,0.06);">

          <!-- ═══ IDE Top Window Title Bar ═══ -->
          <tr>
            <td style="background-color:rgba(12,60,52,0.04);border-bottom:1px solid rgba(12,60,52,0.1);padding:12px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- macOS control dots -->
                  <td width="50" style="vertical-align:middle;line-height:0;">
                    <span style="display:inline-block;width:9px;height:9px;background-color:#ff5f56;border-radius:50%;margin-right:6px;"></span>
                    <span style="display:inline-block;width:9px;height:9px;background-color:#ffbd2e;border-radius:50%;margin-right:6px;"></span>
                    <span style="display:inline-block;width:9px;height:9px;background-color:#27c93f;border-radius:50%;"></span>
                  </td>
                  <!-- Tab Filename -->
                  <td align="center" style="font-family:'Courier New',Courier,monospace;font-size:11px;color:#0C3C34;font-weight:bold;vertical-align:middle;">
                    📄 ${filename}
                  </td>
                  <!-- Editor Type label -->
                  <td width="50" align="right" style="font-family:'Courier New',Courier,monospace;font-size:9px;color:#61A644;font-weight:bold;vertical-align:middle;text-transform:uppercase;">
                    markdown
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ IDE File Subtitle Tab ═══ -->
          <tr>
            <td style="background-color:rgba(12,60,52,0.015);border-bottom:1px solid rgba(12,60,52,0.05);padding:14px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="HackGB" width="120" style="display:block;max-width:120px;height:auto;border:0;" />
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="background:rgba(97,166,68,0.12);border:1px solid rgba(97,166,68,0.2);border-radius:6px;padding:4px 10px;">
                          <span style="color:#3e7d23;font-family:'Courier New',Courier,monospace;font-size:10px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;">${headerSubtitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ BODY CONTENT (IDE Code Area) ═══ -->
          <tr>
            <td style="padding:32px 40px 24px;background-color:#ffffff;">
              ${bodyContent}
            </td>
          </tr>

          <!-- ═══ FOOTER DIVIDER ═══ -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background-color:rgba(12,60,52,0.08);"></div>
            </td>
          </tr>

          <!-- ═══ FOOTER SIGNATURE & LINKS ═══ -->
          <tr>
            <td style="padding:24px 40px 20px;text-align:center;background-color:#ffffff;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 auto 12px;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="https://www.instagram.com/hackgb_uwgb/" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">Instagram</a>
                  </td>
                  <td style="color:#ccc;font-size:12px;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://www.linkedin.com/company/hackgb/" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">LinkedIn</a>
                  </td>
                  <td style="color:#ccc;font-size:12px;">·</td>
                  <td style="padding:0 8px;">
                    <a href="https://hackgb.com" style="color:#61A644;text-decoration:none;font-size:12px;font-weight:600;">Website</a>
                  </td>
                </tr>
              </table>
              <p style="color:#666666;font-size:11px;margin:0 0 6px;line-height:1.5;">
                Have questions? Reach us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:bold;">info@hackgb.com</a>
              </p>
              <p style="color:#999999;font-size:10px;margin:0;line-height:1.4;">
                © 2026 HackGB · STEM Innovation Center · University of Wisconsin-Green Bay
              </p>
            </td>
          </tr>

          <!-- ═══ IDE Bottom Status Bar ═══ -->
          <tr>
            <td style="background-color:#0C3C34;color:#ffffff;padding:8px 20px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.3px;line-height:1;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="color:#8fd473;font-weight:bold;">● COMPILER: SUCCESS</td>
                  <td align="right" style="color:rgba(255,255,255,0.65);">UTF-8 · tty0 · Ln 1, Col 1</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Small below-card notice -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:16px 20px 0;text-align:center;">
              <p style="color:#a5bba0;font-size:10px;margin:0;font-family:sans-serif;">
                You are receiving this because an application was submitted on <a href="https://hackgb.com" style="color:#61A644;text-decoration:none;">hackgb.com</a>
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
    <p style="color:#1a1a1a;font-size:15px;margin:0 0 20px;font-weight:bold;line-height:1.4;">
      Hello ${firstName},
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      Thank you for applying to serve as a judge for <strong style="color:#0C3C34;">HackGB 2026</strong> at the University of Wisconsin–Green Bay.
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      We have successfully received your application and appreciate your interest in supporting student innovation and entrepreneurship. Our organizing team will review your application, professional experience, and areas of expertise as part of our selection process.
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 20px;">
      HackGB will take place on <strong style="color:#0C3C34;">October 17–18, 2026</strong> at the <strong style="color:#0C3C34;">STEM Innovation Center at UW–Green Bay</strong>.
    </p>

    <!-- Info card (Console Logs) -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td style="background-color:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #61A644;border-radius:6px;padding:20px;font-family:'Courier New',Courier,monospace;text-align:left;">
          <p style="color:#0C3C34;font-size:11px;font-weight:bold;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.8px;">[LOG] STAGES TO EXTRACT:</p>
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Judging schedule and logistics</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Event agenda and judging criteria</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Parking and campus directions</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Accommodations & details setup</td></tr>
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
              <td style="background-color:#fafafa;border:1px solid rgba(12,60,52,0.1);border-radius:8px;padding:12px 24px;text-align:center;">
                <p style="color:#666666;font-family:'Courier New',Courier,monospace;font-size:9px;margin:0 0 2px;letter-spacing:0.5px;text-transform:uppercase;">Decisions expected by</p>
                <p style="color:#0C3C34;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:bold;margin:0;">${DECISION_DATE}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      If you have any questions in the meantime, please feel free to contact us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:bold;">info@hackgb.com</a>.
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 24px;">
      Thank you again for your willingness to support the next generation of builders and innovators. We hope to welcome you to HackGB this fall.
    </p>

    <!-- Sign-off -->
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-top:1px solid #eeeeee;padding-top:16px;width:100%;">
      <tr>
        <td style="text-align:left;">
          <p style="color:#1a1a1a;font-size:13px;font-weight:bold;margin:0 0 2px;">Best regards,</p>
          <p style="color:#666;font-size:12px;margin:0 0 1px;">HackGB Organizing Team</p>
          <p style="color:#999;font-size:11px;margin:0;">University of Wisconsin–Green Bay</p>
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
    <p style="color:#1a1a1a;font-size:15px;margin:0 0 20px;font-weight:bold;line-height:1.4;">
      Hello ${firstName},
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      Thank you for applying to participate in <strong style="color:#0C3C34;">HackGB 2026</strong>!
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      We're excited that you're interested in joining us at the University of Wisconsin–Green Bay for a weekend of building, learning, and innovation alongside students from across the region and beyond.
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 20px;">
      We have successfully received your application and our team will review submissions as we work to build an engaging and diverse hacker community for our inaugural event.
    </p>

    <!-- Event details card (JSON output) -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 22px;">
      <tr>
        <td style="background-color:#0C3C34;border-radius:8px;padding:20px 24px;font-family:'Courier New',Courier,monospace;color:#ffffff;text-align:left;">
          <p style="color:#8fd473;font-size:11px;font-weight:bold;margin:0 0 12px;text-transform:uppercase;letter-spacing:1px;line-height:1;">$ cat event_details.json</p>
          <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.65);font-size:12px;width:100px;vertical-align:top;">"date":</td>
              <td style="padding:4px 0;color:#ffffff;font-size:12px;font-weight:bold;">"October 17–18, 2026",</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.65);font-size:12px;vertical-align:top;">"location":</td>
              <td style="padding:4px 0;color:#ffffff;font-size:12px;font-weight:bold;">"STEM Innovation Center",</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:rgba(255,255,255,0.65);font-size:12px;vertical-align:top;">"url":</td>
              <td style="padding:4px 0;"><a href="https://hackgb.com" style="color:#8fd473;font-size:12px;font-weight:bold;text-decoration:none;">"https://hackgb.com"</a></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- What's next card (Checklists) -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
      <tr>
        <td style="background-color:#fafafa;border:1px solid #e0e0e0;border-left:4px solid #61A644;border-radius:6px;padding:20px;font-family:'Courier New',Courier,monospace;text-align:left;">
          <p style="color:#0C3C34;font-size:11px;font-weight:bold;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.8px;">[LOG] TASKS_TO_CONFIRM:</p>
          <table role="presentation" cellspacing="0" cellpadding="0">
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Admission decisions & confirmation</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Travel reimbursement logistics</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Event schedule and workshops list</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] Team formation & Discord setup</td></tr>
            <tr><td style="padding:3px 0;color:#333333;font-size:12px;line-height:1.4;">[x] What to bring checklist</td></tr>
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
              <td style="background-color:#fafafa;border:1px solid rgba(12,60,52,0.1);border-radius:8px;padding:12px 24px;text-align:center;">
                <p style="color:#666666;font-family:'Courier New',Courier,monospace;font-size:9px;margin:0 0 2px;letter-spacing:0.5px;text-transform:uppercase;">Decisions begin releasing by</p>
                <p style="color:#0C3C34;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:bold;margin:0;">${DECISION_DATE}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 16px;">
      If you have any questions in the meantime, please don't hesitate to reach out to us at <a href="mailto:info@hackgb.com" style="color:#61A644;text-decoration:none;font-weight:bold;">info@hackgb.com</a>.
    </p>
    <p style="color:#444;font-size:13.5px;line-height:1.6;margin:0 0 24px;">
      Thank you again for your interest in being part of the first-ever HackGB. We look forward to reviewing your application and hope to see you in Green Bay this October.
    </p>

    <!-- Sign-off -->
    <table role="presentation" cellspacing="0" cellpadding="0" style="border-top:1px solid #eeeeee;padding-top:16px;width:100%;">
      <tr>
        <td style="text-align:left;">
          <p style="color:#1a1a1a;font-size:13px;font-weight:bold;margin:0 0 2px;">Best regards,</p>
          <p style="color:#666;font-size:12px;margin:0 0 1px;">HackGB Organizing Team</p>
          <p style="color:#999;font-size:11px;margin:0 0 2px;">HackGB 2026 · University of Wisconsin–Green Bay</p>
          <p style="color:#61A644;font-size:11px;margin:0;">
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
