import Usuario from "../database/models/modelUsuario.js";
import bcrypt from "bcrypt";

//! 1 - POST para dar de alta un User
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
    const salt = bcrypt.genSaltSync(10);
    nuevoUsuario.password = bcrypt.hashSync(password, salt);
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
      mensaje: "Error al intentar crear un usuario",
    });
  }
};

//! 2 - Login del usuario - Se verifica el mail y password correctos
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Contraseña o Correo incorrecto (quitar: fallo el correo)",
      });
    }
    const passwordValido = bcrypt.compareSync(
      password,
      usuarioBuscado.password
    );
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Contraseña o correo incorrecto (quitar: fallo el pass)",
      });
    }
    await res.status(200).json({
      mensaje: "El usuario existe",
      usuario: usuarioBuscado.usuario,
      email: usuarioBuscado.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al intentar logear",
    });
  }
};

//Listar Usuarios
export const listarUsuarios = async(req, res)=>{
  try {
    const usuario = await Usuario.find();
    res.status(200).json(usuario);
  } catch (error) {
    console.log(error)
    res.status(500).json({ mensaje: "Erorr al buscar el usuario" });
  }
}