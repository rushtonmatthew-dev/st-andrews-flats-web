"use client";

import { costColour, type StreetCostEntry } from "@/lib/analytics";

type WeekPoint = { week: string; count: number };
type DayPoint = { day: string; count: number };
type HourPoint = { hour: number; count: number };
type AgentPoint = { agent: string; count: number };

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div
      className="mb-5"
      style={{
        background: "var(--white)",
        border: "1px solid var(--cream-dark)",
        borderRadius: 20,
        padding: "28px 28px 20px",
      }}
    >
      <p className="font-bold mb-1" style={{ fontSize: 14, color: "var(--ink)", letterSpacing: "-0.01em" }}>
        {title}
      </p>
      {subtitle && (
        <p className="mb-5" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
          {subtitle}
        </p>
      )}
      {!subtitle && <div className="mb-5" />}
      {children}
    </div>
  );
}

function barColour(count: number, max: number): string {
  if (count === max) return "var(--coral)";
  return `oklch(62% 0.17 42 / ${0.25 + (count / max) * 0.75})`;
}

export function WeeklyChart({ data }: { data: WeekPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ChartCard title="New listings per week (last 16 weeks)">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 100 }}>
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.week}: ${d.count}`}
            style={{
              flex: 1,
              borderRadius: "3px 3px 0 0",
              height: d.count === 0 ? 2 : Math.max(4, (d.count / max) * 100),
              background: barColour(d.count, max),
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            {i % 2 === 0 && (
              <span style={{ fontSize: 10, color: "var(--ink-faint)" }}>{d.week}</span>
            )}
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function DayOfWeekChart({ data }: { data: DayPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ChartCard title="By day of week">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100 }}>
        {data.map((d) => (
          <div
            key={d.day}
            title={`${d.day}: ${d.count}`}
            style={{
              flex: 1,
              borderRadius: "3px 3px 0 0",
              height: d.count === 0 ? 2 : Math.max(4, (d.count / max) * 100),
              background: barColour(d.count, max),
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", marginTop: 6 }}>
        {data.map((d) => (
          <div key={d.day} style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>{d.day}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

const HOUR_LABELS = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];

export function HourChart({ data }: { data: HourPoint[] }) {
  const counts = data.map((d) => d.count);
  const max = Math.max(...counts, 1);

  return (
    <ChartCard title="Time of day new listings first appear" subtitle="UTC">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
        {data.map((d, i) => (
          <div
            key={i}
            title={`${d.hour}:00 UTC: ${d.count}`}
            style={{
              flex: 1,
              borderRadius: "3px 3px 0 0",
              height: d.count === 0 ? 2 : Math.max(4, (d.count / max) * 100),
              background: barColour(d.count, max),
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        {HOUR_LABELS.map((l) => (
          <span key={l} style={{ fontSize: 10, color: "var(--ink-faint)" }}>
            {l}
          </span>
        ))}
      </div>
    </ChartCard>
  );
}

export function AgentChart({ data }: { data: AgentPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <ChartCard title="By letting agent">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 140,
                fontSize: 13,
                fontWeight: 500,
                color: "var(--ink)",
                flexShrink: 0,
                textAlign: "right",
              }}
            >
              {d.agent}
            </div>
            <div
              style={{
                flex: 1,
                height: 10,
                background: "var(--cream-mid)",
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 100,
                  width: `${(d.count / max) * 100}%`,
                  background:
                    i === 0
                      ? "var(--coral)"
                      : `oklch(62% 0.17 42 / ${0.4 + (d.count / max) * 0.6})`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <div
              style={{ width: 36, fontSize: 12, fontWeight: 700, color: "var(--ink-soft)", flexShrink: 0 }}
            >
              {d.count}
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

const TIER_COLOURS: Record<string, { bg: string; text: string }> = {
  highest: { bg: "oklch(90% 0.1 42)", text: "oklch(38% 0.14 42)" },
  high: { bg: "oklch(93% 0.07 42)", text: "oklch(44% 0.12 42)" },
  mid: { bg: "oklch(95% 0.04 72)", text: "oklch(40% 0.04 72)" },
  low: { bg: "oklch(97% 0.018 72)", text: "oklch(40% 0.02 72)" },
};

function getTier(normalised: number): string {
  if (normalised > 0.75) return "highest";
  if (normalised > 0.5) return "high";
  if (normalised > 0.25) return "mid";
  return "low";
}

export function StreetHeatMap({ data }: { data: StreetCostEntry[] }) {
  if (data.length < 5) return null;

  const min = data[data.length - 1].avg_per_person;
  const max = data[0].avg_per_person;
  const range = max - min || 1;

  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--cream-dark)",
        borderRadius: 20,
        padding: "28px 28px 20px",
        marginBottom: 20,
      }}
    >
      <p className="font-bold mb-1" style={{ fontSize: 14, color: "var(--ink)" }}>
        Cost per person by street
      </p>
      <p className="mb-5" style={{ fontSize: 12, color: "var(--ink-soft)" }}>
        Average monthly cost per person. Colour: warmer = more expensive.
      </p>

      <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--cream-dark)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--cream-mid)" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "var(--ink-soft)" }}>
                Street
              </th>
              <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "var(--ink-soft)" }}>
                Per person /mo
              </th>
              <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "var(--ink-soft)" }}>
                Total /mo
              </th>
              <th style={{ padding: "10px 16px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "var(--ink-soft)" }}>
                Listings
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              const norm = (d.avg_per_person - min) / range;
              const tier = getTier(norm);
              const colours = TIER_COLOURS[tier];
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--cream-dark)" }}>
                  <td style={{ padding: "10px 16px", fontSize: 13, fontWeight: 600, color: colours.text, background: colours.bg }}>
                    {d.street}
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 13, fontWeight: 700, color: colours.text, background: colours.bg }}>
                    £{d.avg_per_person}
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 13, color: "var(--ink-mid)", background: colours.bg }}>
                    £{d.avg_total}
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "right", fontSize: 12, color: "var(--ink-faint)", background: colours.bg }}>
                    {d.count}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4 justify-center">
        <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>Cheaper</span>
        <div style={{ display: "flex", height: 10, width: 120, borderRadius: 100, overflow: "hidden" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ flex: 1, background: costColour(i / 19) }} />
          ))}
        </div>
        <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>More expensive</span>
      </div>
    </div>
  );
}
