import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Student Housing Guide — Everything you need to know",
  description:
    "A complete guide to finding private accommodation in St Andrews as a university student — when to search, which agents to use, what to pay, and how to avoid scams.",
  alternates: { canonical: "https://www.standrewsflats.uk/guide" },
  openGraph: {
    title: "St Andrews Student Housing Guide",
    description:
      "When to search, which agents to use, what to pay, and how to avoid scams — everything St Andrews students need to know about finding a flat.",
    url: "https://www.standrewsflats.uk/guide",
    type: "website",
    siteName: "St Andrews Flats",
  },
};

const CONTENTS = [
  "Why it's so competitive",
  "When to start looking",
  "How much does it cost?",
  "Which agents to use",
  "Avoiding scams",
  "Your tenant rights",
];

const AGENTS = [
  ["Lawson Thompson", "Specialist student agent — most active in the market"],
  ["DJ Alexander", "Large Scottish agent with a St Andrews branch"],
  ["Studentpad", "University's official private accommodation platform"],
  ["Lettingweb", "Scottish aggregator — good for monitoring"],
  ["Standys", "St Andrews-focused student platform"],
  ["55Rent", "Newer entrant with occasional exclusives"],
  ["SA Property Lets", "Local agency"],
];

const COSTS = [
  ["Studio / 1-bed", "£600–£1,000+/mo"],
  ["2-bed flat", "£900–£1,400/mo · £450–£700 per person"],
  ["3-bed flat", "£1,000–£1,800/mo · £350–£600 per person"],
  ["4–5 bed flat", "£1,400–£2,500/mo · £300–£500 per person"],
];

const TIMELINE = [
  ["Oct–Nov (first term)", "Form your flatmate group. Decide bedrooms, budget, and area. Set up alerts now."],
  ["January–February", "Critical window. Most agents release annual listings. Have your group ready and alerts active."],
  ["March onwards", "Best properties are gone. Range is narrower, prices may be higher."],
];

function Bullet({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 mb-2" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.65 }}>
      <span
        className="flex-shrink-0 rounded-full"
        style={{ width: 6, height: 6, background: "var(--coral)", marginTop: 7 }}
      />
      <span>{text}</span>
    </div>
  );
}

