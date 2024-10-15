const Proyecto = require('../models/Proyecto');
const mongoose = require('mongoose');

const traerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({});
        res.status(200).json({ success: true, message: "Proyectos traidos con exito", data: proyectos })
    } catch(error) {
        console.error("Error en traer los proyectos: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor"})
    }
}

const traerUnProyecto = async (req, res) => {
    const { id } = req.params; // Extrae el id de los parámetros de la solicitud
    console.log(id);
    try {
        const unProyecto = await Proyecto.findById(id);
        if (!unProyecto) {
            return res.status(404).json({ success: false, message: "Proyecto no encontrado" });
        }
        res.status(200).json({success: true, message:"Proyecto traído con éxito", data: unProyecto});
    } catch (error) {
        console.error("Error en traer el proyecto");
        res.status(500).json({ success: false, message: "Error interno del servidor"});
    }
}

const crearProyecto = async (req, res) => {
    try {
        const nuevoProyecto = new Proyecto(req.body);
        await nuevoProyecto.save();
        res.status(201).json({ success: true, message: "Proyecto creado con éxito", data: nuevoProyecto })
    } catch (error) {
        console.error("Error en crear el proyecto: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor" })
    }
}

const editarProyecto = async (req, res) => {
    const { id } = req.params;

    const proyecto = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de proyecto no encontrado" });
    }

    try {
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, proyecto, {new:true});
        res.status(200).json({ success:true, data:proyectoActualizado, message:"El proyecto se actualizó con éxito"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Error interno del servidor"});
    }
}

const borrarProyecto = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de proyecto no encontrado" });
    }

    try {
        await Proyecto.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:"Proyecto borrado" });
    } catch (error) {
        console.error("Error en borrar el proyecto: "+ error.message);
        res.status(500).json({ success: false, message:"Error interno del servidor" });
    }
}

module.exports = {
    crearProyecto,
    traerProyectos,
    traerUnProyecto,
    editarProyecto,
    borrarProyecto
}