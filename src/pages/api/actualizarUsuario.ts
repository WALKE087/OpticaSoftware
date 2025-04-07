import { db } from "../../db/connect";
import type { Usuario } from "../../models/usuarios";
import bcrypt from "bcryptjs";

export async function PUT({ request }) {
  try {
    const usuarioData = await request.json();

    let hashedPassword = usuarioData.contraseña;
    if (hashedPassword && hashedPassword.trim() !== "") {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(hashedPassword, saltRounds);
    }

    const query = `
      CALL actualizar_usuario(
        $1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6, 
        $7, 
        $8, 
        $9, 
        $10, 
        $11
      );
    `;

    const result = await db.query(query, [
      usuarioData.usuarioid,
      usuarioData.nombre,
      usuarioData.segundoNombre,
      usuarioData.apellido,
      usuarioData.segundoApellido,
      usuarioData.cedula,
      usuarioData.fechanacimiento,
      usuarioData.fechaexpedicion,
      usuarioData.correo,
      hashedPassword,
      usuarioData.rolId,
    ]);

    console.log(result);

    if (result.rows && result.rows.length > 0) {
      console.log(result.rows);
    }
    return new Response(
      JSON.stringify({
        message: "Usuario y persona actualizados correctamente.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error);

    return new Response(
      JSON.stringify({ message: "Error al actualizar el usuario." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
