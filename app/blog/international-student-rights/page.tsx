import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Renting in St Andrews as an International Student: Your Legal Rights | standrewsflats.uk",
  description:
    "Scottish tenancy law, deposit protection, HMO licensing, guarantor requirements, and fraud protection — a complete guide for international students renting in St Andrews.",
  alternates: { canonical: "https://www.standrewsflats.uk/blog/international-student-rights" },
};

const COVER_IMAGE = "/images/blog/international-student-rights-cover.png";
const COVER_IMAGE_ALT = "International students walking through St Andrews town centre";

export default function InternationalStudentRightsPost() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Insights
        </Link>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">April 2025</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Renting in St Andrews as an International Student: Your Legal Rights, Your Protections, and What Nobody Tells You
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-8">
          Around 45% of St Andrews students are international. Most arrive with no knowledge of Scottish tenancy law and
          no frame of reference for how competitive this rental market is. Here&apos;s what you need to know before you
          sign anything.
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

        <div className="blog-post-body space-y-8">

          <section>
            <p className="text-gray-700 leading-7 mb-4">
              You&apos;ve secured your place at one of the world&apos;s great universities. You&apos;ve navigated a visa
              application, a transatlantic or intercontinental flight, and the peculiarities of a Scottish coastal town
              in October. Now you need somewhere to live — in a rental market that operates under a legal framework
              you&apos;ve almost certainly never encountered before, on a timeline that punishes the unprepared, in a
              country where the rules are genuinely different from the United States, Canada, mainland Europe, and most
              of the world.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              Around 45% of St Andrews students are international, with roughly 20% from North America alone. Most
              arrive with no working knowledge of Scottish tenancy law, no credit history in the UK, and no frame of
              reference for how competitive and unusual this particular housing market is. That combination creates real
              vulnerability — to bad landlords, to scams, and to signing agreements you don&apos;t fully understand.
            </p>
            <p className="text-gray-700 leading-7">
              Here&apos;s what you need to know before you sign anything.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Scottish Tenancy Law Is Not English Tenancy Law</h2>
            <p className="text-gray-700 leading-7 mb-4">
              This is the first thing to understand. Scotland has its own legal system — entirely separate from England
              and Wales — and private renting operates under different legislation. If you&apos;ve read general UK
              renting guides, much of what they say does not apply to you in St Andrews.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              The relevant law is the <strong>Private Housing (Tenancies) (Scotland) Act 2016</strong>, which created
              the <strong>Private Residential Tenancy (PRT)</strong>. This is the standard tenancy type for most
              private lets in Scotland and it replaced the older &quot;short assured tenancy&quot; system. Key features:
            </p>
            <ul className="space-y-3 mb-4">
              {[
                {
                  label: "No fixed-term end date.",
                  detail: "Unlike English assured shorthold tenancies, a Scottish PRT has no automatic end date. Your tenancy continues until either you or your landlord formally ends it using a specific legal process.",
                },
                {
                  label: "You cannot be asked to leave simply because a fixed term has expired.",
                  detail: "Your landlord must have a valid legal ground to end the tenancy and must follow a formal notice procedure.",
                },
                {
                  label: "Minimum notice periods apply.",
                  detail: "If you have lived in the property for more than six months, your landlord must give you a minimum of 84 days' written notice to leave, and only on specific permitted grounds.",
                },
              ].map(({ label, detail }) => (
                <li key={label} className="flex gap-2 text-gray-700 leading-7">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <span><strong>{label}</strong> {detail}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-7 mb-4">
              This is significantly stronger protection than most international students expect. You are not in a
              precarious month-to-month arrangement that a landlord can end on a whim.
            </p>
            <p className="text-gray-700 leading-7">
              However — and this matters — <strong>purpose-built student accommodation (PBSA) and
              university-managed halls are exempt</strong> from the PRT. These operate under different licence
              agreements, not tenancy agreements, and your rights differ accordingly. If you&apos;re in a private flat
              or shared house, the PRT applies.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Your Landlord Has Legal Obligations Before You Move In</h2>
            <p className="text-gray-700 leading-7 mb-4">
              Scottish law requires private landlords to meet specific standards before renting a property. These are
              not optional extras — they are legal minimums, and you have the right to expect all of them.
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Registration",
                  detail: (
                    <>
                      Every private landlord in Scotland must be registered with their local council. You can verify
                      your landlord&apos;s registration status at{" "}
                      <a
                        href="https://www.landlordregistrationscotland.gov.uk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        landlordregistrationscotland.gov.uk
                      </a>
                      . An unregistered landlord is breaking the law. Do not rent from one.
                    </>
                  ),
                },
                {
                  label: "HMO Licensing",
                  detail: "If you are sharing a property with two or more other unrelated people (i.e., three or more people total), the property requires an HMO (House in Multiple Occupation) licence from Fife Council. This licence certifies that the property meets fire safety standards, has adequate space, and has had gas and electrical installations inspected. Ask to see the HMO licence before signing. If the landlord cannot produce one, walk away.",
                },
                {
                  label: "Gas Safety",
                  detail: "The landlord must provide a current Gas Safety Certificate (issued within the last 12 months) before you move in.",
                },
                {
                  label: "Electrical Safety",
                  detail: "An Electrical Installation Condition Report (EICR) must be in place, valid within the last five years.",
                },
                {
                  label: "Energy Performance Certificate (EPC)",
                  detail: "The property must have an EPC rating of at least D (on a scale from A to G). If a property has a rating of E, F, or G, the landlord should not be renting it out and you can flag this to Fife Council.",
                },
                {
                  label: "Legionella Risk Assessment",
                  detail: "Landlords must carry out a risk assessment for legionella bacteria in the water system.",
                },
                {
                  label: "Tenant Information Pack",
                  detail: "Before or at the start of your tenancy, your landlord must provide you with a specific pack of information including a copy of the tenancy agreement, the How to Rent: A Guide to Renting in Scotland booklet, and details of the deposit protection scheme being used.",
                },
              ].map(({ label, detail }) => (
                <div key={label}>
                  <p className="font-semibold text-gray-800 mb-1">{label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-7 mt-4">
              If you are not provided with these documents, you can contact <strong>Shelter Scotland</strong>{" "}
              (shelterscotland.org) for free legal advice, or raise a complaint with Fife Council&apos;s Private Sector
              Housing team.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Your Deposit: How It Must Be Protected</h2>
            <p className="text-gray-700 leading-7 mb-4">
              This is one of the most important things to understand — and one of the areas where international students
              are most frequently caught out.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              Under Scottish law, your landlord must place your deposit in one of three government-approved{" "}
              <strong>Tenancy Deposit Schemes</strong> within 30 working days of you paying it:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                { name: "SafeDeposits Scotland", url: "https://www.safedepositscotland.com" },
                { name: "Letting Protection Service Scotland" },
                { name: "mydeposits Scotland" },
              ].map(({ name, url }) => (
                <li key={name} className="flex gap-2 text-gray-600 text-sm">
                  <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      {name}
                    </a>
                  ) : (
                    <span>{name}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-7 mb-4">
              Your landlord must also give you written confirmation of which scheme holds your deposit and provide you
              with the scheme&apos;s information.
            </p>
            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
              <p className="font-semibold text-gray-800 mb-3 text-sm">What this means for you:</p>
              <ul className="space-y-2">
                {[
                  "Your deposit is held independently — your landlord cannot simply keep it",
                  "At the end of your tenancy, any deductions must be agreed or formally disputed",
                  "If you and your landlord disagree about deductions, the scheme operates a free adjudication process — an independent third party reviews the evidence and makes a binding decision",
                  "If your landlord has not protected your deposit, you can apply to a First-tier Tribunal (Housing and Property Chamber) and may be entitled to up to three times the deposit amount as a penalty",
                ].map((point, i) => (
                  <li key={i} className="flex gap-2 text-gray-600 text-sm">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-700 leading-7 mb-3">
              Deposits in St Andrews typically equal one to two months&apos; rent. On a £700/month room, that&apos;s
              £700–£1,400. Protecting this money matters.
            </p>
            <p className="text-gray-700 leading-7">
              <strong>Document everything before you move in.</strong> Take timestamped photographs of every room,
              every wall, every appliance, every piece of furniture. Note any existing damage in writing to your
              landlord on day one. This is your evidence if there is a deposit dispute when you leave.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">
              The Guarantor Problem — and How International Students Navigate It
            </h2>
            <p className="text-gray-700 leading-7 mb-4">
              Most St Andrews letting agents require a <strong>UK-based guarantor</strong>: typically a parent or close
              relative who is resident in the UK and agrees to cover your rent if you default. The guarantor must
              usually be a homeowner or demonstrate sufficient income.
            </p>
            <p className="text-gray-700 leading-7 mb-4">
              For international students, this is a significant barrier. If your family is based in the United States,
              Canada, Australia, or elsewhere, you may not have a UK-based guarantor available.
            </p>
            <p className="text-gray-700 leading-7 mb-3">
              Options that other international students in St Andrews have used:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "International guarantor services.",
                  detail: (
                    <>
                      Commercial companies such as <strong>Housing Hand</strong> and <strong>Reposit</strong> offer
                      guarantor services for international students for a fee (typically equivalent to a few
                      weeks&apos; rent). Some St Andrews letting agents accept these — ask specifically before
                      assuming.
                    </>
                  ),
                },
                {
                  title: "Larger upfront payment.",
                  detail: "Some landlords will accept several months' rent in advance in lieu of a guarantor. This is legally permitted in Scotland (there is no cap on advance rent, unlike England) but requires significant upfront funds. If you do this, ensure your deposit is still separately protected in a scheme.",
                },
                {
                  title: "University-managed direct leasing properties.",
                  detail: "The university operates a small direct leasing scheme where it manages private properties and may act as guarantor. Availability is limited — enquire with the accommodation service in January.",
                },
                {
                  title: "PBSA and university halls.",
                  detail: "Purpose-built student accommodation like SPACE St Andrews typically does not require a UK guarantor. If guarantor requirements are a significant barrier, PBSA may be worth prioritising.",
                },
              ].map(({ title, detail }, i) => (
                <div key={title} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-1">{title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-7 mt-4">
              Do not sign a guarantor agreement without reading it carefully. The guarantor takes on full legal
              liability for the rent. If you are asking a family member to sign as guarantor, make sure they understand
              exactly what they are agreeing to.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Rent Increases: What Your Landlord Can and Cannot Do</h2>
            <p className="text-gray-700 leading-7 mb-4">
              Scotland is currently in a period of rent control reform. The{" "}
              <strong>Cost of Living (Tenant Protection) (Scotland) Act 2022</strong> introduced emergency rent freeze
              and increase caps in response to the cost of living crisis — though these measures have evolved through
              subsequent legislation.
            </p>
            <p className="text-gray-700 leading-7 mb-3">Under the current framework (as of 2025):</p>
            <ul className="space-y-2 mb-4">
              {[
                "Landlords can apply for a rent increase but must give you at least three months' written notice",
                "You have the right to refer any proposed rent increase to a Rent Officer for independent assessment if you believe it is above market rate",
                "The Rent Officer can cap the increase if it exceeds the open market rent for a comparable property",
              ].map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-700 leading-7">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-7 mb-4">
              If your landlord attempts to increase rent without proper notice, or in a manner that appears retaliatory
              (e.g., in response to you raising a repair complaint), this is unlawful. Contact{" "}
              <strong>Shelter Scotland</strong> or the{" "}
              <strong>First-tier Tribunal for Scotland (Housing and Property Chamber)</strong> at
              housingandpropertychamber.scot.
            </p>
            <p className="text-gray-700 leading-7">
              Be aware also that the <strong>Housing (Scotland) Bill</strong> currently progressing through the
              Scottish Parliament includes proposals to extend rent control to purpose-built student accommodation and
              university halls (capped at CPI + 1%, maximum 6%). This legislation has not yet passed but may affect
              costs in future years.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Repairs: Your Landlord Must Keep the Property in Good Condition</h2>
            <p className="text-gray-700 leading-7 mb-4">
              Under the <strong>Repairing Standard</strong> (Housing (Scotland) Act 2006), your landlord is legally
              required to ensure the property meets a minimum standard of repair throughout your tenancy. This includes:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "The structure and exterior must be wind and watertight",
                "All installations for water, gas, electricity, and heating must be in proper working order",
                "Any fixtures and fittings provided by the landlord must be in reasonable condition",
                "The property must have satisfactory provision for natural and artificial lighting, and for ventilation",
              ].map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-700 leading-7">
                  <span className="text-blue-500 flex-shrink-0 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 leading-7 mb-4">
              If your landlord fails to carry out necessary repairs after being notified, you can apply to the{" "}
              <strong>First-tier Tribunal (Housing and Property Chamber)</strong> for a{" "}
              <strong>Repairing Standard Enforcement Order</strong>, which legally compels the landlord to make
              repairs. This process is free to use as a tenant.
            </p>
            <p className="text-gray-700 leading-7">
              <strong>Important:</strong> Do not withhold rent as a way of forcing repairs. This is not a legal remedy
              in Scotland and could put you in breach of your tenancy agreement. Always report repairs in writing
              (email is fine), keep records, and escalate through official channels if needed.
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Eviction: The Process Your Landlord Must Follow</h2>
            <p className="text-gray-700 leading-7 mb-4">
              You cannot be evicted informally, quickly, or without cause in Scotland. The law is clear:
            </p>
            <ol className="space-y-3 mb-4">
              {[
                <>
                  Your landlord must have a <strong>valid legal ground</strong> for ending your tenancy. There are 18
                  permitted grounds under the PRT, including the landlord wishing to sell the property, a family member
                  needing to move in, or significant rent arrears.
                </>,
                <>
                  Your landlord must serve a formal <strong>Notice to Leave</strong> specifying the ground and the
                  required notice period.
                </>,
                "If you do not leave after the notice period, your landlord must apply to the First-tier Tribunal for an eviction order — they cannot physically remove you without one.",
                <>
                  <strong>Illegal eviction</strong> (changing locks, removing belongings, cutting off utilities,
                  harassment) is a criminal offence in Scotland.
                </>,
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <p className="text-gray-700 leading-7">
              If you feel threatened with eviction or are being pressured to leave, contact Shelter Scotland
              immediately on <strong>0808 800 4444</strong> (free helpline, open 9am–5pm Monday to Friday).
            </p>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-3">Protecting Yourself from Fraud</h2>
            <p className="text-gray-700 leading-7 mb-4">
              Rental fraud specifically targeting international students is a documented problem in St Andrews.
              Fraudsters pose as landlords, advertise properties at competitive rents, collect holding deposits or
              full deposits, and then disappear. Three students in one reported period lost a combined approximately
              £12,000 this way.
            </p>
            <p className="text-gray-700 leading-7 mb-3">Protection rules — non-negotiable:</p>
            <ul className="space-y-3">
              {[
                {
                  rule: "Never pay any money without viewing the property in person.",
                  detail: "A video call is not sufficient. If you cannot view before arriving in Scotland, ask a trusted contact to view on your behalf.",
                },
                {
                  rule: "Verify the landlord on the Scottish Landlord Register before paying anything.",
                },
                {
                  rule: "Pay through a letting agent's client account wherever possible",
                  detail: "— never directly to an individual via bank transfer based on a WhatsApp exchange.",
                },
                {
                  rule: "Be suspicious of any property advertised significantly below market rate.",
                  detail: "If a central St Andrews flat is listed at £350/month per person when comparable properties are £700+, it is almost certainly fraudulent.",
                },
                {
                  rule: "The Students' Association lease-checking service is free",
                  detail: "— use it before signing anything.",
                },
              ].map(({ rule, detail }, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-500 text-xs font-bold">!</span>
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>{rule}</strong>
                    {detail ? ` ${detail}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-[1.375rem] font-bold text-gray-900 mb-4">Key Resources for International Students in St Andrews</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Resource</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">What It Does</th>
                    <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Where to Find It</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { resource: "Shelter Scotland", what: "Free legal advice on all tenancy issues", where: "shelterscotland.org / 0808 800 4444" },
                    { resource: "First-tier Tribunal (Housing)", what: "Formal disputes, repairs, eviction", where: "housingandpropertychamber.scot" },
                    { resource: "Scottish Landlord Register", what: "Verify your landlord is registered", where: "landlordregistrationscotland.gov.uk" },
                    { resource: "SafeDeposits Scotland", what: "Check/dispute your deposit", where: "safedepositscotland.com" },
                    { resource: "St Andrews Students' Association", what: "Lease checking, flatmate matching, advice", where: "yourunion.net" },
                    { resource: "Marks Out Of Tenancy", what: "Verified landlord and property reviews", where: "marksoutoftenancy.com" },
                    { resource: "Studentpad", what: "University's official private listings", where: "standrewsstudentpad.co.uk" },
                    { resource: "Citizens Advice Scotland", what: "Broader legal and financial guidance", where: "cas.org.uk" },
                  ].map(({ resource, what, where }) => (
                    <tr key={resource} className="even:bg-gray-50">
                      <td className="p-3 font-medium text-gray-800 border border-gray-200">{resource}</td>
                      <td className="p-3 text-gray-600 border border-gray-200">{what}</td>
                      <td className="p-3 text-gray-500 border border-gray-200">{where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <p className="text-gray-700 leading-7 mb-4">
              Renting in a foreign country under an unfamiliar legal system is genuinely daunting. But
              Scotland&apos;s tenancy law is — in many respects — more protective of tenants than the frameworks most
              international students come from. The private residential tenancy, the deposit protection requirement,
              the repairing standard, and the formal eviction process all give you real, enforceable rights.
            </p>
            <p className="text-gray-700 leading-7">
              The key is knowing those rights exist — and knowing where to go when they aren&apos;t being respected.
            </p>
          </section>

          <section className="bg-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-2">Find a verified property in St Andrews</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Browse current listings from verified letting agents — or set up free instant alerts so you hear about
              new properties the moment they appear, before they&apos;re gone.
            </p>
            <Link
              href="/subscribe"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Set up free alerts →
            </Link>
          </section>

          <p className="text-sm text-gray-400 italic text-center">
            StAndrewsFlats.uk is an independent letting resource for University of St Andrews students.
          </p>

        </div>
      </div>
    </main>
  );
}
