import { db } from "../../db/connect";

export async function PUT({ request }: any) {
  try {
    const pacienteData: pacientesDto & { id: number } = await request.json();

    if (!pacienteData.id) {
      return new Response(
        JSON.stringify({
          message: "Se requiere el ID del paciente para la actualización.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      CALL actualizar_paciente(
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      );
    `;

    const result = await db.query(query, [
      pacienteData.id,
      pacienteData.nombre_completo,
      pacienteData.fecha_nacimiento,
      pacienteData.sexo,
      pacienteData.documento_identidad,
      pacienteData.telefono_contacto,
      pacienteData.correo_electronico || null,
    ]);

    console.log("Resultado de la actualización del paciente:", result);

    return new Response(
      JSON.stringify({
        message: "Paciente actualizado correctamente.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);

    return new Response(
      JSON.stringify({ message: "Error al actualizar el paciente." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
