import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Letting Agents for Students | standrewsflats.uk",
  description:
    "A breakdown of every letting agent in St Andrews — what they list, typical prices, how fast properties move, and whether they're worth checking for student housing.",
};

const agents = [
  {
    name: "Lawson Thompson",
    slug: "lawson-thompson-st-andrews",
    description:
      "The largest dedicated letting agent in St Andrews. If you only check one agent, make it this one — they hold more student lets than anyone else in town. Properties go fast: most popular flats are under offer within 2–3 days of listing.",
    priceRange: "£650–£1,100/person/mo",
    bedsTypical: "1–5 bed",
    speed: "Very fast (days)",
    verdict: "Essential. Check daily during peak season (Oct–Nov).",
    verdictColor: "green",
  },
  {
    name: "DJ Alexander",
    slug: "dj-alexander-st-andrews",
    description:
      "National Scottish letting firm with a St Andrews office. Slightly more corporate than Lawson Thompson — they tend to list cleaner, more recently refurbished properties. A good source for 3rd- and 4th-year students wanting something a step up.",
    priceRange: "£700–£1,200/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Fast (days to a week)",
    verdict: "Worth checking alongside Lawson Thompson.",
    verdictColor: "green",
  },
  {
    name: "Studentpad",
    slug: "studentpad-st-andrews",
    description:
      "A student-specific platform used heavily by the university itself. Particularly popular with international students and those in their first year of private renting. Listings tend to be on the lower end of the price scale, with more shared house options.",
    priceRange: "£500–£800/person/mo",
    bedsTypical: "2–6 bed shared",
    speed: "Moderate (days to weeks)",
    verdict: "Good for shared houses and budget-conscious students.",
    verdictColor: "blue",
  },
  {
    name: "Rightmove",
    slug: "rightmove-st-andrews",
    description:
      "Not a letting agent but an aggregator — it pulls listings from Lawson Thompson, DJ Alexander, and others. Useful for a quick combined view, but you'll often see the same properties duplicated. Can't substitute for checking the agents directly.",
    priceRange: "Varies (aggregated)",
    bedsTypical: "All sizes",
    speed: "Depends on source agent",
    verdict: "Useful for a quick sweep but not a primary source.",
    verdictColor: "gray",
  },
  {
    name: "Lettingweb",
    slug: "lettingweb-st-andrews",
    description:
      "A Scottish letting portal with lower volume in St Andrews than the main agents. Worth a look because it occasionally carries listings that don't appear on Rightmove or the agents' own sites — particularly for smaller private landlords.",
    priceRange: "£550–£900/person/mo",
    bedsTypical: "1–4 bed",
    speed: "Variable",
    verdict: "Low volume but check for exclusives not listed elsewhere.",
    verdictColor: "blue",
  },
  {
    name: "S1Homes",
    slug: "s1homes-st-andrews",
    description:
      "Scottish classifieds site. The smallest source for St Andrews lets — most listings here are from private landlords rather than agencies. Volume is low but prices are sometimes lower too, and you deal directly with the owner.",
    priceRange: "£480–£750/person/mo",
    bedsTypical: "1–3 bed",
    speed: "Variable",
    verdict: "Worth a look for private landlord deals.",
    verdictColor: "gray",
  },
];

const verdictBg: Record<string, string> = {
  green: "bg-green-50 text-green-700",
  blue: "bg-blue-50 text-blue-700",
  gray: "bg-gray-100 text-gray-600",
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          St Andrews Letting Agents — Student Guide
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Six agents, one small town. Here&apos;s what each one covers, how fast they move, and whether they&apos;re worth your time.
        </p>

        <div className="space-y-4">
          {agents.map((agent) => (
            <section key={agent.slug} className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{agent.name}</h2>
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

        {/* CTA */}
        <section className="mt-6 bg-blue-600 rounded-xl p-6 text-white">
          <h2 className="text-xl font-semibold mb-2">We monitor all 6 every 15 minutes</h2>
          <p className="text-blue-100 leading-relaxed mb-4">
            Instead of checking each agent separately, let us do it for you. Get emailed the moment a new listing appears on any of these sites — free, no account needed.
          </p>
          <Link
            href="/subscribe"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Set up free alerts →
          </Link>
        </section>
      </div>
    </main>
  );
}
