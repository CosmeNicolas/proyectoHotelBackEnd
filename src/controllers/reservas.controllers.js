import Habitacion from "../database/models/modelHabitacion.js";


//!Put de reserva sin token
export const reservarHabitacion = async (req, res) => {
  try {
    const habitacionBuscada = await Habitacion.findById(req.params.id);
    if (habitacionBuscada === null) {
      return res.status(404).json({
        mensaje: "No se encontró la habitación con el ID especificado",
      });
    }
    await Habitacion.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "La habitación ha sido editada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor, no se pudo editar la habitación",
    });
  }
};
