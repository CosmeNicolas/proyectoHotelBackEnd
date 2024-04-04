// falta crear el modelHabitacion e importarlo
import Habitacion from "../database/models/modelHabitacion.js";
//! 1 - GET para listar todas las habitaciones
export const listarHabitaciones = async(req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.status(200).json(habitaciones)
  } catch (error) {
    console.error(error);
    res.status(500).json({mensaje: 'Erorr al buscar la habitacion'})
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
