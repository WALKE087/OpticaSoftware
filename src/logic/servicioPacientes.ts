import { obtenerPacientes } from "../db/repositorios/repositorioPacientes";

export async function getAllPacientes() {
  try {
    const response = await obtenerPacientes();
    return response;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    return { success: false, error: error || "Error desconocido" };
  }
}
