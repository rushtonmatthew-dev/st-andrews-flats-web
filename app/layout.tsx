import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
});

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
    <html lang="en" className={jakarta.variable}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta property="og:image" content="https://www.standrewsflats.uk/images/site/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.standrewsflats.uk/images/site/og-image.png" />
      </head>
      <body>
        <SiteNav />
        {children}
        <footer style={{ background: "var(--ink)" }} className="py-14 px-8">
          <div className="flex items-center justify-between max-w-[1080px] mx-auto flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span
                className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--coral)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="text-sm font-extrabold tracking-tight" style={{ color: "var(--white)" }}>
                St Andrews Flats
              </span>
            </div>
            <nav className="flex items-center gap-6">
              {[
                { href: "/analytics", label: "Live market data" },
                { href: "/blog", label: "Student guides" },
                { href: "/guide", label: "Housing guide" },
                { href: "/privacy", label: "Privacy" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              © 2026 standrewsflats.uk
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
