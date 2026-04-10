import { getResend } from "./resend";

const FROM = process.env.RESEND_FROM_ADDRESS ?? "alerts@standrewsflats.com";
const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://standrewsflats.com";

export async function sendConfirmationEmail(
  email: string,
  confirmToken: string
) {
  const confirmUrl = `${BASE}/confirm?token=${confirmToken}`;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:10px;overflow:hidden;
                    box-shadow:0 1px 3px rgba(0,0,0,.1);max-width:100%;">
        <tr>
          <td style="background:#1d4ed8;padding:24px 32px;">
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;font-family:system-ui,sans-serif;">
              St Andrews Flats
            </h1>
            <p style="margin:4px 0 0;font-size:13px;color:#bfdbfe;">Confirm your email address</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;font-size:15px;color:#111827;font-family:system-ui,sans-serif;">
              Thanks for signing up! Click the button below to confirm your email address and start receiving alerts.
            </p>
            <a href="${confirmUrl}"
               style="display:inline-block;padding:12px 24px;background:#1d4ed8;color:#fff;
                      font-size:15px;font-weight:600;border-radius:8px;text-decoration:none;
                      font-family:system-ui,sans-serif;">
              Confirm my email
            </a>
            <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;font-family:system-ui,sans-serif;">
              If you didn't sign up for St Andrews Flats alerts, you can safely ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await getResend().emails.send({
    from: FROM,
    to: [email],
    subject: "Confirm your St Andrews Flats alerts",
    html,
  });
}
