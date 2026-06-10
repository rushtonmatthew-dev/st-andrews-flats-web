import type { Metadata } from "next";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import { formatAgentName } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New St Andrews Listings — Daily letting digest",
  description:
    "Every new St Andrews student letting that has appeared in the last 14 days, organised by day. The same content as the daily digest email, live on the web.",
  alternates: { canonical: "https://www.standrewsflats.uk/listings" },
  openGraph: {
    title: "New St Andrews Listings — Daily letting digest",
    description:
      "Every new St Andrews student letting from the last 14 days, organised by day.",
    url: "https://www.standrewsflats.uk/listings",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/images/site/og-image.png" }],
  },
};

type Listing = {
  id: string;
  title: string | null;
  price: string | null;
  bedrooms: string | null;
  scraper_name: string;
  first_seen_at: string;
  url: string | null;
};

type DayGroup = {
  label: string;
  iso: string;
  listings: Listing[];
};

function formatDayLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (d.getTime() === today.getTime()) return "Today";
  if (d.getTime() === yesterday.getTime()) return "Yesterday";

  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function toUKDate(isoString: string): string {
  const d = new Date(isoString);
  // Use UK timezone offset approximation (UTC+0 or UTC+1 during BST)
  // Simple approach: use toLocaleDateString with London timezone
  return d
    .toLocaleDateString("en-GB", { timeZone: "Europe/London" })
    .split("/")
    .reverse()
    .join("-");
}

async function getRecentListings(): Promise<DayGroup[]> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 14);

  const { data, error } = await getSupabase()
    .from("seen_listings")
    .select("id, title, price, bedrooms, scraper_name, first_seen_at, url")
    .gte("first_seen_at", cutoff.toISOString())
    .order("first_seen_at", { ascending: false })
    .limit(500);

  if (error) throw new Error("Database error");

  const rows = (data ?? []) as Listing[];

  const grouped = new Map<string, Listing[]>();
  for (const row of rows) {
    const key = toUKDate(row.first_seen_at);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(row);
  }

  return Array.from(grouped.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([iso, listings]) => ({
      iso,
      label: formatDayLabel(iso),
      listings,
    }));
}

function ListingCard({ listing }: { listing: Listing }) {
  const agent = formatAgentName(listing.scraper_name);
  const time = new Date(listing.first_seen_at).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });

  return (
    <div
      className="rounded-[16px] p-5 flex flex-col gap-2"
      style={{
        background: "var(--white)",
        border: "1px solid var(--cream-dark)",
      }}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span
          className="px-2.5 py-1 rounded-full font-semibold"
          style={{
            fontSize: 11,
            background: "var(--coral-lt)",
            color: "var(--coral)",
          }}
        >
          {agent}
        </span>
        <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>{time}</span>
      </div>

      <p
        className="font-semibold leading-snug"
        style={{ fontSize: 14, color: "var(--ink)" }}
      >
        {listing.title ?? "Untitled listing"}
      </p>

      <div className="flex items-center gap-3 flex-wrap">
        {listing.price && (
          <span
            className="font-bold"
            style={{ fontSize: 14, color: "var(--ink)" }}
          >
            {listing.price}
          </span>
        )}
        {listing.bedrooms && (
          <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
            {listing.bedrooms}
          </span>
        )}
      </div>

      {listing.url && (
        <a
          href={listing.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium mt-1"
          style={{ fontSize: 13, color: "var(--coral)" }}
        >
          View listing
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default async function ListingsPage() {
  let groups: DayGroup[] = [];
  let loadError = false;

  try {
    groups = await getRecentListings();
  } catch {
    loadError = true;
  }

  const totalListings = groups.reduce((n, g) => n + g.listings.length, 0);

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
            Daily digest
          </p>
          <h1
            className="font-extrabold mb-2"
            style={{
              fontSize: "clamp(28px, 3vw, 38px)",
              color: "var(--ink)",
              letterSpacing: "-0.03em",
            }}
          >
            New Listings
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
            Every property that has appeared across all monitored agents in the last 14 days,
            updated continuously.
            {!loadError && totalListings > 0 && (
              <> {totalListings} listings found.</>
            )}
          </p>
        </div>

        {loadError ? (
          <div
            className="text-center p-10 rounded-[20px]"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <p style={{ color: "var(--ink-soft)" }}>
              Could not load listings. Please try again later.
            </p>
          </div>
        ) : groups.length === 0 ? (
          <div
            className="text-center p-10 rounded-[20px]"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <p style={{ color: "var(--ink-soft)" }}>
              No listings found in the last 14 days.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {groups.map((group) => (
              <section key={group.iso}>
                <div className="flex items-center gap-4 mb-4">
                  <h2
                    className="font-extrabold"
                    style={{
                      fontSize: 18,
                      color: "var(--ink)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {group.label}
                  </h2>
                  <span
                    className="px-2.5 py-1 rounded-full font-semibold"
                    style={{
                      fontSize: 12,
                      background: "var(--cream-mid)",
                      color: "var(--ink-soft)",
                    }}
                  >
                    {group.listings.length} new
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <div
          className="mt-12 rounded-[20px] p-8 flex items-center justify-between gap-8 flex-wrap"
          style={{ background: "var(--coral)" }}
        >
          <div>
            <h2
              className="font-extrabold text-white mb-2"
              style={{ fontSize: 20, letterSpacing: "-0.025em" }}
            >
              Get these as a daily email
            </h2>
            <p style={{ fontSize: 14, color: "oklch(88% 0.06 42)", lineHeight: 1.65 }}>
              Subscribe for a morning digest of new listings, or instant alerts the moment
              a property appears.
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

      </div>
    </main>
  );
}
