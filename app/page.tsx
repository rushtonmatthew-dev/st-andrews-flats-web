import type { Metadata } from "next";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "St Andrews Student Letting Alerts — Free flat alerts for St Andrews students",
  description:
    "Free letting alerts for St Andrews University students. We check Studentpad, DJ Alexander, Lawson Thompson, Lettingweb, Standys and more every 15 minutes — and email you the moment a new flat appears.",
  alternates: { canonical: "https://www.standrewsflats.uk/" },
  openGraph: {
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 6 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    url: "https://www.standrewsflats.uk/",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 6 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    images: ["https://www.standrewsflats.uk/og-image.png"],
  },
};

async function getSubscriberCount(): Promise<number | null> {
  try {
    const { count, error } = await getSupabase()
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .eq("confirmed", true)
      .is("unsubscribed_at", null);
    if (error) return null;
    return count;
  } catch {
    return null;
  }
}

const CHECK_ICON = (
  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

export default async function Home() {
  const subscriberCount = await getSubscriberCount();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="max-w-xl w-full">

        {/* Hero */}
        <div className="mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Free service
          </span>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Be first to know<br />when a St Andrews<br />flat appears.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Properties in St Andrews let within days. We check 6 letting agents every 15 minutes
            and email you the moment something new hits the market — before anyone else sees it.
          </p>

          {/* Social proof */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-6 mb-2">
            <span className="flex -space-x-1">
              <span className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white inline-block" />
              <span className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white inline-block" />
              <span className="w-6 h-6 rounded-full bg-sky-400 border-2 border-white inline-block" />
            </span>
            <span>
              {subscriberCount
                ? `Join ${subscriberCount}+ St Andrews students already subscribed`
                : "Used by students across St Andrews — join them for free"}
            </span>
          </div>

          {/* Urgency callout */}
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4">
            <strong>Flat hunting season typically opens in October.</strong> Popular KY16 listings
            often go within hours of appearing. Set up alerts now so you don't miss yours.
          </p>
        </div>

        {/* Feature list */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          St Andrews student accommodation — what we cover
        </h2>
        <ul className="space-y-3 mb-10">
          <li className="flex items-start gap-3 text-gray-700">
            {CHECK_ICON}
            <span>
              Monitors <strong>Studentpad, DJ Alexander, Lawson Thompson, Lettingweb,
              Standys</strong> and St Andrews Property Lets
            </span>
          </li>
          {[
            "Filter by maximum monthly price and number of bedrooms",
            "Instant alerts the moment a listing appears, or a daily morning roundup",
            "One-click unsubscribe in every email — always free, no account needed",
          ].map((f) => (
            <li key={f} className="flex items-start gap-3 text-gray-700">
              {CHECK_ICON}
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/subscribe"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl transition-colors"
        >
          Set up my alerts
        </Link>
        <p className="text-center text-sm text-gray-400 mt-4">
          Free. No account needed. Unsubscribe any time.
        </p>

        {/* Origin story */}
        <div className="mt-10 pt-8 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
          <p>
            St Andrews has one of the tightest student housing markets in the UK. Properties let
            within days — sometimes hours — of appearing online. We built this so you can stop
            refreshing letting agent websites and get on with your life.
          </p>
        </div>

        {/* FAQ */}
        <section className="mt-10 pt-8 border-t border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Frequently asked questions</h2>
          <div className="space-y-2">
            {[
              {
                q: "When do St Andrews flats typically come to market?",
                a: "Most letting agents in St Andrews release their annual student listings in January and February for the following September. However, mid-year listings appear throughout the year — our market data shows Thursday mornings tend to be the most active time for new listings. Set up instant alerts so you don't miss anything.",
              },
              {
                q: "Which letting agents do you monitor?",
                a: "We monitor Studentpad (the University's official private accommodation platform), DJ Alexander, Lawson Thompson, Lettingweb, Standys, and St Andrews Property Lets — all the main agents active in St Andrews.",
              },
              {
                q: "How quickly will I be notified?",
                a: "We check all sources every 15 minutes. If you choose instant alerts, you'll get an email within 15 minutes of a new listing appearing. If you choose the daily digest, you'll get a morning roundup of everything new from the previous 24 hours.",
              },
              {
                q: "What price and bedroom filters should I set?",
                a: "Most St Andrews student properties are priced between £800 and £1,800/month for a shared flat. A typical 3-bedroom flat runs £1,000–£1,400/month. If you're unsure, start with a broad filter — you can always update it later. Our market insights page shows current price distributions.",
              },
              {
                q: "Is this really free? What's the catch?",
                a: "It's genuinely free — no ads, no premium tier, no data selling. It's a tool built to help St Andrews students find housing more easily. You can unsubscribe at any time with one click from any email.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group border border-gray-200 rounded-lg bg-white overflow-hidden"
              >
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-gray-700 hover:bg-gray-50 list-none">
                  {q}
                  <span className="ml-3 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-4 pb-4 pt-1 text-sm text-gray-500 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
