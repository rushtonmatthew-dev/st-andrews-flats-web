import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A Parent's Guide to Student Housing in St Andrews | standrewsflats.uk",
  description:
    "What parents need to know about the St Andrews private rental market — costs, timelines, HMO rules, rental fraud, and how to help your child secure a flat.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog/parents-guide-student-housing" },
};

const COVER_IMAGE = "/images/blog/parents-guide-cover.jpg";
const COVER_IMAGE_ALT = "St Andrews town viewed from the castle ruins";

export default function ParentsGuidePost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          A Parent&apos;s Guide to Student Housing in St Andrews
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8">
          St Andrews has one of the most unusual, most competitive, and most expensive private rental markets of any university town in the UK — and it operates on a timeline that most parents find baffling. Here&apos;s what it means for your family.
        </p>

        {COVER_IMAGE && (
          <div className="relative w-full mb-8 overflow-hidden rounded-xl" style={{ maxHeight: "400px" }}>
            <Image
              src={COVER_IMAGE}
              alt={COVER_IMAGE_ALT}
              width={1200}
              height={675}
              className="w-full object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}

        <div className="space-y-8">

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">The structural problem in plain terms</h2>
            <p className="text-gray-700 leading-7 mb-4">
              The University of St Andrews has approximately 10,500 students. The town has a total population of around 20,000 — meaning students make up nearly 60% of everyone who lives there. The university houses roughly 4,100 students directly in managed halls and residences. First-year undergraduates are guaranteed a place. After that, your child is on their own.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              That leaves around 6,000 to 6,500 students competing for private housing in a small coastal town — one with fewer than 7,000 total dwellings, constrained by geography, a controversial planning cap on student house shares, and an increasingly active short-term holiday let market.
            </p>
            <p className="text-gray-700 leading-7">
              In summer 2022, this imbalance reached crisis point. Up to 400 students arrived in St Andrews without anywhere to live. Some slept in cars. The university arranged emergency accommodation 14 miles away in Dundee. A survey found that 86% of the students placed there reported negative impacts on their mental health, and 96% of first-years said it seriously harmed their studies.
            </p>
          </section>

          {/* Callout — keep card style for this press quote block */}
          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-800 font-medium leading-relaxed">
              The <em>Scotsman</em> reported parents prepared to &quot;fly to St Andrews and pay cash for a property.&quot; One parent told the paper they were considering withdrawing their child from the university entirely. You are right to take this seriously.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">The timeline your child is working against</h2>
            <p className="text-gray-700 leading-7 mb-4">
              The private letting market in St Andrews operates much earlier than most UK cities.
            </p>
            <div className="space-y-4">
              {[
                {
                  period: "October–November (Year 1)",
                  status: "peak",
                  label: "Flat group forms",
                  desc: "Your child should begin forming a flat group with friends they want to live with the following year. This sounds premature. In St Andrews, it isn't.",
                },
                {
                  period: "Late January – early February",
                  status: "peak",
                  label: "Properties drop",
                  desc: "Most letting agents release their available properties for the following academic year. Properties go quickly — sometimes within hours. Students who aren't ready with a confirmed group, a chosen property, and the ability to pay a holding deposit on the same day are often left behind.",
                },
                {
                  period: "February–April",
                  status: "late",
                  label: "Secondary market",
                  desc: "Fewer options, often less desirable locations or higher prices relative to quality.",
                },
                {
                  period: "May onwards",
                  status: "rare",
                  label: "Genuinely difficult",
                  desc: "If your child is still searching here, the situation is genuinely difficult. This is not alarmism — it is what the data and student testimony repeatedly describe.",
                },
              ].map(({ period, status, label, desc }) => (
                <div key={period} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${
                      status === "peak" ? "bg-blue-500" :
                      status === "late" ? "bg-yellow-400" :
                      "bg-red-400"
                    }`} />
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
            <p className="text-gray-500 text-sm mt-4 pt-4 border-t border-gray-100">
              This is not something your child can sort out in the Easter holidays or over summer. The window is January to March, with preparation beginning well before that.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">What private renting costs in St Andrews</h2>
            <p className="text-gray-700 leading-7 mb-4">
              St Andrews is the most expensive student rental market in Scotland — and among the most expensive in the entire UK outside London.
            </p>
            <div className="overflow-x-auto mb-4">
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
            <p className="text-gray-700 leading-7 mb-4 text-sm">
              The average monthly rent across all St Andrews property types was £1,620 in 2023 — <strong>60% higher than Edinburgh</strong>. NUS Scotland research found average student rent consumes <strong>88% of the maximum Scottish maintenance loan</strong>, leaving approximately £22 per week for everything else.
            </p>
            <p className="text-gray-700 leading-7 text-sm">
              For many families, a parental contribution to rent is not optional — it is the structural reality of studying in St Andrews.
            </p>

            <h3 className="font-semibold text-gray-800 mt-5 mb-2">Bills and council tax</h3>
            <p className="text-gray-700 leading-7 text-sm">
              Most student lets come unfurnished with bills on top. Students are <strong>exempt from council tax</strong> provided everyone in the property is a full-time student — but the exemption must be formally applied for with Fife Council, and one non-student resident will make the entire household liable.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">HMO licences — and why they matter</h2>
            <p className="text-gray-700 leading-7 mb-4">
              In Scotland, any property shared by three or more unrelated people requires an <strong>HMO (House in Multiple Occupation) licence</strong> from the local council — a legal safeguard covering fire safety, gas and electrical certification, and minimum space standards.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              Before your child signs any tenancy agreement for a shared property:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span><span><strong>Confirm the property has a valid HMO licence</strong> if three or more people will be living there. You can check with Fife Council&apos;s licensing team directly.</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span><span><strong>Unlicensed properties carry legal risk</strong> for the landlord and may affect your child&apos;s right to remain if enforcement action is taken.</span></li>
              <li className="flex gap-2"><span className="text-blue-500 font-bold mt-0.5">•</span><span>Some St Andrews landlords deliberately keep properties at two occupants to avoid the licensing requirement — artificially suppressing supply across the town.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-4">How to protect your child (and your money)</h2>

            <h3 className="font-semibold text-gray-800 mb-2">Spotting rental fraud</h3>
            <p className="text-gray-700 leading-7 mb-3 text-sm">
              Rental scams are a documented problem in St Andrews. Three students in a single reported period lost a combined approximately £12,000 to fraudsters posing as landlords, collecting deposits for properties they did not own, and disappearing.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-5">
              <li className="flex gap-2"><span className="text-red-500 font-bold mt-0.5">•</span><span><strong>Never pay a deposit without viewing the property in person.</strong> Video viewings are not sufficient for this purpose.</span></li>
              <li className="flex gap-2"><span className="text-red-500 font-bold mt-0.5">•</span><span><strong>Never transfer money</strong> to a private individual before seeing a signed tenancy agreement through an agent&apos;s formal process.</span></li>
              <li className="flex gap-2"><span className="text-red-500 font-bold mt-0.5">•</span><span><strong>Verify the landlord</strong> on Scotland&apos;s Landlord Register (landlordregistrationscotland.gov.uk) — all private landlords in Scotland are legally required to register.</span></li>
            </ul>

            <h3 className="font-semibold text-gray-800 mb-2">Lease checking</h3>
            <p className="text-gray-700 leading-7 mb-4 text-sm">
              The Students&apos; Association at St Andrews operates a <strong>lease-checking service at no cost</strong>. This is worth using before signing. Common issues include excessive deposit clauses, unclear break provisions, and ambiguous responsibility for repairs.
            </p>

            <h3 className="font-semibold text-gray-800 mb-2">Guarantor arrangements</h3>
            <p className="text-gray-700 leading-7 text-sm">
              Most letting agents will require a UK-based guarantor for student tenancies — typically a parent or guardian. This means you are legally liable if your child defaults on rent. Read the guarantor agreement carefully before signing. If you are based overseas, some agents accept international guarantors; others do not, and you may need to look at rent guarantee insurance or larger upfront payment arrangements.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">What the university does — and doesn&apos;t — provide</h2>
            <p className="text-gray-700 leading-7 mb-4">
              The university&apos;s accommodation guarantee covers first-year undergraduates, care-experienced students throughout their studies, and some international postgraduates on a limited basis. <strong>Returning undergraduates have no guarantee.</strong>
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              The university does operate: a <strong>direct leasing scheme</strong> managing some private properties (limited supply, worth asking about in January); <strong>Studentpad</strong> (standrewsstudentpad.co.uk), the official private accommodation search platform; and a <strong>ballot system</strong> for university-managed private houses — described in the Students&apos; Association&apos;s own guide as &quot;purely down to luck.&quot;
            </p>
            <p className="text-gray-700 leading-7 text-sm">
              University hall fees range from approximately <strong>£6,246/year</strong> (self-catered standard) to <strong>£12,976/year</strong> (catered en-suite), with a proposed 7.5% increase for 2025–26 negotiated down to 2.7% after student lobbying.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">What you can practically do now</h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "Have the conversation early. Ask your child in October of their first year whether they've started thinking about second-year housing and who they want to live with. The answer should be yes." },
                { n: 2, text: "Understand the costs and plan accordingly. Rent of £500–£700 per month, plus bills, is a realistic budget for a shared property in a reasonable location. Build this into your family's financial planning." },
                { n: 3, text: "Know the agent names. The main student letting agents are Lawson & Thompson, DJ Alexander, Bradburne & Co, Delmor, Inchdairnie Properties, Rollos, and Alba. Your child should be registered with all of them before Christmas of their first year." },
                { n: 4, text: "Check the Students' Association resources. The SA's annual How to Rent guide and lease-checking service are free and genuinely useful." },
                { n: 5, text: "Never pay without viewing. This cannot be overstated." },
              ].map(({ n, text }) => (
                <li key={n} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{n}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">We can help</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              StAndrewsFlats.uk lists verified properties in and around St Andrews, with clear information on HMO status, included bills, and available dates. Set up a free alert and we&apos;ll email you the moment something matching your child&apos;s requirements appears.
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
