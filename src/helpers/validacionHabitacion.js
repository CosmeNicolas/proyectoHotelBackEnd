import { check, checkSchema } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
// import crearHabitacion from "../controllers/habitaciones.controllers.js";



function getDate() {
    const today = new Date();
    const date = today.getDate();
    return date
}
function getMonth() {
    const today = new Date();
    const month = today.getMonth() + 1;
    return month
}
function getYear() {
    const today = new Date();
    const year = today.getFullYear();  
    return year
}


const validacionHabitacion = [

    check("numero")
      .notEmpty()
      .withMessage("El numero de habitacion es un dato obligatorio")
      .isNumeric()
      .withMessage('El numero de habitacion debe ser un número')
      .custom((value)=>{
          if(value >= 100 && value <= 10000){
              return true;
          }else{
              throw new Error('El numero de habitacion debe estar entre $100 y $10000')
          }
      }),
      check('tipo')
      .notEmpty()
      .withMessage('EL tipo de habitacion es un dato obligatorio')
      .isIn(["Doble Twin", "Doble Superior", "Triple Superior", "Suite"])
      .withMessage("EL tipo de habitacion debe ser una de las siguientes opciones (Doble Twin, Doble Superior, Triple Superior, Suite)")
      ,
      check("precio")
        .notEmpty()
        .withMessage("El precio de habitacion es un dato obligatorio")
        .isNumeric()
        .withMessage('El precio de habitacion debe ser un número')
        .custom((value)=>{
            if(value >= 27000 && value <= 120000){
                return true;
            }else{
                throw new Error('El precio de habitacion debe estar entre $27000 y $120000')   
            }
        }),
      check("fechaIngreso")
        .notEmpty()
        .withMessage("La fecha de ingreso es un dato obligatorio")
        // .isNumeric()
        // .withMessage('La fecha de ingreso debe ser un número')
        .custom((value)=>{
            const fechaIngresada = value;
            const split = fechaIngresada.split('-');
            const anio = split[0];
            const mes = split[1];
            const dia = split[2];

            if(getYear()<=anio && getMonth()<=mes && getDate()<dia){
                return true;
            }else{
                throw new Error('La fecha de ingreso debe ser mayor a la del dia de hoy ')
            }
        }),
      check("fechaSalida")
        .notEmpty()
        .withMessage("Lafecha de salida es un dato obligatorio")
        // .isNumeric()
        // .withMessage('Lafecha de salida debe ser un número')
        .custom((value)=>{
            req.body
            const fechaIngresada = val
            const split = fechaIngresada.split('-');
            const anioEtr = split[0];
            const mesEtr = split[1];
            const diaEtr = split[2];

            const fechaIngresadaSa = value;
            const split2 = fechaIngresadaSa.split('-');
            const anio = split2[0];
            const mes = split2[1];
            const dia = split2[2];
            if(anioEtr>=anio && mesEtr>=mes && diaEtr>=dia+1){
                return true;
            }else{
                throw new Error('La fecha de salida debe estar entre  y ')
            }
        }),
      check("disponible")
        .notEmpty()
        .withMessage("El disponible de habitacion es un dato obligatorio")
        .isBoolean()
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