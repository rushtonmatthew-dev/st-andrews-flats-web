"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const path = usePathname();
  if (["/subscribe", "/confirm", "/unsubscribe"].includes(path)) return null;

  return (
    <header
      className="w-full sticky top-0 z-10 backdrop-blur-md"
      style={{ background: "oklch(97% 0.018 72 / 0.9)", borderBottom: "1px solid var(--cream-dark)" }}
    >
      <div className="max-w-[1080px] mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="w-[26px] h-[26px] rounded-[8px] flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--coral)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span
            className="text-[16px] font-extrabold tracking-[-0.025em]"
            style={{ color: "var(--ink)" }}
          >
            St Andrews Flats
          </span>
        </Link>

        <nav className="nav-links flex items-center gap-1">
          {[
            { href: "/analytics", label: "Live market data" },
            { href: "/blog", label: "Student guides" },
            { href: "/guide", label: "Housing guide" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link px-3 py-1.5 rounded-[8px] text-[14px] font-medium transition-colors"
              style={{ color: "var(--ink-soft)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                (e.currentTarget as HTMLElement).style.background = "var(--cream-mid)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--ink-soft)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="ml-2 px-4 py-2 rounded-full text-[14px] font-bold text-white transition-colors"
            style={{ background: "var(--coral)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--coral-dk)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--coral)")}
          >
            Set up alerts
          </Link>
        </nav>
      </div>
    </header>
  );
}
