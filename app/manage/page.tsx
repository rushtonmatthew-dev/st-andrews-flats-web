"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Prefs = {
  sub_type: "instant" | "daily" | "both";
  max_price: number | null;
  min_bedrooms: number | null;
  max_bedrooms: number | null;
};

type Status = "loading" | "ready" | "saving" | "saved" | "invalid" | "error";

function ManageForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<Status>("loading");
  const [prefs, setPrefs] = useState<Prefs>({
    sub_type: "both",
    max_price: null,
    min_bedrooms: null,
    max_bedrooms: null,
  });

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    fetch(`/api/manage?token=${token}`)
      .then((r) => {
        if (r.status === 404) { setStatus("invalid"); return null; }
        if (!r.ok) { setStatus("error"); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setPrefs(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const res = await fetch("/api/manage", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, ...prefs }),
    });

    setStatus(res.ok ? "saved" : "error");
    if (res.ok) setTimeout(() => setStatus("ready"), 2500);
  }

  if (status === "loading") {
    return <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>Loading your preferences…</p>;
  }

  if (status === "invalid") {
    return (
      <div className="text-center">
        <h1
          className="font-extrabold mb-3"
          style={{ fontSize: "clamp(24px, 3vw, 32px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
        >
          Invalid link
        </h1>
        <p className="mb-6" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
          This manage link is invalid or the subscription is no longer active.
        </p>
        <Link href="/subscribe" style={{ color: "var(--coral)", textDecoration: "underline", fontSize: 14 }}>
          Subscribe again
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return <p style={{ color: "#dc2626", fontSize: 14 }}>Something went wrong. Please try again later.</p>;
  }

  const freqs = [
    { id: "both" as const, label: "Instant + daily digest" },
    { id: "instant" as const, label: "Instant only" },
    { id: "daily" as const, label: "Daily only" },
  ];

  const isSaved = status === "saved";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[520px]">
      <h1
        className="font-extrabold mb-2"
        style={{ fontSize: "clamp(24px, 3vw, 32px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
      >
        Manage your alerts
      </h1>
      <p className="mb-10" style={{ fontSize: 15, color: "var(--ink-mid)" }}>
        Update your preferences below. Changes take effect immediately.
      </p>

      {/* Frequency */}
      <div className="mb-7">
        <p
          className="font-bold uppercase tracking-widest mb-3"
          style={{ fontSize: 12, color: "var(--ink-soft)" }}
        >
          Alert frequency
        </p>
        <div className="grid grid-cols-3 gap-2">
          {freqs.map((f) => {
            const selected = prefs.sub_type === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setPrefs((p) => ({ ...p, sub_type: f.id }))}
                className="text-center transition-colors py-3 px-2"
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${selected ? "var(--coral)" : "var(--cream-dark)"}`,
                  background: selected ? "var(--coral-lt)" : "var(--white)",
                  fontSize: 13,
                  fontWeight: 600,
                  color: selected ? "var(--coral)" : "var(--ink)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <p
          className="font-bold uppercase tracking-widest mb-3"
          style={{ fontSize: 12, color: "var(--ink-soft)" }}
        >
          Filters{" "}
          <span className="font-normal normal-case tracking-normal" style={{ color: "var(--ink-faint)" }}>
            (optional)
          </span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "max_price", label: "Max price (£/mo)", key: "max_price" as const },
            { id: "min_beds", label: "Min beds", key: "min_bedrooms" as const },
            { id: "max_beds", label: "Max beds", key: "max_bedrooms" as const },
          ].map(({ id, label, key }) => (
            <div key={id}>
              <label
                className="block mb-1"
                htmlFor={id}
                style={{ fontSize: 12, color: "var(--ink-soft)" }}
              >
                {label}
              </label>
              <input
                id={id}
                type="number"
                min={key !== "max_price" ? 1 : 0}
                max={key !== "max_price" ? 10 : undefined}
                value={prefs[key] ?? ""}
                onChange={(e) =>
                  setPrefs((p) => ({
                    ...p,
                    [key]: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
                placeholder="No limit"
                className="w-full outline-none"
                style={{
                  borderRadius: 10,
                  border: "1.5px solid var(--cream-dark)",
                  padding: "9px 12px",
                  fontSize: 14,
                  color: "var(--ink)",
                  background: "var(--white)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--coral)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--cream-dark)")}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full font-bold text-white transition-colors"
        style={{
          background: isSaved ? "oklch(55% 0.15 150)" : status === "saving" ? "var(--ink-faint)" : "var(--coral)",
          borderRadius: 9999,
          padding: "15px",
          fontSize: 16,
        }}
      >
        {status === "saving" ? "Saving…" : isSaved ? "Preferences saved ✓" : "Save preferences"}
      </button>

      <div className="text-center mt-6">
        <Link
          href="/unsubscribe"
          style={{ fontSize: 13, color: "var(--ink-faint)", textDecoration: "underline" }}
        >
          Unsubscribe
        </Link>
      </div>
    </form>
  );
}

export default function ManagePage() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen px-8 py-16"
      style={{ background: "var(--cream)" }}
    >
      <Suspense fallback={<p style={{ color: "var(--ink-soft)", fontSize: 15 }}>Loading…</p>}>
        <ManageForm />
      </Suspense>
    </main>
  );
}
