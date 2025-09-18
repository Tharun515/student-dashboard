"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { skill: "Comprehension", score: 75 },
  { skill: "Attention", score: 68 },
  { skill: "Focus", score: 72 },
  { skill: "Retention", score: 70 },
];

export default function BarChartComponent() {
  return (
    <div style={{ background: "white", padding: "1rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <h3 style={{ marginBottom: "1rem", color: "#1E40AF" }}>Skill vs Average Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skill" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#1E40AF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
