import type { CitaData } from "../../models/CitaData";

export async function obtenerCitas() {
  try {
    const response = await fetch("http://localhost:4321/api/obtenerCitas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function crearCitas(CitaData: CitaData) {
  try {
    const response = await fetch("http://localhost:4321/api/agregarCitas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CitaData),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error al crear la cita:", error);
    return { success: false, error: error || "Error desconocido" };
  }
}
