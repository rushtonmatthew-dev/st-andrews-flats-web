"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

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
    return <p className="text-gray-500">Loading your preferences…</p>;
  }

  if (status === "invalid") {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Invalid link</h1>
        <p className="text-gray-600 mb-4">This manage link is invalid or the subscription is no longer active.</p>
        <Link href="/subscribe" className="text-blue-600 hover:underline">Subscribe again</Link>
      </div>
    );
  }

  if (status === "error") {
    return <p className="text-red-600">Something went wrong. Please try again later.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Manage alerts</h1>
        <p className="text-gray-500 text-sm">Update your preferences below.</p>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">Alert frequency</p>
        <div className="grid grid-cols-3 gap-2">
          {(["both", "instant", "daily"] as const).map((t) => {
            const labels = { both: "Both", instant: "Instant only", daily: "Daily only" };
            return (
              <button
                key={t}
                type="button"
                onClick={() => setPrefs((p) => ({ ...p, sub_type: t }))}
                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-colors ${
                  prefs.sub_type === t
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {labels[t]}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="block text-sm font-medium text-gray-700 mb-2">
          Filters <span className="font-normal text-gray-400">(optional)</span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max price (£/mo)</label>
            <input
              type="number"
              min={0}
              value={prefs.max_price ?? ""}
              onChange={(e) => setPrefs((p) => ({ ...p, max_price: e.target.value ? parseInt(e.target.value) : null }))}
              placeholder="No limit"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min beds</label>
            <input
              type="number"
              min={1}
              max={10}
              value={prefs.min_bedrooms ?? ""}
              onChange={(e) => setPrefs((p) => ({ ...p, min_bedrooms: e.target.value ? parseInt(e.target.value) : null }))}
              placeholder="Any"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max beds</label>
            <input
              type="number"
              min={1}
              max={10}
              value={prefs.max_bedrooms ?? ""}
              onChange={(e) => setPrefs((p) => ({ ...p, max_bedrooms: e.target.value ? parseInt(e.target.value) : null }))}
              placeholder="Any"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved!" : "Save preferences"}
      </button>
    </form>
  );
}

export default function ManagePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <Suspense fallback={<p className="text-gray-500">Loading…</p>}>
        <ManageForm />
      </Suspense>
    </main>
  );
}
