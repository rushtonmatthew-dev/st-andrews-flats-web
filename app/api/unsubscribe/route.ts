import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return Response.json({ error: "Token required" }, { status: 400 });
  }

  const { error } = await getSupabase()
    .from("subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("unsubscribe_token", token)
    .is("unsubscribed_at", null);

  if (error) {
    console.error("[unsubscribe] error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }

  // Whether the token was valid or already unsubscribed, show success
  return Response.redirect(new URL("/unsubscribe?success=1", req.url));
}
