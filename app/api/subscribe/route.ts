import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendConfirmationEmail } from "@/lib/emails";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, sub_type, max_price, min_bedrooms, max_bedrooms } = body as {
    email?: string;
    sub_type?: string;
    max_price?: number | null;
    min_bedrooms?: number | null;
    max_bedrooms?: number | null;
  };

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return Response.json({ error: "Valid email required" }, { status: 400 });
  }

  const validTypes = ["instant", "daily", "both"];
  const type = validTypes.includes(sub_type as string) ? sub_type : "both";

  const confirmToken = randomUUID();
  const unsubscribeToken = randomUUID();
  const db = getSupabase();

  const { data: existing } = await db
    .from("subscribers")
    .select("id, confirmed, unsubscribed_at")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    if (existing.confirmed && !existing.unsubscribed_at) {
      return Response.json({ message: "already_subscribed" }, { status: 200 });
    }
    const { error } = await db
      .from("subscribers")
      .update({
        sub_type: type,
        max_price: max_price ?? null,
        min_bedrooms: min_bedrooms ?? null,
        max_bedrooms: max_bedrooms ?? null,
        confirmed: false,
        confirm_token: confirmToken,
        unsubscribed_at: null,
      })
      .eq("id", existing.id);

    if (error) {
      console.error("[subscribe] update error:", error);
      return Response.json({ error: "Database error" }, { status: 500 });
    }
  } else {
    const { error } = await db.from("subscribers").insert({
      email,
      sub_type: type,
      max_price: max_price ?? null,
      min_bedrooms: min_bedrooms ?? null,
      max_bedrooms: max_bedrooms ?? null,
      confirm_token: confirmToken,
      unsubscribe_token: unsubscribeToken,
    });

    if (error) {
      console.error("[subscribe] insert error:", error);
      return Response.json({ error: "Database error" }, { status: 500 });
    }
  }

  try {
    await sendConfirmationEmail(email, confirmToken);
  } catch (err) {
    console.error("[subscribe] email error:", err);
    return Response.json({ error: "Failed to send confirmation email" }, { status: 500 });
  }

  return Response.json({ message: "confirmation_sent" }, { status: 201 });
}
