const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar contraseña
        const isMatch = usuario.password === password
        console.log("pass: " + password, "otra pass: "+ usuario.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear token JWT con el id y el rol
        const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });

        res.status(200).json({ token, success: true, message: "Iniciaste sesión con éxito" });
    } catch (error) {   
        console.error(error.message);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = {
    login
}