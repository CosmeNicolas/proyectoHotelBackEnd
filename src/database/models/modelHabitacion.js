import mongoose, { Schema } from "mongoose";

const habitacionSchema = new Schema({
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
  disponible: {
    type: Boolean,
    required: true,
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
});

const Habitacion = mongoose.model("habitacion", habitacionSchema);

export default Habitacion;
