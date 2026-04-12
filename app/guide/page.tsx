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

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          The St Andrews student housing guide
        </h1>
        <p className="text-gray-500 mt-1 mb-8">
          Finding a flat in St Andrews is genuinely hard. The town has a population of around 20,000
          — and more than half of them are students. Properties let within days of appearing.
          Here&apos;s everything you need to know.
        </p>

        <div className="space-y-6">

          {/* Why competitive */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why St Andrews housing is so competitive</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              St Andrews is one of the most constrained student housing markets in the UK. The University
              houses around 4,100 students directly, but with over 10,000 students in a town of 20,000,
              around 6,000 students must find private housing in a market with very limited supply.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">Several factors make it worse:</p>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside ml-2">
              <li>
                A cap on Houses in Multiple Occupation (HMOs) introduced by Fife Council limits
                the supply of shared student housing
              </li>
              <li>
                The rise of Airbnb and holiday lets means former long-term rental properties are
                increasingly used for golf tourism and short stays
              </li>
              <li>
                The town is geographically isolated — Dundee is 14 miles away, and the nearest
                train station (Leuchars) is a bus ride from campus
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              The result: properties list and let within days. Students who are not paying close
              attention to letting agent websites miss out.
            </p>
          </section>

          {/* When to look */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">When to start looking</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This is the most common mistake. Many students don&apos;t start looking until spring —
              by which point the market for the following September is largely gone.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-6 font-semibold text-gray-700">Period</th>
                    <th className="text-left py-2 text-gray-700">What to do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Oct–Nov (first term)", "Form your flatmate group. Decide bedrooms, budget, and area. Set up alerts now."],
                    ["January–February", "Critical window. Most agents release annual listings. Have your group ready and alerts active."],
                    ["March onwards", "Best properties are gone. Range is narrower, prices may be higher."],
                  ].map(([period, action]) => (
                    <tr key={period}>
                      <td className="py-2.5 pr-6 font-medium text-gray-700 whitespace-nowrap">{period}</td>
                      <td className="py-2.5 text-gray-600">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Costs */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How much does it cost?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              St Andrews is the most expensive student rental market in Scotland.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 pr-6 font-semibold text-gray-700">Property type</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Monthly cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Studio / 1-bed", "£600–£1,000+ per month"],
                    ["2-bed flat", "£900–£1,400/mo (£450–£700 per person)"],
                    ["3-bed flat", "£1,000–£1,800/mo (£350–£600 per person)"],
                    ["4–5 bed flat", "£1,400–£2,500/mo (£300–£500 per person)"],
                  ].map(([type, cost]) => (
                    <tr key={type}>
                      <td className="py-2.5 pr-6 text-gray-700">{type}</td>
                      <td className="py-2.5 font-medium text-gray-900">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Utilities are usually not included — budget an additional £80–£120/person/month for
              gas, electricity, and broadband.
            </p>
          </section>

          {/* Agents */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Which letting agents to use</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              There are six main sources to monitor for St Andrews student properties:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                ["Lawson Thompson", "specialist student agent, most active in the market"],
                ["DJ Alexander", "large Scottish agent with a St Andrews branch"],
                ["Studentpad", "University's official private accommodation platform"],
                ["Lettingweb", "Scottish aggregator"],
                ["Standys", "St Andrews-focused student platform"],
                ["St Andrews Property Lets", "local agency with occasional exclusives"],
              ].map(([name, desc]) => (
                <li key={name} className="flex gap-2">
                  <span className="font-semibold text-gray-800 whitespace-nowrap">{name} —</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            <Link href="/agents" className="inline-block mt-4 text-sm text-blue-600 underline hover:text-blue-700">
              Full agent breakdown →
            </Link>
          </section>

          {/* Scams */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Avoiding scams</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The St Andrews housing crisis creates conditions for fraud. Students have lost thousands
              of pounds to accommodation scams. Protect yourself:
            </p>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside ml-2">
              <li>Never pay a holding deposit or rent without viewing the property in person</li>
              <li>Never transfer money to someone you have not met</li>
              <li>
                Verify the landlord&apos;s identity via the{" "}
                <a
                  href="https://www.landlordregistrationscotland.gov.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Scottish Landlord Register
                </a>
              </li>
              <li>Use a reputable letting agent where possible</li>
              <li>If a deal seems too good to be true, it is</li>
            </ul>
          </section>

          {/* Tenant rights */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Your rights as a tenant in Scotland</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Student renters in Scotland have strong legal protections under the Private Housing
              (Tenancies) (Scotland) Act 2016. Key points:
            </p>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside ml-2">
              <li>
                You will sign a Private Residential Tenancy (PRT), which has no fixed end date —
                you can give 28 days&apos; notice to leave at any time
              </li>
              <li>
                Your landlord must give 84 days&apos; notice to end your tenancy (28 days in some
                circumstances)
              </li>
              <li>
                Your deposit must be held in a government-approved tenancy deposit scheme
                (SafeDeposits Scotland, MyDeposits Scotland, or Letting Protection Service Scotland)
              </li>
              <li>Your landlord must be registered on the Scottish Landlord Register</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              The Students&apos; Association offers a free lease-checking service. Use it before
              signing anything.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Get alerts the moment a flat appears</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              The best thing you can do right now is set up free letting alerts so you&apos;re
              notified the moment a new property appears — before it&apos;s gone.
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
