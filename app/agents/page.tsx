import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Student Letting Agents — Full guide for students",
  description:
    "A complete guide to every letting agent we monitor in St Andrews, including what they cover, typical response times, and what to expect from each.",
  alternates: { canonical: "https://www.standrewsflats.uk/agents" },
  openGraph: {
    title: "St Andrews Student Letting Agents — Full guide for students",
    description:
      "A complete guide to every letting agent we monitor in St Andrews — what they list, how fast they move, and what to expect.",
    url: "https://www.standrewsflats.uk/agents",
    type: "website",
    siteName: "St Andrews Flats",
  },
};

const agents = [
  {
    name: "Lawson Thompson",
    website: "lawsonthompson.co.uk",
    description:
      "Lawson Thompson is a family-run, St Andrews-specialist letting agency and consistently the most active student lettings agent in the town. They manage a large portfolio of student properties and have a strong reputation for responsiveness. Properties typically list in January–February for the following September, though mid-year listings do appear. Our data shows them as the most frequently active agent for new listings.",
    priceRange: "£700–£1,100/person/mo",
    bedsTypical: "1–5 bed",
    speed: "Very fast (days)",
    verdict: "Essential. Check daily during peak season (Jan–Feb).",
    verdictColor: "green",
  },
  {
    name: "DJ Alexander",
    website: "djalexander.co.uk",
    description:
      "DJ Alexander is one of Scotland's largest letting agencies, with a dedicated St Andrews branch. They cover a broad price range and tend to list both student and professional properties. Worth monitoring for larger or more centrally located flats.",
    priceRange: "£700–£1,200/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Fast (days to a week)",
    verdict: "Worth checking alongside Lawson Thompson.",
    verdictColor: "green",
  },
  {
    name: "Studentpad",
    website: "standrewsstudentpad.co.uk",
    description:
      "Studentpad is the University of St Andrews' own private accommodation search engine, listing properties from private landlords who have agreed to certain standards. It is the first place many St Andrews landlords advertise, making it essential to monitor. Particularly popular for shared houses and international students. Free to search.",
    priceRange: "£500–£850/person/mo",
    bedsTypical: "2–6 bed shared",
    speed: "Moderate (days to weeks)",
    verdict: "Essential — University-backed platform, often has exclusives.",
    verdictColor: "green",
  },
  {
    name: "Lettingweb",
    website: "lettingweb.com",
    description:
      "Lettingweb is a Scottish property portal that aggregates listings from multiple agents across Scotland. Some St Andrews agents list simultaneously here alongside their own sites. Lower overall volume than the main agents, but occasionally has properties not listed elsewhere.",
    priceRange: "£600–£950/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Variable",
    verdict: "Low volume but worth checking for exclusives.",
    verdictColor: "blue",
  },
  {
    name: "Standys",
    website: "standys.co.uk",
    description:
      "Standys is a St Andrews-based student accommodation platform. Smaller volume than the main agencies but focused specifically on the student market, which means listings are relevant and the competition is real.",
    priceRange: "£550–£900/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Variable",
    verdict: "Niche but relevant — monitored alongside the bigger agents.",
    verdictColor: "blue",
  },
  {
    name: "St Andrews Property Lets",
    website: "standrewspropertylets.co.uk",
    description:
      "St Andrews Property Lets is a local agency focused specifically on the St Andrews market. They handle a mix of student and professional lets, and occasionally list properties not visible on the larger platforms.",
    priceRange: "£600–£1,000/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Variable",
    verdict: "Worth monitoring for local exclusives.",
    verdictColor: "blue",
  },
];

const verdictBg: Record<string, string> = {
  green: "bg-green-50 text-green-700",
  blue: "bg-blue-50 text-blue-700",
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          St Andrews letting agents — a student&apos;s guide
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Finding a flat in St Andrews means knowing which agents to watch. Here&apos;s a breakdown
          of every agent we monitor, and what to expect from each.
        </p>

        <div className="space-y-4">
          {agents.map((agent) => (
            <section key={agent.name} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2 className="text-xl font-semibold text-gray-900">{agent.name}</h2>
                <span className="text-xs text-gray-400 mt-1 flex-shrink-0">{agent.website}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{agent.description}</p>

              <div className="flex flex-wrap gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="text-gray-400">Price</span> {agent.priceRange}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="text-gray-400">Size</span> {agent.bedsTypical}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="text-gray-400">Moves</span> {agent.speed}
                </span>
              </div>

              <p className={`text-xs font-semibold px-3 py-2 rounded-lg inline-block ${verdictBg[agent.verdictColor]}`}>
                {agent.verdict}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Not sure which agent has the flat you&apos;re looking for?
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Our{" "}
            <Link href="/analytics" className="text-blue-600 underline">
              market insights page
            </Link>{" "}
            shows exactly when new listings appear, broken down by agent, day of week, and time
            of day — useful data during the peak January–March period.
          </p>
          <Link
            href="/subscribe"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Set up alerts — we monitor all 6 for you →
          </Link>
        </section>
      </div>
    </main>
  );
}
