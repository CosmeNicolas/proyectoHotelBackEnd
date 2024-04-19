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
    default: function () {
      const fechaArgentina = new Date().toLocaleString("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
      });
      return fechaArgentina;
    },
  },

  fechaSalida: {
    type: Date,
    required: true,
    default: function() {
      const fechaArgentina = new Date().toLocaleString("en-US", {
        timeZone: "America/Argentina/Buenos_Aires",
      });
      const tomorrow = new Date(fechaArgentina);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
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
