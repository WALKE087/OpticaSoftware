import type { Usuario } from "../../models/usuarios";

export async function obtenerUsuarios() {
  try {
    const response = await fetch("http://localhost:4321/api/obtenerUsuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const usuarios = await response.json();
    return { success: true, data: usuarios };
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function agregarUsuario(usuarioData: Usuario) {
  try {
    const response = await fetch("http://localhost:4321/api/agregarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuarioData)
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al agregar el usuario:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function eliminarUsuario(id: number) {
  try {
    const response = await fetch("http://localhost:4321/api/eliminarUsuario", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function consultarUsuarioLogin(email: string, password: string) {
  try {
    const response = await fetch("http://localhost:4321/api/validarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido al validar usuario");
    }

    const data = await response.json();
    return { success: true, token: data.token };
  } catch (error) {
    console.error("Error al validar el usuario:", error);
    return {
      success: false,
      error: error.message || "Error desconocido al validar usuario."
    };
  }
}

export async function actualizarUsuario(usuarioData: any) {
  try {
    const response = await fetch(
      "http://localhost:4321/api/actualizarUsuario",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioData)
      }
    );

    if (!response.ok) {
      const result = await response.json();
      throw new Error(
        result.message || "Error desconocido al actualizar el usuario."
      );
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return {
      success: false,
      error: error.message || "Error desconocido al actualizar el usuario."
    };
  }
}
