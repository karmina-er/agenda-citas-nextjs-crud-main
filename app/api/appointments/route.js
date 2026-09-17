// app/api/appointments/route.js
import { getAppointments, createAppointment } from "@/data/appointments";
import { NextResponse } from "next/server";

export async function GET() {
  const list = getAppointments();
  return NextResponse.json(list);
}

export async function POST(req) {
  const data = await req.json();
  const created = createAppointment(data);
  return NextResponse.json(created);
}
