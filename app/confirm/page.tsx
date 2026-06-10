import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { robots: "noindex, nofollow" };

export default function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; token?: string }>;
}) {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{ background: "var(--cream)" }}
    >
      <ConfirmContent searchParams={searchParams} />
    </main>
  );
}

async function ConfirmContent({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; token?: string }>;
}) {
  const params = await searchParams;

  if (params.token && !params.success) {
    return (
      <div className="max-w-[480px] w-full text-center">
        <p style={{ fontSize: 15, color: "var(--ink-mid)" }}>Confirming…</p>
      </div>
    );
  }

  const success = params.success === "1";

  if (success) {
    return (
      <div className="max-w-[480px] w-full text-center">
        <div
          className="w-[68px] h-[68px] flex items-center justify-center mx-auto mb-7"
          style={{ background: "var(--coral-lt)", borderRadius: 22 }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--coral)" }}>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1
          className="font-extrabold mb-4"
          style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
        >
          You&apos;re all set 🎉
        </h1>
        <p className="mb-3" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7 }}>
          Your alerts are now active. We&apos;ll email you the moment a matching
          St Andrews flat appears.
        </p>
        <p className="mb-8" style={{ fontSize: 14, color: "var(--ink-soft)" }}>
          While you wait, check the{" "}
          <Link href="/analytics" style={{ color: "var(--coral)", textDecoration: "underline" }}>
            live market data
          </Link>{" "}
          to see when flats typically come to market.
        </p>
        <Link
          href="/"
          style={{ fontSize: 14, color: "var(--ink-faint)", textDecoration: "underline" }}
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[480px] w-full text-center">
      <div
        className="w-[68px] h-[68px] flex items-center justify-center mx-auto mb-7"
        style={{ background: "var(--coral-lt)", borderRadius: 22 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--coral)" }}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h1
        className="font-extrabold mb-4"
        style={{ fontSize: "clamp(26px, 3vw, 34px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
      >
        Check your inbox
      </h1>
      <p className="mb-3" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7 }}>
        We&apos;ve sent you a confirmation email. Click the link inside to
        activate your alerts.
      </p>
      <p className="mb-8" style={{ fontSize: 14, color: "var(--ink-soft)" }}>
        While you wait, explore the{" "}
        <Link href="/analytics" style={{ color: "var(--coral)", textDecoration: "underline" }}>
          live market data
        </Link>{" "}
        to see when flats come to market.
      </p>
      <Link
        href="/"
        style={{ fontSize: 14, color: "var(--ink-faint)", textDecoration: "underline" }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
