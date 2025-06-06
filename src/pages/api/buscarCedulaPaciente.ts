import type { APIContext } from "astro";
import { db } from "../../db/connect";
import type { Pacientes } from "../../models/pacientes";

export async function GET(context: APIContext) {
  try {
    const cedulaParam = context.url.searchParams.get("cedula");

    if (!cedulaParam) {
      return new Response(
        JSON.stringify({ message: "El parámetro 'cedula' es requerido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const searchTerm = cedulaParam + "%";

    const query = `
      SELECT 
        id,
        nombre_completo,
        fecha_nacimiento,
        sexo,
        documento_identidad,
        telefono_contacto,
        correo_electronico,
        fecha_registro
      FROM public.pacientes
      WHERE documento_identidad LIKE $1
      ORDER BY documento_identidad ASC; -- Opcional: ordenar los resultados
    `;

    const result = await db.query(query, [searchTerm]);

    const pacientes: Pacientes[] = result.rows;

    return new Response(JSON.stringify(pacientes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error al buscar pacientes:", error);
    return new Response(
      JSON.stringify({ message: "Error al buscar pacientes." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
