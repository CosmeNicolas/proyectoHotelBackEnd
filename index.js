console.log("Bienvenido al BackHotel");

import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
import "./src/database/database.js";
import habitacionesRouter from "./src/routes/habitaciones.routes.js";
import usuariosRouter from "./src/routes/usuarios.routes.js"

//! 1 - Configurar un PUERTO
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});

//! 2 - Config MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

//! 3 - Config RUTAS

app.use("/api", habitacionesRouter);
app.use("/api", usuariosRouter)
