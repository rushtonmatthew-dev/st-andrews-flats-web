import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The St Andrews Second-Year Housing Scramble: A Survival Guide | standrewsflats.uk",
  description:
    "Everything St Andrews first-years need to know about securing a flat for second year — timelines, costs, agents, HMO rules, and how to avoid getting caught out.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog/second-year-housing-scramble" },
};

export default function SecondYearHousingScramblePost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          The St Andrews Second-Year Housing Scramble: A Survival Guide (2025–26)
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">
          If you&apos;re a first-year at St Andrews, enjoy your halls while they last. The private housing market is unlike anything you&apos;ve encountered — and the students who don&apos;t know the rules lose out fast.
        </p>

        <div className="space-y-6">

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why St Andrews is unlike any other UK university town</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              St Andrews has around 10,500 students in a town of roughly 20,000 residents — a student-to-population ratio of nearly 58%. That&apos;s more than double Oxford or Cambridge. The university houses approximately 4,100 of those students in its own managed accommodation. That leaves <strong>6,000 to 6,500 students</strong> competing for private housing in a town with fewer than 7,000 total dwellings — many of which are occupied by permanent residents, used as holiday lets, or simply unavailable.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              This is not a mildly competitive market. This is a structurally dysfunctional one.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The crisis reached its most acute point in August 2022, when up to 400 students arrived in St Andrews without anywhere to live. Some slept in cars. The university&apos;s emergency solution was to house students 14 miles away in Dundee — a commute that 86% of those placed there said had a serious negative impact on their mental health. A subsequent survey found 96% of first-years in Dundee said the displacement seriously affected their studies.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The timeline you need to know</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The St Andrews letting cycle is unlike anywhere else in the UK. Properties release early, move fast, and show no mercy to the unprepared.
            </p>
            <div className="space-y-4">
              {[
                {
                  period: "October–November",
                  status: "peak",
                  label: "Form your flat group now",
                  desc: "The moment you arrive in second year — or honestly, before you leave for summer — you need to know who you're living with. The letting market here runs on groups. Agents advertise properties by bedroom count and expect complete groups to apply together. Trying to find flatmates in January is possible, but you're already behind.",
                },
                {
                  period: "Late January – early February",
                  status: "peak",
                  label: "The drop",
                  desc: "This is when most St Andrews letting agents release their available properties for the following academic year. This sounds like plenty of time. It isn't. Properties are effectively first-come-first-served, and some of the most sought-after flats go within hours of listing.",
                },
                {
                  period: "February–March",
                  status: "late",
                  label: "Late market",
                  desc: "There will still be properties available, but you'll have significantly fewer options and often worse value. Some students don't find housing until April or May — with the associated stress that implies.",
                },
                {
                  period: "After May",
                  status: "rare",
                  label: "Panic territory",
                  desc: "If you're still searching by summer, you're in genuine difficulty. This is how students end up in Dundee.",
                },
              ].map(({ period, status, label, desc }) => (
                <div key={period} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${status === "peak" ? "bg-blue-500" : status === "late" ? "bg-yellow-400" : "bg-red-400"}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-800">{period}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        status === "peak" ? "bg-blue-50 text-blue-600" :
                        status === "late" ? "bg-yellow-50 text-yellow-700" :
                        "bg-red-50 text-red-600"
                      }`}>{label}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What&apos;s actually available — and what it costs</h2>

            <h3 className="font-semibold text-gray-800 mb-2">University-managed private stock</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The university operates a direct leasing scheme, where it manages privately-owned properties and acts as guarantor. These can be slightly easier to secure than open-market flats, but supply is very limited. Check the university&apos;s accommodation pages in January.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2">The private HMO market</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              This is the main market for most students. St Andrews has approximately <strong>974 licensed HMO properties</strong> — an extraordinary 85% of all HMOs in Fife. The major agents to register with immediately:
            </p>
            <ul className="text-gray-600 text-sm space-y-1 mb-4 ml-4 list-disc">
              <li><strong>Lawson &amp; Thompson</strong> — the specialist student letting agent, managing around 75 properties. Winner of Sunday Times Letting Agent of the Year. Your first call.</li>
              <li><strong>DJ Alexander</strong> — Scotland-wide firm with a St Andrews branch</li>
              <li>Bradburne &amp; Co, Delmor, Inchdairnie Properties, Rollos, Alba</li>
              <li>STAND Property, St Andrews Property Lets, Thorntons Lettings, Eve Brown Property Services</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              The university&apos;s <strong>Studentpad</strong> platform (standrewsstudentpad.co.uk) aggregates private listings and is worth bookmarking.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3">What you&apos;ll pay</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              St Andrews is the most expensive student rental market in Scotland — and among the most expensive in the UK outside London. Based on recent crowdsourced data:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Monthly rent per student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 pr-4 text-gray-600">Outskirts (Tom Morris Drive area)</td>
                    <td className="py-2 text-gray-600">£400–£600</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-600">Mid-range (Lamond Drive area)</td>
                    <td className="py-2 text-gray-600">~£700</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gray-600">Central/prime (North Street, Queen&apos;s Gardens)</td>
                    <td className="py-2 text-gray-600">£900+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 leading-relaxed mt-4 text-sm">
              Average student rents in St Andrews consume roughly <strong>88% of the maximum Scottish maintenance loan</strong>, leaving around £22 per week for food, transport, and everything else. Rents have also risen approximately 44% between 2019 and 2022 alone.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The regulatory wrinkle: HMO licences</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              In Scotland, any property occupied by three or more unrelated people sharing basic amenities requires an <strong>HMO (House in Multiple Occupation) licence</strong>. This matters to you for two reasons.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              First, Fife Council operates a <strong>&quot;zero growth&quot; HMO overprovision policy</strong> for St Andrews, meaning new HMO licences are extremely difficult to obtain. Since the cap was introduced in 2019, St Andrews has actually <em>lost</em> 17 HMOs and 124 beds. Some landlords restrict their properties to two students specifically to avoid triggering the three-person threshold — leaving an estimated 200+ bedrooms sitting empty and unlettable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Second, if you&apos;re renting a property with three or more people, <strong>check that it has a valid HMO licence before you sign anything</strong>. Operating without one carries a £50,000 penalty — and an unlicensed property is one you may not be able to stay in.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The commuter option</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Over 1,500 students now commute into St Andrews from Leuchars, Dundee, Cupar, and wider Fife — a number that has grown significantly as a direct result of the housing shortage. Commuting reduces your rent substantially, but adds travel time and can make the late-evening social and academic life of a university harder to access.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If you&apos;re considering this route, <strong>Leuchars</strong> (5 miles away, with a rail connection) is the most popular commuter base. Dundee is feasible for students on tighter budgets, though the commute is roughly an hour each way.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Five things to do right now</h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "Register with every agent listed above — most have email lists or portals. Sign up before Christmas." },
                { n: 2, text: "Lock in your flat group — have the conversation early, even if it's awkward." },
                { n: 3, text: "Set your budget honestly — account for rent, bills, and council tax (students are exempt, but check your lease)." },
                { n: 4, text: "Never pay a deposit without viewing — rental fraud is a real and documented problem in St Andrews. Three students collectively lost around £12,000 in accommodation scams in a single period. Always view in person." },
                { n: 5, text: "Check the Marks Out Of Tenancy platform — the Students' Association partners with this service for landlord and property reviews. A well-reviewed landlord is worth paying a small premium for." },
              ].map(({ n, text }) => (
                <li key={n} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{n}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Albany Park and what&apos;s coming</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The supply picture is slowly improving. The university&apos;s flagship <strong>Albany Park</strong> development — a 703-bed, six-building complex — is expected to open in autumn 2026 in partnership with Campus Living Villages. An additional 148 beds at Gap Site 3 have also secured planning consent. The <strong>Kilrymont development</strong> (at the former Madras College site) has already delivered 208 rooms and has further phases in the pipeline.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Even with these additions, analysts expect St Andrews to remain one of the tightest student rental markets in the UK. The structural mismatch between a world-class university and a small coastal town is not solved by a few hundred beds. The guidance above still applies: start early, know the market, and act quickly.
            </p>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Never miss a listing</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We check all St Andrews letting agents every 15 minutes and email you the moment something new appears. Set up a free alert now — before the January drop, not during it.
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
