import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews Student Flats & Letting Alerts | standrewsflats.uk",
  description:
    "Free letting alerts for St Andrews University students. We monitor 6 agents every 15 minutes — get emailed the moment a new flat appears.",
  metadataBase: new URL("https://standrewsflats.uk"),
  openGraph: {
    type: "website",
    url: "https://standrewsflats.uk",
    title: "St Andrews Student Flats & Letting Alerts",
    description:
      "Free letting alerts for St Andrews University students. We monitor 6 agents every 15 minutes — get emailed the moment a new flat appears.",
    siteName: "standrewsflats.uk",
  },
  twitter: {
    card: "summary",
    title: "St Andrews Student Flats & Letting Alerts",
    description:
      "Free letting alerts for St Andrews University students. We monitor 6 agents every 15 minutes — get emailed the moment a new flat appears.",
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
