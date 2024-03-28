import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import "./src/database/database.js"


//! 1 - Configurar un PUERTO
const app = express();
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});