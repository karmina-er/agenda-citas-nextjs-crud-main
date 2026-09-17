"use client";
import { useState, useEffect } from "react";
import AppointmentForm from "@/components/AppointmentForm";
import AppointmentList from "@/components/AppointmentList";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(null);

  // Cargar lista al montar
  useEffect(() => {
    fetch("/api/appointments")
      .then(res => res.json())
      .then(setAppointments);
  }, []);

  // Crear cita
  const handleCreate = async (data) => {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const newApt = await res.json();
    setAppointments(prev => [...prev, newApt]);
  };

  // Seleccionar cita para editar
  const handleEdit = (apt) => {
    if (!apt || !apt.id) {
      console.error("Cita inválida para editar:", apt);
      return;
    }
    // Forzar que id sea número
    setEditing({ ...apt, id: Number(apt.id) });
  };

  // Actualizar cita
  const handleUpdate = async (data) => {
    if (!editing || !editing.id) {
      console.error("No hay cita seleccionada para actualizar");
      return;
    }

    console.log("PUT a enviar:", {
      url: `/api/appointments/${editing.id}`,
      data
    });

    const res = await fetch(`/api/appointments/${Number(editing.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        date: data.date,
        time: data.time,
        description: data.description
      }),
    });

    if (!res.ok) {
      console.error("PUT failed:", await res.text());
      return;
    }

    const updated = await res.json();
    setAppointments(prev =>
      prev.map(a => (a.id === updated.id ? updated : a))
    );
    setEditing(null);
  };

  // Borrar cita
  const handleDelete = async (id) => {
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    if (!res.ok && res.status !== 204) {
      console.error("DELETE failed:", await res.text());
      return;
    }
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#1e40af" }}>Agendar Citas</h1>

      <AppointmentForm
        key={editing ? editing.id : "create"}
        onSubmit={editing ? handleUpdate : handleCreate}
        defaultValues={editing || {}}
      />

      {editing && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            onClick={() => setEditing(null)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ef4444",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
          >
            Cancelar edición
          </button>
        </div>
      )}

      <AppointmentList
        appointments={appointments}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
