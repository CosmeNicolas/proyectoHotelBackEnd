import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionUsuario   = [
    check("nombreCompleto")
      .notEmpty()
      .withMessage("El nombre es un dato obligatorio")
      .isString()
      .withMessage('El nombre debe ser un string')
      .isLength({min: 3, max:60})
      .withMessage('La descripcion debe tener entre 35 y 500 letras'),

      
      check('email')
      .notEmpty()
      .withMessage('El email es un dato obligatorio')
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      .withMessage('El email debe ser valido')
      ,
      check("usuario")
      .notEmpty()
      .withMessage("El usuario es un dato obligatorio")
      .isString()
      .withMessage('El usuario debe ser un string')
      .isLength({min: 5, max:20}),
      check('password')
      .notEmpty()
      .withMessage('El password es un dato obligatorio')
      .isString()
      .withMessage('El password debe ser un string'),
    //   check('rol')
    //   .notEmpty()
    //   .withMessage('EL rol es un dato obligatorio')
    //   .isIn(["Administrador", "Usuario"])
    //   .withMessage("EL rol debe ser una de las siguientes opciones (Usuario, Administrador)")
    //   ,
    //   check("suspendido")
    //   .notEmpty()
    //   .withMessage("Suspendido es un dato obligatorio")
    //   .isBoolean()
    //   .withMessage('Suspendido debe ser un booleano')
    //   ,


    (req, res, next) => resultadoValidacion(req,res,next)
  ]

  export default validacionUsuario