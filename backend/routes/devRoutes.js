const express = require('express');
const { crearDev, traerDevs, editarDev, borrarDev, traerUnDev } = require('../controllers/devController.js');

const router = express.Router();

router.get('/ver', traerDevs);

router.get('/traerUnDev/:id', traerUnDev);

router.post('/crear', crearDev);

router.put('/editar/:id', editarDev);

router.delete('/borrar/:id', borrarDev);

module.exports = router;