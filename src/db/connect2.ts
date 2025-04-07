// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   host: import.meta.env.PG_HOST,
//   port: Number(import.meta.env.PG_PORT),
//   database: import.meta.env.PG_DATABASE,
//   user: import.meta.env.PG_USER,
//   password: import.meta.env.PG_PASSWORD,
//   connectionTimeoutMillis: Number(import.meta.env.PG_CONNECT_TIMEOUT) * 1000,
//   ssl: false
// });
// console.log(import.meta.env.PG_PASSWORD);

// // Función para probar la conexión
// export const connectDB = async (): Promise<void> => {
//   try {
//     const result = await pool.query("SELECT NOW()");
//     console.log("Conexión a la base de datos exitosa:", result.rows[0]);
//   } catch (error) {
//     console.error("Error en la conexión a la base de datos:", error);
//     throw error;
//   }
// };

// export const db = pool;
