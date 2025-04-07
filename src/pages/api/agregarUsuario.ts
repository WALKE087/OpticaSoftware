import { db } from "../../db/connect";
import type { Usuario } from "../../models/usuarios";
import bcrypt from "bcryptjs";

export async function POST({ request }) {
  try {
    const usuarioData: Usuario = await request.json();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      usuarioData.contraseña,
      saltRounds
    );
    console.log(hashedPassword);
    const query = `
      CALL agregar_usuario(
        $1::TEXT, $2::TEXT, $3::TEXT, $4::TEXT, 
        $5::TEXT, $6::DATE, $7::DATE, 
        $8::TEXT, $9::TEXT, $10::BIGINT
      );
    `;

    const values = [
      usuarioData.nombre,
      usuarioData.segundoNombre || null,
      usuarioData.apellido,
      usuarioData.segundoApellido || null,
      usuarioData.cedula,
      usuarioData.fechaNacimiento,
      usuarioData.fechaExpedicion,
      usuarioData.correo,
      hashedPassword,
      usuarioData.rolId
    ];

    await db.query(query, values);

    return new Response(
      JSON.stringify({ message: "Usuario creado con éxito" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al insertar el usuario:", error);

    return new Response(
      JSON.stringify({ message: "Error al insertar el usuario." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
