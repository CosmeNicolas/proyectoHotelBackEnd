// falta crear el modelHabitacion e importarlo
import Habitacion from "../database/models/modelHabitacion.js";
//! 1 - GET para listar todas las habitaciones
export const listarHabitaciones = (req, res) => {
  try {
    //agregar logica del get para listar todas las habtaciones
  } catch (error) {
    console.error(error);
  }
};

export const crearHabitacion = async(req, res)=>{
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    await nuevaHabitacion.save();
    res.status(201).json({mensaje:'La Habitacion fue creada con Éxito!'})
  } catch (error) {
    console.log(error)
    res.status(400).json({mensaje:'La Habitacion no pudo ser creada'})
  }
}
