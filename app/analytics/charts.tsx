"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Treemap,
} from "recharts";
import { costColour, type StreetCostEntry } from "@/lib/analytics";

const BLUE = "#1d4ed8";
const BLUE_LIGHT = "#bfdbfe";

type WeekPoint = { week: string; count: number };
type DayPoint = { day: string; count: number };
type HourPoint = { hour: number; count: number };
type AgentPoint = { agent: string; count: number };

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{title}</h3>
      {children}
    </div>
  );
}

export function WeeklyChart({ data }: { data: WeekPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ChartCard title="New listings per week (last 16 weeks)">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval={1} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={24} />
          <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.count === max ? BLUE : BLUE_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function DayOfWeekChart({ data }: { data: DayPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ChartCard title="By day of week">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={24} />
          <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.count === max ? BLUE : BLUE_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function HourChart({ data }: { data: HourPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const labelled = data.map((d) => ({
    ...d,
    label: d.hour % 6 === 0 ? `${d.hour}:00` : "",
  }));
  return (
    <ChartCard title="Time of day (UTC) new listings first appear">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={labelled} barCategoryGap="10%">
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} width={24} />
          <Tooltip
            labelFormatter={(_, payload) => payload?.[0] ? `${(payload[0].payload as HourPoint).hour}:00 UTC` : ""}
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]}>
            {labelled.map((entry, i) => (
              <Cell key={i} fill={entry.count === max ? BLUE : BLUE_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AgentChart({ data }: { data: AgentPoint[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ChartCard title="By letting agent">
      <ResponsiveContainer width="100%" height={Math.max(data.length * 44, 120)}>
        <BarChart data={data} layout="vertical" barCategoryGap="20%">
          <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="agent" tick={{ fontSize: 12, fill: "#374151" }} axisLine={false} tickLine={false} width={110} />
          <Tooltip cursor={{ fill: "#f3f4f6" }} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.count === max ? BLUE : BLUE_LIGHT} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ---------------------------------------------------------------------------
// Street cost heat map
// ---------------------------------------------------------------------------

type TreemapNodeProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  avg_per_person: number;
  fill: string;
};

function HeatMapNode(props: TreemapNodeProps) {
  const { x, y, width, height, name, avg_per_person, fill } = props;
  const showLabel = width > 60 && height > 32;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke="#fff" strokeWidth={2} rx={4} />
      {showLabel && (
        <>
          <text x={x + 8} y={y + 18} fill="#fff" fontSize={11} fontWeight={600}
            style={{ textShadow: "0 1px 2px rgba(0,0,0,.4)" }}>
            {name.length > 16 ? name.slice(0, 14) + "…" : name}
          </text>
          <text x={x + 8} y={y + 32} fill="rgba(255,255,255,.85)" fontSize={10}>
            £{avg_per_person}/mo pp
          </text>
        </>
      )}
    </g>
  );
}

export function StreetHeatMap({ data }: { data: StreetCostEntry[] }) {
  if (data.length === 0) return null;

  const min = data[data.length - 1].avg_per_person;
  const max = data[0].avg_per_person;
  const range = max - min || 1;

  const treemapData = data.map((d) => ({
    name: d.street,
    size: d.count,
    avg_per_person: d.avg_per_person,
    avg_total: d.avg_total,
    fill: costColour((d.avg_per_person - min) / range),
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
        Cost per person by street
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        Rectangle size = number of listings. Colour: blue = cheapest, red = most expensive.
      </p>

      <ResponsiveContainer width="100%" height={380}>
        <Treemap
          data={treemapData}
          dataKey="size"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          content={(props: any) => <HeatMapNode {...props} />}
        >
          <Tooltip
            content={({ payload }) => {
              const d = payload?.[0]?.payload;
              if (!d) return null;
              return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm">
                  <p className="font-semibold text-gray-900">{d.name}</p>
                  <p className="text-gray-600">£{d.avg_per_person}/mo per person</p>
                  <p className="text-gray-600">£{d.avg_total}/mo total avg</p>
                  <p className="text-gray-400 text-xs">{d.size} listing{d.size !== 1 ? "s" : ""}</p>
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>

      <div className="flex items-center gap-2 mt-3 justify-center">
        <span className="text-xs text-gray-400">Cheaper</span>
        <div className="flex h-3 w-32 rounded overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ flex: 1, background: costColour(i / 19) }} />
          ))}
        </div>
        <span className="text-xs text-gray-400">More expensive</span>
      </div>
    </div>
  );
}
