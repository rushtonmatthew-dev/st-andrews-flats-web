import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Rental Scams: What Students Lose Every Year (And How Not To Be Next) | standrewsflats.uk",
  description:
    "Three St Andrews students lost a combined £12,000 to housing scams in a single year. Here's exactly how the scams work, the red flags to spot, and the steps that protect you.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog/st-andrews-rental-scams" },
};

export default function RentalScamsPost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          St Andrews Rental Scams: What Students Lose Every Year (And How Not To Be Next)
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-10">
          Three students. One year. Around £12,000 gone. The desperation St Andrews&apos; housing crisis
          creates is exactly what scammers exploit — here&apos;s how to protect yourself.
        </p>

        <div className="space-y-6">

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Why St Andrews students are unusually vulnerable</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Most university cities have slack in their housing markets. St Andrews does not.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              The town has a population of around 20,000 — more than half of them students. Fife Council&apos;s cap on
              Houses in Multiple Occupation (HMOs) limits the supply of shared student housing. Holiday lets and Airbnb
              have swallowed up properties that used to be long-term rentals. The nearest alternative accommodation hub
              is Dundee, 14 miles away.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              The result: when a good flat appears, it can be gone within 24–48 hours. Students know this. And when
              you&apos;re watching friends secure properties while you still have nothing, your judgement about what&apos;s
              a reasonable request from a landlord starts to slip.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Scammers in St Andrews don&apos;t need to be sophisticated. They just need to find someone who is tired,
              anxious, and slightly behind.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How the scams work</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">The phantom listing</h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  The most common scam is simple: a property is advertised at a below-market price on a platform with
                  little verification — Facebook Marketplace, Gumtree, SpareRoom, or even a flyer on a noticeboard.
                  Sometimes the photos are stolen from a real letting agent&apos;s listing. Sometimes they&apos;re from a
                  completely different city.
                </p>
                <p className="text-gray-600 leading-relaxed mb-3">
                  The &quot;landlord&quot; explains they&apos;re currently abroad (working with a charity, on a research project,
                  in the military) but can arrange everything remotely. They ask for a holding deposit — usually
                  £200–£500 — to &quot;secure the property while they return.&quot; You transfer the money. They disappear.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 rounded-lg p-3">
                  <strong>Variation:</strong> they arrange a viewing, but the person who shows you round is not the
                  owner and has no authority to let the property. You pay a deposit. The real owner has no idea.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">The fake agent</h3>
                <p className="text-gray-600 leading-relaxed">
                  Less common but more damaging financially. A convincing-looking website, professional email address,
                  and a portfolio of real-looking St Andrews properties. The &quot;agent&quot; asks for a full month&apos;s rent
                  upfront plus a deposit to proceed. Once paid, the website disappears.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">The illegitimate landlord</h3>
                <p className="text-gray-600 leading-relaxed">
                  This one is legal-grey and more insidious. The landlord exists, the property exists, but the landlord
                  is not registered on the Scottish Landlord Register — a legal requirement in Scotland. You move in.
                  Then you discover the property has serious maintenance issues, no deposit protection, and a landlord
                  who knows you have limited recourse because you can&apos;t afford a legal dispute.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Red flags to watch for in St Andrews</h2>

            <div className="space-y-5">
              {[
                {
                  flag: "Price that's noticeably below market",
                  detail: "St Andrews is expensive. A 3-bedroom flat in a central location will typically run £1,000–£1,600/month. If you see something significantly cheaper with no obvious explanation (top floor, poor condition, far out of town), treat it as a warning sign rather than good luck.",
                },
                {
                  flag: "A landlord or agent you cannot verify locally",
                  detail: "Legitimate letting in St Andrews is dominated by a small number of well-known agents: Lawson & Thompson, DJ Alexander, Studentpad, Lettingweb, and a handful of independent landlords. If you're dealing with someone who has no verifiable local presence — no registered address, no reviews, no connection to the university community — be cautious.",
                },
                {
                  flag: "Pressure to pay before viewing",
                  detail: "No legitimate letting agent or landlord in Scotland will ask for money before you have viewed a property and signed paperwork. \"Pay now or lose it\" is a scam tactic, not a market reality.",
                },
                {
                  flag: "Requests to transfer money directly to a personal account",
                  detail: "Reputable agents hold deposits in client accounts and issue receipts. A request to transfer money to a personal current account — especially accompanied by a request for urgency — is a serious red flag.",
                },
                {
                  flag: "A landlord who is \"abroad\" and cannot meet in person",
                  detail: "A small number of St Andrews landlords do manage properties remotely through agents. But a landlord who is personally letting a flat and cannot be met in person, confirmed by name, and looked up on the Scottish Landlord Register is not someone you should pay money to.",
                },
              ].map(({ flag, detail }) => (
                <div key={flag} className="flex gap-3">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">!</span>
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{flag}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How to protect yourself: the checklist</h2>
            <p className="text-gray-500 text-sm mb-5">Before you pay anything to anyone, work through this list.</p>

            <ol className="space-y-4">
              {[
                {
                  title: "Check the Scottish Landlord Register",
                  detail: <>Every private landlord in Scotland is legally required to register. Search at <a href="https://www.landlordregistrationscotland.gov.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">landlordregistrationscotland.gov.uk</a>. If the person you&apos;re dealing with doesn&apos;t appear, or the property address doesn&apos;t match, walk away — and consider reporting it to Fife Council.</>,
                },
                {
                  title: "View the property in person before paying anything",
                  detail: "This is non-negotiable. Not a video call. Not a \"virtual tour.\" An in-person visit, where you walk through the property and meet either the landlord or a verified agent.",
                },
                {
                  title: "Verify who you're actually dealing with",
                  detail: "If you're using an agent, confirm they are a registered business (Companies House or the Scottish Letting Agent Register). If you're dealing directly with a landlord, get their full name, confirm they own or have authority to let the property, and look them up.",
                },
                {
                  title: "Never transfer money without a receipt and contract",
                  detail: "Any deposit or advance rent should come with a signed tenancy agreement (or at minimum a holding deposit agreement with clear terms) and a receipt. Your deposit must be protected in one of three government-approved schemes: SafeDeposits Scotland, MyDeposits Scotland, or Letting Protection Service Scotland. Your landlord is legally required to do this within 30 working days of your tenancy start date.",
                },
                {
                  title: "Have your lease checked before signing",
                  detail: "The Students' Association at the University of St Andrews offers a free lease-checking service. Use it. A trained adviser can spot non-standard clauses, missing required terms, and anything that leaves you exposed. It takes a short amount of time and costs nothing.",
                },
                {
                  title: "Trust your instincts",
                  detail: "If something feels off — the price, the communication, the pressure, the inability to answer basic questions about the property — it probably is. There will be another flat. There will not be another £1,000.",
                },
              ].map(({ title, detail }, i) => (
                <li key={title} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Where to find legitimate properties</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The safest route to a St Andrews flat is through the established, monitored letting agents. This doesn&apos;t
              mean the market is easy — it&apos;s still fast and competitive — but it does mean you&apos;re dealing with
              registered businesses that have legal obligations to you.
            </p>
            <ul className="text-gray-600 text-sm space-y-2 mb-4">
              {[
                { name: "Lawson & Thompson", desc: "St Andrews-specialist, most active in the student market, consistently reliable" },
                { name: "DJ Alexander", desc: "large Scottish agent with a St Andrews branch" },
                { name: "Studentpad", desc: "the University's own private accommodation platform; landlords must meet university standards to list" },
                { name: "Lettingweb", desc: "Scottish aggregator covering multiple agents" },
                { name: "Rightmove", desc: "UK-wide portal; most agents cross-list here, though sometimes with a short delay" },
              ].map(({ name, desc }) => (
                <li key={name} className="flex gap-2">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                  <span><strong>{name}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm">
              The problem is not finding these sources — it&apos;s monitoring all of them simultaneously during the
              January–February listing rush while also attending lectures, revising, and managing the rest of your life.
              That&apos;s what we built{" "}
              <Link href="/" className="text-blue-600 underline">St Andrews Flats</Link>{" "}
              to solve: free alerts the moment a new property appears across all the major agents, before it&apos;s gone.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">If you think you&apos;ve been scammed</h2>
            <p className="text-gray-500 text-sm mb-4">Act quickly.</p>
            <ol className="space-y-3">
              {[
                "Report it to Police Scotland (101, or 999 if there is immediate risk). Reference any bank transfer details, email addresses, phone numbers, and property addresses.",
                "Contact your bank immediately. If you transferred money recently, your bank may be able to recall it under the voluntary Contingent Reimbursement Model (CRM). The sooner you call, the better the chance.",
                "Report to Action Fraud (actionfraud.police.uk), the UK's national fraud reporting centre.",
                "Report to the platform where you found the listing — Facebook, Gumtree, SpareRoom etc. can remove fraudulent listings and may have records useful to police.",
                "Tell the Students' Association. They can advise on next steps and may be aware of other students targeted by the same scam.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              You are not to blame. These are deliberate, calculated frauds that target people in a stressful situation.
              The best protection is information — which is why we wrote this.
            </p>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The short version</h2>
            <ul className="space-y-2">
              {[
                "St Andrews' housing crisis creates the exact conditions scammers need: desperate students, fast-moving market, fear of missing out.",
                "The most common scam: a property advertised below market rate, a landlord who is \"abroad,\" a request to pay before viewing.",
                "Never pay anything before viewing in person and signing paperwork.",
                "Check every landlord on the Scottish Landlord Register before proceeding.",
                "Get your lease checked by the Students' Association — it's free.",
                "Stick to the verified letting agents.",
              ].map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Get alerts on the legitimate market</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              We check Studentpad, DJ Alexander, Lawson Thompson, Lettingweb, Standys, and St Andrews Property Lets
              every 15 minutes. Free instant alerts — so you can act on real listings fast, without the fear of missing
              out that scammers rely on.
            </p>
            <Link
              href="/subscribe"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Set up free alerts →
            </Link>
          </section>

          <p className="text-sm text-gray-400 italic text-center">
            Know a first-year still looking for a flat? Forward this to your group chat — the £12,000 figure is real,
            and the market this year is as tight as ever.
          </p>

        </div>
      </div>
    </main>
  );
}
