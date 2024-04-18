import mongoose, { Schema } from "mongoose";

const habitacionSchema = new Schema({
  numero: {
    type: Number,
    requided: true,
    min: 100,
    max: 10000,
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ["Doble Twin", "Doble Superior", "Triple Superior", "Suite"],
  },
  precio: {
    type: Number,
    requided: true,
    min: 27000,
    max: 120000,
  },
  fechaIngreso: {
    type: Date,
    required: true,
  },

  fechaSalida: {
    type: Date,
    required: true,
  },

  disponible: {
    type: Boolean,
    required: true,
    default: true,
  },
  imagen: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/.test(valor);
      },
      message: (dato) => `${dato.value} no es una URL de imagen valida`,
    },
  },
  descripcion: {
    type: String,
    requided: true,
    minLength: 35,
    maxLength: 500,
  },
});

const Habitacion = mongoose.model("habitacion", habitacionSchema);

export default Habitacion;
