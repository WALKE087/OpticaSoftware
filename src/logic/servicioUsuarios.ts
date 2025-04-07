import {
  eliminarUsuario,
  obtenerUsuarios,
  agregarUsuario,
  consultarUsuarioLogin,
  actualizarUsuario
} from "../db/repositorios/repositorioUsuarios";
import type { Usuario } from "../models/usuarios";

export async function getAllUsuarios() {
  try {
    const response = await obtenerUsuarios();
    return response;
  } catch (error) {
    console.error("Error al obtener los usuarios: ", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function addUsuario(usuarioData: Usuario) {
  try {
    const response = await agregarUsuario(usuarioData);
    return response;
  } catch (error) {
    console.error("Error al agregar el usuario: ", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function deleteUsuario(id: number) {
  try {
    const response = await eliminarUsuario(id);
    return response;
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    return { success: false, error: error.message || "Error desconocido." };
  }
}

export async function validateUserCredentials(email: string, password: string) {
  try {
    const result = await consultarUsuarioLogin(email, password);

    if (result.success) {
      return {
        success: true,
        token: result.token
      };
    }

    return {
      success: false,
      error: result.error || "Error desconocido en la autenticación."
    };
  } catch (error) {
    console.error("Error al validar las credenciales:", error);
    return {
      success: false,
      error: error.message || "Error desconocido al validar las credenciales."
    };
  }
}

export async function uptdateUser(usuarioData: any) {
  try {
    const resultado = await actualizarUsuario(usuarioData);

    if (!resultado.success) {
      throw new Error(resultado.error);
    }

    return {
      success: true,
      message: "Usuario actualizado correctamente"
    };
  } catch (error) {
    console.error("Error en servicio al actualizar el usuario:", error);
    return {
      success: false,
      error: error.message || "Error desconocido al actualizar el usuario."
    };
  }
}
