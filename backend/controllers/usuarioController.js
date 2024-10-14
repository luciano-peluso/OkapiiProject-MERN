const Usuario = require('../models/Usuario');
const mongoose = require('mongoose')

/* Para crear un usuario */
const crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ success: true, message: "Usuario creado con éxito", data: nuevoUsuario })
    } catch (error) {
        console.error("Error en crear el usuario: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor" })
    }
}

const traerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find({});
        res.status(200).json({ success: true, message: "Usuarios traidos con exito", data: usuarios })
    } catch(error) {
        console.error("Error en traer los usuarios: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor"})
    }
}

const traerUnUsuario = async (req, res) => {
    const { id } = req.params; // Extrae el id de los parámetros de la solicitud

    try {
        const unUsuario = await Usuario.findById(id);
        if (!unUsuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.status(200).json({success: true, message:"Usuario traído con éxito", data: unUsuario});
    } catch (error) {
        console.error("Error en traer el usuario");
        res.status(500).json({ success: false, message: "Error interno del servidor"});
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;

    const usuario = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de usuario no encontrado" });
    }

    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuario, {new:true});
        res.status(200).json({ success:true, data:usuarioActualizado, message:"El usuario se actualizó con éxito"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Error interno del servidor"});
    }
}

const borrarUsuario = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de usuario no encontrado" });
    }

    try {
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:"Usuario borrado" });
    } catch (error) {
        console.error("Error en borrar el usuario: "+ error.message);
        res.status(500).json({ success: false, message:"Error interno del servidor" });
    }
}

module.exports = {
    crearUsuario,
    traerUsuarios,
    traerUnUsuario,
    editarUsuario,
    borrarUsuario
}