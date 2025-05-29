import type { Pacientes } from "../../models/pacientes";

export async function obtenerPacientes() {
  try {
    const response = await fetch("http://localhost:4321/api/obtenerPacientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

export async function agregarPacientes(pacienteData: pacientesDto) {
  try {
    const response = await fetch("http://localhost:4321/api/agregarPaciente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pacienteData),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error al agregar paciente");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al agregar el paciente:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function eliminarPaciente(id: number) {
  try {
    const response = await fetch("http://localhost:4321/api/eliminarPaciente", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function actualizarPacientes(pacienteData: Pacientes) {
  try {
    const response = await fetch(
      "http://localhost:4321/api/actualizarPaciente",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteData),
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error al actualizar paciente");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
