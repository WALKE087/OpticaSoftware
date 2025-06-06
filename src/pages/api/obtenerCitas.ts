import type { APIContext } from "astro";
import { db } from "../../db/connect";
import type { CitaConDetallesDeVista } from "../../models/CitaConDetallesDeVista";

export async function GET(context: APIContext) {
  try {
    const query = `
      SELECT * FROM public.vista_citas_con_paciente_detalle
      ORDER BY fecha_hora_cita DESC; -- Puedes seguir ordenando como necesites
    `;

    const result = await db.query(query);

    const citas: CitaConDetallesDeVista[] = result.rows;

    return new Response(JSON.stringify(citas), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error al obtener todas las citas desde la vista:", error);
    return new Response(
      JSON.stringify({ message: "Error al obtener todas las citas." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
