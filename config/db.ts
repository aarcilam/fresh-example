// db.ts
import { Database } from "sqlite3";

// Crear y exportar la instancia de la base de datos
const db = new Database("./db/test.db");

console.log("Database connected");

// Crear una tabla si no existe
db.exec(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );
  `,
);

export default db;

// Cerrar la conexión cuando la aplicación termina
Deno.addSignalListener("SIGINT", () => {
  console.log("Closing database connection...");
  db.close();
  Deno.exit();
});
