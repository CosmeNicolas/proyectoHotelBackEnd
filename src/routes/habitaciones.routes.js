import { Router } from "express";
import {
  listarHabitaciones,
  crearHabitacion,
  obtenerHabitacion,
  editarHabitacion,
  borrarHabitacion,
} from "../controllers/habitaciones.controllers.js";
import validacionHabitacion from "../helpers/validacionHabitacion.js";
import validarJWT from "../helpers/validarJWT.js"

const router = Router();

router
  .route("/habitaciones")
  .get(listarHabitaciones)
  .post([validarJWT,validacionHabitacion], crearHabitacion);
router
  .route("/habitaciones/:id")
  .get(obtenerHabitacion)
  .put([validacionHabitacion], editarHabitacion)
  .delete(borrarHabitacion);

export default router;
