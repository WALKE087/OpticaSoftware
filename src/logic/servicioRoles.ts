import { obtenerRoles } from "../db/repositorios/repositorioRoles";

export async function getAllRol() {
  try {
    const responseRol = await obtenerRoles();
    return responseRol;
  } catch (error) {
    console.error("Error al obtener los roles: ", error);
    return { success: false, error: error || "Error desconocido." };
  }
}
