import type { Metadata } from "next";
import Link from "next/link";
import { getAnalyticsData, getStreetCostData, type AnalyticsData, type StreetCostEntry } from "@/lib/analytics";
import { WeeklyChart, DayOfWeekChart, HourChart, AgentChart, StreetHeatMap } from "./charts";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "St Andrews Letting Market Data — When do flats come to market?",
  description:
    "Live market data on St Andrews student lettings. When do flats come to market? Which agents list most? Data updated every 15 minutes.",
  alternates: { canonical: "https://www.standrewsflats.uk/analytics" },
  openGraph: {
    title: "St Andrews Lettings Market Data — Live insights",
    description:
      "When do flats come to market in St Andrews? Which agents list most? Real data, updated every 15 minutes.",
    url: "https://www.standrewsflats.uk/analytics",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function ukTimezoneLabel(): string {
  // Approximate BST check: last Sunday in March → last Sunday in October
  const now = new Date();
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  const stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  const isDST = now.getTimezoneOffset() < stdOffset;
  return isDST ? "BST (British Summer Time, UTC+1)" : "GMT (UK time, UTC+0)";
}

export default async function AnalyticsPage() {
  const tzLabel = ukTimezoneLabel();
  let data: AnalyticsData | null = null;
  let streetData: StreetCostEntry[] = [];
  try {
    [data, streetData] = await Promise.all([getAnalyticsData(), getStreetCostData()]);
  } catch {
    // handled below
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
          <p className="text-gray-500 mt-1 mb-3">
            Live data on the St Andrews private student lettings market. Tracks when new listings appear
            across all major letting agents — updated every 15 minutes. Data accumulates over time;
            check back weekly for richer trends.
          </p>
        </div>

        {!data ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <p className="text-gray-500">Could not load analytics data. Please try again later.</p>
          </div>
        ) : data.total < 20 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <p className="text-2xl mb-2">📈</p>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Building up data…</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              We&apos;ve seen {data.total} {data.total === 1 ? "property" : "properties"} so far. Charts will appear once we have
              enough data to show meaningful trends — usually a few weeks of scraping.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <KpiCard label="Total seen" value={data.total.toLocaleString()} />
              <KpiCard label="Last 30 days" value={data.last_30_days} />
              <KpiCard label="Most active agent" value={data.top_agent} />
              <KpiCard label="Peak day" value={data.peak_day} />
            </div>

            <div className="space-y-6">
              <WeeklyChart data={data.by_week} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DayOfWeekChart data={data.by_day_of_week} />
                <HourChart data={data.by_hour} />
              </div>
              <AgentChart data={data.by_agent} />
              {streetData.length > 0 && <StreetHeatMap data={streetData} />}
            </div>

            <p className="text-xs text-gray-400 text-center mt-8">
              Updated every 15 minutes. Times shown in {tzLabel}.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
