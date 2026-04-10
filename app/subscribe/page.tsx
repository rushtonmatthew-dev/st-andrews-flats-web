"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "loading" | "done" | "already" | "error";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [subType, setSubType] = useState<"both" | "instant" | "daily">("both");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      email,
      sub_type: subType,
      max_price: maxPrice ? parseInt(maxPrice) : null,
      min_bedrooms: minBeds ? parseInt(minBeds) : null,
      max_bedrooms: maxBeds ? parseInt(maxBeds) : null,
    };

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong");
        setStatus("error");
        return;
      }

      if (data.message === "already_subscribed") {
        setStatus("already");
      } else {
        setStatus("done");
      }
    } catch {
      setErrorMsg("Network error — please try again");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your inbox</h1>
          <p className="text-gray-600">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your alerts.
          </p>
        </div>
      </main>
    );
  }

  if (status === "already") {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">You&apos;re already subscribed</h1>
          <p className="text-gray-600 mb-6">
            <strong>{email}</strong> already has an active subscription. Check your inbox for a manage link, or{" "}
            <Link href="/" className="text-blue-600 underline">go back home</Link>.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div className="max-w-md w-full">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
          ← Back
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Set up your alerts</h1>
        <p className="text-gray-500 mb-8">Takes 30 seconds. Free forever.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Alert type */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Alert frequency</p>
            <div className="grid grid-cols-3 gap-2">
              {(["both", "instant", "daily"] as const).map((t) => {
                const labels = { both: "Both", instant: "Instant only", daily: "Daily only" };
                const descs = {
                  both: "Instant + morning digest",
                  instant: "Alert when new listings appear",
                  daily: "One email every morning",
                };
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSubType(t)}
                    className={`rounded-lg border px-3 py-3 text-left transition-colors ${
                      subType === t
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{labels[t]}</span>
                    <span className="block text-xs mt-0.5 opacity-75">{descs[t]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">
              Filters <span className="font-normal text-gray-400">(optional)</span>
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="max_price">
                  Max price (£/mo)
                </label>
                <input
                  id="max_price"
                  type="number"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="min_beds">
                  Min beds
                </label>
                <input
                  id="min_beds"
                  type="number"
                  min={1}
                  max={10}
                  value={minBeds}
                  onChange={(e) => setMinBeds(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1" htmlFor="max_beds">
                  Max beds
                </label>
                <input
                  id="max_beds"
                  type="number"
                  min={1}
                  max={10}
                  value={maxBeds}
                  onChange={(e) => setMaxBeds(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {status === "loading" ? "Sending…" : "Send confirmation email"}
          </button>

          <p className="text-center text-xs text-gray-400">
            You&apos;ll get one confirmation email. No spam, ever.
          </p>
        </form>
      </div>
    </main>
  );
}
