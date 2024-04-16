import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionHabitacion = [

    check("numero")
      .notEmpty()
      .withMessage("El numero de habitacion es un dato obligatorio")
      .isNumeric()
      .withMessage('El numero de habitacion debe ser un número')
      .custom((value)=>{
          if(value >= 50 && value <= 10000){
              return true;
          }else{
              throw new Error('El numero de habitacion debe estar entre $50 y $10000')
          }
      }),
      check('tipo')
      .notEmpty()
      .withMessage('EL tipo de habitacion es un dato obligatorio')
      .isIn(["Doble Twin", "Doble Superior", "Triple Superior", "Suite"])
      .withMessage("EL tipo de habitacion debe ser una de las siguientes opciones (Doble Twin, Doble Superior, Triple Superior, Suite)")
      ,
      check("fechaIngreso")
        .notEmpty()
        .withMessage("La fecha de ingreso es un dato obligatorio")
        .isNumeric()
        .withMessage('La fecha de ingreso debe ser un número')
        .custom((value)=>{
            if(value >= 50 && value <= 10000){
                return true;
            }else{
                throw new Error('La fecha de ingreso debe estar entre $50 y $10000')
            }
        }),
      check("fechaSalida")
        .notEmpty()
        .withMessage("Lafecha de salida es un dato obligatorio")
        .isNumeric()
        .withMessage('Lafecha de salida debe ser un número')
        .custom((value)=>{
            if(value >= 50 && value <= 10000){
                return true;
            }else{
                throw new Error('La fecha de salida debe estar entre $50 y $10000')
            }
        }),
      check("disponible")
        .notEmpty()
        .withMessage("El disponible de habitacion es un dato obligatorio")
        .isBoolean
        .withMessage('El disponible de habitacion debe ser un booleano')
        ,
      check('imagen')
      .notEmpty()
      .withMessage('La imagen es un dato obligatorio')
      .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
      .withMessage('La imagen debe ser una url valida y terminar con alguna de las siguientes extensiones (jpg|jpeg|gif|png)')
      ,
      
    (req, res, next) => resultadoValidacion(req,res,next)
  ]

  export default validacionHabitacion