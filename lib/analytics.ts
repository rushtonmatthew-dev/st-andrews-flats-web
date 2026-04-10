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

export type StreetCostEntry = {
  street: string;
  avg_per_person: number;  // £/month per bedroom
  avg_total: number;       // £/month total
  count: number;           // listings used in average
};

// ---------------------------------------------------------------------------
// Parsers
// ---------------------------------------------------------------------------

const STREET_TYPES = [
  "street", "road", "drive", "avenue", "place", "gardens", "garden",
  "crescent", "lane", "walk", "way", "close", "court", "terrace",
  "wynd", "square", "grove", "hill", "park", "view", "rise", "row",
  "gate", "path", "mews", "circus",
];

const STREET_RE = new RegExp(
  `([\\w'-]+(?:\\s+[\\w'-]+)*\\s+(?:${STREET_TYPES.join("|")}))`,
  "i"
);

export function extractStreet(title: string): string | null {
  if (!title) return null;
  // Strip leading "N bed/bedroom TYPE at/in" preambles from some scrapers
  const cleaned = title
    .replace(/^\d+\s+bed(?:room)?\s+[\w\s]+\s+(?:at|in|@)\s+/i, "")
    .replace(/^flat\s+[\w,]+\s+(?:at|in|@)\s+/i, "")
    .replace(/^(?:to rent|to let)[,:-]?\s*/i, "");

  const m = cleaned.match(STREET_RE);
  if (!m) return null;

  // Strip leading house number (e.g. "42 ") from the matched street
  const raw = m[1].replace(/^\d+[a-z]?\s+/i, "").trim();

  // Title-case
  return raw
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function parseMonthlyPrice(priceStr: string): number | null {
  if (!priceStr) return null;
  const digits = priceStr.replace(/,/g, "");
  const m = digits.match(/£\s*([\d.]+)/);
  if (!m) return null;
  const amount = parseFloat(m[1]);
  if (isNaN(amount) || amount <= 0) return null;
  const lower = priceStr.toLowerCase();
  // Weekly prices → monthly
  if (/\bweek\b|pw\b|p\/w/.test(lower)) return Math.round((amount * 52) / 12);
  return Math.round(amount);
}

export function parseBedrooms(bedsStr: string): number | null {
  if (!bedsStr) return null;
  if (/studio/i.test(bedsStr)) return 1;
  const m = bedsStr.match(/(\d+)\s*bed/i);
  if (m) return parseInt(m[1]);
  const n = parseInt(bedsStr);
  return !isNaN(n) && n > 0 && n < 20 ? n : null;
}

// ---------------------------------------------------------------------------
// Public colour helper (used in charts)
// ---------------------------------------------------------------------------

/** Interpolate a hex colour from blue→yellow→red for a 0-1 normalised value. */
export function costColour(norm: number): string {
  // blue (#1d4ed8) → amber (#f59e0b) → red (#dc2626)
  const stops = [
    [29, 78, 216],   // blue-700
    [245, 158, 11],  // amber-400
    [220, 38, 38],   // red-600
  ];
  const t = Math.min(1, Math.max(0, norm)) * (stops.length - 1);
  const lo = Math.floor(t);
  const hi = Math.min(stops.length - 1, lo + 1);
  const f = t - lo;
  const [r, g, b] = stops[lo].map((c, i) => Math.round(c + f * (stops[hi][i] - c)));
  return `rgb(${r},${g},${b})`;
}

// ---------------------------------------------------------------------------
// Timing analytics
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Street cost analytics
// ---------------------------------------------------------------------------

export async function getStreetCostData(): Promise<StreetCostEntry[]> {
  const { data, error } = await getSupabase()
    .from("seen_listings")
    .select("title, price, bedrooms")
    .not("title", "is", null)
    .not("price", "is", null)
    .not("bedrooms", "is", null);

  if (error) throw new Error("Database error");

  const streetMap = new Map<string, { totalPerPerson: number; totalPrice: number; count: number }>();

  for (const row of (data ?? []) as { title: string; price: string; bedrooms: string }[]) {
    const street = extractStreet(row.title);
    if (!street) continue;

    const monthly = parseMonthlyPrice(row.price);
    if (!monthly || monthly < 100 || monthly > 10000) continue;

    const beds = parseBedrooms(row.bedrooms);
    if (!beds) continue;

    const perPerson = Math.round(monthly / beds);
    const existing = streetMap.get(street);
    if (existing) {
      existing.totalPerPerson += perPerson;
      existing.totalPrice += monthly;
      existing.count++;
    } else {
      streetMap.set(street, { totalPerPerson: perPerson, totalPrice: monthly, count: 1 });
    }
  }

  return Array.from(streetMap.entries())
    .filter(([, v]) => v.count >= 1)
    .map(([street, v]) => ({
      street,
      avg_per_person: Math.round(v.totalPerPerson / v.count),
      avg_total: Math.round(v.totalPrice / v.count),
      count: v.count,
    }))
    .sort((a, b) => b.avg_per_person - a.avg_per_person);
}
