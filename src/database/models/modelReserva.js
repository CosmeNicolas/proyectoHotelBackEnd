import mongoose, { Schema } from "mongoose";

const reservasSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 340,
    validate: {
      validator: (valor) => {
        const pattern =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return pattern.test(valor);
      },
      message: (props) => `${props.value} No es un E-mail válido`,
    },
    unique: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ["Doble Twin", "Doble Superior", "Triple Superior", "Suite"],
  },
  numero: {
    type: Number,
    requided: true,
    min: 100,
    max: 10000,
    unique: true,
  },
  fechaIngreso: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fechaSalida: {
    type: Date,
    required: true,
    default: () => {
      const diaDespues = new Date();
      diaDespues.setDate(diaDespues.getDate() + 1);
      return diaDespues;
    },
  },
  precio: {
    type: Number,
    requided: true,
    min: 27000,
    max: 120000,
  },
});

const Reserva = mongoose.model("reserva", reservasSchema);
export default Reserva;
