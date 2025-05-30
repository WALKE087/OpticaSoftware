import { db } from "../../db/connect";

export async function DELETE({ request }: any) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({
          message: "Se requiere el ID del paciente para la eliminación.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      CALL eliminar_paciente($1);
    `;

    const result = await db.query(query, [id]);

    console.log(`Intento de eliminación de paciente con ID ${id}.`);

    return new Response(
      JSON.stringify({
        message: `Paciente con ID ${id} eliminado correctamente.`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al eliminar el paciente: ", error);

    return new Response(
      JSON.stringify({ message: "Error al eliminar el paciente." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
