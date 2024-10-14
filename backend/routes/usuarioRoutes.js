const express = require('express');
const { crearUsuario, traerUsuarios, editarUsuario, borrarUsuario, traerUnUsuario } = require('../controllers/usuarioController.js');

const router = express.Router();

router.get('/ver', traerUsuarios);

router.get('/traerUnUsuario/:id', traerUnUsuario);

router.post('/crear', crearUsuario);

router.put('/editar/:id', editarUsuario);

router.delete('/borrar/:id', borrarUsuario);

module.exports = router;