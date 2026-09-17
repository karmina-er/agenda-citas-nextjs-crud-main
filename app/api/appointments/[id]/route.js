// app/api/appointments/[id]/route.js
import { getAppointment, updateAppointment, deleteAppointment } from "@/data/appointments";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  // SOLUCIÓN: Esperar a que params se resuelva
  const { id } = await params; 
  
  const apt = getAppointment(id);

  if (!apt) {
    return new NextResponse("No encontrado", { status: 404 });
  }

  return NextResponse.json(apt);
}

export async function PUT(req, { params }) {
  // SOLUCIÓN: Esperar a que params se resuelva antes de usar el ID
  const resolvedParams = await params;
  const id = Number(resolvedParams.id); 

  const data = await req.json();

  console.log("PUT API id recibido:", id);     
  console.log("PUT API data:", data);   

  const updated = updateAppointment(id, data);

  if (!updated) {
    // Este es el mensaje que estás viendo en tu consola actualmente
    return new Response("No encontrado", { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  // SOLUCIÓN: También aquí
  const { id } = await params;
  
  deleteAppointment(id);
  return new NextResponse(null, { status: 204 });
}