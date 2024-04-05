import { Router } from "express";
import { crearUsuario, login , listarUsuarios} from "../controllers/usuarios.controllers.js";


const router = Router()

router.route("/registrar").post(crearUsuario)
router.route("/usuarios").get(listarUsuarios)
router.route("/").post(login)
export default router