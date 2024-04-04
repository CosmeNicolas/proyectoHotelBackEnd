import Habitacion from "../database/models/modelHabitacion.js";

//! 1 - GET para listar todas las habitaciones
export const listarHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Erorr al buscar la habitacion" });
  }
};

//! 3 - GET  de 1 habitación por id
export const obtenerHabitacion = async (req, res) => {
  try {
    console.log(req.params.id)
    const habitacionBuscada = await Habitacion.findById(req.params.id);
    if (habitacionBuscada === null) {
      return res.status(404).json({
        mensaje: "La habitacion con el id enviado no existe",
      });
    }
    res.status(200).json(habitacionBuscada);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "No se pudo encontrar la habitacion solicitada, id erróneo",
    });
  }
};


//! 2 - POST Crear nueva habitación
export const crearHabitacion = async (req, res) => {
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    await nuevaHabitacion.save();
    res.status(201).json({ mensaje: "La Habitacion fue creada con Éxito!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mensaje: "La Habitacion no pudo ser creada" });
  }
};
