import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Housing Timeline: When to Start Looking | standrewsflats.uk",
  description:
    "When should St Andrews students start looking for a flat? A month-by-month guide to the St Andrews rental market for 2nd, 3rd, and 4th year.",
};

export default function HousingTimelinePost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          St Andrews Housing Timeline: When to Start Looking
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">
          The St Andrews rental market is unusually competitive for a town of its size. Most students discover this too late. Here&apos;s what the calendar actually looks like.
        </p>

        <div className="space-y-6">

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why the St Andrews market moves so fast</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              St Andrews has around 10,000 students and a permanent population of roughly 17,000. It&apos;s a small town with limited housing stock — and every year, several thousand students compete for the same pool of private lets.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Unlike larger university cities where new supply comes online constantly, St Andrews is geographically constrained. The best properties are the same ones year after year, often cycling between groups of students. Many landlords relet to the same tenants or their friends without ever advertising publicly.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The result: properties that appear on the open market go within days — sometimes hours — of listing. If you&apos;re checking agents once a week, you&apos;ll miss most of them.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Month-by-month: the rental calendar</h2>
            <div className="space-y-4">
              {[
                {
                  month: "October",
                  status: "peak",
                  label: "Rush begins",
                  desc: "Letting agents start listing next year's properties. This is when serious students start looking. For 2nd years in particular, October is when the best flats appear and disappear fastest.",
                },
                {
                  month: "November",
                  status: "peak",
                  label: "Peak viewings",
                  desc: "The busiest month. Most popular flats get multiple viewing requests on the day they're listed. If you see something you like, book a viewing immediately — waiting a day or two often means it's gone.",
                },
                {
                  month: "December",
                  status: "late",
                  label: "Good flats largely gone",
                  desc: "The best central properties have usually been snapped up by now. Choices narrow significantly. Worth checking, but expectations should be adjusted.",
                },
                {
                  month: "January",
                  status: "late",
                  label: "Last chance",
                  desc: "You'll find properties here, but they tend to be ones that didn't go quickly for a reason — less desirable location, higher price, or condition issues. Still possible to find something decent, but slim pickings.",
                },
                {
                  month: "February–September",
                  status: "rare",
                  label: "Overflow only",
                  desc: "Occasionally private landlords list here, or tenants drop out of existing arrangements. Very low volume. If you haven't found something by now, the options are limited — private landlords via S1Homes, or waiting for the next October cycle.",
                },
              ].map(({ month, status, label, desc }) => (
                <div key={month} className="flex gap-4">
                  <div className="flex-shrink-0 w-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${status === "peak" ? "bg-blue-500" : status === "late" ? "bg-yellow-400" : "bg-gray-300"}`} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{month}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        status === "peak" ? "bg-blue-50 text-blue-600" :
                        status === "late" ? "bg-yellow-50 text-yellow-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>{label}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2nd year vs 3rd year vs 4th year: different timelines</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">2nd year</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The most competitive group. Moving out of halls for the first time, often with a group of friends who haven&apos;t finalised who&apos;s living together yet. The indecision costs people — groups that agree early (September/October of 1st year) get the best flats. Groups still figuring it out in November often settle for what&apos;s left.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">3rd year</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  More experienced, usually more organised. Groups tend to form earlier and act faster. The advantage is knowing the market — you won&apos;t be surprised by how quick it moves. Same October–November window applies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">4th year</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Many 4th-year students stay in the same flat as the previous year — landlords often prefer to relet to known tenants. If you&apos;re not in that position, treat the timeline the same as any other year. Some 4th-year groups are also able to move faster because they&apos;re smaller (2-person flats, studios) and there&apos;s more supply at that end of the market.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Never miss a listing</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We check all 6 St Andrews letting agents every 15 minutes and email you the moment something new appears. Set up a free alert now — before October, not during it.
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
