import { db } from "../../db/connect";
import type { Gafas } from "../../models/gafas";

export async function POST({ request }) {
  try {
    const productoData: Omit<Gafas, "id"> = await request.json();

    const query = `
      CALL agregar_producto(
        $1::TEXT, $2::TEXT, $3::NUMERIC, 
        $4::INT, $5::TEXT, $6::TEXT, $7::TEXT
      );
    `;

    const values = [
      productoData.nombre,
      productoData.marca,
      productoData.precio,
      productoData.stock,
      productoData.imagen,
      productoData.tipomontura,
      productoData.color
    ];

    await db.query(query, values);

    return new Response(
      JSON.stringify({ message: "Producto agregado con éxito" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al agregar el producto:", error);

    return new Response(
      JSON.stringify({ message: "Error al agregar el producto." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
