"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Status = "idle" | "loading" | "done" | "already" | "error";

function SubscribeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [subType, setSubType] = useState<"both" | "instant" | "daily">("both");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (status === "done") {
      router.push("/confirm");
    }
  }, [status, router]);

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

  if (status === "already") {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-screen px-8"
        style={{ background: "var(--cream)" }}
      >
        <div className="max-w-[520px] w-full text-center">
          <h1
            className="font-extrabold mb-3"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", color: "var(--ink)", letterSpacing: "-0.03em" }}
          >
            You&apos;re already subscribed
          </h1>
          <p className="mb-6" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
            <strong style={{ color: "var(--ink)" }}>{email}</strong> already has an active subscription.
            Check your inbox for a manage link.
          </p>
          <a href="/" style={{ fontSize: 14, color: "var(--coral)", textDecoration: "underline" }}>
            Back to home
          </a>
        </div>
      </main>
    );
  }

  const freqOptions: Record<"both" | "instant" | "daily", { label: string; desc: string }> = {
    both: { label: "Instant + morning digest", desc: "Alert the moment a listing appears, plus a daily roundup" },
    instant: { label: "Instant only", desc: "Alert when new listings appear — no daily email" },
    daily: { label: "Daily digest only", desc: "One email every morning with everything new" },
  };

  return (
    <main
      className="flex flex-col items-center min-h-screen px-8 py-16"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-[520px] w-full">
        <h1
          className="font-extrabold mb-2"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "var(--ink)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
          }}
        >
          Set up your<br />
          <em style={{ color: "var(--coral)" }}>alerts.</em>
        </h1>
        <p className="mb-10" style={{ fontSize: 15, color: "var(--ink-mid)", lineHeight: 1.65 }}>
          Takes 30 seconds. Free forever.
        </p>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Email */}
          <div>
            <label
              className="block font-bold uppercase tracking-widest mb-2"
              htmlFor="email"
              style={{ fontSize: 12, color: "var(--ink-soft)" }}
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full outline-none transition-colors"
              style={{
                borderRadius: 12,
                border: "1.5px solid var(--cream-dark)",
                padding: "12px 16px",
                fontSize: 15,
                color: "var(--ink)",
                background: "var(--white)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--coral)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--cream-dark)")}
            />
          </div>

          {/* Alert frequency */}
          <div>
            <p
              className="font-bold uppercase tracking-widest mb-3"
              style={{ fontSize: 12, color: "var(--ink-soft)" }}
            >
              Alert frequency
            </p>
            <div className="flex flex-col gap-2">
              {(["both", "instant", "daily"] as const).map((t) => {
                const selected = subType === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSubType(t)}
                    className="text-left flex items-start gap-3 transition-colors"
                    style={{
                      borderRadius: 14,
                      border: `1.5px solid ${selected ? "var(--coral)" : "var(--cream-dark)"}`,
                      padding: "14px 16px",
                      background: selected ? "var(--coral-lt)" : "var(--white)",
                    }}
                  >
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
                      style={{
                        border: `2px solid ${selected ? "var(--coral)" : "var(--cream-dark)"}`,
                        background: selected ? "var(--coral)" : "var(--white)",
                      }}
                    >
                      {selected && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-white transition-transform scale-100"
                        />
                      )}
                    </span>
                    <span>
                      <span
                        className="block font-semibold"
                        style={{ fontSize: 14, color: selected ? "var(--coral)" : "var(--ink)" }}
                      >
                        {freqOptions[t].label}
                      </span>
                      <span
                        className="block mt-0.5"
                        style={{ fontSize: 12, color: "var(--ink-soft)" }}
                      >
                        {freqOptions[t].desc}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div>
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
                { id: "max_price", label: "Max price (£/mo)", val: maxPrice, set: setMaxPrice, ph: "e.g. 1200", min: 0 },
                { id: "min_beds", label: "Min beds", val: minBeds, set: setMinBeds, ph: "e.g. 2", min: 1 },
                { id: "max_beds", label: "Max beds", val: maxBeds, set: setMaxBeds, ph: "e.g. 4", min: 1 },
              ].map(({ id, label, val, set, ph, min }) => (
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
                    min={min}
                    max={id !== "max_price" ? 10 : undefined}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={ph}
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
            <p className="mt-2" style={{ fontSize: 12, color: "var(--ink-faint)" }}>
              Typical 3-bed: £1,000–£1,400/month. Leave blank for no limit.
            </p>
          </div>

          {status === "error" && (
            <p style={{ fontSize: 14, color: "#dc2626" }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full text-white font-bold transition-colors"
            style={{
              background: status === "loading" ? "var(--ink-faint)" : "var(--coral)",
              borderRadius: 9999,
              padding: "16px",
              fontSize: 16,
            }}
          >
            {status === "loading" ? "Sending…" : "Send confirmation email"}
          </button>

          <p className="text-center" style={{ fontSize: 13, color: "var(--ink-faint)" }}>
            You&apos;ll get one confirmation email. No spam, ever.
          </p>
        </form>
      </div>
    </main>
  );
}

export default function SubscribePage() {
  return (
    <Suspense>
      <SubscribeForm />
    </Suspense>
  );
}
