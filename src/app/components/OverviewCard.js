export default function OverviewCard({ title, value }) {
  return (
    <div style={{
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      flex: "1",
      textAlign: "center"
    }}>
      <h3 style={{ fontSize: "1.2rem", color: "#1E40AF", marginBottom: "0.5rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
