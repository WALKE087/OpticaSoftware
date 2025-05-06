import { db } from "../../db/connect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = import.meta.env.JWT_SECRET;

export async function POST({ request }: any) {
  try {
    const { email, password } = await request.json();

    const query = `SELECT * FROM usuarios WHERE correo = $1`;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "Usuario no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const usuarioData = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      usuarioData.contraseña
    );

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Contraseña incorrecta" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = jwt.sign(
      { id: usuarioData.id, rol_id: usuarioData.rol_id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ message: "Autenticación exitosa", token }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
