const mongoose = require('mongoose');

const esquemaDesarrollador = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    habilidades: {
        type: [String],
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Disponible', 'Ocupado'],
        default: 'Disponible'
    }
}, {
    timestamps: true
});

const Desarrollador = mongoose.model('Desarrollador', esquemaDesarrollador);

module.exports = Desarrollador;