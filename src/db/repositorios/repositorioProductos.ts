import type { Gafas } from "../../models/gafas";

export async function obtenerProductos() {
  try {
    const response = await fetch("http://localhost:4321/api/obtenerproductos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const productos: Gafas[] = await response.json();
    return { success: true, data: productos };
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function agregarProducto(productoData: Gafas) {
  try {
    const response = await fetch("http://localhost:4321/api/agregarProducto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productoData)
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Error desconocido");
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function eliminarProducto(id: number) {
  try {
    const response = await fetch("http://localhost:4321/api/eliminarProducto", {
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
    console.error("Error al eliminar el producto:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
