const Desarrollador = require('../models/Desarrollador');
const mongoose = require('mongoose')

const crearDev = async (req, res) => {
    try {
        const nuevoDev = new Desarrollador(req.body);
        await nuevoDev.save();
        res.status(201).json({ success: true, message: "Desarrollador creado con éxito", data: nuevoDev })
    } catch (error) {
        console.error("Error en crear el desarrollador: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor" })
    }
}

const traerDevs = async (req, res) => {
    try {
        const devs = await Usuario.find({});
        res.status(200).json({ success: true, message: "Desarolladores traidos con exito", data: devs })
    } catch(error) {
        console.error("Error en traer los desarrolladores: " + error.message);
        res.status(500).json({ success: false, message: "Error interno del servidor"})
    }
}

const editarDev = async (req, res) => {
    const { id } = req.params;

    const desarrollador = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de desarrollador no encontrado" });
    }

    try {
        const devActualizado = await Desarrollador.findByIdAndUpdate(id, nombre, {new:true});
        res.status(200).json({ success:true, data:devActualizado, message:"El desarrollador se actualizó con éxito"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({success:false, message:"Error interno del servidor"});
    }
}

const borrarDev = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message:"Id de desarrollador no encontrado" });
    }

    try {
        await Desarrollador.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:"Desarrollador borrado" });
    } catch (error) {
        console.error("Error en borrar el desarrollador: "+ error.message);
        res.status(500).json({ success: false, message:"Error interno del servidor" });
    }
}

module.exports = {
    crearDev,
    traerDevs,
    editarDev,
    borrarDev
}