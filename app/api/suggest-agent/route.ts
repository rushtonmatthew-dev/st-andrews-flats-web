import { NextRequest } from "next/server";
import { getResend } from "@/lib/resend";

const FROM  = process.env.RESEND_FROM_ADDRESS ?? "alerts@standrewsflats.com";
const OWNER = process.env.OWNER_EMAIL ?? "rushton.matthew@gmail.com";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const suggestion = (body.suggestion as string | undefined)?.trim();
  if (!suggestion || suggestion.length < 2) {
    return Response.json({ error: "Suggestion required" }, { status: 400 });
  }
  if (suggestion.length > 300) {
    return Response.json({ error: "Too long" }, { status: 400 });
  }

  try {
    await getResend().emails.send({
      from: FROM,
      to: [OWNER],
      subject: "Agent suggestion — StAndrewsFlats.uk",
      html: `<p style="font-family:system-ui,sans-serif;font-size:15px;color:#111827;">
        A visitor suggested a new letting agent to monitor:
      </p>
      <p style="font-family:system-ui,sans-serif;font-size:16px;font-weight:600;
                color:#1d4ed8;background:#eff6ff;padding:12px 16px;border-radius:8px;">
        ${suggestion.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </p>
      <p style="font-family:system-ui,sans-serif;font-size:12px;color:#9ca3af;">
        Submitted via standrewsflats.uk
      </p>`,
    });
  } catch (err) {
    console.error("[suggest-agent] email error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }

  return Response.json({ message: "received" }, { status: 200 });
}
