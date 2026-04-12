import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — St Andrews Flats",
  description: "Privacy policy for standrewsflats.uk — what data we collect, why, and your rights under UK GDPR.",
  alternates: { canonical: "https://www.standrewsflats.uk/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: 12 April 2026</p>

        <div className="space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Who we are</h2>
            <p>
              St Andrews Flats (<span className="font-medium">standrewsflats.uk</span>) is a free letting alert service
              for students at the University of St Andrews. We are operated as an independent service.
              For privacy queries, contact us at:{" "}
              <a href="mailto:hello@standrewsflats.uk" className="text-blue-600 underline">
                hello@standrewsflats.uk
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What data we collect</h2>
            <p className="mb-3">When you subscribe to letting alerts, we collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Your email address</li>
              <li>Your alert preferences (frequency, price filters, bedroom filters)</li>
              <li>The date and time you subscribed</li>
            </ul>
            <p className="mt-3">
              We do not collect your name, phone number, payment information, or any other personal data.
              We do not use cookies for tracking or advertising.
            </p>
            <p className="mt-3">
              We use basic web analytics (such as page view counts) to understand how the site is used.
              This does not identify individual visitors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Why we collect it</h2>
            <p>
              We collect your email address solely to send you the letting alerts you requested. We do not
              use it for marketing, do not share it with third parties, and do not sell it. Ever.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How long we keep it</h2>
            <p>
              We keep your email address and preferences for as long as you remain subscribed. When you
              unsubscribe, your data is deleted within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your rights</h2>
            <p className="mb-3">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (unsubscribe at any time using the link in any alert email)</li>
              <li>Object to processing</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@standrewsflats.uk" className="text-blue-600 underline">
                hello@standrewsflats.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Unsubscribing</h2>
            <p>
              Every alert email contains a one-click unsubscribe link. You can unsubscribe at any time.
              We will not send you further emails after you unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Changes to this policy</h2>
            <p>
              If we make significant changes to this policy, we will update the date above. Continued use
              of the service after changes constitutes acceptance.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
