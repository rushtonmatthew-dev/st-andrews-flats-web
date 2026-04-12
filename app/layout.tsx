import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews Letting Alerts — Be First to Know | standrewsflats.uk",
  description:
    "Get instant alerts when St Andrews student flats appear on Rightmove, Studentpad, DJ Alexander and more. Free, no account needed. KY16 listings checked every 15 minutes.",
  metadataBase: new URL("https://www.standrewsflats.uk"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <SiteNav />
        {children}
        <footer className="w-full border-t border-gray-100 bg-white mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>© 2026 standrewsflats.uk — Free letting alerts for St Andrews students</p>
            <nav className="flex items-center gap-4">
              <a href="/privacy" className="underline hover:text-gray-600">Privacy policy</a>
              <a href="mailto:hello@standrewsflats.uk" className="underline hover:text-gray-600">Contact</a>
              <a href="/landlords" className="underline hover:text-gray-600">Landlords</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
