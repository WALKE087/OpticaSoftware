import {
  agregarProducto,
  eliminarProducto,
  obtenerProductos
} from "../db/repositorios/repositorioProductos";
import type { Gafas } from "../models/gafas";

export async function getAllProducts() {
  try {
    const response = await obtenerProductos();
    return response;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    return { success: false, error: error || "Error desconocido" };
  }
}

export async function addProducts(productoData: Gafas) {
  try {
    const response = await agregarProducto(productoData);
    return response;
  } catch (error) {
    console.error("Error al agregar el producto: ", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
export async function deleteProducto(id: number) {
  try {
    const response = await eliminarProducto(id);
    return response;
  } catch (error) {
    console.error("Error al eliminar el producto: ", error);
    return { success: false, error: error.message || "Error desconocido." };
  }
}
