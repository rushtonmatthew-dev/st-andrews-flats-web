import { getSupabase } from "./supabase";

export type AnalyticsData = {
  total: number;
  last_30_days: number;
  peak_day: string;
  top_agent: string;
  by_week: { week: string; count: number }[];
  by_day_of_week: { day: string; count: number }[];
  by_hour: { hour: number; count: number }[];
  by_agent: { agent: string; count: number }[];
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isoWeekLabel(date: Date): string {
  const tmp = new Date(date);
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 3 - ((tmp.getDay() + 6) % 7));
  const week1 = new Date(tmp.getFullYear(), 0, 4);
  const weekNum =
    1 +
    Math.round(
      ((tmp.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );
  return `${tmp.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  const { data, error } = await getSupabase()
    .from("seen_listings")
    .select("scraper_name, first_seen_at");

  if (error) throw new Error("Database error");

  const rows = (data ?? []) as { scraper_name: string; first_seen_at: string }[];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixteenWeeksAgo = new Date(now.getTime() - 16 * 7 * 24 * 60 * 60 * 1000);

  const weekBuckets: Map<string, number> = new Map();
  for (let w = 15; w >= 0; w--) {
    const d = new Date(now.getTime() - w * 7 * 24 * 60 * 60 * 1000);
    weekBuckets.set(isoWeekLabel(d), 0);
  }

  const dayOfWeekCounts = Array(7).fill(0) as number[];
  const hourCounts = Array(24).fill(0) as number[];
  const agentCounts: Map<string, number> = new Map();
  let last30 = 0;

  for (const row of rows) {
    const d = new Date(row.first_seen_at);
    if (d >= thirtyDaysAgo) last30++;
    if (d >= sixteenWeeksAgo) {
      const wk = isoWeekLabel(d);
      if (weekBuckets.has(wk)) weekBuckets.set(wk, (weekBuckets.get(wk) ?? 0) + 1);
    }
    dayOfWeekCounts[d.getDay()]++;
    hourCounts[d.getUTCHours()]++;
    agentCounts.set(row.scraper_name, (agentCounts.get(row.scraper_name) ?? 0) + 1);
  }

  const by_day_of_week = [1, 2, 3, 4, 5, 6, 0].map((i) => ({
    day: DAY_NAMES[i],
    count: dayOfWeekCounts[i],
  }));
  const by_hour = hourCounts.map((count, hour) => ({ hour, count }));
  const by_week = Array.from(weekBuckets.entries()).map(([week, count]) => ({
    week: week.replace(/^\d{4}-/, ""),
    count,
  }));
  const by_agent = Array.from(agentCounts.entries())
    .map(([agent, count]) => ({ agent, count }))
    .sort((a, b) => b.count - a.count);

  const peakDay = by_day_of_week.reduce((a, b) => (a.count >= b.count ? a : b));

  return {
    total: rows.length,
    last_30_days: last30,
    peak_day: peakDay.day,
    top_agent: by_agent[0]?.agent ?? "—",
    by_week,
    by_day_of_week,
    by_hour,
    by_agent,
  };
}
