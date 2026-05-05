import type { Metadata } from "next";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";
import SuggestAgentForm from "@/components/SuggestAgentForm";

export const metadata: Metadata = {
  title: "St Andrews Student Letting Alerts — Free flat alerts for St Andrews students",
  description:
    "Free letting alerts for St Andrews University students. We check Studentpad, DJ Alexander, Lawson Thompson, Lettingweb, Standys, 55Rent and more every 15 minutes — and email you the moment a new flat appears.",
  alternates: { canonical: "https://www.standrewsflats.uk/" },
  openGraph: {
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 7 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    url: "https://www.standrewsflats.uk/",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/images/site/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 7 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    images: ["https://www.standrewsflats.uk/images/site/og-image.png"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "St Andrews Flats — Letting Alerts",
  url: "https://www.standrewsflats.uk",
  description:
    "Free letting alerts for St Andrews University students. Monitors 7 letting agents every 15 minutes.",
  applicationCategory: "Utility",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
};

const AGENTS = [
  "Studentpad", "DJ Alexander", "Lawson Thompson",
  "Lettingweb", "Standys", "55Rent", "SA Property Lets",
];

const STEPS = [
  {
    n: "1",
    title: "Set your filters",
    body: "Choose a maximum price, number of bedrooms, and whether you want instant or daily digest alerts.",
  },
  {
    n: "2",
    title: "We scan every 15 minutes",
    body: "Our agents monitor all major St Andrews letting platforms around the clock, day and night.",
  },
  {
    n: "3",
    title: "Get alerted instantly",
    body: "The moment a matching property appears you get an email — before anyone else has seen it.",
  },
];

const FEATURES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Instant or daily alerts",
    body: "Choose the moment a listing appears or a morning digest — whatever suits your search style.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: "15-minute scan cycle",
    body: "Every 15 minutes, around the clock. No other service checks St Andrews agents this frequently.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    title: "Price & bedroom filters",
    body: "Set a maximum monthly rent and bedroom count — only get alerted when it matches your needs.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Completely free",
    body: "No ads, no premium tier, no data selling. A tool built to help St Andrews students find housing.",
  },
];

const FAQS = [
  {
    q: "When do St Andrews flats typically come to market?",
    a: "Most letting agents in St Andrews release their annual student listings in January and February for the following September. However, mid-year listings appear throughout the year — our market data shows Thursday mornings tend to be the most active time for new listings.",
  },
  {
    q: "How quickly will I be notified?",
    a: "We check all sources every 15 minutes. If you choose instant alerts, you'll get an email within 15 minutes of a new listing appearing. If you choose the daily digest, you'll get a morning roundup of everything new from the previous 24 hours.",
  },
  {
    q: "What price and bedroom filters should I set?",
    a: "Most St Andrews student properties are priced between £800 and £1,800/month for a shared flat. A typical 3-bedroom flat runs £1,000–£1,400/month. If you're unsure, start with a broad filter — you can always update it later.",
  },
  {
    q: "Is this really free? What's the catch?",
    a: "It's genuinely free — no ads, no premium tier, no data selling. It's a tool built to help St Andrews students find housing more easily. You can unsubscribe at any time with one click from any email.",
  },
];

const AVATAR_COLOURS = ["#E89B6B", "#5B7FA6", "#6DB58A", "#B56DBE", "#D4A959"];

