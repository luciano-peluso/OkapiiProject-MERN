const express = require('express');
const { crearUsuario, traerUsuarios, editarUsuario, borrarUsuario } = require('../controllers/usuarioController.js');

const router = express.Router();

router.get('/ver', traerUsuarios);

router.post('/crear', crearUsuario);

router.put('/editar/:id', editarUsuario);

router.delete('/borrar/:id', borrarUsuario);

module.exports = router;