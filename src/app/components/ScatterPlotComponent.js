"use client";

import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { attention: 60, score: 65 },
  { attention: 70, score: 75 },
  { attention: 80, score: 85 },
  { attention: 50, score: 55 },
  { attention: 90, score: 92 },
  { attention: 65, score: 68 },
];

export default function ScatterPlotComponent() {
  return (
    <div style={{ 
      background: "white", 
      padding: "1rem", 
      borderRadius: "12px", 
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
      marginTop: "2rem"
    }}>
      <h3 style={{ marginBottom: "1rem", color: "#1E40AF" }}>Attention vs Assessment Score</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="attention" name="Attention" unit="%" />
          <YAxis type="number" dataKey="score" name="Score" unit="%" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Students" data={data} fill="#1E40AF" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
