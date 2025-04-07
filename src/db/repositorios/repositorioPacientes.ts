import type { Pacientes } from "../../models/pacientes";

export async function obtenerPacientes() {
  try {
    const response = await fetch("http://localhost:4321/api/obtenerPacientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const pacientes: Pacientes[] = await response.json();
    return { success: true, data: pacientes };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return { success: false, error: error || "Error desconocido" };
  }
}
