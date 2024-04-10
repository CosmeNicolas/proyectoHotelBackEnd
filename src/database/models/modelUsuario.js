import mongoose, {Schema} from "mongoose";

const usuarioSchema = new Schema({
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
  usuario: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    
    enum: ["Administrador", "Usuario"],
    default:"Usuario",
  },

  suspendido: {
    type: Boolean,
    default: false,
  },
});

const Usuario =  mongoose.model('usuario', usuarioSchema)

export default Usuario;