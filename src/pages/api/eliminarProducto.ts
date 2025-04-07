import { db } from "../../db/connect";

export async function DELETE({ request }) {
  try {
    // Obtener el ID del producto a eliminar desde el cuerpo de la solicitud
    const { id } = await request.json();
    console.log(`ID del producto a eliminar: ${id}`);

    // Validar que se proporcione un ID válido
    if (!id || typeof id !== "number") {
      return new Response(
        JSON.stringify({
          message: "El ID del producto es inválido o no fue proporcionado."
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Llamada al procedimiento almacenado
    const query = `
      CALL eliminar_producto($1::BIGINT);
    `;

    await db.query(query, [id]);

    return new Response(
      JSON.stringify({ message: "Producto eliminado con éxito." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Manejo de errores
    console.error("Error al eliminar el producto:", error);

    return new Response(
      JSON.stringify({ message: "Error al eliminar el producto." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
