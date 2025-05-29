import { db } from "../../db/connect";
import type { Gafas } from "../../models/gafas";

export async function PUT({ request }: any) {
  try {
    const productoData: Gafas = await request.json();

    // Validación básica de datos requeridos
    if (!productoData.id) {
      return new Response(
        JSON.stringify({ message: "El ID del producto es requerido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      CALL actualizar_producto(
        $1::INT,        -- ID
        $2::TEXT,       -- Nombre
        $3::TEXT,       -- Marca
        $4::NUMERIC,    -- Precio
        $5::INT,        -- Stock
        $6::TEXT,       -- Imagen
        $7::TEXT,       -- Tipo Montura
        $8::TEXT        -- Color
      );
    `;

    const values = [
      productoData.id,
      productoData.nombre,
      productoData.marca,
      productoData.precio,
      productoData.stock,
      productoData.imagen,
      productoData.tipomontura,
      productoData.color,
    ];

    await db.query(query, values);

    return new Response(
      JSON.stringify({
        message: "Producto actualizado con éxito",
        updatedId: productoData.id,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al actualizar el producto:", error);

    return new Response(
      JSON.stringify({
        message: "Error al actualizar el producto",
        error: error instanceof Error ? error.message : "Error desconocido",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
