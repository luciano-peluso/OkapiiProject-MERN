const express = require('express');
const { crearProyecto, traerProyectos, editarProyecto, borrarProyecto } = require('../controllers/proyectoController.js');

const router = express.Router();

router.get('/ver', traerProyectos);

router.post('/crear', crearProyecto);

router.put('/editar/:id', editarProyecto);

router.delete('/borrar/:id', borrarProyecto);

module.exports = router;