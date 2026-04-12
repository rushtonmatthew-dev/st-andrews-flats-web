import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set up your letting alerts — St Andrews Flats",
  description:
    "Set up your free St Andrews letting alerts in 30 seconds. Filter by price and bedrooms. Get instant alerts or a daily digest. No account needed, unsubscribe any time.",
  alternates: { canonical: "https://www.standrewsflats.uk/subscribe" },
  openGraph: {
    title: "Set up your St Andrews letting alerts — 30 seconds, free forever",
    description:
      "Filter by price and bedrooms. Get instant alerts or a daily digest. Be the first to know when a new flat appears.",
    url: "https://www.standrewsflats.uk/subscribe",
    type: "website",
    siteName: "St Andrews Flats",
    images: [{ url: "https://www.standrewsflats.uk/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
