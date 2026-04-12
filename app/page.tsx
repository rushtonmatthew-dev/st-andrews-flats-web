import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "St Andrews Student Letting Alerts — Free flat alerts for St Andrews students",
  description:
    "Free letting alerts for St Andrews University students. We check Studentpad, DJ Alexander, Lawson Thompson, Lettingweb, Standys and more every 15 minutes — and email you the moment a new flat appears.",
  alternates: { canonical: "https://www.standrewsflats.uk/" },
  openGraph: {
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 6 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    url: "https://www.standrewsflats.uk/",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "St Andrews Student Letting Alerts — Free & instant",
    description:
      "We check 6 letting agents every 15 minutes and email you the moment a new flat appears. Free, no account needed.",
    images: ["https://www.standrewsflats.uk/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
        <div className="max-w-xl w-full">
          <div className="mb-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
              Free service
            </span>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Don't miss<br />the flat.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              St Andrews flats go fast. We check 6 letting agents every 15 minutes and alert you the moment something new appears — so you're always first.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-6 mb-2">
              <span className="flex -space-x-1">
                <span className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white inline-block" />
                <span className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white inline-block" />
                <span className="w-6 h-6 rounded-full bg-sky-400 border-2 border-white inline-block" />
              </span>
              <span>Used by students across St Andrews — join them for free</span>
            </div>

            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mt-4">
              <strong>Flat hunting season typically opens in October.</strong> Popular KY16 listings often go within hours of appearing. Set up alerts now so you don't miss yours.
            </p>
          </div>

          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            St Andrews student accommodation — what we cover
          </h2>
          <ul className="space-y-3 mb-10">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span><strong>Rightmove, Studentpad, DJ Alexander, Lawson Thompson, Lettingweb</strong> & more</span>
            </li>
            {[
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
        </div>
      </main>
      <footer className="w-full text-center py-6 text-xs text-gray-400">
        <a href="/landlords" className="underline hover:text-gray-600">
          Are you a landlord or letting agent?
        </a>
      </footer>
    </>
  );
}
