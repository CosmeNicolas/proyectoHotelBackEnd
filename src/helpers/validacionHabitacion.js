import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionHabitacion = [
  check("numero")
    .notEmpty()
    .withMessage("El numero de habitacion es un dato obligatorio")
    .isNumeric()
    .withMessage("El numero de habitacion debe ser un número")
    .custom((value) => {
      if (value >= 100 && value <= 10000) {
        return true;
      } else {
        throw new Error(
          "El numero de habitacion debe estar entre $100 y $10000"
        );
      }
    }),
  check("tipo")
    .notEmpty()
    .withMessage("EL tipo de habitacion es un dato obligatorio")
    .isIn(["Doble Twin", "Doble Superior", "Triple Superior", "Suite"])
    .withMessage(
      "EL tipo de habitacion debe ser una de las siguientes opciones (Doble Twin, Doble Superior, Triple Superior, Suite)"
    ),

  check("precio")
    .notEmpty()
    .withMessage("El precio de habitacion es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio de habitacion debe ser un número")
    .custom((value) => {
      if (value >= 27000 && value <= 120000) {
        return true;
      } else {
        throw new Error(
          "El precio de habitacion debe estar entre $27000 y $120000"
        );
      }
    }),

  check("disponible")
    .notEmpty()
    .withMessage("La disponibilidad es un dato obligatorio")
    .isBoolean()
    .withMessage("La disponibilidad de habitación debe ser un valor booleano"),

  check("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage(
      "La imagen debe ser una URL válida y terminar con alguna de las siguientes extensiones (jpg|jpeg|gif|png)"
    ),

  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionHabitacion;
