import { Router } from "express";
import { crearReserva, listarReservas } from "../controllers/reserva.controllers";

const router = Router()

router.route('/reserva').post(crearReserva).get(listarReservas)

export default router