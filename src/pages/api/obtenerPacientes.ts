import { db } from "../../db/connect";

export async function GET() {
  try {
    const query = `SELECT * FROM pacientes;`;
    const result = await db.query(query);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error al obtener los pacientes: ", error);

    return new Response(
      JSON.stringify({ message: "Error al obtener los pacientes." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
