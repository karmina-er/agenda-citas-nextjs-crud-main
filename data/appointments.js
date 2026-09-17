// data/appointments.js
let appointments = [
  { id: 1, name: "Edson", date: "2025-11-30", time: "10:00", description: "Consulta" },
  { id: 2, name: "María", date: "2025-12-01", time: "14:00", description: "Revisión" },
];

export function getAppointments() {
  return appointments;
}

export function getAppointment(id) {
  return appointments.find(a => a.id === Number(id));
}

export function createAppointment(data) {
  const nextId = appointments.length
    ? appointments[appointments.length - 1].id + 1
    : 1;

  const newAppointment = { id: nextId, ...data };
  appointments.push(newAppointment);
  return newAppointment;
}

export function updateAppointment(id, data) {
  const index = appointments.findIndex(a => a.id === Number(id));
  if (index === -1) return null;

  appointments[index] = { ...appointments[index], ...data };
  return appointments[index];
}

export function deleteAppointment(id) {
  appointments = appointments.filter(a => a.id !== Number(id));
}
