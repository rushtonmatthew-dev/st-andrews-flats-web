import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return Response.json({ error: "Token required" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("subscribers")
    .update({ confirmed: true, confirm_token: null })
    .eq("confirm_token", token)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[confirm] error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Invalid or expired token" }, { status: 404 });
  }

  return Response.redirect(new URL("/confirm?success=1", req.url));
}
