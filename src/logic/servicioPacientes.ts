import {
  actualizarPacientes,
  agregarPacientes,
  obtenerPacientes,
} from "../db/repositorios/repositorioPacientes";
import type { Pacientes } from "../models/pacientes";

export async function getAllPacientes() {
  try {
    const response = await obtenerPacientes();
    return response;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function agregarPaciente(pacienteData: pacientesDto) {
  try {
    const response = await agregarPacientes(pacienteData);
    return response;
  } catch (error) {
    console.error("Error al agregar el paciente: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function actualizarPaciente(Pacientes: Pacientes) {
  try {
    const response = await actualizarPacientes(Pacientes);
    return response;
  } catch (error) {
    console.error("Error al actualizar el paciente: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
