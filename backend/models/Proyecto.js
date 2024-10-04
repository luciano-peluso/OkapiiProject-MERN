const mongoose = require('mongoose');

const esquemaProyecto = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Esperando aprobación','En progreso', 'Finalizado'], // Enum para los posibles estados del proyecto
        default: 'Esperando aprobación'  // Estado inicial
    },
    cliente: {
        type: String,
        required: true
    },
    desarrolladores: {
        type: [String],  // Array de strings para los nombres de los desarrolladores
        default: []  // Comienza vacío, sin desarrolladores asignados
    }
}, {
    timestamps: true
});

const Proyecto = mongoose.model('Proyecto', esquemaProyecto);

module.exports = Proyecto