export default function GuidePage() {
  return (
    <main className="min-h-screen px-8 py-12" style={{ background: "var(--cream)" }}>
      <div
        className="guide-inner max-w-[1080px] mx-auto"
        style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 56 }}
      >
        {/* Main column */}
        <div>
          <Link
            href="/"
            className="inline-block mb-9 font-medium"
            style={{ fontSize: 13, color: "var(--ink-soft)" }}
          >
            ← Back to home
          </Link>

          <h1
            className="font-extrabold mb-3"
            style={{
              fontSize: "clamp(26px, 3vw, 36px)",
              color: "var(--ink)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            The St Andrews Student Housing Guide
          </h1>
          <p className="mb-10" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
            Finding a flat in St Andrews is genuinely hard. The town has 20,000 residents — more
            than half of them students. Properties let within days. Here&apos;s everything you need to know.
          </p>

          {/* Why competitive */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-3"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              Why St Andrews housing is so competitive
            </h2>
            <p className="mb-3" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}>
              St Andrews is one of the most constrained student housing markets in the UK.
              Over 10,000 students compete for private housing in a town with heavily restricted supply.
            </p>
            {[
              "A Fife Council cap on HMOs limits shared student housing supply",
              "Holiday lets and golf tourism remove long-term rental properties from the market",
              "The town is geographically isolated — Dundee is 14 miles away, Leuchars station requires a bus",
            ].map((t) => <Bullet key={t} text={t} />)}
          </section>

          {/* When to look */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-3"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              When to start looking
            </h2>
            <p className="mb-4" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}>
              The most common mistake: students don&apos;t start looking until spring — by which
              point the market for September is largely gone.
            </p>
            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--cream-dark)" }}>
              {TIMELINE.map(([period, action], i) => (
                <div
                  key={period}
                  className="flex"
                  style={{
                    borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--cream-dark)" : "none",
                    background: i % 2 === 0 ? "var(--white)" : "var(--cream)",
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      width: 200,
                      flexShrink: 0,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--ink)",
                      borderRight: "1px solid var(--cream-dark)",
                    }}
                  >
                    {period}
                  </div>
                  <div style={{ padding: "12px 16px", fontSize: 13, color: "var(--ink-mid)", lineHeight: 1.6 }}>
                    {action}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Costs */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-3"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              How much does it cost?
            </h2>
            <p className="mb-4" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}>
              St Andrews is the most expensive student rental market in Scotland.
            </p>
            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--cream-dark)" }}>
              {COSTS.map(([type, cost], i) => (
                <div
                  key={type}
                  className="flex"
                  style={{
                    borderBottom: i < COSTS.length - 1 ? "1px solid var(--cream-dark)" : "none",
                    background: i % 2 === 0 ? "var(--white)" : "var(--cream)",
                  }}
                >
                  <div
                    style={{ padding: "11px 16px", width: 180, flexShrink: 0, fontSize: 13, color: "var(--ink)", borderRight: "1px solid var(--cream-dark)" }}
                  >
                    {type}
                  </div>
                  <div style={{ padding: "11px 16px", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
                    {cost}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3" style={{ fontSize: 12, color: "var(--ink-faint)" }}>
              Utilities not included — budget £80–£120/person/month extra for gas, electricity, and broadband.
            </p>
          </section>

          {/* Agents */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-4"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              Which letting agents to use
            </h2>
            {AGENTS.map(([name, desc]) => (
              <div key={name} className="flex items-start gap-2 mb-2" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.65 }}>
                <span
                  className="flex-shrink-0 rounded-full"
                  style={{ width: 6, height: 6, background: "var(--coral)", marginTop: 7 }}
                />
                <span>
                  <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{name}</strong> — {desc}
                </span>
              </div>
            ))}
          </section>

          {/* Scams */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-3"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              Avoiding scams
            </h2>
            <p className="mb-3" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}>
              Students have lost thousands to accommodation scams. Protect yourself:
            </p>
            {[
              "Never pay a holding deposit without viewing the property in person",
              "Never transfer money to someone you have not met face to face",
              "Verify the landlord on the Scottish Landlord Register",
              "If a deal seems too good to be true, it is",
            ].map((t) => <Bullet key={t} text={t} />)}
          </section>

          {/* Rights */}
          <section
            className="rounded-[18px] p-7 mb-4"
            style={{ background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <h2
              className="font-extrabold mb-3"
              style={{ fontSize: 17, color: "var(--ink)", letterSpacing: "-0.02em" }}
            >
              Your rights as a tenant in Scotland
            </h2>
            <p className="mb-3" style={{ fontSize: 14, color: "var(--ink-mid)", lineHeight: 1.75 }}>
              Student renters in Scotland have strong protections under the Private Housing (Tenancies)
              (Scotland) Act 2016.
            </p>
            {[
              "You sign a Private Residential Tenancy with no fixed end date — you can leave with 28 days' notice",
              "Your landlord must give 84 days' notice to end your tenancy",
              "Your deposit must be held in a government-approved tenancy deposit scheme",
              "Your landlord must be registered on the Scottish Landlord Register",
            ].map((t) => <Bullet key={t} text={t} />)}
            <p className="mt-3" style={{ fontSize: 13, color: "var(--ink-soft)" }}>
              The Students&apos; Association offers a free lease-checking service. Use it before signing anything.
            </p>
          </section>

          {/* CTA */}
          <div
            className="rounded-[18px] p-8 flex items-center justify-between gap-6 flex-wrap"
            style={{ background: "var(--coral)" }}
          >
            <div>
              <p
                className="font-bold uppercase tracking-widest mb-2"
                style={{ fontSize: 11, color: "oklch(90% 0.06 42)" }}
              >
                Ready?
              </p>
              <h2
                className="font-extrabold text-white mb-2"
                style={{ fontSize: 20, letterSpacing: "-0.025em" }}
              >
                Set up alerts before January
              </h2>
              <p style={{ fontSize: 14, color: "oklch(88% 0.06 42)", lineHeight: 1.65 }}>
                The best thing you can do right now is get notified the moment a new flat appears.
              </p>
            </div>
            <Link
              href="/subscribe"
              className="font-extrabold rounded-full px-6 py-3 flex-shrink-0 transition-colors"
              style={{ background: "var(--white)", color: "var(--coral)", fontSize: 14 }}
            >
              Set up free alerts →
            </Link>
          </div>
        </div>

        {/* Sticky sidebar */}
        <div className="guide-sidebar" style={{ paddingTop: 88 }}>
          <div
            className="rounded-[16px] p-5"
            style={{ position: "sticky", top: 72, background: "var(--white)", border: "1px solid var(--cream-dark)" }}
          >
            <p
              className="font-bold uppercase tracking-widest mb-4"
              style={{ fontSize: 11, color: "var(--ink-faint)" }}
            >
              Contents
            </p>
            {CONTENTS.map((t, i) => (
              <div
                key={t}
                className="flex items-center gap-2 py-2"
                style={{
                  borderBottom: i < CONTENTS.length - 1 ? "1px solid var(--cream-mid)" : "none",
                  fontSize: 13,
                  color: "var(--ink-mid)",
                }}
              >
                <span
                  className="rounded-full flex-shrink-0"
                  style={{ width: 5, height: 5, background: "var(--cream-dark)" }}
                />
                {t}
              </div>
            ))}
            <Link
              href="/subscribe"
              className="block text-center font-bold text-white mt-5 py-2.5 rounded-full"
              style={{ background: "var(--coral)", fontSize: 13 }}
            >
              Set up free alerts →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
