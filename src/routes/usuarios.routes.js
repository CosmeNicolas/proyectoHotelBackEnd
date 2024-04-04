import { Router } from "express";
import { crearUsuario } from "../controllers/usuarios.controllers.js";


const router = Router()

router.route("/registrar").post(crearUsuario)

export default router