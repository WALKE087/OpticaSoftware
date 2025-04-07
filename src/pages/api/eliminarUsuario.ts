import { db } from "../../db/connect";

export async function DELETE({ request }) {
  try {
    const { id } = await request.json();
    console.log(id);

    const query = `
      CALL eliminar_usuario($1::BIGINT);
    `;

    await db.query(query, [id]);

    return new Response(
      JSON.stringify({ message: "Usuario eliminado con éxito" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);

    return new Response(
      JSON.stringify({ message: "Error al eliminar el usuario." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
