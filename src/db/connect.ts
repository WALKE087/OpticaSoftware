import pkg from "pg";
const { Pool } = pkg;

// Cargar las variables de entorno desde .env
const PG_CONNECTION_STRING = import.meta.env.PG_CONNECTION_STRING;

let isConnected = false;

const pool = new Pool({
  connectionString: PG_CONNECTION_STRING,
});

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true;

  try {
    const res = await pool.query("SELECT NOW()");
    isConnected = true;
    console.log("Conexión a la base de datos exitosa:", res.rows[0]);
    return true;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    return false;
  }
}

export const db = pool;
