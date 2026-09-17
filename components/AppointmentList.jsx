"use client";

export default function AppointmentList({ appointments, onDelete, onEdit }) {
  return (
    <ul style={{ maxWidth: "600px", margin: "20px auto", padding: 0, listStyle: "none" }}>
      {appointments.map(a => (
        <li
          key={a.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            marginBottom: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            fontSize: "16px"
          }}
        >
          <div>
            <strong style={{ color: "#1e40af" }}>{a.name}</strong>{" "}
            — {a.date} {a.time} — {a.description}
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onEdit(a)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#fbbf24",
                color: "#1f2937",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f59e0b"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fbbf24"}
            >
              Editar
            </button>

            <button
              onClick={() => onDelete(a.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#ef4444",
                color: "#ffffff",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
            >
              Borrar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
