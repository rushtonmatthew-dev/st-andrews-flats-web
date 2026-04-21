import { notFound } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { readdirSync } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
// No metadata — this page should not be indexed
export const metadata = { robots: "noindex, nofollow" };

// ── Helpers ───────────────────────────────────────────────────────────────────

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function OwnerPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const params = await searchParams;
  const ownerKey = process.env.OWNER_KEY;
  if (ownerKey && params.key !== ownerKey) notFound();

  const db = getSupabase();
  const now = new Date();
  const ago = (days: number) =>
    new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

  // ── Subscriber queries ────────────────────────────────────────────────────
  const [
    activeResult,
    pendingResult,
    unsubResult,
    newLast7Result,
    newLast30Result,
    subTypeResult,
    recentResult,
  ] = await Promise.all([
    db.from("subscribers").select("*", { count: "exact", head: true })
      .eq("confirmed", true).is("unsubscribed_at", null),
    db.from("subscribers").select("*", { count: "exact", head: true })
      .eq("confirmed", false).is("unsubscribed_at", null),
    db.from("subscribers").select("*", { count: "exact", head: true })
      .not("unsubscribed_at", "is", null),
    db.from("subscribers").select("*", { count: "exact", head: true })
      .eq("confirmed", true).is("unsubscribed_at", null).gte("created_at", ago(7)),
    db.from("subscribers").select("*", { count: "exact", head: true })
      .eq("confirmed", true).is("unsubscribed_at", null).gte("created_at", ago(30)),
    db.from("subscribers").select("sub_type")
      .eq("confirmed", true).is("unsubscribed_at", null),
    db.from("subscribers").select("email, created_at, sub_type")
      .eq("confirmed", true).is("unsubscribed_at", null)
      .order("created_at", { ascending: false }).limit(8),
  ]);

  const totalActive     = activeResult.count ?? 0;
  const totalPending    = pendingResult.count ?? 0;
  const totalUnsub      = unsubResult.count ?? 0;
  const newLast7        = newLast7Result.count ?? 0;
  const newLast30       = newLast30Result.count ?? 0;

  const subTypeCounts: Record<string, number> = {};
  for (const row of (subTypeResult.data ?? []) as { sub_type: string }[]) {
    const t = row.sub_type ?? "unknown";
    subTypeCounts[t] = (subTypeCounts[t] ?? 0) + 1;
  }

  type SubRow = { email: string; created_at: string; sub_type: string };
  const recentSubs = (recentResult.data ?? []) as SubRow[];

  // ── Listing queries ───────────────────────────────────────────────────────
  const [listingsTotalResult, listingsLast7Result, listingsLast30Result, agentResult] =
    await Promise.all([
      db.from("seen_listings").select("*", { count: "exact", head: true }),
      db.from("seen_listings").select("*", { count: "exact", head: true })
        .gte("first_seen_at", ago(7)),
      db.from("seen_listings").select("*", { count: "exact", head: true })
        .gte("first_seen_at", ago(30)),
      db.from("seen_listings").select("scraper_name")
        .gte("first_seen_at", ago(30)),
    ]);

  const totalListings   = listingsTotalResult.count ?? 0;
  const listingsLast7   = listingsLast7Result.count ?? 0;
  const listingsLast30  = listingsLast30Result.count ?? 0;

  const agentCounts: Record<string, number> = {};
  for (const row of (agentResult.data ?? []) as { scraper_name: string }[]) {
    agentCounts[row.scraper_name] = (agentCounts[row.scraper_name] ?? 0) + 1;
  }
  const agentRows = Object.entries(agentCounts)
    .sort((a, b) => b[1] - a[1]);

  // ── Blog post count ───────────────────────────────────────────────────────
  let blogPostCount = 0;
  try {
    const blogDir = path.join(process.cwd(), "app", "blog");
    blogPostCount = readdirSync(blogDir, { withFileTypes: true })
      .filter(e => e.isDirectory()).length;
  } catch { /* non-fatal */ }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-10">

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
            StAndrewsFlats.uk
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Site Status</h1>
          <p className="text-sm text-gray-400 mt-1">
            As of {now.toLocaleString("en-GB", {
              dateStyle: "long", timeStyle: "short", timeZone: "Europe/London",
            })}
          </p>
        </div>

        {/* Subscribers */}
        <Section title="Subscribers">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <Stat label="Active" value={totalActive} sub="confirmed + subscribed" />
            <Stat label="New (7d)" value={newLast7} />
            <Stat label="New (30d)" value={newLast30} />
            <Stat label="Pending" value={totalPending} sub="awaiting confirmation" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <Stat label="Unsubscribed" value={totalUnsub} />
            <Stat label="Instant alerts" value={subTypeCounts["instant"] ?? 0} />
            <Stat label="Daily digest" value={subTypeCounts["daily"] ?? 0} />
            <Stat label="Both" value={subTypeCounts["both"] ?? 0} />
          </div>

          {recentSubs.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pt-4 pb-2">
                Most recent sign-ups
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {recentSubs.map((s) => (
                    <tr key={s.email} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-700 font-mono text-xs">{s.email}</td>
                      <td className="px-4 py-2 text-gray-400 text-xs whitespace-nowrap">
                        {s.sub_type}
                      </td>
                      <td className="px-4 py-2 text-gray-400 text-xs whitespace-nowrap text-right">
                        {s.created_at
                          ? new Date(s.created_at).toLocaleDateString("en-GB", {
                              day: "numeric", month: "short", year: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Listings / scraper */}
        <Section title="Listings seen (all time)">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Stat label="Total" value={totalListings.toLocaleString()} />
            <Stat label="Last 7 days" value={listingsLast7} />
            <Stat label="Last 30 days" value={listingsLast30} />
          </div>

          {agentRows.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pt-4 pb-2">
                By agent (last 30 days)
              </p>
              <table className="w-full text-sm">
                <tbody>
                  {agentRows.map(([agent, count]) => (
                    <tr key={agent} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-700">{agent}</td>
                      <td className="px-4 py-2 text-gray-500 text-right">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Content */}
        <Section title="Content">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="Blog posts" value={blogPostCount} />
          </div>
        </Section>

      </div>
    </main>
  );
}
