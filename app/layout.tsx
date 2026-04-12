import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews Letting Alerts — Be First to Know | standrewsflats.uk",
  description:
    "Get instant alerts when St Andrews student flats appear on Rightmove, Studentpad, DJ Alexander and more. Free, no account needed. KY16 listings checked every 15 minutes.",
  metadataBase: new URL("https://standrewsflats.uk"),
  openGraph: {
    type: "website",
    url: "https://standrewsflats.uk",
    title: "St Andrews Letting Alerts — Be First to Know",
    description:
      "Get instant alerts when St Andrews student flats appear on Rightmove, Studentpad, DJ Alexander and more. Free, no account needed. KY16 listings checked every 15 minutes.",
    siteName: "standrewsflats.uk",
  },
  twitter: {
    card: "summary",
    title: "St Andrews Letting Alerts — Be First to Know",
    description:
      "Get instant alerts when St Andrews student flats appear on Rightmove, Studentpad, DJ Alexander and more. Free, no account needed. KY16 listings checked every 15 minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
