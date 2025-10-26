"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for the chart
const data = [
  { name: "Recipe App", score: 85 },
  { name: "Fitness Planner", score: 92 },
  { name: "VR Travel", score: 78 },
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Legend />
        <Bar dataKey="score" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
