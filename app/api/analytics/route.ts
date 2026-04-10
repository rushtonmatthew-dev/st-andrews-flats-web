import { getAnalyticsData } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getAnalyticsData();
    return Response.json(data, {
      headers: { "Cache-Control": "public, max-age=900, stale-while-revalidate=900" },
    });
  } catch {
    return Response.json({ error: "Database error" }, { status: 500 });
  }
}