export default async function Home() {
  const subscriberCount = await getSubscriberCount();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          className="text-center px-8"
          style={{ background: "var(--cream)", paddingTop: 80, paddingBottom: 72 }}
        >
          <div className="max-w-[640px] mx-auto">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-7"
              style={{ color: "var(--coral)", background: "var(--coral-lt)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--coral)" }}
              />
              Scanning every 15 minutes
            </span>

            <h1
              className="font-extrabold leading-[1.05] mb-5"
              style={{
                fontSize: "clamp(40px, 5.5vw, 60px)",
                letterSpacing: "-0.035em",
                color: "var(--ink)",
              }}
            >
              Stop refreshing.<br />
              <em className="not-italic" style={{ color: "var(--coral)" }}>
                We&apos;ve got it covered.
              </em>
            </h1>

            <p
              className="font-light leading-[1.7] max-w-[640px] mx-auto mb-9"
              style={{ fontSize: 17, color: "var(--ink-mid)" }}
            >
              Properties in St Andrews let within days. We check 7 letting agents every
              15 minutes and email you the moment something new hits the market — before
              anyone else sees it.
            </p>

            <form action="/subscribe" method="get" className="max-w-[440px] mx-auto mb-3">
              <div
                className="flex items-center gap-2 px-[22px] py-1.5 rounded-full"
                style={{
                  background: "var(--white)",
                  border: "1.5px solid var(--cream-dark)",
                }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  className="flex-1 border-none bg-transparent outline-none py-2.5"
                  style={{ fontSize: 15, color: "var(--ink)" }}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-white transition-colors"
                  style={{ fontSize: 14, background: "var(--coral)" }}
                >
                  Get alerts
                </button>
              </div>
            </form>

            <p className="mb-6" style={{ fontSize: 13, color: "var(--ink-faint)" }}>
              Free. No account needed. Unsubscribe any time.
            </p>

            <div className="flex items-center justify-center gap-3">
              <div className="flex" style={{ marginRight: 4 }}>
                {AVATAR_COLOURS.map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{
                      background: c,
                      borderColor: "var(--cream)",
                      marginLeft: i > 0 ? -10 : 0,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                {subscriberCount && subscriberCount >= 30
                  ? `Trusted by ${subscriberCount}+ St Andrews students`
                  : "Trusted by students across all year groups"}
              </span>
            </div>
          </div>
        </section>

        {/* ── Agents strip ──────────────────────────────────────────── */}
        <div
          className="px-8 py-4"
          style={{ background: "var(--cream-mid)", borderTop: "1px solid var(--cream-dark)", borderBottom: "1px solid var(--cream-dark)" }}
        >
          <div className="max-w-[1080px] mx-auto flex items-center gap-5 flex-wrap">
            <span
              className="font-bold uppercase tracking-widest whitespace-nowrap"
              style={{ fontSize: 11, color: "var(--ink-faint)" }}
            >
              Monitors
            </span>
            {AGENTS.map((a) => (
              <span
                key={a}
                className="px-3 py-1 rounded-full font-medium"
                style={{
                  fontSize: 12,
                  color: "var(--ink-mid)",
                  background: "var(--white)",
                  border: "1px solid var(--cream-dark)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* ── Stats row ──────────────────────────────────────────────── */}
        <div
          className="py-9 px-8"
          style={{ background: "var(--white)", borderBottom: "1px solid var(--cream-dark)" }}
        >
          <div className="stats-grid grid grid-cols-4 max-w-[1080px] mx-auto">
            {[
              { num: "15", suffix: "min", label: "Scan frequency" },
              { num: "7", label: "Agents monitored" },
              { num: "KY16", label: "Area coverage" },
              { num: "£0", label: "Cost — always" },
            ].map(({ num, suffix, label }, i, arr) => (
              <div
                key={label}
                className="text-center px-6"
                style={{ borderRight: i < arr.length - 1 ? "1px solid var(--cream-dark)" : "none" }}
              >
                <p
                  className="font-extrabold leading-none"
                  style={{ fontSize: 38, letterSpacing: "-0.04em", color: "var(--ink)" }}
                >
                  {num}
                  {suffix && <span style={{ color: "var(--coral)" }}>{suffix}</span>}
                </p>
                <p className="mt-1.5" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="px-8 py-24" style={{ background: "var(--cream)" }}>
          <div className="max-w-[1080px] mx-auto">
            <p
              className="font-bold uppercase tracking-widest mb-3"
              style={{ fontSize: 12, color: "var(--coral)" }}
            >
              How it works
            </p>
            <h2
              className="font-extrabold mb-12"
              style={{
                fontSize: "clamp(28px, 3vw, 38px)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Three steps to never miss a flat
            </h2>
            <div className="steps-grid grid grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="rounded-[20px] p-8 hover:-translate-y-1 hover:shadow-xl transition-all"
                  style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
                >
                  <div
                    className="w-9 h-9 rounded-[12px] flex items-center justify-center font-extrabold mb-5"
                    style={{ fontSize: 14, background: "var(--coral-lt)", color: "var(--coral)" }}
                  >
                    {s.n}
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: 16, color: "var(--ink)", letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.65 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features grid ──────────────────────────────────────────── */}
        <section className="px-8 pb-24" style={{ background: "var(--cream)" }}>
          <div className="features-grid grid grid-cols-2 gap-4 max-w-[1080px] mx-auto">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-[20px] p-8 hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
              >
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-5"
                  style={{ background: "var(--coral-lt)", color: "var(--coral)" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: 16, color: "var(--ink)", letterSpacing: "-0.02em" }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.65 }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Urgency CTA ────────────────────────────────────────────── */}
        <section className="px-8 mb-24">
          <div
            className="relative rounded-[24px] overflow-hidden py-[60px] px-14 max-w-[1080px] mx-auto"
            style={{ background: "var(--coral)" }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: 280,
                height: 280,
                top: -70,
                right: -70,
                border: "40px solid white",
                opacity: 0.08,
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 200,
                height: 200,
                bottom: -80,
                right: 120,
                border: "30px solid white",
                opacity: 0.08,
              }}
            />
            <div className="urgency-inner flex items-center justify-between gap-8 relative">
              <div>
                <p
                  className="font-bold uppercase tracking-widest mb-3"
                  style={{ fontSize: 11, color: "oklch(90% 0.06 42)" }}
                >
                  Don&apos;t wait
                </p>
                <h2
                  className="font-extrabold text-white mb-3"
                  style={{ fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.03em" }}
                >
                  Flat hunting season opens in January
                </h2>
                <p style={{ fontSize: 15, color: "oklch(88% 0.06 42)", lineHeight: 1.65 }}>
                  Popular KY16 listings often go within hours. Set up your alert now and
                  be first in line.
                </p>
              </div>
              <Link
                href="/subscribe"
                className="urgency-btn flex-shrink-0 font-bold rounded-full px-7 py-4 transition-colors whitespace-nowrap"
                style={{ background: "var(--white)", color: "var(--coral)", fontSize: 15 }}
              >
                Set up free alerts →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────── */}
        <section className="px-8 py-24" style={{ background: "var(--white)" }}>
          <div className="faq-inner grid max-w-[1080px] mx-auto">
            <div>
              <p
                className="font-bold uppercase tracking-widest mb-3"
                style={{ fontSize: 12, color: "var(--coral)" }}
              >
                FAQ
              </p>
              <h2
                className="font-extrabold mb-4"
                style={{ fontSize: "clamp(24px, 2.5vw, 32px)", letterSpacing: "-0.03em", color: "var(--ink)" }}
              >
                Questions & answers
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.7 }}>
                Everything you need to know about the service before signing up.
              </p>
            </div>
            <div>
              {FAQS.map(({ q, a }) => (
                <details
                  key={q}
                  className="group"
                  style={{ borderTop: "1px solid var(--cream-dark)" }}
                >
                  <summary
                    className="flex items-center justify-between py-4 cursor-pointer font-semibold list-none"
                    style={{ fontSize: 15, color: "var(--ink)" }}
                  >
                    {q}
                    <span
                      className="ml-4 flex-shrink-0 font-bold transition-transform group-open:rotate-45"
                      style={{ fontSize: 20, color: "var(--ink-faint)" }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="pb-5"
                    style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    {a}
                  </p>
                </details>
              ))}

              <details
                className="group"
                style={{ borderTop: "1px solid var(--cream-dark)", borderBottom: "1px solid var(--cream-dark)" }}
              >
                <summary
                  className="flex items-center justify-between py-4 cursor-pointer font-semibold list-none"
                  style={{ fontSize: 15, color: "var(--ink)" }}
                >
                  Which letting agents do you monitor?
                  <span
                    className="ml-4 flex-shrink-0 font-bold transition-transform group-open:rotate-45"
                    style={{ fontSize: 20, color: "var(--ink-faint)" }}
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5">
                  <p
                    className="mb-3"
                    style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}
                  >
                    We monitor Studentpad, DJ Alexander, Lawson Thompson, Lettingweb, Standys,
                    55Rent, and St Andrews Property Lets — all the main agents active in St Andrews.
                  </p>
                  <SuggestAgentForm />
                </div>
              </details>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
