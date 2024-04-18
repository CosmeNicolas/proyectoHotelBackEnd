import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next)=>{
    const errors = validationResult(req);
    //preguntar si hubieron errores
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()})
    }
    //continue con la siguiente instruccion
    next();
}

export default resultadoValidacion