"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Load JSON data
  useEffect(() => {
    fetch("/student_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        if (!Array.isArray(json) || json.length === 0)
          throw new Error("No student data found");
        setData(json);
        setSelectedStudent(json[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Overview averages
  const avgScore =
    data.length > 0
      ? (
          data.reduce((sum, d) => sum + Number(d.assessment_score || 0), 0) /
          data.length
        ).toFixed(1)
      : 0;
  const avgComprehension =
    data.length > 0
      ? (
          data.reduce((sum, d) => sum + Number(d.comprehension || 0), 0) /
          data.length
        ).toFixed(1)
      : 0;
  const avgAttention =
    data.length > 0
      ? (
          data.reduce((sum, d) => sum + Number(d.attention || 0), 0) /
          data.length
        ).toFixed(1)
      : 0;

  // Charts data
  const chartData = selectedStudent ? [selectedStudent] : [];

  // Filtered and sorted students for table
  const filteredData = data.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  // Sort column handler
  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  if (loading) return <p style={{ padding: "2rem" }}>Loading dashboard...</p>;
  if (error)
    return <p style={{ padding: "2rem", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem", fontSize: "2rem" }}>📊 Student Dashboard</h1>

      {/* Overview */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          { title: "Average Score", value: avgScore },
          { title: "Average Comprehension", value: avgComprehension },
          { title: "Average Attention", value: avgAttention },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              flex: "1 1 30%",
              padding: "1rem",
              background: "#ff0909ff",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "200px",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{card.title}</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            background: "#a1a1a1ff",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "2rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            minHeight: "350px",
          }}
        >
          <h3>Comprehension vs Assessment Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assessment_score" fill="#8884d8" />
              <Bar dataKey="comprehension" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "#7b7ebdff",
            padding: "1rem",
            borderRadius: "10px",
            marginBottom: "2rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            minHeight: "350px",
          }}
        >
          <h3>Attention vs Assessment Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="attention" name="Attention" />
              <YAxis dataKey="assessment_score" name="Score" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={chartData} fill="#82ca9d" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search & Table */}
      <div
        style={{
          marginBottom: "2rem",
          background: "#eae1e13b",
          borderRadius: "10px",
          padding: "1rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          overflowX: "auto",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>All Students</h3>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            marginBottom: "1rem",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #cedbcbff",
          }}
        />

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ad9494ff" }}>
              {[
                { key: "student_id", label: "ID" },
                { key: "name", label: "Name" },
                { key: "class", label: "Class" },
                { key: "assessment_score", label: "Assessment Score" },
                { key: "comprehension", label: "Comprehension" },
                { key: "attention", label: "Attention" },
              ].map((col) => (
                <th
                  key={col.key}
                  style={{ padding: "0.5rem", cursor: "pointer", whiteSpace: "nowrap" }}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortConfig.key === col.key
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student) => (
              <tr
                key={student.student_id}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedStudent?.student_id === student.student_id ? "#a9c2c6ff" : "transparent",
                }}
                onClick={() => setSelectedStudent(student)}
              >
                <td style={{ padding: "0.5rem" }}>{student.student_id}</td>
                <td style={{ padding: "0.5rem" }}>{student.name}</td>
                <td style={{ padding: "0.5rem" }}>{student.class}</td>
                <td style={{ padding: "0.5rem" }}>{student.assessment_score}</td>
                <td style={{ padding: "0.5rem" }}>{student.comprehension}</td>
                <td style={{ padding: "0.5rem" }}>{student.attention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
