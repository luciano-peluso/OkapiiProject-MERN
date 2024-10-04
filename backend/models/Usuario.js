const mongoose = require('mongoose')

const esquemaUsuario = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Usuario = mongoose.model('Usuario', esquemaUsuario);

module.exports = Usuario;