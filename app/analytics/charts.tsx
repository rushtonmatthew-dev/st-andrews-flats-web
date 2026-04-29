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

export function WeeklyChart({ data }: { data: WeekPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const HEIGHT = 120;
  const BAR_W = 100 / data.length;

  return (
    <ChartCard title="New listings per week (last 16 weeks)">
      <div style={{ width: "100%", userSelect: "none" }}>
        <svg
          viewBox={`0 0 100 ${HEIGHT + 24}`}
          style={{ width: "100%", overflow: "visible" }}
          preserveAspectRatio="none"
        >
          {data.map((d, i) => {
            const barH = (d.count / max) * HEIGHT;
            const x = i * BAR_W + BAR_W * 0.15;
            const w = BAR_W * 0.7;
            const y = HEIGHT - barH;
            const opacity = 0.55 + (d.count / max) * 0.45;
            return (
              <g key={i}>
                <rect
                  x={`${x}%`}
                  y={y}
                  width={`${w}%`}
                  height={barH}
                  rx={3}
                  fill="var(--coral)"
                  opacity={d.count === max ? 1 : opacity}
                />
                {i % 2 === 0 && (
                  <text
                    x={`${i * BAR_W + BAR_W / 2}%`}
                    y={HEIGHT + 16}
                    textAnchor="middle"
                    fontSize={5.5}
                    fill="var(--ink-faint)"
                  >
                    {d.week}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}

export function DayOfWeekChart({ data }: { data: DayPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const HEIGHT = 100;
  const BAR_W = 100 / data.length;

  return (
    <ChartCard title="By day of week">
      <div style={{ width: "100%", userSelect: "none" }}>
        <svg
          viewBox={`0 0 100 ${HEIGHT + 24}`}
          style={{ width: "100%", overflow: "visible" }}
          preserveAspectRatio="none"
        >
          {data.map((d, i) => {
            const barH = (d.count / max) * HEIGHT;
            const x = i * BAR_W + BAR_W * 0.15;
            const w = BAR_W * 0.7;
            const y = HEIGHT - barH;
            return (
              <g key={i}>
                <rect
                  x={`${x}%`}
                  y={y}
                  width={`${w}%`}
                  height={barH}
                  rx={3}
                  fill="var(--coral)"
                  opacity={d.count === max ? 1 : 0.55 + (d.count / max) * 0.45}
                />
                <text
                  x={`${i * BAR_W + BAR_W / 2}%`}
                  y={HEIGHT + 16}
                  textAnchor="middle"
                  fontSize={6}
                  fill="var(--ink-faint)"
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>
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
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80 }}>
          {data.map((d, i) => (
            <div
              key={i}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: 3,
                  height: d.count === 0 ? 2 : Math.max(4, (d.count / max) * 72),
                  background:
                    d.count === max
                      ? "var(--coral)"
                      : `oklch(62% 0.17 42 / ${0.2 + (d.count / max) * 0.8})`,
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          {HOUR_LABELS.map((l) => (
            <span key={l} style={{ fontSize: 10, color: "var(--ink-faint)" }}>
              {l}
            </span>
          ))}
        </div>
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
  if (data.length === 0) return null;

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
                <tr
                  key={i}
                  style={{ borderTop: "1px solid var(--cream-dark)" }}
                >
                  <td
                    style={{
                      padding: "10px 16px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: colours.text,
                      background: colours.bg,
                    }}
                  >
                    {d.street}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: 13,
                      fontWeight: 700,
                      color: colours.text,
                      background: colours.bg,
                    }}
                  >
                    £{d.avg_per_person}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: 13,
                      color: "var(--ink-mid)",
                      background: colours.bg,
                    }}
                  >
                    £{d.avg_total}
                  </td>
                  <td
                    style={{
                      padding: "10px 16px",
                      textAlign: "right",
                      fontSize: 12,
                      color: "var(--ink-faint)",
                      background: colours.bg,
                    }}
                  >
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
