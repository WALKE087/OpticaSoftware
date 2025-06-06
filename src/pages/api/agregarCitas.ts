import type { APIContext } from "astro";
import { db } from "../../db/connect";
import type { CitaData } from "../../models/CitaData";

export async function POST(context: APIContext) {
  try {
    const citaData: CitaData = await context.request.json();

    if (!citaData.id_paciente || !citaData.fecha_hora_cita) {
      return new Response(
        JSON.stringify({
          message: "Faltan campos obligatorios: id_paciente y fecha_hora_cita.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      CALL public.agregar_cita(
        $1::integer,      -- p_id_paciente
        $2::timestamp,    -- p_fecha_hora_cita
        $3::character varying, -- p_tipo_cita
        $4::public.estado_cita_enum, -- p_estado_cita
        $5::text          -- p_notas
      );
    `;

    const values = [
      citaData.id_paciente,
      citaData.fecha_hora_cita,
      citaData.tipo_cita || null,
      citaData.estado_cita || "Programada",
      citaData.notas || null,
    ];

    await db.query(query, values);

    return new Response(JSON.stringify({ message: "Cita creada con éxito" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error al insertar la cita:", error);

    if (error.code === "23503") {
      return new Response(
        JSON.stringify({
          message: "Error: El paciente especificado no existe.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error.code === "22P02" && error.message.includes("timestamp")) {
      return new Response(
        JSON.stringify({
          message: "Error: El formato de fecha_hora_cita no es válido.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "Error al insertar la cita." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
