import Link from "next/link";
import { WeeklyChart, DayOfWeekChart, HourChart, AgentChart } from "./charts";

type AnalyticsData = {
  total: number;
  last_30_days: number;
  peak_day: string;
  top_agent: string;
  by_week: { week: string; count: number }[];
  by_day_of_week: { day: string; count: number }[];
  by_hour: { hour: number; count: number }[];
  by_agent: { agent: string; count: number }[];
};

async function getAnalytics(): Promise<AnalyticsData | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/analytics`, { next: { revalidate: 900 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Market Insights</h1>
          <p className="text-gray-500 mt-1">
            When do St Andrews lettings come to market? Data builds up over time — check back weekly for richer trends.
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
            {/* KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <KpiCard label="Total seen" value={data.total.toLocaleString()} />
              <KpiCard label="Last 30 days" value={data.last_30_days} />
              <KpiCard label="Most active agent" value={data.top_agent} />
              <KpiCard label="Peak day" value={data.peak_day} />
            </div>

            {/* Charts */}
            <div className="space-y-6">
              <WeeklyChart data={data.by_week} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <DayOfWeekChart data={data.by_day_of_week} />
                <HourChart data={data.by_hour} />
              </div>
              <AgentChart data={data.by_agent} />
            </div>

            <p className="text-xs text-gray-400 text-center mt-8">
              Updated every 15 minutes. Times shown in UTC.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
