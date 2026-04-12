import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="max-w-xl w-full">
        <div className="mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Free service
          </span>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            St Andrews<br />Letting Alerts
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We check 6 letting agents every 15 minutes and email you the moment
            something new appears — or send you a daily morning roundup.
          </p>
        </div>

        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          St Andrews student accommodation — what we cover
        </h2>
        <ul className="space-y-3 mb-10">
          {[
            "Covers Rightmove, Studentpad, DJ Alexander, Lawson Thompson, Lettingweb & more",
            "Filter by price and number of bedrooms",
            "Instant alerts or one daily digest",
            "One-click unsubscribe, always",
          ].map((f) => (
            <li key={f} className="flex items-start gap-3 text-gray-700">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/subscribe"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl transition-colors"
        >
          Set up my alerts
        </Link>
        <p className="text-center text-sm text-gray-400 mt-4">
          Free. No account needed. Unsubscribe any time.
        </p>
        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/analytics" className="hover:text-gray-600 underline underline-offset-2">
            Market insights →
          </Link>
        </p>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-base font-semibold text-gray-700 mb-2">
            Which letting agents do we monitor?
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            We watch Rightmove, Studentpad, DJ Alexander, Lawson Thompson, Lettingweb,
            and S1Homes — every St Andrews letting agent students actually use.
            Ideal if you&apos;re hunting for KY16 flats for 2nd year or beyond.
          </p>
        </div>
      </div>
    </main>
  );
}
