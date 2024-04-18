import Usuario from "../database/models/modelUsuario.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

//! 1 - POST para dar de alta un User
export const crearUsuario = async (req, res) => {
  try {
    const errorCrear = validationResult(req);

    if (!errorCrear.isEmpty()) {
      return res.status(400).json({errores: errorCrear.array()})
    }

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
      rol: usuarioBuscado.rol
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

// 3 - GET  de 1 usuario por id
export const obtenerUsuario = async (req, res) => {
  try {
    console.log(req.params.id)
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (usuarioBuscado === null) {
      return res.status(404).json({
        mensaje: "El usuario con el id enviado no existe",
      });
    }
    res.status(200).json(usuarioBuscado);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      mensaje: "No se pudo encontrar al usuario solicitado, id erróneo",
    });
  }
};
// 4 - PUT Editar valores de un usuario
export const editarUsuario = async(req, res) => {
  try {
    const usuarioBuscado = await Usuario.findById(req.params.id);
    if (usuarioBuscado === null) {
      return res.status(404).json({
        mensaje: "No se encontro el usuario con el id especificado",
      });
    }
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "El usuario ha sido editado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor, no se pudo editar el Usuario",
    });
  }
};

//! 5 - DELETE borrar usuarios por id

export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findById(req.params.id);
    if (usuarioEliminado === null) {
      return res.status(404).json({
        mensaje: "No se encontró el usuario con el ID especificado",
      });
    } 
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor, no se pudo eliminar el usuario",
    });
  }
};
