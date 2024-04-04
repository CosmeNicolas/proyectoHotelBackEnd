import { Router } from "express";
import { listarHabitaciones, crearHabitacion } from "../controllers/habitaciones.controllers.js";


const router = Router();

router.route("/habitaciones").get(listarHabitaciones).post(crearHabitacion)

export default router;
