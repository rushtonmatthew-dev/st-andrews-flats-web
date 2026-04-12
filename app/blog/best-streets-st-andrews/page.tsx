import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Streets for Students in St Andrews | standrewsflats.uk",
  description:
    "Which streets in St Andrews are best for student flats? From North Street to Lade Braes — a practical breakdown for 2nd, 3rd, and 4th-year students.",
};

export default function BestStreetsPost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Best Streets for Students in St Andrews
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">
          St Andrews is a small town — but where you live still makes a big difference to your day-to-day life and your monthly rent. Here&apos;s how the main areas break down.
        </p>

        <div className="space-y-6">

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">North Street &amp; South Street</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The two main streets running through the heart of St Andrews. Living here puts you within a 5-minute walk of the main university buildings, the library, and most of the good cafés and restaurants.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              These are the most prestigious student addresses in town — and the most expensive. Expect to pay a noticeable premium over equivalent flats a 10-minute walk away.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Best for:</strong> 4th-year students who want maximum convenience and don&apos;t mind paying for it. Less practical for 2nd years on a tight budget.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Murray Park &amp; The Scores</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              These quieter streets run along the clifftop and offer some of the best views in town — the North Sea on one side, the Old Course on the other. Properties here range from converted townhouses to modern flats.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Prices are slightly below North/South Street but still above average. The area attracts a mix of older students and postgraduates.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Best for:</strong> 3rd and 4th years who want a quieter setting without sacrificing centrality.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Lade Braes &amp; Argyle Street</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The best-value area for students. Lade Braes runs along a small river walk — it&apos;s genuinely pleasant, and the 10-minute walk into town isn&apos;t a hardship once you&apos;re used to it. Argyle Street and the surrounding roads are solidly residential with larger houses and flats than you&apos;ll find in the centre.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              This is where most 3rd-year students end up — big enough groups to fill a 4- or 5-bedroom house, lower rent per person, and still perfectly walkable to lectures.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Best for:</strong> Groups of 3–5 students in their 2nd or 3rd year looking for the best value in the KY16 postcode.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What to expect to pay by area</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-6 font-semibold text-gray-700">Area</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Typical rent per person/mo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["North Street / South Street", "£800–£1,100"],
                    ["Murray Park / The Scores", "£700–£950"],
                    ["Lade Braes / Argyle Street", "£550–£750"],
                    ["Outskirts / KY16 surrounds", "£480–£650"],
                  ].map(([area, price]) => (
                    <tr key={area}>
                      <td className="py-2.5 pr-6 text-gray-700">{area}</td>
                      <td className="py-2.5 font-medium text-gray-900">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">Estimates based on typical shared flat listings. Bills usually not included.</p>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Get notified the moment a flat appears on your target street</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We check every St Andrews letting agent every 15 minutes. Set up a free alert and you&apos;ll hear about new listings before most students even know they exist.
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
