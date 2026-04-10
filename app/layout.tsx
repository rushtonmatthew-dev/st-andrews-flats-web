import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "St Andrews Flats — Letting Alerts",
  description:
    "Get instant or daily email alerts for rental properties in St Andrews, Fife.",
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
