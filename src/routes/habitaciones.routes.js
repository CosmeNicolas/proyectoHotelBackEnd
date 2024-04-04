import { Router } from "express";
import { listarHabitaciones, crearHabitacion, obtenerHabitacion, editarHabitacion } from "../controllers/habitaciones.controllers.js";


const router = Router();

router.route("/habitaciones").get(listarHabitaciones).post(crearHabitacion)
router.route("/habitaciones/:id").get(obtenerHabitacion).put(editarHabitacion)

export default router;
