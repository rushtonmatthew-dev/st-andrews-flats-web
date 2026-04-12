"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const path = usePathname();
  if (path === "/subscribe") return null;

  return (
    <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
        >
          St Andrews Flats
        </Link>

        <nav className="flex items-center gap-5 text-sm text-gray-500">
          <Link href="/analytics" className="hover:text-gray-900 transition-colors">
            Market insights
          </Link>
          <Link
            href="/subscribe"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-medium hover:bg-blue-700 transition-colors text-xs"
          >
            Set up alerts
          </Link>
        </nav>
      </div>
    </header>
  );
}
