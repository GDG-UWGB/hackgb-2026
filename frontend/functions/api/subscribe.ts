interface Env {
  RESEND_API_KEY?: string;
  RESEND_AUDIENCE_ID?: string;
}

interface SubscribeRequest {
  email: string;
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
    const body: SubscribeRequest = await request.json();
    if (!body.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: email.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const email = body.email.trim();

    // 1. If RESEND_AUDIENCE_ID is configured, add to Resend Audience Contact List
    let resendAudienceResult: any = null;
    let audienceSuccess = false;
    if (env.RESEND_AUDIENCE_ID) {
      try {
        const resendRes = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            unsubscribed: false,
          }),
        });

        resendAudienceResult = await resendRes.json();
        audienceSuccess = resendRes.ok;
        if (!resendRes.ok) {
          console.error('Failed to add contact to Resend Audience:', resendAudienceResult);
        }
      } catch (audienceErr) {
        console.error('Error connecting to Resend Audience API:', audienceErr);
      }
    }

    // 2. Send notification email to info@hackgb.com
    const adminSubject = `[Notification] New Waitlist Signup - ${email}`;
    const adminHtml = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eee; border-radius: 12px;">
        <h2 style="color: #0C3C34; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">New Waitlist Signup</h2>
        <p>A new user has requested to be notified when HackGB 2026 applications open.</p>
        <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #61A644; text-decoration: none;">${email}</a></p>
        ${env.RESEND_AUDIENCE_ID ? `<p><strong>Resend Contact Sync:</strong> ${audienceSuccess ? 'Success' : 'Failed'}</p>` : ''}
        <p style="color: #888; font-size: 11px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">Submitted at: ${new Date().toLocaleString()}</p>
      </div>
    `;

    let emailSent = false;
    try {
      let emailRes = await fetch('https://api.resend.com/emails', {
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
          reply_to: email,
        }),
      });

      let emailResult: any = await emailRes.json();

      // Retry using onboarding@resend.dev sandbox domain if necessary
      if (!emailRes.ok && (emailRes.status === 403 || (emailResult.message && emailResult.message.toLowerCase().includes('verified domain')))) {
        emailRes = await fetch('https://api.resend.com/emails', {
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
            reply_to: email,
          }),
        });
      }
      emailSent = emailRes.ok;
    } catch (emailErr) {
      console.error('Failed to send waitlist notification email:', emailErr);
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        audienceSynced: audienceSuccess,
        notificationSent: emailSent,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Subscribe handler error:', error);
    const errMsg = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
