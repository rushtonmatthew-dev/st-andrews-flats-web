import Link from "next/link";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  const success = params.success === "1";

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-[480px] w-full text-center">
        {success ? (
          <>
            <p className="text-5xl mb-6">👋</p>
            <h1
              className="font-extrabold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
            >
              You&apos;ve been unsubscribed
            </h1>
            <p className="mb-8" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7 }}>
              You won&apos;t receive any more emails from us. If you change your mind, you can
              always sign up again — it takes 30 seconds.
            </p>
            <Link
              href="/subscribe"
              className="inline-block font-bold rounded-full px-6 py-3 mb-6 text-white"
              style={{ background: "var(--coral)", fontSize: 14 }}
            >
              Sign up again
            </Link>
            <br />
            <Link
              href="/"
              style={{ fontSize: 14, color: "var(--ink-faint)", textDecoration: "underline" }}
            >
              Back to home
            </Link>
          </>
        ) : (
          <>
            <h1
              className="font-extrabold mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
            >
              Unsubscribe
            </h1>
            <p className="mb-8" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.7 }}>
              Use the unsubscribe link in one of your alert emails to stop receiving
              notifications. Each email has a one-click unsubscribe link at the bottom.
            </p>
            <Link
              href="/"
              style={{ fontSize: 14, color: "var(--ink-faint)", textDecoration: "underline" }}
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
