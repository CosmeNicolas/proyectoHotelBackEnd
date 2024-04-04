import Usuario from "../database/models/modelUsuario.js";
import bcrypt from "bcrypt"

//! 1- POST para dar de alta un User
export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExiste = await Usuario.findOne({ email });
    if (emailExiste) {
      return res.status(400).json({
        mensaje: "El email ya se encuentra registrado",
      });
    }
    const nuevoUsuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync(10)
    nuevoUsuario.password = bcrypt.hashSync(password, salt)
    nuevoUsuario.save();
    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      email: nuevoUsuario.email,
      usuario: nuevoUsuario.usuario,
      nombreCompleto: nuevoUsuario.nombreCompleto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        mensaje: "Error al intentar crear un usuario"
    })
  }
};
