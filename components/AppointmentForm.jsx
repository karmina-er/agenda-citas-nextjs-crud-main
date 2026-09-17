"use client";
import { useState, useEffect } from "react";

export default function AppointmentForm({ onSubmit, defaultValues = {} }) {
  const [name, setName] = useState(defaultValues.name || "");
  const [date, setDate] = useState(defaultValues.date || "");
  const [time, setTime] = useState(defaultValues.time || "");
  const [description, setDescription] = useState(defaultValues.description || "");

  useEffect(() => {
    setName(defaultValues.name || "");
    setDate(defaultValues.date || "");
    setTime(defaultValues.time || "");
    setDescription(defaultValues.description || "");
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      date,
      time,
      description
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#f9fafb"
      }}
    >
      <input
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px"
        }}
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px"
        }}
      />

      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px"
        }}
      />

      <input
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          fontSize: "16px"
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#3b82f6",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#2563eb"}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#3b82f6"}
      >
        Guardar cita
      </button>
    </form>
  );
}
