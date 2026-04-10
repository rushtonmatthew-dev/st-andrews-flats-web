import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function PATCH(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { token, sub_type, max_price, min_bedrooms, max_bedrooms } = body as {
    token?: string;
    sub_type?: string;
    max_price?: number | null;
    min_bedrooms?: number | null;
    max_bedrooms?: number | null;
  };

  if (!token) {
    return Response.json({ error: "Token required" }, { status: 400 });
  }

  const validTypes = ["instant", "daily", "both"];
  const updates: Record<string, unknown> = {};

  if (sub_type && validTypes.includes(sub_type)) updates.sub_type = sub_type;
  if (max_price !== undefined) updates.max_price = max_price ?? null;
  if (min_bedrooms !== undefined) updates.min_bedrooms = min_bedrooms ?? null;
  if (max_bedrooms !== undefined) updates.max_bedrooms = max_bedrooms ?? null;

  if (Object.keys(updates).length === 0) {
    return Response.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("subscribers")
    .update(updates)
    .eq("unsubscribe_token", token)
    .is("unsubscribed_at", null)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("[manage] error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Invalid token" }, { status: 404 });
  }

  return Response.json({ message: "updated" });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return Response.json({ error: "Token required" }, { status: 400 });
  }

  const { data, error } = await getSupabase()
    .from("subscribers")
    .select("sub_type, max_price, min_bedrooms, max_bedrooms")
    .eq("unsubscribe_token", token)
    .is("unsubscribed_at", null)
    .maybeSingle();

  if (error) {
    console.error("[manage] get error:", error);
    return Response.json({ error: "Database error" }, { status: 500 });
  }

  if (!data) {
    return Response.json({ error: "Invalid token" }, { status: 404 });
  }

  return Response.json(data);
}
