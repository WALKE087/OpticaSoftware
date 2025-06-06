import { crearCitas, obtenerCitas } from "../db/repositorios/repositorioCitas";
import type { CitaData } from "../models/CitaData";

export async function crearCitasMedicas(CitaData: CitaData) {
  try {
    const response = await crearCitas(CitaData);
    return response;
  } catch (error) {
    console.error("Error al crear la cita médica: ", error);
    return { success: false, error: error.message || "Error desconocido." };
  }
}
export async function obtenerCitasMedicas() {
  try {
    const response = await obtenerCitas();
    return response;
  } catch (error) {
    console.error("Error al obtener las citas médicas:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
