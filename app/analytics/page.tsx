import type { Metadata } from "next";
import Link from "next/link";
import { getAnalyticsData, getStreetCostData, type AnalyticsData, type StreetCostEntry } from "@/lib/analytics";
import { WeeklyChart, DayOfWeekChart, HourChart, AgentChart, StreetHeatMap } from "./charts";

export const dynamic = "force-dynamic";

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
    images: [{ url: "https://www.standrewsflats.uk/images/site/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

function KpiCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--cream-dark)",
        borderRadius: 16,
        padding: "20px 24px",
      }}
    >
      <p
        className="font-semibold uppercase tracking-wide mb-1"
        style={{ fontSize: 12, color: "var(--ink-soft)" }}
      >
        {label}
      </p>
      <p
        className="font-extrabold"
        style={{ fontSize: 32, color: "var(--ink)", letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        {value}
      </p>
    </div>
  );
}

function ukTimezoneLabel(): string {
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
    <main className="min-h-screen px-8 py-12" style={{ background: "var(--cream)" }}>
      <div className="max-w-[1080px] mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-block mb-5 font-medium"
            style={{ fontSize: 13, color: "var(--ink-soft)" }}
          >
            ← Back
          </Link>
          <p
            className="font-bold uppercase tracking-widest mb-2"
            style={{ fontSize: 12, color: "var(--coral)" }}
          >
            Live data
          </p>
          <h1
            className="font-extrabold mb-2"
            style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
          >
            Market Insights
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
            Live data on the St Andrews private student lettings market. Tracks when new listings appear
            across all major letting agents — updated every 15 minutes.
          </p>
        </div>

        {!data ? (
          <div
            className="text-center p-10"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)", borderRadius: 20 }}
          >
            <p style={{ color: "var(--ink-soft)" }}>Could not load analytics data. Please try again later.</p>
          </div>
        ) : data.total < 20 ? (
          <div
            className="text-center p-10"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)", borderRadius: 20 }}
          >
            <p className="text-2xl mb-2">📈</p>
            <h2
              className="font-bold mb-2"
              style={{ fontSize: 18, color: "var(--ink)" }}
            >
              Building up data…
            </h2>
            <p className="max-w-sm mx-auto" style={{ color: "var(--ink-soft)", fontSize: 14 }}>
              We&apos;ve seen {data.total} {data.total === 1 ? "property" : "properties"} so far.
              Charts will appear once we have enough data — usually a few weeks of scraping.
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

            <WeeklyChart data={data.by_week} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <DayOfWeekChart data={data.by_day_of_week} />
              <HourChart data={data.by_hour} />
            </div>
            <AgentChart data={data.by_agent} />
            {streetData.length >= 5 && <StreetHeatMap data={streetData} />}

            <p className="text-center mt-6" style={{ fontSize: 12, color: "var(--ink-faint)" }}>
              Updated every 15 minutes. Times shown in {tzLabel}.
            </p>

            <div
              className="mt-10 rounded-[20px] p-8 flex items-center justify-between gap-8 flex-wrap"
              style={{ background: "var(--coral)" }}
            >
              <div>
                <h2
                  className="font-extrabold text-white mb-2"
                  style={{ fontSize: 20, letterSpacing: "-0.025em" }}
                >
                  Set up a free alert
                </h2>
                <p style={{ fontSize: 14, color: "oklch(88% 0.06 42)", lineHeight: 1.65 }}>
                  Get notified within 15 minutes of a new St Andrews flat appearing.
                </p>
              </div>
              <Link
                href="/subscribe"
                className="font-bold rounded-full px-6 py-3 flex-shrink-0 transition-colors"
                style={{ background: "var(--white)", color: "var(--coral)", fontSize: 14 }}
              >
                Set up free alerts →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
