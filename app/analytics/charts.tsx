"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
