import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Student Housing Guide 2025 | standrewsflats.uk",
  description:
    "Everything St Andrews University students need to know about finding a flat — timelines, best streets, what agents to use, and how to beat other students to a listing.",
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          The St Andrews Student Housing Guide
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Everything you need to find a flat in St Andrews — from when to start looking to how to beat 300 other students to the same listing.
        </p>

        <div className="space-y-6">

          {/* Timeline */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">When to start looking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              St Andrews has roughly 10,000 students and a very limited housing stock — which means the market moves faster than almost any other university town in the UK. If you wait until January, most of the good flats are gone.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Month</th>
                    <th className="text-left py-2 text-gray-700">What&apos;s happening</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["October", "Letting agents start listing next year's properties. This is when the rush begins for 2nd years."],
                    ["November", "Peak viewings. Most popular flats get snapped up within days of listing."],
                    ["December", "Good flats are largely gone. Competition drops but so does choice."],
                    ["January", "Last-chance stragglers — often less desirable or pricier properties."],
                    ["February+", "Private landlords and overflow listings only. Very slim pickings."],
                  ].map(([month, desc]) => (
                    <tr key={month}>
                      <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">{month}</td>
                      <td className="py-2.5 text-gray-600">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Areas */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Best areas and streets for St Andrews students</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              St Andrews is small enough that nowhere is truly far from the university — but some areas are more popular (and more expensive) than others.
            </p>
            <div className="space-y-4">
              {[
                {
                  area: "North Street & South Street",
                  desc: "The most central streets, minutes from the main buildings. Popular with 4th-year students who want walkable convenience. Expect to pay a premium — these are the most sought-after addresses in town.",
                },
                {
                  area: "Murray Park & The Scores",
                  desc: "Quieter side streets near the sea cliffs. Great views, slightly cheaper than the main streets, and still very central. Popular with 3rd and 4th years.",
                },
                {
                  area: "Lade Braes & Argyle Street",
                  desc: "Best value in town. A 10-minute walk from lectures, these streets offer larger flats at lower prices per person. Very popular with 3rd years moving out of halls for the first time.",
                },
                {
                  area: "KY16 postcodes",
                  desc: "All St Andrews rental properties sit within the KY16 postcode. When searching, use KY16 to filter specifically to St Andrews and avoid nearby towns like Cupar or Anstruther.",
                },
              ].map(({ area, desc }) => (
                <div key={area}>
                  <h3 className="font-semibold text-gray-800 mb-1">{area}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Prices */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How much does renting in St Andrews cost?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              St Andrews is one of the more expensive places to rent as a student in Scotland. Prices vary significantly by area, property size, and whether bills are included.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { type: "Studio / 1-bed", price: "£700–£1,000/mo" },
                { type: "Shared flat (per room)", price: "£550–£850/mo" },
                { type: "Larger house (per room)", price: "£500–£700/mo" },
              ].map(({ type, price }) => (
                <div key={type} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{type}</p>
                  <p className="text-lg font-bold text-gray-900">{price}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Bills are rarely included. Budget an extra £80–£120/month for gas, electricity, and broadband in a shared flat.
            </p>
          </section>

          {/* Agents */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Which letting agents cover St Andrews?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              There are six main sources for St Andrews student accommodation. Each moves at a different speed and covers slightly different properties.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                ["Lawson Thompson", "Largest dedicated St Andrews agent. Fast-moving — listings go within days."],
                ["DJ Alexander", "National firm with a St Andrews branch. Solid mid-range and professional lets."],
                ["Studentpad", "Student-specific platform. Popular for shared houses, good for international students."],
                ["Rightmove", "Aggregator — pulls listings from multiple agents. Good for search, not for exclusives."],
                ["Lettingweb", "Scottish portal. Lower volume but occasionally has properties not listed elsewhere."],
                ["S1Homes", "Scottish classifieds. Worth checking for private landlord listings."],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="font-semibold text-gray-800 whitespace-nowrap">{name} —</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/agents"
              className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Full agent breakdown →
            </Link>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Be first when a flat appears</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We check all 6 letting agents every 15 minutes and email you the moment a new listing goes live. Free, no account needed.
            </p>
            <Link
              href="/subscribe"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Set up free alerts →
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}
