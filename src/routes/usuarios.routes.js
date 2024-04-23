import { Router } from "express";
import {
  crearUsuario,
  login,
  listarUsuarios,
  obtenerUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../controllers/usuarios.controllers.js";
import validacionUsuario from "../helpers/validacionUsuario.js";
import { reservarHabitacion } from "../controllers/reservas.controllers.js";

const router = Router();

router.route("/usuarios/reservar/:id").put(reservarHabitacion);
router.route("/registrar").post([validacionUsuario], crearUsuario);
router.route("/usuarios").get(listarUsuarios);
router
  .route("/usuarios/:id")
  .get(obtenerUsuario)
  .put(editarUsuario)
  .delete(eliminarUsuario);
router.route("/").post(login);
export default router;
