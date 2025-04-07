import type { Roles } from "../../models/roles";

export async function obtenerRoles() {
  try {
    const responseRol = await fetch("http://localhost:4321/api/obtenerRoles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!responseRol.ok) {
      const result = await responseRol.json();
      throw new Error(result.message || "Error desconocido");
    }

    const roles: Roles[] = await responseRol.json();

    if (Array.isArray(roles)) {
      return { success: true, data: roles };
    } else {
      throw new Error("La respuesta de roles no es un arreglo válido");
    }
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
