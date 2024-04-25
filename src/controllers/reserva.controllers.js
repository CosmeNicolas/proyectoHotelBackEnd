import Reserva from "../database/models/modelReserva";

export const crearReserva = async(req, res)=>{
    try {
        const nuevaReserva = new Reserva(req.body)
        await nuevaReserva.save()
        res.status(201).json({ mensaje: 'La reserva fue creada con éxito!'})
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'La reserva no pudo ser creada'})
    }
}

export  const  listarReservas = async(req, res)=>{
    try {
        const reservas = await Reserva.find()
        res.status(200).json(reservas)
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje: 'error al buscar la reserva'})
    }
}