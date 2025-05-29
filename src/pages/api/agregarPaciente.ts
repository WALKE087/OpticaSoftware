import type { APIContext } from "astro";
import { db } from "../../db/connect";
import type { Pacientes } from "../../models/pacientes";

export async function POST({ request }: APIContext) {
  try {
    const body = (await request.json()) as pacientesDto;

    const requiredFields: (keyof pacientesDto)[] = [
      "nombre_completo",
      "fecha_nacimiento",
      "sexo",
      "documento_identidad",
      "telefono_contacto",
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return new Response(
          JSON.stringify({
            message: `El campo '${field}' es obligatorio y no puede estar vacío.`,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (!["M", "F", "O"].includes(body.sexo)) {
      return new Response(
        JSON.stringify({
          message: "El campo 'sexo' debe ser 'M', 'F', o 'O'.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.fecha_nacimiento)) {
      return new Response(
        JSON.stringify({
          message: "El formato de 'fecha_nacimiento' debe ser YYYY-MM-DD.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const parsedDate = new Date(body.fecha_nacimiento);
    if (isNaN(parsedDate.getTime())) {
      return new Response(
        JSON.stringify({
          message: "'fecha_nacimiento' no es una fecha válida.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const query = `
      INSERT INTO public.pacientes (
        nombre_completo, 
        fecha_nacimiento, 
        sexo, 
        documento_identidad, 
        telefono_contacto, 
        correo_electronico
      ) 
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *; -- Returns the newly inserted row
    `;

    const values = [
      body.nombre_completo,
      body.fecha_nacimiento,
      body.sexo,
      body.documento_identidad,
      body.telefono_contacto,
      body.correo_electronico || null,
    ];

    const result = await db.query(query, values);

    if (result.rows && result.rows.length > 0) {
      const newPatient = result.rows[0] as Pacientes;
      return new Response(JSON.stringify(newPatient), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error(
        "Error al agregar el paciente: No se retornaron filas después de la inserción."
      );
      return new Response(
        JSON.stringify({
          message:
            "Error al crear el paciente, no se obtuvo la información del paciente creado.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error: any) {
    console.error("Error al agregar el paciente: ", error);

    if (error.code === "23505") {
      if (error.constraint === "pacientes_documento_identidad_key") {
        return new Response(
          JSON.stringify({
            message:
              "Error al agregar el paciente: El documento de identidad ya existe.",
          }),
          { status: 409, headers: { "Content-Type": "application/json" } } // 409 Conflict
        );
      }
      return new Response(
        JSON.stringify({
          message:
            "Error al agregar el paciente: Ya existe un registro con uno de los valores únicos proporcionados.",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error.code === "23514") {
      if (error.constraint === "pacientes_sexo_check") {
        return new Response(
          JSON.stringify({
            message:
              "Error al agregar el paciente: El valor para 'sexo' no es válido según las restricciones de la base de datos.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({
          message:
            "Error al agregar el paciente: Uno de los valores proporcionados no cumple con las restricciones de la base de datos.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error.code === "23502") {
      return new Response(
        JSON.stringify({
          message: `Error al agregar el paciente: El campo '${error.column}' no puede ser nulo.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al agregar el paciente.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
